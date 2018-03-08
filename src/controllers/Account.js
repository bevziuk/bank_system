import Client from '../models/client';
import Account from '../models/account';
import Transaction from '../models/transaction';
import HttpStatus from 'http-status-codes';
import { controller, get, post, put, del } from 'koa-dec-router';
import BaseCtrl from './Base';
import url from 'url';

@controller('/accounts')
export default class AccountCtrl extends BaseCtrl {
    @post('')
    async createItem(ctx) {
        try {
            console.log('post');

            const new_account = new Account(ctx.request.body);
            await new_account.save();

            const client = await Client.findById(ctx.request.body.user_id);
            client.accounts.push(new_account._id);
            await client.save();

            const accounts = await Account.find({user_id: ctx.request.body.user_id});
            ctx.ok(accounts);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @get('/:_id')
    async getItemsForUser(ctx) {
        try {
            console.log('get');

            const accounts = await Account.find({user_id: ctx.params._id});
            ctx.ok(accounts);
        } catch (err) {
            ctx.throw(HttpStatus.NOT_FOUND, err.message);
        }
    }

    @put('/:_id')
    async updateItem(ctx) {
        try {
            console.log('put');
            await Account.findByIdAndUpdate(ctx.params._id, {$set: ctx.request.body});
            const account = await Account.find(ctx.params._id);
            ctx.ok(account);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @del('/:_id')
    async deleteItem(ctx) {
        try {
            console.log('delete');
            await Account.findByIdAndRemove(ctx.params._id);
            //const account = await Account.find();
            //ctx.ok(account);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }
}
