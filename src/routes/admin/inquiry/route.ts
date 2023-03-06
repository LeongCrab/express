import express from 'express';
import inquiryController from './controller';

const inquiryRouter = express.Router();

// GET | /admin/inquiry/?limit=&offset=
inquiryRouter.get('/', inquiryController.getInquiryList);
// GET | /admin/inquiry/:requestId
inquiryRouter.get('/:requestId', inquiryController.getInquiry);
// PATCH | /admin/inquiry/:requestId/complete
inquiryRouter.patch('/:requestId/complete', inquiryController.completeInquiry);
// DELETE | /admin/inquiry/:requestId
inquiryRouter.delete('/:requestId', inquiryController.deleteInquiry);

export default inquiryRouter;