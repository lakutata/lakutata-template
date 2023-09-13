import {Application, Logger} from 'lakutata'
import Config from './config/Config'

Application.run(Config('production')).then((app: Application) => {
    Logger.info('')//todo
}).catch(error => {
    Logger.error(error)
    process.exit(1)
})
