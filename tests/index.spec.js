const puppeteer = require("puppeteer");
const puppeteerInfiniteScroller = require("../index");
const { error } = require("console");

describe("puppeteerInfiniteScroller", () => {
  let browser;
  let pageWithSelectorOption;
  let pageWithPageFunctionOption;

  const selector = ".blocks .blocks__block";
  const pageUrl = "https://infiniteajaxscroll.com/examples/blocks/";

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
    });
    // initialize page with selector option
    pageWithSelectorOption = await browser.newPage();
    await pageWithSelectorOption.setViewport({
      width: 1200,
      height: 800,
    });
    await pageWithSelectorOption.goto(pageUrl);
    await pageWithSelectorOption.waitForSelector(selector);
  });

  // selector option tests
  let scrapedData;
  it(
    "scrapes data using selector option",
    async () => {
      const options = {
        scrollDelay: 1000,
        itemCount: 50,
        selector: selector,
      };

      scrapedData = await puppeteerInfiniteScroller(
        pageWithSelectorOption,
        options
      );
      // Add your assertions for scrapedData
      expect(scrapedData.length).toBe(50);
      // Add more assertions based on your specific data structure
    },
    1000 * 60
  );

  it("scraped data has attributes", async () => {
    expect(scrapedData[0]).toHaveProperty("class");
    expect(scrapedData[0]).toHaveProperty("id");
    expect(scrapedData[0]).toHaveProperty("tagName");
  });

  // it('scrapes data using pageFunction option', async () => {
  //   const options = {
  //     scrollDelay: 1000,
  //     itemCount: 50,
  //     pageFunction: () => {
  //       // Custom function for scraping data
  //       const extractedElements = document.querySelectorAll('.box img');
  //       const items = [];
  //       for (let element of extractedElements) {
  //         items.push({
  //           alt: element.getAttribute('alt'),
  //           id: element.closest('a').getAttribute('href').split('/')[2],
  //           src: element.getAttribute('src'),
  //         });
  //       }
  //       return items;
  //     },
  //   };

  //   const scrapedData = await puppeteerInfiniteScroller(page, options);

  //   // Add your assertions for scrapedData
  //   expect(scrapedData.length).toBeGreaterThanOrEqual(50);
  //   // Add more assertions based on your specific data structure
  // });

  afterAll(async () => {
    await browser.close();
  });
});
