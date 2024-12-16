import jwt from 'jsonwebtoken';
import errorHandler from '../utils/error'; 

export const authorize = (roles = []) => {
  // If roles is a string, convert it to an array
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    // Extract token from authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return next(errorHandler(403, 'Access denied, no token provided'));
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Check if the user's role is authorized
      if (roles.length && !roles.includes(req.user.role)) {
        return next(errorHandler(403, 'Unauthorized access'));
      }

      // Continue to the next middleware or route
      
      next();

    } catch (error) {
     // console.error('Token verification failed:', error);
      return next(errorHandler(403, 'Token verification failed'));
    }
  };
};

export default authorize;
