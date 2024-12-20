import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@ntkticket/common';
import { newRouter } from './routes/new';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    name: "session",
    secret: "kien",
    secure: true,
  })
);
app.use(currentUser);
app.use(newRouter)


app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
