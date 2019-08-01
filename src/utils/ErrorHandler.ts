import { Response, NextFunction } from "express";
import { HTTPClientError, HTTP404Error } from "../utils/httpErrors";

export const notFoundError = (res: Response, next: NextFunction) => {
    res.status(404);
    next(new HTTP404Error());
};

export const clientError = (err: Error, res: Response, next: NextFunction) => {
    if (err instanceof HTTPClientError) {
        console.warn(err);
        res.status(err.statusCode);
    }
    next(err);
};

export const serverError = (err: Error, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500);
    if (process.env.NODE_ENV === "production") {
        next(new Error("Internal Server Error"));
    } else {
        next(err);
    }
};
