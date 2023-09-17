import {ApplicationOptions} from 'lakutata'
import {APIServer} from '../components/APIServer'

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
                port: 3000
            }
        },
        controllers: [
            /* Config controllers here */
        ],
        autoload: [
            /* Config autoload items here */
        ],
        modules: {
            /* Config modules here */
        },
        bootstrap: ['api']
    }
}
