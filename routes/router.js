import express from 'express';
import { controller } from '../controllers/controller.js';
const router = express.Router();

router.get('/', controller.home)
router.get('/joyas', controller.obtenerJoyas)
router.get('/joyas/filtros', controller.obtenerJoyasPorFiltro)
router.get('*', controller.notFound)

export default router;