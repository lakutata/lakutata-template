import {Application, BaseObject, Configurable, Exception, InjectApp, Time, Transient} from 'lakutata'
import {NotFoundException} from '../exceptions/NotFoundException'
import {FastifyReply} from 'fastify'
import {NonceStr} from 'lakutata/Helper'

@Transient()
export class Responder extends BaseObject {

    @InjectApp()
    protected readonly app: Application

    @Configurable()
    protected readonly pathname: string

    @Configurable()
    protected readonly reply: FastifyReply

    protected statusCode: number = 200

    protected generateCommonResponseObject(responseObject: Record<string, any>, code: number | string, message: string): Record<string, any> {
        this.reply.statusCode = this.statusCode
        return Object.assign({
            statusCode: this.statusCode,
            code: code,
            message: message,
            timestamp: new Time().unix(),
            nonce: NonceStr()
        }, responseObject)
    }

    protected errorResponse<ERROR extends Error | Exception>(error: ERROR) {
        if (error instanceof Exception) {
            if (error.errno === 'E_NO_MATCHED_CONTROLLER_ACTION_PATTERN') {
                this.statusCode = 404
                return this.errorResponse(new NotFoundException('Router \'{pathname}\' is not found', {pathname: this.pathname}))
            }
            return this.generateCommonResponseObject({}, error.errno, error.errMsg)
        } else {
            return this.generateCommonResponseObject({}, -1, error.message)
        }
    }

    public renderer(inp: any, statusCode: number = 200): any {
        this.statusCode = statusCode
        if (inp instanceof Error || inp instanceof Exception) return this.errorResponse(inp)
    }
}
