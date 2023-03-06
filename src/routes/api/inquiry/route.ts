import express from 'express';
import inquiryController from './controller';

const inquiryRouter = express.Router();

// POST | api/inquiry/request
inquiryRouter.post('/request', inquiryController.addInquiry);

export default inquiryRouter;