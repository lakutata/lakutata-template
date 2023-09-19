import {Application, Component, Configurable, InjectApp, Singleton} from 'lakutata'
import {app as electron, BrowserWindow} from 'electron'

@Singleton(true)
export class MainWindow extends Component {

    @InjectApp()
    protected readonly app: Application

    @Configurable({
        onSet: function (this: MainWindow, value: number): void {
            if (this.instance && !this.getInternalProperty('ActiveResizing')) {
                const originHeight: number = this.instance.getSize()[1]
                this.instance.setSize(value, originHeight)
            }
        }
    })
    public width: number = 800

    @Configurable({
        onSet: function (this: MainWindow, value: number) {
            if (this.instance && !this.getInternalProperty('ActiveResizing')) {
                const originWidth: number = this.instance.getSize()[0]
                this.instance.setSize(originWidth, value)
            }
        }
    })
    public height: number = 600

    protected instance: BrowserWindow

    /**
     * Initialization function
     * @protected
     */
    protected async init(): Promise<void> {
        this.setInternalProperty('AppDestroy', false)
        electron.on('before-quit', (e: { preventDefault: () => void, readonly defaultPrevented: boolean }) => {
            if (!this.getInternalProperty<boolean>('AppDestroy')) {
                e.preventDefault()
                this.app.exit()
            }
        })
        await electron.whenReady()
        this.instance = new BrowserWindow({
            width: this.width,
            height: this.height
        })
        this.instance.on('resize', () => {
            this.setInternalProperty('ActiveResizing', true)
            const [width, height] = this.instance.getSize()
            this.width = width
            this.height = height
            this.setInternalProperty('ActiveResizing', false)
        })
    }

    /**
     * Destroy function
     * @protected
     */
    protected async destroy(): Promise<void> {
        this.setInternalProperty('AppDestroy', true)
        electron.exit(0)
    }
}
