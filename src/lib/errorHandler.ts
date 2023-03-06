import { NextFunction, Request, Response } from "express";
import BaseError from './BaseError';

export default function (err: Error, req:Request, res: Response, next: NextFunction) {
    console.error(err);
    if(err instanceof BaseError){
      res.status(err.statusCode).json({statusCode: err.statusCode, message: err.message});
    } else{
      res.status(500).json({message: err.message});
    }
  }; 