module.exports.translate = async (url) => {
  try {
    const binaryArray = url.split(' ')
    binaryArray.forEach((letter, index) => {
      //convert binary string to decimal char code
      // convert the char code to string
      binaryArray[index] = String.fromCharCode(parseInt(letter, 2))
    })
    const translated = binaryArray.reverse().join('')
    //const host = translated.replace(/[^com]*$/g, '')
    return translated
  } catch (err) {
    console.log(err)
  }
}
