import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from '../utils/error.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import   activityLogger from '../activity/activityLogger.js'
//import twilio from 'twilio';

dotenv.config();

/**
 **************************************************************************************
 *Initialize Prisma Client with connection pooling for improved performance
***************************************************************************************
**/
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
 // log: ['query', 'info', 'warn', 'error'], // Enable detailed logging for debugging and monitoring
});


/**
 ****************************************************************************************
 * Configure email transport with connection pooling for improved performance
 ****************************************************************************************
 **/
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: false, // Use TLS (true for port 465, false for 587)
  pool: true,
  maxConnections: 5,
  rateLimit: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


/**
 ****************************************************************************************
 * Rate limiting middleware to prevent abuse of signup and login routes
 ****************************************************************************************
 **/
export const limiter = () => {
  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests from this IP, please try again later.',
  });
};


/**
 ****************************************************************************************
 * Middleware for role-based access control
 ****************************************************************************************
 **/
const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return next(errorHandler(403, 'Access denied'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.role)) {
        return next(errorHandler(403, 'Unauthorized access'));
      }

      next();
    } catch (error) {
      return next(errorHandler(403, 'Invalid token'));
    }
  };
};


/**
 ****************************************************************************************
 * Signup a new user with account activation via email.
 ****************************************************************************************
 **/

 export const signup = async (req, res, next) => {
  await body('email').isEmail().normalizeEmail().run(req);
  await body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .trim()
    .escape()
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fName, lName, oName, password, email, contact, role } = req.body;

  if (!fName || !lName || !contact || fName.trim() === '' || lName.trim() === '' || contact.trim() === '') {
    return next(errorHandler(400, 'All required fields must be filled'));
  }

  try {
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return next(errorHandler(409, 'Email already exists'));
    }

    const existingContact = await prisma.user.findUnique({ where: { contact } });
    if (existingContact) {
      return next(errorHandler(409, 'Contact already exists'));
    }

    const salt = await bcryptjs.genSaltSync(12); // Use asynchronous method
    const hashedPassword = await bcryptjs.hashSync(password, salt); // Use asynchronous method

    // Generate Activation Token
    const activationToken = crypto.randomBytes(48).toString('hex');
    // Calculate expiration date (7 days from now)
    const activationTokenExpiresAt = new Date();
    activationTokenExpiresAt.setDate(activationTokenExpiresAt.getDate() + 7);

    const newUser = await prisma.user.create({
      data: {
        fName,
        lName,
        oName: oName || null,
        email,
        contact,
        password: hashedPassword,
        role: role || 'USER',
        isActive: false,
        activationToken,
        activationTokenExpiresAt
      },
    });

    const activationLink = `${process.env.CLIENT_URL}/activate/${activationToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Account Activation',
      text: `This email is from Commission for Technical and Vocational Educational and Training.
      Please don't hesitate to complete the signup process in time to meet the schedule for the exam processes.
      Click the following link to activate your account:
      ${activationLink}
      Thank you for your cooperation, ${lName} ${fName} ${oName}`,
      headers: { 'X-Priority': '1' },
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return next(errorHandler(422, 'Error sending email: ' + error.message));
      } else {
        return res.status(200).json({ Status: 'Success', message: 'Email sent:', info });
      }
    });
    // // Send activation SMS
    // const smsMessage = `Dear ${fName} ${lName}, Congratulations you just began a step for registration
    // please activate your account using the link:
    // ${activationLink}`;

    // await twilioClient.messages.create({
    //   body: smsMessage,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: contact, // Contact number provided during signup
    // });

    return res.status(201).json({ Status: 'Success', message: 'Please check your email to activate your account' });

  } catch (error) {
    console.error('Signup error:', error);
    return next(errorHandler(500, 'Server error, unable to create user'));
  }
};


/**
 ****************************************************************************************
 * Login a user and provide JWT token for authentication.
 ****************************************************************************************
 **/
 export const login = async (req, res, next) => {
  await body('email').isEmail().normalizeEmail().run(req);
  await body('password').notEmpty().trim().escape().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    await activityLogger(req, null, 'LOGIN_ATTEMPT', 'FAILURE', 'Validation errors');
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      await activityLogger(req, null, 'LOGIN_ATTEMPT', 'FAILURE', 'Invalid email or password');
      return next(errorHandler(401, 'Invalid email or password'));
    }

    if (!user.isActive) {
      await activityLogger(req, user.id, 'LOGIN_ATTEMPT', 'FAILURE', 'Account not activated');
      return next(errorHandler(403, 'Account not activated. Please check your email to activate your account.'));
    }

    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      await activityLogger(req, user.id, 'LOGIN_ATTEMPT', 'FAILURE', 'Invalid email or password');
      return next(errorHandler(401, 'Invalid email or password'));
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h', algorithm: 'HS256' }
    );

    const { password: pass, activationToken, ...rest } = user;
    await activityLogger(req, user.id, 'LOGIN_ATTEMPT', 'SUCCESS', 'User logged in successfully');
    res.cookie( 'token', token )
    return res.status(200).json({ ...rest, token });
  
  } catch (error) {
    await activityLogger(req, null, 'LOGIN_ATTEMPT', 'FAILURE', 'Server error occurred');
    return next(errorHandler(500, 'Server error, unable to sign in'));
  }
};


/**
 ****************************************************************************************
 * Activate user account using activation token.
 ****************************************************************************************
 **/

export const activateAccount = async (req, res, next) => {
  const { token } = req.query;
//console.log(token);
  try {
    const user = await prisma.user.findFirst({
      where: {
        activationToken: token,
      },
    });

    if (!user) {
      return next(errorHandler(400, 'Invalid or expired token'));
    }

const now = new Date();

// Add 7 days to the current date
const futureDate = new Date();
futureDate.setDate(now.getDate() + 7);

if (futureDate < user.activationTokenExpiresAt) {
  return next(errorHandler(400, 'Token has expired'));
}


    // Activate user account and remove the activation token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isActive: true,
        activationToken: null,
        activationTokenExpiresAt: null,
      },
    });

    return res.status(200).json({
      Status: 'Success',
      message: 'Account activated successfully',
      user,
    });
  } catch (error) {
    return next(errorHandler(500, 'Server error, unable to activate account'));
  }
};


/**
*****************************************************************************************
 *  Reset Activation Token.
****************************************************************************************
 **/
export const resetActivationToken = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return next(errorHandler(400, 'User not found'));
    }
    // Generate a new activation token
    const newActivationToken = crypto.randomBytes(32).toString('hex');
    const newActivationTokenExpiresAt = new Date(Date.now() + 86400 * 1000);
    // Update the user's activation token and expiration date
    await prisma.user.update({
      where: { id: user.id },
      data: {
        activationToken: newActivationToken,
        activationTokenExpiresAt: newActivationTokenExpiresAt,
      },
    });

    const activationLink = `${process.env.CLIENT_URL}/activation/${newActivationToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Resetting Activation Token',
      text: `Please click the following link to reset your Activation Token: ${activationLink}`,
      headers: { 'X-Priority': '1' },
    };
    // Send the email
    await transporter.sendMail(mailOptions);
    // If successful
    return res.status(201).json({Status: 'Success', message: 'Activation Token reset link sent to your Email successfully'  });

  } catch (error) {
    console.error('Reset activation token error:', error);
    return next(errorHandler(500, 'Server error, unable to reset activation token'));
  }
};


/**
****************************************************************************************
 *  Request password reset.
****************************************************************************************
 **/
export const resetPasswordToken = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Find user by Email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return next(errorHandler(400, 'User cannot be found or User Email does not exist'));
    }
    // Generate a new password reset token
    const newActivationToken = crypto.randomBytes(32).toString('hex');
    const newActivationTokenExpiresAt = new Date(Date.now() + 86400 * 1000);
    // Update the user reset token and expiration date
    await prisma.user.update({
      where: { id: user.id },
      data: {
        activationToken: newActivationToken,
        activationTokenExpiresAt: newActivationTokenExpiresAt,
      },
    });

    const activationLink = `${process.env.CLIENT_URL}/ResetPassword/${newActivationToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Resetting Password',
      text: `Please click the following link to reset your password: ${activationLink}`,
      headers: { 'X-Priority': '1' },
    };
    // Send the email
    await transporter.sendMail(mailOptions);
    // If successful
    return res.status(201).json({
      Status: 'Success',
      message: 'Password reset link sent your Email successfully',
    });

  } catch (error) {
    console.error('Reset password failed:', error);
    return next(errorHandler(500, 'Server error, unable to reset password'));
  }
};


/**
***************************************************************************************
* Reset password.
 **************************************************************************************
 **/

 export const resetPassword = async (req, res, next) => {
  const { activationToken: token } = req.query;
  const { password } = req.body;

  try {
    // Find the user by reset token
    const user = await prisma.user.findUnique({
      where: {
        activationToken: token,
      },
    });

    if (!user) {
      return next(errorHandler(400, 'Invalid or expired token'));
    }

    // Check if the reset token has expired
    if (new Date() > user.activationTokenExpiresAt) {
      return next(errorHandler(400, 'Reset token has expired'));
    }

    // Hash the new password
    const salt = await bcryptjs.genSaltSync(12);
    const hashedPassword = await bcryptjs.hashSync(password, salt);

    // Update the user's password and clear the reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        activationToken: null,
        activationTokenExpiresAt: null,
      },
    });

    return res.status(200).json({ status: 'Success', message: 'Password has been reset successfully' });

  } catch (error) {
    console.error('Reset password error:', error);
    return next(errorHandler(500, 'Server error, unable to reset password'));
  }
};


//app.post('/api/request-password-reset', requestPasswordReset);
//app.post('/api/reset-password', resetPassword);


// Example of protecting routes with RBAC
//app.get('/admin-dashboard', authorize(['ADMIN']), (req, res));
