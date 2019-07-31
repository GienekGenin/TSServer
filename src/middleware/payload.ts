import { Request, Response, NextFunction } from "express";
import {PayloadGeneratorService} from "../utils/payload-generator.service";

export const successOrEmptyPayload = (req: Request, res: Response, next: NextFunction) => {
    const payload = PayloadGeneratorService.getResponsePayload(res);
    if (payload) {
        res.json(payload);
        res.end();
    } else {
        const err = new Error('Not Found');
        next(err);
    }
};

export const errorPayload = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    res.status(err.status || 500).json(
        PayloadGeneratorService.generateFailure(err)
    );
    next();
};
