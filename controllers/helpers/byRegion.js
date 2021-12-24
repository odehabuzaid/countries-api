module.exports.groupByRegion = async (data, grouped) => {
  try {
    data.forEach((country) => {
      if (country.region) {
        let region = country.region
        if (region.toString() in grouped.regions) {
          grouped.regions[region].push(country)
        } else {
          grouped.regions[region] = []
          grouped.regions[region].push(country)
        }
      } else {
        grouped.regions['notEntries'].push(country)
      }
    })
  } catch (err) {
    console.log(err)
  }

  return grouped
}
