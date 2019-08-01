import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    handleResponse
} from "./common";
import { handleAPIDocs } from "./apiDocs";

export default [handleCors, handleBodyRequestParsing, handleCompression, handleAPIDocs, handleResponse];
