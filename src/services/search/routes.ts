import { Request, Response, NextFunction } from "express";
import { getPlacesByName } from "./SearchController";
import {PayloadGeneratorService} from "../../utils/payload-generator.service";
import {checkSearchParams} from "../../middleware/checks";

export default [
    {
        path: "/api/v1/search",
        method: "get",
        handler: [
            checkSearchParams,
            async ({ query }: Request, res: Response, next: NextFunction) => {
                // const result = await getPlacesByName(query.q);
                return getPlacesByName(query.q).then(PayloadGeneratorService.nextWithData(next, res))
                    .catch(next)
            }
        ]
    }
];
