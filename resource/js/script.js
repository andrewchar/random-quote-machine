var quote = {
	author: '',
	theQuote: ''
}

function getData() {
var url = 'https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
fetch(url)
	.then(function(response) {
	if(response.ok) {
		return response.json();
	}
    throw new Error('Network response was not ok.');
	})
	.then(function(data) {
		quote.author = data.quoteAuthor;
		quote.theQuote = data.quoteText;
		buildQuote();
	})
	.catch(function(error) {
	  console.log('There has been a problem with your fetch operation: ' + error.message);
	})
};

function buildQuote() {
	if (quote.author === '') {
		quote.author = 'Author Not Found';
	}
	authorNode.innerHTML = "― " + quote.author;
	quoteNode.innerHTML = quote.theQuote;
  setNewTweetMsg();
}

function setNewTweetMsg() {
  twttr.widgets.createShareButton(
  '/',
  tweetBtn,
  {
    count: 'none',
    text: quote.theQuote + " ― " + quote.author,
    size: 'large'
  });
  tweetBtn.removeChild(document.querySelector('.twitter-share-button'));
}

var authorNode = document.querySelector('.author');
var quoteNode = document.querySelector('.quote');
var quoteBtn = document.querySelector('.quote-btn');
var tweetBtn = document.querySelector('.twitter-share-wrapper');

quoteBtn.addEventListener('click', getData);

getData();
