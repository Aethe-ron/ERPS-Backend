import express from 'express'
import { login, signup ,limiter, activateAccount,resetPassword,resetPasswordToken,resetActivationToken} from '../controllers/auth.controller.js'
//import authorize from '../auth/authorize.js'

const router = express.Router();

//User Registration and Authentication Actions on an account
router.post('/signup', signup, limiter);
router.post('/login', login, limiter);
router.post('/activateAccount',activateAccount,limiter)
router.post('/resetPasswordToken',resetPasswordToken,limiter)
router.post('/resetPassword',resetPassword,limiter)
router.post('/resetActivationToken',resetActivationToken,limiter)



// // Public route, no authorization required
// router.get('/public', (req, res) => {
//     res.status(200).json({ message: 'This is a public route' });
//   });
  
//   // Protected route, only accessible by authenticated users with the 'user' role
//   router.get('/user', authorize(['user']), (req, res) => {
//     res.status(200).json({ message: `Hello, ${req.user.name}. You have user access.` });
//   });
  
//   // Admin route, only accessible by authenticated users with the 'admin' role
//   router.get('/admin', authorize(['admin']), (req, res) => {
//     res.status(200).json({ message: `Hello, ${req.user.name}. You have admin access.` });
//   });
  
//   // Multi-role route, accessible by both 'admin' and 'manager' roles
//   router.get('/admin-manager', authorize(['admin', 'manager']), (req, res) => {
//     res.status(200).json({ message: `Hello, ${req.user.name}. You have admin or manager access.` });
//   });
  
export default router;