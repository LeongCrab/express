import { CustomProducts, Results } from '@prisma/client';
import BaseError from '../../../lib/BaseError';
import db from '../../../lib/db';

export const getRequestById = async (id: number) => {
  try {
    return db.requests.findUnique({
      where: { id },
      select: {
        targetId: true,
        target: {
          select: {
            metadataId: true
          }
        },
        phone: true,
        what: true,
        id: true,
      }
    });
  } catch(e) {
    throw new BaseError("NotFound", "해당 문의를 찾을 수 없습니다.");
  }
}

export const addProduct = async (product: Partial<CustomProducts>) => {
  try{
    return db.customProducts.create({
      data: product
    });
  } catch(e){
    throw new BaseError("DBError", "프로덕트 생성 실패");
  }
}

export const addResult = async(result: Partial<Results>) => {
  try{
    return db.results.create({
      data: result
    });
  } catch(e) {
    throw new BaseError("DBError", "결과 생성 실패");
  }
}

export const updateStateByRequestId = async (id: number, state: string) => {
  try{
    return db.requests.update({
      where: { id },
      data: {
        state: state === 'exact' ? 90 : 91
      }
    });
  } catch(e) {
    throw new BaseError("NotFound", "요청 상태 업데이트 실패");
  }
}