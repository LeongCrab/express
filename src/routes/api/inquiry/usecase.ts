import { Metadata, Videos, Targets, Requests } from '@prisma/client';
import BaseError from '../../../lib/BaseError';
import db from '../../../lib/db';

export const addMetadata = async (metadata: Partial<Metadata>) => {
  try {
    const exist = await db.metadata.findFirst({
      where: { url: metadata.url },
    });
    let result;
    if (exist) {
      result = await db.metadata.update({
        where: { id: exist.id },
        data: metadata
      });
    } else {
      result = await db.metadata.create({
        data: metadata
      });
    }
    return result;
  } catch (e) {
    throw new BaseError("DBError", "메타데이터 생성 실패");
  }
}

export const addVideo = async (video: Omit<Videos, 'id' | 'updatedAt'>) => {
  try {
    const exist = await db.videos.findFirst({
      where: {
        pId: video.pId,
        platformId: video.platformId,
      },
    });

    let result;
    if (exist) {
      result = await db.videos.update({
        data: video,
        where: { id: exist.id },
      });
    } else {
      result = await db.videos.create({
        data: video,
      });
    }
    return result;
  } catch (e) {
    throw new BaseError("DBError", "Video 생성 실패");
  }
};

export const addTarget = async (target: Partial<Targets>) => {
  try {
    const getType = ():number => {
      let type = 3;
      if (target.imageSrc) type = 1;
      if (target.videoId) type = 2;

      return type;
    };
    const result = await db.targets.create({
      data: {
        ...target,
        type: getType(),
      },
    });
    return result;
  } catch (e) {
    throw new BaseError("DBError", "Target 생성 실패");
  }
};

export const addRequest = async (request: Pick<Requests, 'targetId' | 'phone' | 'what' | 'userId'>) => {
  try {
    if (!request.userId) throw new BaseError("BadRequest", "유저 아이디를 입력해주세요.");
    const user = await db.users.findUnique({
      where: { id: request.userId },
    });
    if (!user) throw new BaseError("NotFound", "헤당 유저를 찾을 수 없습니다.")

    const result = await db.requests.create({
      data: request,
    });
    if (!result) throw new BaseError("DBError", "Request 생성 실패");

    if (request.userId !== 1) {
      await db.users.update({
        where: { id: request.userId },
        data: { phone: request.phone },
      });
    }
    return result;
  } catch (e) {
    throw new BaseError("Unknown");
  }
};