import {Application, ApplicationOptions} from 'lakutata'
import {CommandLineController} from '../controllers/CommandLineController'

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
        controllers: [CommandLineController],
        autoload: [
            /* Config autoload items here */
        ],
        modules: {
            /* Config modules here */
        },
        bootstrap: [
            async (app: Application): Promise<void> => {
            
                await app.dispatchToController(CommandLineController)
            }
        ]
    }
}
