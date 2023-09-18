import {Controller} from 'lakutata'
import {All, Delete, Get, Head, Options, Patch, Post, Put} from '../lib/HttpActionDecorators'

export class ExampleController extends Controller {

    @Get('/')
    public async get() {
        return 'recv method get'
    }

    @Get('/*')
    public async get1() {
        return 'recv method get1'
    }

    @Get('*/666')
    public async get11() {
        return 'recv method get11'
    }

    @Head('/')
    public async head() {
        return 'recv method head'
    }

    @Post('/')
    public async post() {
        return 'recv method post'
    }

    @Put('/')
    public async put() {
        return 'recv method put'
    }

    @Delete('/')
    public async delete() {
        return 'recv method delete'
    }

    @Options('/')
    public async options() {
        return 'recv method options'
    }

    @Patch('/')
    public async patch() {
        return 'recv method patch'
    }

    @All('/')
    public async all() {
        return 'recv method all'
    }
}
