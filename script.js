var apiKey = "96e06ea351a2bcd6f11223a17765fdb4";
//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} 

function searchApi(query, format) {
    var fetchUrl = 'https://www.loc.gov/search/?fo=json';
  
    if (format) {
        fetchUrl = 'https://www.loc.gov/' + format + '/?fo=json';
    }
  
    fetchUrl = fetchUrl + '&q=' + query;
  
    fetch(fetchUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (locRes) {
        // write query to page so user knows what they are viewing
        resultTextEl.textContent = locRes.search.query;
  
        console.log(locRes);
  
        if (!locRes.results.length) {
          console.log('No results found!');
          resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
        } else {
          resultContentEl.textContent = '';
          for (var i = 0; i < locRes.results.length; i++) {
            printResults(locRes.results[i]);
          }
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }