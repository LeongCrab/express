import { RequestHandler } from "express";

type AddInquiry = RequestHandler<
  null,
  string | unknown,
  {
    imageSrc?: string,
    what: string,
    phone: string,
    time?: number,
    platformId?: number,
    userId: number,
    video?: {
      pId: string,
      title: string,
      desc: string,
    },
    metadata: {
      desc: string,
      title: string,
      thumbnail: string,
      url: string,
      canonical: string,
    }
  },
  null,
  Record<string, any>
>;

export type InquiryControllers = {
  addInquiry: AddInquiry;
}