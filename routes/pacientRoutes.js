import express from 'express';
import {addPacient,
        deletePacient, 
        getPacient, 
        getPacients, 
        updatePacient} from '../controllers/pacientControllers.js';
import { checkAuth } from '../middleware/auth.js';
const router = express.Router();

router.route('/')
        .post(checkAuth, addPacient)
        .get(checkAuth, getPacients)

router.route('/:id')
        .get(checkAuth, getPacient)
        .put(checkAuth, updatePacient)
        .delete(checkAuth, deletePacient)


export default router;