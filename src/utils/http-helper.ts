import { HttpResponse } from "../interfaces/http-response-interface";
import { HttpStatus } from "./http-status";

export const response = <T>(status: HttpStatus, body: T): HttpResponse<T> => ({
    statusCode: status,
    body,
});
  
export const ok = <T>(body: T) => response(HttpStatus.OK, body);
export const created = <T>(body: T) => response(HttpStatus.CREATED, body);
export const accepted = <T>(body: T) => response(HttpStatus.ACCEPTED, body);
export const noContent = () => response(HttpStatus.NO_CONTENT, null);

export const badRequest = (message: string) => response(HttpStatus.BAD_REQUEST, message);
export const unauthorized = (message = "Unauthorized") => response(HttpStatus.UNAUTHORIZED, message);
export const forbidden = (message = "Forbidden") => response(HttpStatus.FORBIDDEN, message);
export const notFound = (message = "Not Found") => response(HttpStatus.NOT_FOUND, message);
export const conflict = (message: string) => response(HttpStatus.CONFLICT, message);

export const internalServerError = (message = "Internal Server Error") =>
    response(HttpStatus.INTERNAL_SERVER_ERROR, message);

export const notImplemented = (message = "Not Implemented") =>
    response(HttpStatus.NOT_IMPLEMENTED, message);

export const serviceUnavailable = (message = "Service Unavailable") =>
    response(HttpStatus.SERVICE_UNAVAILABLE, message);