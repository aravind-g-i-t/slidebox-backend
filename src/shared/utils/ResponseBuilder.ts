export type CommonResponse<T = unknown> =
    | {
        success: true;
        message: string;
        data: T|undefined;
        timestamp:string;
    }
    | {
        success: false;
        message: string;
        timestamp:string;

    };

export class ResponseBuilder {
    static success<T>(message: string, data?: T): CommonResponse<T> {
        return {
            success: true,
            message,
            data,
            timestamp:new Date().toISOString()
        };
    }

    static error(
        message: string,

    ): CommonResponse {
        return {
            success: false,
            message,
            timestamp:new Date().toISOString()
        };
    }
}
