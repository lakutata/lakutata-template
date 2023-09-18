import {Controller} from 'lakutata'
import {All, Delete, Get, Head, Options, Patch, Post, Put} from '../lib/HttpActionDecorators'
import {HttpActionInputPattern} from '../interfaces/HttpActionInputPattern'

export class ExampleController extends Controller {

    @Get('/get')
    public async get(inp: HttpActionInputPattern) {
        return 'recv method get'
    }

    @Get('/:id')
    public async get1(inp: HttpActionInputPattern) {
        console.log(inp)
        return 'recv method get1'
    }

    @Head('/head')
    public async head(inp: HttpActionInputPattern) {
        return 'recv method head'
    }

    @Post('/post')
    public async post(inp: HttpActionInputPattern) {
        return 'recv method post'
    }

    @Put('/put')
    public async put(inp: HttpActionInputPattern) {
        return 'recv method put'
    }

    @Delete('/delete')
    public async delete(inp: HttpActionInputPattern) {
        return 'recv method delete'
    }

    @Options('/options')
    public async options(inp: HttpActionInputPattern) {
        return 'recv method options'
    }

    @Patch('/patch')
    public async patch(inp: HttpActionInputPattern) {
        return 'recv method patch'
    }

    @All('/')
    public async all(inp: HttpActionInputPattern) {
        return 'recv method all'
    }
}
