import {Application, Component, Configurable, InjectApp} from 'lakutata'
import Fastify, {FastifyInstance} from 'fastify'
import {Server as HttpServer} from 'http'

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
        //todo register routers
        const url: string = await this.instance.listen({port: this.port, host: this.host})
        this.log.info('%s listening at %s', this.app.appName, url)
    }
}
