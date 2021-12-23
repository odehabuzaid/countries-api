
const fs = require('fs')

module.exports.exporter = async (fileName, json) => {
    try {
        return await writeJsonResponse(fileName, json)
    } catch (err) {
        console.log(err)
    }
}



writeJsonResponse = async (data, filename) => {
    const dir = `./data/${filename}`
    fs.writeFileSync(dir, JSON.stringify(data, null, 2), 'utf8')
    return dir
}

