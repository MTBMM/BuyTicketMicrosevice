import express from 'express'
import { json } from 'body-parser'
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { currentUser } from '@ntkticket/common';
import { getListTicketRouter } from './routes/getListTicket';
import { createTicketRouter } from './routes/createTicket';
import { getTicketRouter } from './routes/getTicket';
import { updateTicketRouter } from './routes/editTicket';


const app = express()
app.use(json())
app.set('trust proxy', 1)
app.use(cookieSession({
    name: "session",
    secret: "kien",
    secure: true
}))

app.use(currentUser)
app.use(getListTicketRouter)
app.use(createTicketRouter)
app.use(getTicketRouter)
app.use(updateTicketRouter)
export {app}
