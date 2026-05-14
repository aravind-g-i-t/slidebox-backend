export type CommonResponse<T = unknown> =
    | {
        success: true;
        message: string;
        data: T|undefined;
    }
    | {
        success: false;
        message: string;

    };

export class ResponseBuilder {
    static success<T>(message: string, data?: T): CommonResponse<T> {
        return {
            success: true,
            message,
            data,
        };
    }

    static error(
        message: string,

    ): CommonResponse {
        return {
            success: false,
            message,
        };
    }
}
