import express from 'express';

import apiRouter from './api';
import adminRouter from './admin';

const router = express.Router();

router.use("/api", apiRouter);
router.use("/admin", adminRouter);

export default router;