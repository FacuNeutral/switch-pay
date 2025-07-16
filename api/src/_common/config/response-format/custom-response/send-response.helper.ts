import { Response } from "express";

function sendResponse(res: Response, message: string, data: any = null, statusCode: number = 200) {
    return res.status(statusCode).json({
        message,
        data,
        // statusCode,
        // timestamp: new Date().toISOString(),
    });
}

export default sendResponse;