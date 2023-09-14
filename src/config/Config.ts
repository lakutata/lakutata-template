import {Application, ApplicationOptions, Logger} from 'lakutata'
import {CommandLineController} from '../controllers/CommandLineController'
import {CLI} from '../components/CLI'
import {Command, Option} from 'commander'

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
            cli: {
                class: CLI,
                commands: [
                    //Register command here
                    new Command('hello')
                        .description('Will echo world')
                        .addOption(new Option('-u, --user <user>', 'user info'))
                ]
            }
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
                const cli: CLI = await app.get<CLI>('cli')
                const result: any = await app.dispatchToController(await cli.parse(), {
                    context: {
                        /* Other Params */
                    }
                })
                //output result to command line
                Logger.info(result)
            }
        ]
    }
}
