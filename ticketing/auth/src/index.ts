import express from 'express'
import { json } from 'body-parser'
import 'express-async-errors';
import mongoose from 'mongoose'
import { signupRouter } from './routes/signup'
import {errorHandler, NotFoundError} from '@ntkticket/common'
// import { errorHandler } from '../../common/src/middlewares/error-handler'
// import { NotFoundError } from '../../common/src/errors/not-found-error'
import cookieSession from 'cookie-session';
import { signinRouter } from './routes/signin';
import { routerCurrentUser } from './routes/currentUser';
import { routerSignout } from './routes/signout';
const app = express()
app.use(json())
app.set('trust proxy', 1)
app.use(cookieSession({
    name: "session",
    secret: "kien",
    secure: true
}))
app.use(routerSignout)
app.use(routerCurrentUser)
app.use(signupRouter)
app.use(signinRouter)
app.all('*', async (req, res) => {
    throw new NotFoundError()
})
app.use(errorHandler)

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error("secret key not found!!!")
    }
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log("conected to mongoose")
    }catch(err){
        console.log(err)
        console.log("fail")
    }
    app.listen(4000, () => {
        console.log('Listening on port 4000!!!')
    })
}

start()

