import {Application, ApplicationOptions} from 'lakutata'
import {MainWindow} from '../components/MainWindow'

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
            mainWindow: {
                class: MainWindow,
                width: 800,
                height: 600
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
        bootstrap: [
            'mainWindow',
            async (app: Application): Promise<void> => {
                const win = await app.get<MainWindow>('mainWindow')
                setTimeout(()=>{
                    win.width = 1024
                    win.height = 768
                },5000)
            }
        ]
    }
}
