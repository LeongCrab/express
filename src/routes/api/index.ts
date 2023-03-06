import express from 'express';
import dataRouter from './data/route';
import inquiryRouter from './inquiry/route';

const apiRouter = express.Router();

apiRouter.use('/inquiry', inquiryRouter);
apiRouter.use('/data', dataRouter);

export default apiRouter;
