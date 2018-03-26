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

@controller('/clients')
export default class ClientCtrl extends BaseCtrl {
    @get('', notAuthorized)
    async getList(ctx) {
        try {
            console.log('get');
            console.log(ctx.request.header.authorization);

            //if(!ctx.request.header.authorization){
            //    console.log('AAAAAA'); return ctx.status = 401;}
            const token = jwt.verify(ctx.request.header.authorization, config.secret);
            console.log(token);

            const client = await Client.findById(token.id)/*.lean()*/;
            const data = { name: client.name, surname: client.surname };
            ctx.ok(data);
        } catch (err) {
            ctx.throw(HttpStatus.UNAUTHORIZED, err.message);
        }
    }

    @post('')
    async createItem(ctx) {
        try {
            console.log('post');

            const new_client = new Client(ctx.request.body);
            await new_client.save();
            
            const token = jwt.sign({id: new_client._id}, config.secret, {expiresIn: 3600});
            ctx.set('Authorization', token);

            ctx.ok();
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }
    
    @post('/login')
    async checkItem(ctx) {
        try {
            console.log('post');

            console.log(ctx.request.body);
            
            const data = ctx.request.body;
            
            const client = await Client.findOne({username: data.username});
            if (client && client.password === data.password) {
                const token = jwt.sign({id: client._id}, config.secret, {expiresIn: 3600});
                ctx.set('Authorization', token);
                ctx.ok();
            } else {
                ctx.throw(HttpStatus.NOT_FOUND, "Not correct login or password");
            }        
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    // @get('/:_id')
    // async getItemById(ctx) {
    //     try {
    //         console.log('getByID');
    //         const client = await Client.findById(ctx.params._id);
    //         ctx.ok(client);
    //     } catch (err) {
    //         ctx.throw(HttpStatus.NOT_FOUND, err.message);
    //     }
    // }

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
