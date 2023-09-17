import {Application, Component, Configurable, InjectApp} from 'lakutata'
import Fastify, {FastifyInstance} from 'fastify'

export class APIServer extends Component {

    @InjectApp()
    protected readonly app: Application

    @Configurable()
    protected readonly port: number

    protected instance: FastifyInstance

    protected async init(): Promise<void> {
        this.instance = Fastify({})
        await this.instance.listen({port: this.port})
        this.log.info('%s listening at port %s', this.app.appName, this.port)
    }
}
