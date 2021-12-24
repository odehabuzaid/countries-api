const Helper = {
  ...require('./byLanguage.js'),
  ...require('./byRegion.js')
}
module.exports = { ...Helper }
