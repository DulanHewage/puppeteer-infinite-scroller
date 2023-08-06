# Puppeteer-Infinite-Scroller

Puppeteer-Infinite-Scroller provides a simple and efficient solution for scraping data loaded through infinite scrolling on web pages using Puppeteer.

## Installation

You can install the package using npm:

```bash
npm install puppeteer-infinite-scroller
```

## Usage
Import the scrapeInfiniteScroller function from the package and use it to scrape data from infinite scrolling web pages.

```javascript
const { scrapeInfiniteScroller } = require('puppeteer-infinite-scroller');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const options = {
    scrollDelay: 1000,      // Milliseconds between scrolls
    itemCount: 50,          // Number of items to scrape
    selector: '.item',      // CSS selector for items
    // OR
    // pageFunction: () => { /* Custom page function for scraping */ }
  };

  const scrapedData = await scrapeInfiniteScroller(page, options);

  console.log(scrapedData);

  await browser.close();
})();
```

## Options

The following options can be configured when using the `scrapeInfiniteScroller` function:

- `scrollDelay` (optional): Milliseconds between scrolls. Default is 1000ms.
- `itemCount` (optional): Number of items to scrape. Default is 10.
- `selector` (optional): CSS selector for the items. Either this or `pageFunction` must be provided.
- `pageFunction` (optional): Custom function for scraping data from the page. Either this or `selector` must be provided.

## Example with pageFunction option

```javascript
const { scrapeInfiniteScroller } = require('puppeteer-infinite-scroller');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const options = {
    scrollDelay: 1000,      // Milliseconds between scrolls
    itemCount: 50,          // Number of items to scrape
    pageFunction: () => {
      // Custom function for scraping data from the page
      const extractedElements = document.querySelectorAll(".box img");
      const items = [];
      for (let element of extractedElements) {
        items.push({
          alt: element.getAttribute("alt"),
          id: element.closest("a").getAttribute("href").split("/")[2],
          src: element.getAttribute("src"),
        });
      }
      return items;
    }
  };

  const scrapedData = await scrapeInfiniteScroller(page, options);

  console.log(scrapedData);

  await browser.close();
})();
```

License
This project is licensed under the MIT License - see the LICENSE file for details.
