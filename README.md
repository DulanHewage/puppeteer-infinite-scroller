# Puppeteer-Infinite-Scroller
[![NPM Version](https://badge.fury.io/js/puppeteer-infinite-scroller.svg?style=flat)](https://www.npmjs.com/package/puppeteer-infinite-scroller)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)]([https://github.com/dwyl/esta/issues](https://github.com/DulanHewage/puppeteer-infinite-scroller/issues))

Puppeteer-Infinite-Scroller provides a simple and efficient solution for scraping data loaded through infinite scrolling on web pages using Puppeteer.

## Installation

You can install the package using npm:

```bash
npm install puppeteer-infinite-scroller
```

## Usage
Import the scrapeInfiniteScroller function from the package and use it to scrape data from infinite scrolling web pages.

```javascript
const puppeteer = require("puppeteer");
const puppeteerInfiniteScroller = require('puppeteer-infinite-scroller');

(async () => {
  const pageUrl = "https://infiniteajaxscroll.com/examples/blocks/";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  await page.goto(pageUrl);
  await page.waitForSelector(".blocks .blocks__block");

  const options = {
    scrollDelay: 1000,      // Milliseconds between scrolls
    itemCount: 50,          // Number of items to scrape
    selector: '.blocks .blocks__block',      // CSS selector for items
    // OR
    // pageFunction: () => { /* Custom page function for scraping */ }
  };

  const scrapedData = await puppeteerInfiniteScroller(page, options);

  console.log(scrapedData);

  await browser.close();
})();
```

## Options

The following options can be configured when using the `puppeteerInfiniteScroller` function:

- `scrollDelay` (optional): Milliseconds between scrolls. Default is 1000ms.
- `itemCount` (optional): Number of items to scrape. Default is 10.
- `selector` (optional): CSS selector for the items. Either this or `pageFunction` must be provided.
- `pageFunction` (optional): Custom function for scraping data from the page. Either this or `selector` must be provided.

## Example with pageFunction option

```javascript
const puppeteer = require("puppeteer");
const puppeteerInfiniteScroller = require('puppeteer-infinite-scroller');

(async () => {
  const pageUrl = "https://infiniteajaxscroll.com/examples/blocks/";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  await page.goto(pageUrl);
  await page.waitForSelector(".blocks .blocks__block");

  function extractElements() {
    const items = [];
    const extractedElements = document.querySelectorAll(".blocks .blocks__block");
    for (let element of extractedElements) {
      items.push({
        class: element.getAttribute("class"),
        id: element.getAttribute("id"),
        tagName: element.tagName,
      });
    }
    return items;
  }

  const options = {
    scrollDelay: 1000,      // Milliseconds between scrolls
    itemCount: 50,          // Number of items to scrape
    pageFunction: extractElements
  };

  const scrapedData = await puppeteerInfiniteScroller(page, options);

  console.log(scrapedData);

  await browser.close();
})();
```

License
This project is licensed under the MIT License - see the LICENSE file for details.
