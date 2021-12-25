module.exports.groupByLanguage = async (data, grouped) => {
  try {
    data.forEach((country) => {
      if (country.languages) {
        const countryLanguages = Object.keys(country.languages)
        countryLanguages.forEach((language) => {
          if (language.toString() in grouped.languages) {
            grouped.languages[language].push(country)
          } else {
            grouped.languages[language] = []
            grouped.languages[language].push(country)
          }
        })
      } else {
        grouped.languages['noEntries'].push(country)
      }
    })
  } catch (err) {
    console.log(err)
  }
}
