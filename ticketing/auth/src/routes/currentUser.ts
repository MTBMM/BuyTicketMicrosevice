import express from 'express'
import {currentUser, requireAuth} from '@ntkticket/common'
// import { currentUser } from '../../../common/src/middlewares/current-user';
// import { requireAuth } from '../../../common/src/middlewares/require-auth';
const router = express.Router();

router.get("/api/users/currentUser", currentUser, requireAuth, (req, res) => {
    res.send({currentUser: req.currentUser})
})

export { router as routerCurrentUser }