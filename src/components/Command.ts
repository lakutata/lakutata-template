import {Component} from 'lakutata'
import {} from 'commander'

export class Command extends Component {

    protected commands: any[] = []

    protected async init(): Promise<void> {

    }

    public async parse(): Promise<Record<string, any>> {
        return {}
    }
}
