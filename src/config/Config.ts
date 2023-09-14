import {ApplicationOptions} from 'lakutata'

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
            /* Config components here */
        },
        controllers: [
            /* Config controllers here */
        ],
        autoload: [
            /* Config autoload items here */
        ],
        modules: {
            /* Config modules here */
        }
    }
}
