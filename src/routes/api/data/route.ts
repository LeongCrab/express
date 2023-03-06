import express from 'express';
import dataController from './controller';

const dataRouter = express.Router();

// GET | api/data/scrap/metadata?url=
dataRouter.get('/scrap/metadata', dataController.getData);

// GET | api/data/platform/:id
dataRouter.get('/platform/:id', dataController.getPlatform);

// GET | api/data/scrap/image?url=
dataRouter.get('/scrap/image', dataController.encodeImage);

export default dataRouter;