import {ApplicationOptions} from 'lakutata'

export default function (mode: 'development' | 'production'): ApplicationOptions {
    return {
        id: 'template.lakutata.app',
        name: 'template',
        timezone: 'Asia/Shanghai',
        mode: mode,
        alias: {},
        entries: {},
        components: {},
        controllers: [],
        autoload: [],
        modules: {}
    }
}
