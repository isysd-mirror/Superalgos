exports.newPluginsUtilitiesPlugins = function () {

    let thisObject = {
        getPluginFileNames: getPluginFileNames,
        getPluginFileContent: getPluginFileContent
    }

    return thisObject

    async function getPluginFileNames(project, folder) {
        console.log(project)

        return new Promise((resolve, reject) => {
            console.log(global.env.PROJECT_PLUGIN_MAP[project])
            let pluginName = global.env.PROJECT_PLUGIN_MAP[project].dir || project
            console.log(pluginName)
            let path = global.env.PATH_TO_PLUGINS + '/' + pluginName + '/' + folder
            console.log(path)

            SA.nodeModules.fs.readdir(path, (err, files) => {
                if (err) {
                    reject(err)
                    return
                }
                if (files === undefined) {
                    files = []
                }
                resolve(files)
            })
        })
    }

    async function getPluginFileContent(project, folder, fileName) {
        console.log(project)
        return new Promise((resolve, reject) => {
            console.log(global.env.PROJECT_PLUGIN_MAP[project])
            let pluginName = global.env.PROJECT_PLUGIN_MAP[project].dir || project
            console.log(pluginName)
            let path = global.env.PATH_TO_PLUGINS + '/' + pluginName + '/' + folder + '/' + fileName
            console.log(path)

            SA.nodeModules.fs.readFile(path, onFileRead)

            function onFileRead(err, file) {
                if (err) {
                    console.log('[WARN] getPluginFileContent -> File not Found -> Path = ' + path)
                    reject('File not Found')
                    return
                }
                resolve(file.toString())
            }
        })
    }
}
