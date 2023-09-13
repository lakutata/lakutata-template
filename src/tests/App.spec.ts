import Config from '../config/Config'
import {Application, Logger} from 'lakutata'

Application.run(Config('development')).then((app: Application) => {
    Logger.info('')//todo
}).catch(error => {
    Logger.error(error)
    process.exit(1)
})
