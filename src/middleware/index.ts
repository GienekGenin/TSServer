import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    handleResponse
} from "./common";

export default [handleCors, handleBodyRequestParsing, handleCompression, handleResponse];
