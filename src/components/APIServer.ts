import {
    ActionPattern,
    Application,
    Component,
    Configurable,
    InjectApp, Time
} from 'lakutata'
import Fastify, {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify'
import {IncomingMessage, Server as HttpServer} from 'http'
import {parse as ParseURL} from 'url'
import {Responder} from '../lib/Responder'
import {hostname} from 'os'
import {MD5} from 'lakutata/Hash'

export class APIServer extends Component {

    public static API_ACTION_MAP_SYMBOL: symbol = Symbol('fgf')

    @InjectApp()
    protected readonly app: Application

    @Configurable()
    protected readonly port: number

    @Configurable()
    protected readonly host: string = '0.0.0.0'

    protected instance: FastifyInstance

    public get HttpServer(): HttpServer {
        return this.instance.server
    }

    protected async init(): Promise<void> {
        this.instance = Fastify({
            ignoreDuplicateSlashes: true,
            genReqId: (req: IncomingMessage) => MD5(`${hostname()}-${Time.now()}-${req.method}-${req.url}`)
        })
        const actionMap: undefined | Map<[string, string], ActionPattern> = Reflect.get(APIServer, APIServer.API_ACTION_MAP_SYMBOL)
        actionMap?.forEach((actionPattern: ActionPattern, [method, pathname]) => {
            this.instance[method](pathname, async (request: FastifyRequest, reply: FastifyReply): Promise<any> => this.requestHandler(actionPattern, request, reply))
        })
        const url: string = await this.instance.listen({port: this.port, host: this.host})
        this.log.info('%s listening at %s', this.app.appName, url)
    }

    protected async requestHandler(actionPattern: ActionPattern, request: FastifyRequest, reply: FastifyReply): Promise<any> {
        const pathname: string | null = ParseURL(request.url).pathname
        const responder: Responder = await this.module.get(Responder, {
            pathname: pathname ? pathname : '/',
            reply: reply
        })
        try {
            return responder.renderer(await this.app.dispatchToController(Object.assign(actionPattern, {
                requestId: request.id,
                method: request.method,
                protocol: request.protocol,
                headers: request.headers,
                query: request.query,
                body: request.body,
                params: request.params,
                ip: request.ip,
                ips: request.ips
            }), {
                context: {
                    request: request,
                    reply: reply
                }
            }))
        } catch (e) {
            return responder.renderer(e)
        }
    }
}
