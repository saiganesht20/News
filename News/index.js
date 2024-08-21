 // variables
const generalBtn = document.getElementById("genral");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];

const API_KEY = "cW7-6alvcVbC0_KE6N6MeRFmHiEyNiQvyNfqGz72dK7NE-LK";
const BASE_URL = "https://api.currentsapi.services/v1/";

// Updated endpoints for Currents API
const HEADLINES_NEWS = `${BASE_URL}latest-news?country=in&apiKey=${API_KEY}`;
const GENERAL_NEWS = `${BASE_URL}latest-news?category=general&country=in&apiKey=${API_KEY}`;
const BUSINESS_NEWS = `${BASE_URL}latest-news?category=business&country=in&apiKey=${API_KEY}`;
const SPORTS_NEWS = `${BASE_URL}latest-news?category=sports&country=in&apiKey=${API_KEY}`;
const ENTERTAINMENT_NEWS = `${BASE_URL}latest-news?category=entertainment&country=in&apiKey=${API_KEY}`;
const TECHNOLOGY_NEWS = `${BASE_URL}latest-news?category=technology&country=in&pageSize=8&apiKey=${API_KEY}`;
const SEARCH_NEWS = `${BASE_URL}search?apiKey=${API_KEY}&keywords=`;

window.onload = function() {
    newsType.innerHTML = "<h4>Headlines</h4>";
    fetchNews(HEADLINES_NEWS);
};

generalBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>General News</h4>";
    fetchNews(GENERAL_NEWS);
});

businessBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Business</h4>";
    fetchNews(BUSINESS_NEWS);
});

sportsBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Sports</h4>";
    fetchNews(SPORTS_NEWS);
});

entertainmentBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Entertainment</h4>";
    fetchNews(ENTERTAINMENT_NEWS);
});

technologyBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Technology</h4>";
    fetchNews(TECHNOLOGY_NEWS);
});

searchBtn.addEventListener("click", function() {
    const query = newsQuery.value;
    if (query) {
        newsType.innerHTML = `<h4>Search: ${query}</h4>`;
        fetchNews(SEARCH_NEWS + encodeURIComponent(query));
    }
});

const fetchNews = async (url) => {
    try {
        const response = await fetch(url);
        const myJson = await response.json();
        newsDataArr = myJson.news;

        if (newsDataArr.length === 0) {
            newsdetails.innerHTML = "<h5>No data found.</h5>";
        } else {
            displayNews();
        }
    } catch (error) {
        console.log(error);
        newsdetails.innerHTML = "<h5>Something went wrong. Please try again later.</h5>";
    }
};

function displayNews() {
    newsdetails.innerHTML = "";

    newsDataArr.forEach(news => {
        var date = news.published.slice(0, 10);

        var col = document.createElement('div');
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src = news.image;

        var cardBody = document.createElement('div');

        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date;

        var description = document.createElement('p');
        description.className = "text-muted";
        description.innerHTML = news.description;

        var link = document.createElement('a');
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });
}
