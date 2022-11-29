"use strict"
const searchInput = document.querySelector(".search_input");
const searchBtn = document.querySelector(".search_btn");

let map, searchManager;

searchBtn.addEventListener("click", ()=>{
    map.entities.clear();
    geocodeQuery(searchInput.value);
});

function getMap(){
    map = new Microsoft.Maps.Map('#map', {
        // You need your key.
    credentials: 'BING KEY',
    });
};

function geocodeQuery(query){
    if (!searchManager) {
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            searchManager = new Microsoft.Maps.Search.SearchManager(map);
            geocodeQuery(query);
        });
    } else {
        let searchRequest = {
            where: query,
            callback: function (r) {
                if (r && r.results && r.results.length > 0) {
                    var pin = new Microsoft.Maps.Pushpin(r.results[0].location);
                    map.entities.push(pin);

                    map.setView({ bounds: r.results[0].bestView });
                };
            },
            errorCallback: function (e) {
                alert("No results found.");
            }
        };
        searchManager.geocode(searchRequest);
    };
};