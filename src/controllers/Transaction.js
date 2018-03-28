import Client from '../models/client';
import Account from '../models/account';
import Transaction from '../models/transaction';
import HttpStatus from 'http-status-codes';
import { controller, get, post, put, del } from 'koa-dec-router';
import BaseCtrl from './Base';
import url from 'url';
import jwt from 'jsonwebtoken';
import config from '../middleware/config';
import {notAuthorized} from '../middleware/not-authorized';

@controller('/transactions')
export default class TransactionCtrl extends BaseCtrl {
    @post('')
    async createItem(ctx) {
        try {
            console.log('post');

            const token = jwt.verify(ctx.request.header.authorization, config.secret);
            console.log(token);

            const account = await Account.findById(ctx.request.body._id);
            account.count -= ctx.request.body.sum;

            if (account.count >= 0) {
                await account.save();

                const new_transaction = new Transaction({user_id: token.id, 
                    account_id: ctx.request.body._id, sum: ctx.request.body.sum});
                await new_transaction.save();

                const client = await Client.findById(token.id);
                client.transactions.push(new_transaction._id);
                await client.save();

                ctx.ok();
                return;
            } else {
                ctx.status = 501;
            }   
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @get('', notAuthorized)
    async getItemsForUser(ctx) {
        try {
            console.log('get');

            const token = jwt.verify(ctx.request.header.authorization, config.secret);
            console.log(token);

            const transactions = await Transaction.find({user_id: token.id});

            const trans = [];
            for (let item of transactions) {
                trans.push({_id: item._id, account_id: item.account_id, sum: item.sum, date: item.date});
            }

            ctx.ok(trans);
        } catch (err) {
            ctx.throw(HttpStatus.UNAUTHORIZED, err.message);
        }
    }

    @get('/:_acc_id', notAuthorized)
    async getItemForUserInAcc(ctx) {
        try {
            console.log('getID');

            const token = jwt.verify(ctx.request.header.authorization, config.secret);
            console.log(token);

            const transactions = await Transaction.find({user_id : token.id, account_id: ctx.params._acc_id});
            
            const trans = [];
            for (let item of transactions) {
                trans.push({_id: item._id, account_id: item.account_id, sum: item.sum, date: item.date});
            }

            ctx.ok(trans);
        } catch (err) {
            ctx.throw(HttpStatus.NOT_FOUND, err.message);
        }
    }

    @del('/:_id')
    async deleteItem(ctx) {
        try {
            console.log('delete');
            await Transaction.findByIdAndRemove(ctx.params._id);
            //const transaction = await Transaction.find();
            //ctx.ok(transaction);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }
}

