import { HttpStatus } from "../utils/http-status";

export interface HttpResponse<T = unknown> {
    statusCode: HttpStatus;
    body: T;
}