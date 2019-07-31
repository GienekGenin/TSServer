import { Response, NextFunction } from "express";
import {ErrorService} from './error.service';

export class PayloadGeneratorService {
    /**
     * @param res - http response
     * @param data - received payload object
     * @return Object: payload object
     */
    static generateSuccess(res: Response, data: any) {
        return PayloadGeneratorService.setResponsePayload(res, {
            payload: data,
            isSuccess: true,
            errors: []
        });
    }

    static setResponsePayload(res: Response, data: any) {
        res.locals.payload = data;
    }

    static getResponsePayload(res: Response) {
        return res.locals.payload;
    }

    static nextWithData(next: NextFunction, res: Response) {
        // @ts-ignore
        return data => {
            PayloadGeneratorService.generateSuccess(res, data);
            next();
        };
    }

    /**
     * @param err - received error
     * @return Object: payload object
     */
    static generateFailure(err: Error) {
        return {
            payload: null,
            isSuccess: false,
            errors: new ErrorService().createCustomError(err)
        };
    }
}
