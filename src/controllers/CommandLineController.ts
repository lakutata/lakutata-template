import {Action, Controller} from 'lakutata'

export class CommandLineController extends Controller {

    @Action({command: 'hello'})
    public async hello(): Promise<string> {
        return 'world'
    }
}
