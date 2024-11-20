import mongoose from "mongoose";

import { requireAuth, validateRequest, NotFoundError, OrderStatus, BadRequestError } from "@ntkticket/common";


import { Order } from "../models/order";
import express, { Request, Response } from 'express';

const router = express.Router()

router.get('/api/orders', requireAuth, 
             async (req: Request, res: Response) => {

    const orders = await Order.find({
        userId: req.currentUser!.id
    }).populate('ticket')
    res.send(orders)
})

export {router as indexOrderRouter}