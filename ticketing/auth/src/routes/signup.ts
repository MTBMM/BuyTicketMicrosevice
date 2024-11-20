import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator'
import { User } from '../models/UserModel';
import {BadRequestError, validateRequest} from '@ntkticket/common'
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post("/api/users/signup", 
            [
                        body('email').isEmail().withMessage('Email must be valid'), 
                        body('password').trim().isLength({ min: 4, max: 10}).withMessage("Password must be between 4 to 10 characters")

            ], validateRequest,
     async (req: Request, res: Response) => {
   
    const {email, password} = req.body
    const existingUser = await User.findOne({ email })
    if(existingUser){
        throw new BadRequestError("email has alrealdy")
    }
    console.log(req.body)

    const user = User.build({
        email: email,
        password: password
    })
    await user.save()
    const userJwt =  jwt.sign({
        id:  user.id,
        email: user.email
    }, process.env.JWT_KEY!)
    req.session = {
        jwt: userJwt
    }
    res.send({userJwt});
});

export { router as signupRouter };
