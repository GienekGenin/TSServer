import { Response, NextFunction } from "express";
import { HTTPClientError, HTTP404Error } from "../utils/httpErrors";

export const notFoundError = (res: Response, next: NextFunction) => {
    res.status(404);
    next(new HTTP404Error());
};

export const clientError = (err: Error, res: Response, next: NextFunction) => {
    if (err instanceof HTTPClientError) {
        console.warn(err);
        res.status(err.statusCode)
        next(err);
    } else {
        next(err);
    }
};

export const serverError = (err: Error, res: Response, next: NextFunction) => {
    console.error(err);
    if (process.env.NODE_ENV === "production") {
        res.status(500);
        next(new Error("Internal Server Error"));
    } else {
        res.status(500);
        next(err);
    }
};
