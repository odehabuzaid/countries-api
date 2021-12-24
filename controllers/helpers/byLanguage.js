module.exports.groupByLanguage = async (data, grouped) => {
  try {
    data.forEach((country) => {
      if (country.languages) {
        let countryLanguages = Object.keys(country.languages)
        countryLanguages.forEach((language) => {
          const keys = Object.keys(grouped.languages)
          if (language.toString() in grouped.languages) {
            grouped.languages[language].push(country)
          } else {
            grouped.languages[language] = []
            grouped.languages[language].push(country)
          }
        })
      } else {
        grouped.languages['notEntries'].push(country)
      }
    })
  } catch (err) {
    console.log(err)
  }

  return grouped
}
