"use strict";
// Import the dependencies
const cheerio = require("cheerio")
    , req = require("tinyreq")
    ;

// Define the scrape function
function scrape(url, data, cb) {
    // 1. Create the request
    req(url, (err, body) => {
        if (err) { return cb(err); }

        // 2. Parse the HTML
        let $ = cheerio.load(body)
            , pageData = {}
            ;

        // 3. Extract the data
        Object.keys(data).forEach(k => {
            pageData[k] = $(data[k]).text();
        });

        // Send the data in the callback
        cb(null, pageData);
    });
}

// Extract some data from my website
scrape("http://indicadoresdeldia.cl//", {
    // Get the website title (from the top header)
    title: "title"
    // ...and the description
    , Dolar: ".dolar h1"
    , Euro: ".euro h1"
    , UF: ".uf h1"
    , UTM: ".utm h1"
}, (err, data) => {
    console.log(err || data);
    console.log(`Genial! el valor del dolar es $${data.Dolar}`)
});

//Source: https://www.codementor.io/johnnyb/how-to-write-a-web-scraper-in-nodejs-du108266t