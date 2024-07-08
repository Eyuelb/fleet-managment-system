
export type RequestType = {};

export type SuccessResponse<T> = T ;

export type ErrorResponse = {
    error: string;
};

export type ResponseType<T> = SuccessResponse<T> | ErrorResponse;
