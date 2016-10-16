var fs      = require('fs');
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/:player/matches', function(req, res) {

  var endpoint = {
    url: 'http://www.dotabuff.com/players/' + req.params.player + '/matches',
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0'
    }
  };

  request(endpoint, function(error, response, html) {

    if(!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      var matches = [];

      $('.content-inner tbody').find('tr').each(function (i, e) {
        matches[i] = $(this).find('a[href*=matches]').attr('href').slice(9);
      })

      res.json(matches);
    }
  });

});

app.listen('8000', function () {
  console.log('Listening to port 8000');
});

exports = module.exports = app;
