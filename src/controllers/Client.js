import Client from '../models/client';
import Account from '../models/account';
import Transaction from '../models/transaction';
import HttpStatus from 'http-status-codes';
import { controller, get, post, put, del } from 'koa-dec-router';
import BaseCtrl from './Base';
import url from 'url';

@controller('/clients')
export default class ClientCtrl extends BaseCtrl {
    @get('')
    async getList(ctx) {
        try {

            console.log('get');

            const clients = await Client.find()/*.lean()*/;

            ctx.ok(clients);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @post('')
    async createItem(ctx) {
        try {
            console.log('post');

            const new_client = new Client(ctx.request.body);
            await new_client.save();

            const clients = await Client.find();
            ctx.ok(clients);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @get('/:_id')
    async getItemById(ctx) {
        try {
            console.log('getByID');
            const client = await Client.findById(ctx.params._id);
            ctx.ok(client);
        } catch (err) {
            ctx.throw(HttpStatus.NOT_FOUND, err.message);
        }
    }

    @put('/:_id')
    async updateItem(ctx) {
        try {
            console.log('put');
            await Client.findByIdAndUpdate(ctx.params._id, {$set: ctx.request.body});
            ctx.ok();
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @del('/:_id')
    async deleteItem(ctx) {
        try {
            console.log('delete');
            await Client.findByIdAndRemove(ctx.params._id);
            ctx.ok();
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }
}
