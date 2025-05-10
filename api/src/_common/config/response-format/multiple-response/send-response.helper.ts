import { Response } from "express";

function sendResponse(res: Response, data: any, message: string, statusCode: number = 200) {
    return res.status(statusCode).json({
        message,
        statusCode,
        data,
        timestamp: new Date().toISOString(),
    });
}

export default sendResponse;