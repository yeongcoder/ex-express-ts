import { Router } from 'express';
import AuthRouter from './auth.router';
import UserRouter from './user.router';
import PostRouter from './post.router';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/posts', PostRouter);

// Export the base-router
export default router;
