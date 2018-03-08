import Client from '../models/client';
import Account from '../models/account';
import Transaction from '../models/transaction';
import HttpStatus from 'http-status-codes';
import { controller, get, post, put, del } from 'koa-dec-router';
import BaseCtrl from './Base';
import url from 'url';

@controller('/transactions')
export default class TransactionCtrl extends BaseCtrl {
    @post('')
    async createItem(ctx) {
        try {
            console.log('post');

            const new_transaction = new Transaction(ctx.request.body);
            await new_transaction.save();

            const client = await Client.findById(ctx.request.body.user_id);
            client.transactions.push(new_transaction._id);
            await client.save();

            const transactions = await Transaction.find({user_id: ctx.request.body.user_id});
            ctx.ok(transactions);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @get('/:_user_id')
    async getItemsForUser(ctx) {
        try {
            console.log(ctx.params);
            const trans = await Transaction.find({user_id : ctx.params._user_id});
            ctx.ok(trans);
        } catch (err) {
            ctx.throw(HttpStatus.NOT_FOUND, err.message);
        }
    }

    @get('/:_user_id/:_acc_id')
    async getItemForUserInAcc(ctx) {
        try {
            console.log(ctx.params);
            const trans = await Transaction.find({user_id : ctx.params._user_id, account_id: ctx.params._acc_id});
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

