import express from 'express';
import {
    perfil,
    register,
    confirm,
    auth,
    forgetPassword,
    checkToken,
    newPassword,
    updateProfile,
    updatePassword
} from '../controllers/veterinaryController.js';
import { checkAuth } from '../middleware/auth.js';
const router = express.Router();

router.post('/', register);
router.get('/confirmar/:token', confirm);
router.post('/login', auth);
router.post('/olvide-password', forgetPassword);
router.route('/olvide-password/:token')
                                    .get(checkToken)
                                    .post(newPassword);

router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, updateProfile);
router.put('/actualizar-password', checkAuth, updatePassword);

export default router;