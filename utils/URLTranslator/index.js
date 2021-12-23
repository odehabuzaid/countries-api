module.exports.translate = async (url) => {

    try {
        const binaryArray = url.split(" ");
        binaryArray.forEach((letter, index) => {
            binaryArray[index] = String.fromCharCode(parseInt(letter, 2))
        })
        translated = binaryArray.reverse().join("");
        //const host = .replace(/[^com]*$/g, '')
        return translated
    } catch (err) {
        console.log(err)
    }
}
