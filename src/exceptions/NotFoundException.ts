import {HttpException} from '../lib/HttpException'

export class NotFoundException extends HttpException {
    public errno: number | string = 'E_NOT_FOUND'
    public statusCode: number = 404
}
