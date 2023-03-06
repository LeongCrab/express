import getMetaData from 'metadata-scraper';
import axios from 'axios';
import { encode } from 'base64-arraybuffer'

import BaseError from '../../../lib/BaseError';
import { DataControllers } from '../../../types/api/data';
import db from '../../../lib/db';

const dataControllers: DataControllers = {
  getData: async (req, res, next) => {
    try {
      const metadata = await getMetaData(req.query.url);
      const data = {
        url: metadata.url,
        title: metadata.title,
        desc: metadata.description,
        thumbnail: metadata.image,
        canonical: metadata.url,
      }

      if (!data) throw new BaseError('Unknown', "메타데이터를 가져오는데 실패했습니다.");
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  },
  getPlatform: async (req, res, next) => {
    try {
      let result;
      const id = req.params.id ? +req.params.id : undefined;
      console.log(id);
      if (id) {
        result = await db.platforms.findUnique({
          where: { id },
          select: {
            id: true,
            name: true,
            logoSrc: true,
            urlList: true,
          }
        });

        if (!result) throw new BaseError("NotFound", "해당 플랫폼을 찾을 수 없습니다.");
        res.status(200).json(result);
      } else {
        result = await db.platforms.findMany({
          select: {
            id: true,
            name: true,
            logoSrc: true,
            urlList: true,
          }
        });
        if (!result) throw new BaseError("DBError", "플랫폼 정보를 불러오는데 실패했습니다.")
        res.status(200).json(result);
      }
    } catch (e) {
      next(e);
    }
  },
  encodeImage: async (req, res, next) => {
    try {
      const image = await axios
        .get(req.query.url, {
          responseType: 'arraybuffer',
        })
        .then(res => encode(res.data));
      res.status(200).json(image);
    } catch (e) {
      next(e);
    }
  },
};

export default dataControllers;