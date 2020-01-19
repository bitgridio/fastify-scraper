# Fastify Scraper
A quick web scraper using fastify, request, and cheerio.

## Use
- `npm install`
- `npm start`
- hit `localhost:3000/scrape`

Scrapes images from https://lullabot.com by default.

Specify a url with
- `/scape?url=[your-url]`
- ex: `localhost:3000/scrape?url=reddit.com`

Exclude results that contain particular strings
- `/scrape?exclude=[string-to-match]`
- ex: `localhost:3000/scrape?url=reddit.com&exclude=.png`

## Contributing
The scraper is a fastify plugin found in `/plugins/scraper.js`.
If you have any suggestions or feature requests, please open an [issue](/issues).

## Todo
- add support for assets other than just images
