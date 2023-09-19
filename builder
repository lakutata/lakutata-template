#!/usr/bin/env ts-node

require('commander').program
    .option('-p, --platform <platform>', 'target platform', require('os').platform())
    .option('-a, --arch <arch>', 'target arch', require('os').arch())
    .action(async (options) => {
        const fs = require('fs')
        const path = require('path')
        const {build, Platform, Arch} = require('electron-builder')
        const {Time} = require('lakutata')
        const {TextTemplate} = require('lakutata/Helper')
        const AppConfig = require('./src/config/Config').default
        const BuilderConfig = require('./.builder.config').default
        const packageJson = JSON.parse(TextTemplate(fs.readFileSync(path.resolve(__dirname, './package.json'), {encoding: 'utf-8'}), {
            name: 'INVALID',
            description: 'INVALID',
            author: 'INVALID',
            license: 'INVALID'
        }, {ignoreMissing: true}))
        const platform = options.platform
        const architecture = (() => {
            switch (options.arch) {
                case 'arm':
                    return Arch.armv7l
                case 'arm64':
                    return Arch.arm64
                case'ia32':
                    return Arch.ia32
                case 'x64':
                    return Arch.x64
                default:
                    return Arch.universal
            }
        })()
        const targets = (() => {
            switch (platform) {
                case 'linux':
                    return Platform.LINUX.createTarget(['deb', 'rpm'], architecture)
                case 'darwin':
                    return Platform.MAC.createTarget(['dmg'], architecture)
                case 'win32':
                    return Platform.WINDOWS.createTarget(['nsis', 'portable'], architecture)
                default:
                    return undefined
            }
        })()
        const appConfig = AppConfig('production')
        console.log('TextTemplate(appConfig.name, {name: \'INVALID\'}, {ignoreMissing: true}):', TextTemplate(appConfig.name, {name: 'INVALID'}, {ignoreMissing: true}))
        await build({
            projectDir: path.resolve(__dirname),
            targets: targets,
            config: Object.assign({
                appId: TextTemplate(appConfig.id, {id: 'INVALID'}, {ignoreMissing: true}),
                productName: TextTemplate(appConfig.name, {name: 'INVALID'}, {ignoreMissing: true}),
                copyright: `Copyright © ${new Time().format('YYYY')} ${TextTemplate(packageJson.author, {author: 'INVALID'}, {ignoreMissing: true})}`,
                icon: path.resolve(__dirname, './icon.png'),
                files: [
                    'icon.png',
                    'renderer/views/**/*',
                    'renderer/preload/**/*',
                    'build/**/*.js',
                    'node_modules/**/*.node',
                    'node_modules/**/*.js'
                ],
                removePackageScripts: true,
                removePackageKeywords: true,
                npmRebuild: true,
                nodeGypRebuild: false,
                buildDependenciesFromSource: false
            }, BuilderConfig())
        })
    }).parse()
