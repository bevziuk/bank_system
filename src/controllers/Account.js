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

@controller('/accounts')
export default class AccountCtrl extends BaseCtrl {
    @post('')
    async createItem(ctx) {
        try {
            console.log('post');

            const token = jwt.verify(ctx.request.header.authorization, config.secret);

            const new_account = new Account({user_id: token.id});
            await new_account.save();

            const client = await Client.findById(token.id);
            client.accounts.push(new_account._id);
            await client.save();

            ctx.ok();
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

            const accounts = await Account.find({user_id: token.id});
            const accs = [];
            for (let i = 0; i < accounts.length; i++) {
                accs.push({_id: accounts[i]._id, count: accounts[i].count});
            }
            ctx.ok(accs);
        } catch (err) {
            ctx.throw(HttpStatus.UNAUTHORIZED, err.message);
        }
    }

    @put('/refill/:_id')
    async updateItem(ctx) {
        try {
            console.log('put');
            const account = await Account.findById(ctx.params._id);
            account.count += ctx.request.body.count;
            await account.save();

            ctx.ok();
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @del('/:_id')
    async deleteItem(ctx) {
        try {
            console.log('delete');

            await Account.findByIdAndRemove(ctx.params._id);

            const token = jwt.verify(ctx.request.header.authorization, config.secret);
            const client = await Client.findById(token.id);

            const index_acc = client.accounts.indexOf(ctx.params._id);
            client.accounts.splice(index_acc, 1);

            const trans = await Transaction.find({account_id: ctx.params._id});
            for (let i = 0; i < trans.length; i++) {
                const index_tran = client.transactions.indexOf(trans[i]._id);
                client.transactions.splice(index_tran, 1);
                await Transaction.findByIdAndRemove(trans[i]._id);
            }

            await client.save()

            ctx.ok();
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }
}
