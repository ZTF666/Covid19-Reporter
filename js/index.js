// declarations of the requests variables
let request = new XMLHttpRequest();
let requestx = new XMLHttpRequest();
// all the variables we'll need 
let searchBtn = document.getElementById("searchBtn");
let error = document.getElementById("error");
let searchTerm = ''
let glocation;
let gactive;
let gdeaths;
let gconfirmed;
let grecovered;
let xchart;
let xchartx;


// calling the world function to get the latest world's stats
world()

// search button and searchterm init
searchBtn.addEventListener("click", e => {
    e.preventDefault();

    searchTerm = document.getElementById("searchTerm").value;
    // once the serchTerm is instanciated we call the function getData() to fetch data from the api
    getData()


})
// asynchronous function to get the data from the api
// this loads only when called by the search button
async function getData() {
    // we check if the searchterm is empty or not , if it's not we execute what's inside
    if (searchTerm != "") {
        // displays the contry's name
        error.textContent = "Country : " + searchTerm;
        // calls the api and appends our searchterm at the end of it 
        await request.open("GET", "https://covid2019-api.herokuapp.com/v2/country/" + searchTerm, true);
        // once the data is loaded we execute the following
        request.onload = function () {
            // we empty these vars just in case , so we don't get some weird results
            glocation = '';
            gactive = '';
            gdeaths = '';
            gconfirmed = '';
            grecovered = '';
            // we parse the data as it's json format
            let data = JSON.parse(this.response);
            console.log(data.data)

            // we init the variables with our data
            glocation = data.data.location;
            gactive = data.data.active;
            gdeaths = data.data.deaths;
            gconfirmed = data.data.confirmed;
            grecovered = data.data.recovered;
            // creates the table that will displays the data
            let statusHtml = "";
            statusHtml += "<tr>";
            statusHtml += "<td>" + data.data.location + "</td>";
            statusHtml += "<td>" + data.data.confirmed + "</td>";
            statusHtml += "<td>" + data.data.active + "</td>";
            statusHtml += "<td>" + data.data.deaths + "</td>";
            statusHtml += "<td>" + data.data.recovered + "</td>";
            statusHtml += "<td>" + data.dt + "</td>";
            statusHtml += "</tr>";
            // appends the data into the tbody of table
            $("tbody.tb").html(statusHtml);
            // calls the function chartIt() so we can draw the chart

            chartIt(gactive, gconfirmed, grecovered, gdeaths)
        };
        // we send the request
        request.send();

    } else {
        error.textContent = "Please Fill the search field !";
    }

}
//displays what country has been searched 
setTimeout(function () {
    document.querySelector("#error").textContent = "Country : " + searchTerm;
}, 3000);

// function to make charts
function chartIt(gactive, gconfirmed, grecovered, gdeaths) {
    //this line is essential , there's a bug with charts js that creates charts everytime you update it ...
    // this fixes that ! took me two fucking long days to find a way in3l waldiha lklb :@ 
    if (xchart) {
        xchart.destroy()
    }
    let ctx = document.getElementById('myChart').getContext('2d');
    xchart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['Active', 'Confirmed', 'Recovered', 'Deaths'],
            datasets: [{
                label: 'Statistics of ' + searchTerm,
                backgroundColor: [

                    'rgba(255, 60, 255, 1)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(63, 196, 109, 1)',
                    'rgba(250, 55, 109, 1)'
                ],
                borderColor: [, 'rgba(255, 60, 255, 1)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(63, 196, 109, 1)',
                    'rgba(250, 55, 109, 1)'
                ],
                // the data we got from the api is put here to be charted 
                data: [gactive, gconfirmed, grecovered, gdeaths]
            }]
        },

        // Configuration options go here, but there's no need for that 
        options: {}
    });


}

//function that gets the world wide statistics deaths , recoveries etc...
// Load by default 
async function world() {
    requestx.open("GET", "https://covid2019-api.herokuapp.com/v2/total", true);

    requestx.onload = function () {


        let datax = JSON.parse(this.response);
        console.log(datax)



        let statusHtmlx = "";
        statusHtmlx += "<tr>";

        statusHtmlx += "<td>" + datax.data.confirmed + "</td>";
        statusHtmlx += "<td>" + datax.data.active + "</td>";
        statusHtmlx += "<td>" + datax.data.deaths + "</td>";
        statusHtmlx += "<td>" + datax.data.recovered + "</td>";
        statusHtmlx += "<td>" + datax.dt + "</td>";

        statusHtmlx += "</tr>";


        $("tbody.totaldata").html(statusHtmlx);
        chartItx(datax.data.confirmed, datax.data.active, datax.data.deaths, datax.data.recovered)

    };

    requestx.send();
}

// function that create the polar chart for the world's stats 
function chartItx(X, Y, Z, A) {
    //this line is essential , there's a bug with charts js that creates charts everytime you update it ...
    // this fixes that ! took me two fucking long days to find a way in3l waldiha lklb :@ 
    if (xchartx) {
        xchartx.destroy()
    }
    console.log(X, Y, Z, A)
    let ctx = document.getElementById('polarArea').getContext('2d');
    xchartx = new Chart(ctx, {
        // The type of chart we want to create
        type: 'polarArea',

        // The data for our dataset
        data: {
            labels: ['Active', 'Confirmed', 'Recovered', 'Deaths'],
            datasets: [{
                label: "World's stats",
                backgroundColor: [

                    'rgba(255, 60, 255, 1)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(63, 196, 109, 1)',
                    'rgba(250, 55, 109, 1)'
                ],
                borderColor: [, 'rgba(255, 60, 255, 1)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(63, 196, 109, 1)',
                    'rgba(250, 55, 109, 1)'
                ],
                data: [X, Y, Z, A]
            }]
        },

        // Configuration options go here
        options: {}
    });


}