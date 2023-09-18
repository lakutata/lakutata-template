import {ApplicationOptions} from 'lakutata'
import {APIServer} from '../components/APIServer'
import {ExampleController} from '../controllers/ExampleController'
import {Responder} from '../lib/Responder'

export default function (mode: 'development' | 'production'): ApplicationOptions {
    return {
        id: '{id}',
        name: '{name}',
        timezone: 'auto',
        mode: mode,
        alias: {
            /* Set an alias here */
        },
        entries: {
            /* Config entries here */
        },
        components: {
            api: {
                class: APIServer,
                port: 3000,
                host: '0.0.0.0'
            }
        },
        controllers: [ExampleController],
        autoload: [Responder],
        modules: {
            /* Config modules here */
        },
        bootstrap: ['api']
    }
}
