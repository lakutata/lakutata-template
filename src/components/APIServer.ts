import {Application, Component, Configurable, Inject, InjectApp} from 'lakutata'
import Fastify, {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify'
import {Server as HttpServer} from 'http'
import {parse as ParseURL} from 'url'
import {Responder} from '../lib/Responder'

export class APIServer extends Component {

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
        this.instance = Fastify({})
        this.instance.all('*', async (request: FastifyRequest, reply: FastifyReply): Promise<any> => {
            const pathname: string | null = ParseURL(request.url).pathname
            const responder: Responder = await this.module.get(Responder, {
                pathname: pathname ? pathname : '/',
                reply: reply
            })
            try {
                return responder.renderer(await this.app.dispatchToController({
                    $method: request.method,
                    $pathname: pathname
                }, {
                    context: {
                        id: request.id,
                        method: request.method,
                        protocol: request.protocol,
                        headers: request.headers,
                        query: request.query,
                        body: request.body,
                        ip: request.ip,
                        ips: request.ips,
                        socket: request.socket
                    }
                }))
            } catch (e) {
                return responder.renderer(e)
            }
        })
        //todo register routers
        const url: string = await this.instance.listen({port: this.port, host: this.host})
        this.log.info('%s listening at %s', this.app.appName, url)
    }
}
