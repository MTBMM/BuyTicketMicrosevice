import express, {Response, Request} from "express";
import { body } from "express-validator";
import {validateRequest, BadRequestError} from '@ntkticket/common'
// import { validateRequest } from "../../../common/src/middlewares/validate-request";
import { User } from "../models/UserModel";
// import { BadRequestError } from "../../../common/src/errors/bad-request-error";
import jwt from "jsonwebtoken";
import { Password } from "../services/password";
const router = express.Router()

router.post("/api/users/signin",
            [
                body('email').isEmail().withMessage('email must be valid!!'),
                body('password').trim().notEmpty().withMessage('password must not emply!!!')
            ], validateRequest,
     async (req: Request, res: Response) => {
    console.log("signin")
    const {email, password} = req.body
    const existingUser = await User.findOne({ email })
    if(!existingUser){
        throw new BadRequestError("Invalid credentials")
    }
    const passwordMatch = await Password.compare(existingUser.password, password)
    if(!passwordMatch){
        throw new BadRequestError("Invalid credentials")
    }
    const userJwt =  jwt.sign({
        id:  existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!)
    req.session = {
        jwt: userJwt
    }
    res.status(200).send({userJwt});
})

export {router as signinRouter}