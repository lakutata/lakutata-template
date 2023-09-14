import {Component, Configurable} from 'lakutata'
import {Command} from 'commander'

export class CLI extends Component {

    @Configurable()
    protected readonly commands: Command[] = []

    protected instance: Command

    protected async init(): Promise<void> {
        this.instance = new Command()
    }

    public async parse(): Promise<Record<string, any>> {
        return new Promise((resolve, reject) => {
            this.commands.forEach((cmd: Command) => {
                cmd.action((options) => resolve(Object.assign({command: cmd.name()}, options ? options : {})))
                this.instance.addCommand(cmd)
            })
            this.instance
                .parse()
                .on('error', reject)
        })
    }
}
