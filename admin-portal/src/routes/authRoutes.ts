import { Router } from 'express';
import AuthController from '../controllers/authController';

const router = Router();
const authController = new AuthController();

export const setAuthRoutes = () => {
    router.post('/register', authController.registerUser);
    router.post('/login', authController.loginUser);
    return router;
};