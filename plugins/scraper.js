module.exports = function (fastify, options, done) {
  var request = require('request')
  , cheerio = require('cheerio');

  fastify.get('/scrape', (req, reply) => {
    var imgs = [];
    var url = 'https://lullabot.com';
    if (req.query.url) {
      var url = req.query.url;
      // ensure that we have http or https for the request
      if (!url.includes('http://') && !url.includes('https://')) {
        url = 'https://' + url;
      }
    }

    request(url, function(err, resp, body){
      $ = cheerio.load(body);
      var images = $('img');
      $(images).each(function(i, image){
        var src = $(image).attr('src');
        if (src) {
          // if src isn't absolute, prepend url
          if (!src.includes('http://') && !src.includes('https://')) {
            // sometimes an image has something like //cdn.whatever
            src = (src.includes('//') ? 'http:' + src : url + src);
          }
          // exclude items with certain strings
          if (req.query.exclude) {
            if (!src.includes(req.query.exclude)) {
              imgs.push(src);
            }
          } else {
            imgs.push(src);
          }
        }
      });

      reply.send({ 'images': imgs })
    });
    
  })

  done()
}