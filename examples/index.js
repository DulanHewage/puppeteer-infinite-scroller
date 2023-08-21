const puppeteer = require("puppeteer");
const { writeToFile } = require("./utils");

const puppeteerInfiniteScroller = require("../index");

(async () => {
  const pageUrl = "https://infiniteajaxscroll.com/examples/blocks/";
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // set page size
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  await page.goto(pageUrl);
  await page.waitForSelector(".blocks .blocks__block");

  // using extractItems function
  const boxes = await puppeteerInfiniteScroller(page, {
    pageFunction: extractElements,
    itemCount: 200,
  });

  // using selector
  // const boxes = await puppeteerInfiniteScroller(page, {
  //   selector: ".blocks .blocks__block",
  //   itemCount: 200,
  // });

  await browser.close();

  console.log("result length: ", boxes.length);
  // write to file
  writeToFile("examples/result.json", JSON.stringify(boxes));
})();

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
