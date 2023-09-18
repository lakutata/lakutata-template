import {Application, BaseObject, Configurable, Exception, InjectApp, Time, Transient} from 'lakutata'
import {NotFoundException} from '../exceptions/NotFoundException'
import {FastifyReply} from 'fastify'
import {NonceStr} from 'lakutata/Helper'
import {HttpException} from './HttpException'
import {Readable} from 'stream'
import path from 'path'

@Transient()
export class Responder extends BaseObject {

    @InjectApp()
    protected readonly app: Application

    @Configurable()
    protected readonly pathname: string

    @Configurable()
    protected readonly reply: FastifyReply

    protected statusCode: number = 200

    protected generateCommonResponseObject(responseData: any | null, code: number | string = 0, message: string = ''): Record<string, any> {
        this.reply.statusCode = this.statusCode
        return {
            statusCode: this.statusCode,
            code: code,
            message: message,
            data: responseData,
            timestamp: new Time().unix(),
            nonce: NonceStr()
        }
    }

    protected errorResponse<T extends Error | Exception>(error: T) {
        if (error instanceof HttpException) {
            this.statusCode = error.statusCode
            return this.generateCommonResponseObject(null, error.errno, error.errMsg)
        } else if (error instanceof Exception) {
            if (error.errno === 'E_NO_MATCHED_CONTROLLER_ACTION_PATTERN') return this.errorResponse(new NotFoundException('Router \'{pathname}\' is not found', {pathname: this.pathname}))
            return this.generateCommonResponseObject(null, error.errno, error.errMsg)
        } else {
            return this.generateCommonResponseObject(null, -1, error.message)
        }
    }

    public renderer(inp: any): any {
        if (inp instanceof Readable) {
            let basename: string | undefined
            const filePath: string | undefined = inp['path']
            const filename: string | undefined = inp['filename']
            if (filePath) basename = encodeURIComponent(path.basename(filePath))
            if (filename) basename = encodeURIComponent(path.basename(filename))
            if (basename) this.reply.header('Content-Disposition', `attachment; filename=${encodeURIComponent(path.basename(basename))}`)
            return inp
        }
        if (inp instanceof Error || inp instanceof Exception) return this.errorResponse(inp)
        return this.generateCommonResponseObject(inp)
    }
}
