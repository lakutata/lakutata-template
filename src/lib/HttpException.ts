import {Exception} from 'lakutata'

export abstract class HttpException extends Exception {
    public abstract statusCode: number
}
