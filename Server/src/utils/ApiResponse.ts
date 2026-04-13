import type { Response } from "express";
export class ApiResponse {

    static success(
        res: Response,
        statusCode: number = 200,
        data: any = null,
        message: string = "Success"
    ) {
        return res.status(statusCode).json({
            success: true,
            message,
            ...(data !== null && { data }),
        });
    }
    static created(
        res: Response,
        data: any = null,
        message: string = "Resource created successfully"
    ) {
        return this.success(res, 201, data, message);
    }


    static noContent(res: Response) {
        return res.status(204).send();
    }
}
