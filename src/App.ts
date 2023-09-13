import {Application, Logger} from 'lakutata'
import Config from './config/Config'
import {GraceExit} from 'lakutata/Helper'

Application.run(Config('production'))
    .then((app: Application) => Logger.info('The application %s has successfully started in %s mode.', app.appName, app.mode()))
    .catch(error => GraceExit(7, () => Logger.error(error)))
