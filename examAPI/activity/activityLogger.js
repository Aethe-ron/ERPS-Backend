// activityLogger.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const activityLogger = async (req, userId, action, status, message) => {
  const ipAddress = req.ip || req.connection.remoteAddress || 'N/A';
  const userAgent = req.headers['user-agent'] || 'N/A';

  // Set a placeholder if userId is not provided
  if (!userId) {
    userId = 'N/A'; // Placeholder
  }

  // If email is not provided, use a placeholder
  const email = req.body.email || 'N/A';

  // Attempt to log the activity
  try {
    await prisma.loginHistory.create({
      data: {
        userId,          // Ensure this value is valid or a placeholder
        email,           // Log email as received from request
        status,          // Status of the action (e.g., LOGIN_ATTEMPT)
        message,         // Additional message or description
        ipAddress,       // IP address from the request
        userAgent,       // User agent from the request
      },
    });
  } catch (error) {
    console.error('Error logging activity:', error);
    throw error;
  }
};

export default activityLogger;
