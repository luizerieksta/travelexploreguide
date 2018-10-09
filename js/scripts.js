

//comments
var theInputCityName;

//All the weather icons
var sunIcon = '<img class="noBorder" src="images/sun.png">';
var cloudIcon = '<img class="noBorder" src="images/cloud.png">';
var rainIcon = '<img class="noBorder" src="images/rain.png">';
var drizzleIcon = '<img class="noBorder" src="images/drizzle.png">';
var thunderIcon = '<img class="noBorder" src="images/thunder.png">';
var sandIcon = '<img class="noBorder" src="images/sand.png">';
var mistIcon = '<img class="noBorder" src="images/mist.png">';
var snowIcon = '<img class="noBorder" src="images/snow.png">';
var hazeIcon = '<img class="noBorder" src="images/haze.png">';
var anythingIcon = '<img class="noBorder" src="images/anything.png">';


function makeWeatherRequest(searchCity) {


	var weatherURL = "https://api.openweathermap.org/data/2.5/weather?APPID=75213f60187fe2361e39a8923b063644&units=metric&q="+ searchCity +"";

	$.ajax({
		url : weatherURL,
		type : 'GET',
		dataType : 'json',
		error : function(err){
			console.log(err);
		},
		success : function(dataWeather) {
			console.log("We have Weather data!");

			//Assign value to this variable from the City Input box
			theInputCityName = $('#the-input').val();

			//Data for weather info
			var resultsWeather = dataWeather.weather[0].description;
			//Data for the weather icons
			var infoWeatherIcon = dataWeather.weather[0].main;


			//Create text for displaying weather information and the input city name
			resultsWeatherNow = "Weather in " + theInputCityName + ": " + resultsWeather;
			var resultsWeatherTemp = dataWeather.main.temp;
			resultsWeatherTempNow = "Temperature now: " + resultsWeatherTemp + " °C";
		
			//Show the weather results on page
			$("#weather").append(resultsWeatherNow);
			$("#temperature").append(resultsWeatherTempNow);

			if (infoWeatherIcon === "Clear") {
				$("#icon").append(sunIcon);
			} else if (infoWeatherIcon === "Clouds") {
				$("#icon").append(cloudIcon);
			} else if (infoWeatherIcon === "Rain") {
				$("#icon").append(rainIcon);
			} else if (infoWeatherIcon === "Drizzle") {
				$("#icon").append(drizzleIcon);
			} else if (infoWeatherIcon === "Thunderstorm") {
				$("#icon").append(thunderIcon);
			} else if (infoWeatherIcon === "Sand") {
				$("#icon").append(sandIcon);
			} else if (infoWeatherIcon === "Mist") {
				$("#icon").append(mistIcon);
			} else if (infoWeatherIcon === "Snow") {
				$("#icon").append(snowIcon);
			} else if (infoWeatherIcon === "Haze") {
				$("#icon").append(hazeIcon);
			} else {
				$("#icon").append(anythingIcon);
			}


		}

	});
	console.log(weatherURL);


}



function makeTravelRequest(searchTerm, searchAction){

	var travelURL = "https://api.sygictravelapi.com/1.0/en/places/list?parents="+ searchTerm +"&limit=12&categories="+ searchAction +"";
	var travelSearch = travelURL;


	$.ajax({
		url : travelSearch,
		type : 'GET',
		headers : {
			"x-api-key": "yVJ1xBQHGx66GhfcGavCQagoRJPid9MF9B26Ayz0"
		},
		dataType : 'json',
		error : function(err){
			console.log(err);
		},
		success : function(data) {
			console.log("We have data!");
			console.log(data);

			//Data for the results from the API
			var results = data.data.places;
			console.log(results);

			//Create text for the description
			var guidance = "<h3>" + "Some Ideas You Might Want to Consider..." + "</h3>";

			//Only display the description if there is data from the API
			if (results.length > 0) {

				//Display the description
				$("#directions").append(guidance);

				//Loop through all the results
				for (var i = 0; i < results.length; i++){
					console.log(results.length);

					//Create a div where to store the results
					var result = "<div>";

					//Create a variable for the links from the data from API
					var link = results[i].url;

					//Add an image from the API data to the results if available
					if (results[i].thumbnail_url){
						var photo = results[i].thumbnail_url;
						result += '<img src="' +photo+  '" height="64px" width="64px">' + "&nbsp;" ;	
					}

					//Add the links and the names of the places from the API
					result += "<h2><a href='"+ link + "'target='_blank'>" + results[i].name + "</a></h2>";
					result += "</div>";

					//Display the results on the page
					$("#photos-list").append(result);

					}


			//If no data is available, display this error message
			} else {
				var errorMessage = "<h3>" + "City Not Found" + "</h3>";
				$("#error").append(errorMessage);
			}
		}
	});

}



$(document).ready(function(){
	console.log("The page is loaded and ready!");
	
	//Make the first letter of the City Input box uppercase
	$('#the-input').keyup(function() {
		var caps = $('#the-input').val(); 
		caps = caps.charAt(0).toUpperCase() + caps.slice(1);
	       $('#the-input').val(caps);
	});



	//When the button is clicked

	$('#the-button').click(function(){
		console.log("the button clicked");	

		//Clear all the previous results and actions
		$("#photos-list").html("");
		$("#directions").html("");
		$("#error").html("");
		$("#weather").html("");
		$("#temperature").html("");
		$("#icon").html("");



		//Do this

		var cityId;

		//Assign values to these variables from the input boxes
		theInputCityName = $('#the-input').val();
		searchAction = $('#the-input2').val();

		
		//The city name that will go in the Weather URL
		searchCity = $('#the-input').val();

		//Go through the cities_list file and assign id's to city names!
		for (var i = 0; i < cityData.length; i++){

				if (theInputCityName === cityData[i].name) {
					theInputCityName = cityId;
					cityId = cityData[i].id;
				}
		}
		
		makeWeatherRequest(searchCity);
		makeTravelRequest(cityId, searchAction);
		
		

	});

});








