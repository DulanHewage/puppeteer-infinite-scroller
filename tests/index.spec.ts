import { Browser, Page } from "puppeteer";

const puppeteer = require("puppeteer");
const puppeteerInfiniteScroller = require("../lib/index.js");
// const { error } = require("console");

describe("puppeteerInfiniteScroller", () => {
  let browser: Browser;
  let pageWithSelectorOption: Page;
  let pageWithPageFunctionOption: Page;

  const selector = ".blocks .blocks__block";
  const pageUrl = "https://infiniteajaxscroll.com/examples/blocks/";

  beforeAll(async () => {
    browser = (await puppeteer.launch({
      headless: false,
    })) as Browser;
    // initialize page with selector option
    pageWithSelectorOption = await browser.newPage();
    await pageWithSelectorOption.setViewport({
      width: 1200,
      height: 800,
    });
    await pageWithSelectorOption.goto(pageUrl);
    await pageWithSelectorOption.waitForSelector(selector);

    // initialize page with pageFunction option
    pageWithPageFunctionOption = await browser.newPage();
    await pageWithPageFunctionOption.setViewport({
      width: 1200,
      height: 800,
    });
    await pageWithPageFunctionOption.goto(pageUrl);
    await pageWithPageFunctionOption.waitForSelector(selector);
  });

  // selector option tests
  let scrapedData: object[] = [];
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

  // pageFunction option tests
  it(
    "scrapes data using pageFunction option",
    async () => {
      const options = {
        scrollDelay: 1000,
        itemCount: 200,
        pageFunction: () => {
          // Custom function for scraping data
          const items = [];
          const extractedElements = document.querySelectorAll(
            ".blocks .blocks__block"
          );
          for (let element of extractedElements) {
            items.push({
              class: element.getAttribute("class"),
              id: element.getAttribute("id"),
              tagName: element.tagName,
            });
          }
          return items;
        },
      };

      const scrapedData = await puppeteerInfiniteScroller(
        pageWithPageFunctionOption,
        options
      );
      // Add your assertions for scrapedData
      expect(scrapedData.length).toBe(200);
      // Add more assertions based on your specific data structure
    },
    1000 * 60
  );

  afterAll(async () => {
    await browser.close();
  });
});
