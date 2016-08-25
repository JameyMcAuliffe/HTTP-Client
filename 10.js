"use strict";

//request library to get API
const { get } = require('request')

//symbol arg to pass into terminal call
const [,,...symArgs] = process.argv

//API call, symArgs passed in
get(`http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A365%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22${symArgs}%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D`, (error, res, body) => {
    
  if (!error && res.statusCode == 200) {

  	//returns readable data from api
  	let stockInfo = JSON.parse(body)
  	//let symbol = stockInfo.Elements[0].Symbol
  	let valuesArray = (stockInfo.Elements[0].DataSeries.close.values)
  	let sum = valuesArray.reduce((prev, curr) => prev + curr)
  	//console.log(sum)
  	let avg = (sum / valuesArray.length).toFixed(2)
  	console.log(`Average Price (${symArgs}):`, avg)
	}
})

		
