import {Application, Component, Configurable, InjectApp} from 'lakutata'
import {createServer, Server as RestifyServer} from 'restify'

export class APIServer extends Component {

    @InjectApp()
    protected readonly app: Application

    @Configurable()
    protected readonly port: number

    protected instance: RestifyServer

    protected async init(): Promise<void> {
        this.instance = createServer({
            name: this.app.appName
        })
    }
}
