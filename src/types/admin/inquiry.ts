import { RequestHandler } from "express";

type GetInquiryList = RequestHandler<
  null,
  string | unknown,
  null,
  {
    limit?: string,
    offset?: string,
  },
  Record<string, any>
>;

type GetInquiry = RequestHandler<
  { requestId: string },
  string | unknown,
  null,
  Record<string, any>
>;

type CompleteInquiry = RequestHandler<
  { requestId: string },
  string | unknown,
  {
    state: "exact" | "similar",
    product: {
      brand: string,
      price: string,
      name: string,
      url: string,
    }
  },
  Record<string, any>
>;

type DeleteInquiry = RequestHandler<
  { requestId: string },
  string | unknown,
  null,
  Record<string, any>
>;

export type AdminInquiryControllers = {
  getInquiryList: GetInquiryList;
  getInquiry: GetInquiry;
  completeInquiry: CompleteInquiry;
  deleteInquiry: DeleteInquiry;
}