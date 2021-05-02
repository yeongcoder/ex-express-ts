import { Router } from 'express';
import UserRouter from './user.router';
//import AuthRouter from './auth/auth.controller';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
//router.use('/auth', AuthRouter);

// Export the base-router
export default router;
