import { RequestHandler } from "express";

type GetData = RequestHandler<
  null,
  string | unknown,
  null,
  { url: string },
  Record<string, any>
>;

type GetPlatform = RequestHandler<
  {id?: string},
  string | unknown,
  null,
  null,
  Record<string, any>
>;

type EncodeImage = RequestHandler<
  null,
  string | unknown,
  null,
  { url: string },
  Record<string, any>
>;

export type DataControllers = {
  getData: GetData;
  getPlatform: GetPlatform;
  encodeImage: EncodeImage;
}