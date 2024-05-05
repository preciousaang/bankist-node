import { NextFunction, Request, Response, } from "express";
import { body, validationResult } from "express-validator";

export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {

    body(['firstName', 'lastName']).trim().notEmpty().escape()



    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    next()
}