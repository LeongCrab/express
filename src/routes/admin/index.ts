import express from 'express';

const adminRouter = express.Router();
import inquiryRouter from './inquiry/route';

adminRouter.use('/inquiry', inquiryRouter);

export default adminRouter;
