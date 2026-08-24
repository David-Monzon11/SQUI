import { Request, Response } from "express";
import { request } from "node:http";

export const getHealthRequest = (req: Request, res: Response) => {
    const retrieveHealthRequest = req.body;

    const receiveRes = {
        statusCode: 200,
        data: retrieveHealthRequest
    }
    console.log(receiveRes);

    res.status(200).json(receiveRes);
};


export const postHealthRequest = (req: Request, res: Response) => {
    const createHealthRequest = req.body;

    const response = {
        statusCode: 201,
        data: createHealthRequest
    }

    console.log(response)

    res.status(201).json(response)
};











