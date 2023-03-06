import BaseError from '../../../lib/BaseError';
import db from '../../../lib/db';
import { AdminInquiryControllers } from '../../../types/admin/inquiry';
import { getRequestById, addProduct, addResult, updateStateByRequestId } from './usecase';

const adminInquiryControllers: AdminInquiryControllers = {
  getInquiryList: async (req, res, next) => {
    try {
      const take = req.query.limit ? +req.query.limit : 12;
      const skip = req.query.offset ? +req.query.offset - 1 : 0;
      
      const result = await db.requests.findMany({
        take,
        skip: skip * take,
        select: {
          createdAt: true,
          id: true,
          phone: true,
          state: true,
          targetId: true,
          updatedAt: true,
          userId: true,
          what: true,
          user: { select: { email: true, phone: true, nickname: true, avatar: true } },
          target: {
            select: {
              imageSrc: true,
              time: true,
              updatedAt: true,
              metadata: true,
              results: { select: { type: true, customProduct: true } },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      if (!result) throw new BaseError("NotFound", "문의를 찾을 수 없습니다.");
      const length = await db.requests.count();
      res.status(200).json({ length, result });
    } catch (e) {
      next(e);
    }
  },
  getInquiry: async (req, res, next) => {
    try {
      const result = await db.requests.findUnique({
        where: {
          id: +req.params.requestId
        },
        select: {
          createdAt: true,
          id: true,
          phone: true,
          state: true,
          targetId: true,
          updatedAt: true,
          userId: true,
          what: true,
          user: { select: { email: true, phone: true, nickname: true, avatar: true } },
          target: {
            select: {
              imageSrc: true,
              time: true,
              updatedAt: true,
              metadata: true,
              results: { select: { type: true, customProduct: true } },
            },
          },
        },
      });
      if (!result) throw new BaseError("NotFound", "해당 문의를 찾을 수 없습니다");

      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  },
  completeInquiry: async (req, res, next) => {
    try {
      const id = +req.params.requestId;
      const request = await getRequestById(id);
      const product = await addProduct({
        ...req.body.product,
        metadataId: request!.target.metadataId
      });

      const result = await addResult({
        type: req.body.state === 'exact' ? 1 : 2,
        targetId: request!.targetId,
        customProductId: product.id,
      });

      const updateRequest = await updateStateByRequestId(id, req.body.state);
      res.status(201).json(updateRequest);
    } catch (e) {
      next(e);
    }
  },
  deleteInquiry: async (req, res, next) => {
    try {
      const result = await db.requests.delete({
        where: { id: +req.params.requestId }
      });
      res.status(201).send(`${result.id}번 요청 삭제 완료`);
    } catch (e) {
      next(new BaseError("NotFound", "삭제할 요청을 찾을 수 없습니다."));
    }
  },
};

export default adminInquiryControllers;