import validation from '../../../lib/validation';
import { InquiryControllers } from '../../../types/api/inquiry';
import { addMetadata, addRequest, addTarget, addVideo } from './usecase';

const inquiryController: InquiryControllers = {
  addInquiry: async (req, res, next) => {
    try {
      validation.phone(req.body.phone);
      const metadata = await addMetadata(req.body.metadata);
      let videoId = null;
      if (req.body.video && req.body.platformId) {
        const video = await addVideo({
          ...req.body.video,
          metadataId: metadata.id,
          platformId: req.body.platformId,
        });
        videoId = video.id;
      }
      const target = await addTarget({
        imageSrc: req.body.imageSrc,
        metadataId: metadata.id,
        time: req.body.time,
        videoId: videoId,
      });
      const request = await addRequest({
        targetId: target.id,
        phone: req.body.phone,
        what: req.body.what,
        userId: req.body.userId || 1,
      });

      res.status(201).json(request);
    } catch (e) {
      next(e);
    }
  }
}

export default inquiryController;