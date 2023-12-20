// setting sever url
const development = "http://localhost:5000/";
const production = "https://radiant-meadow-44726.herokuapp.com/";
const currentUrl = process.env.NODE_ENV ? production : development;

module.exports = currentUrl;
