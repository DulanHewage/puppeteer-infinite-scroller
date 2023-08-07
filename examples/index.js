const puppeteer = require("puppeteer");
const fs = require("fs");
const puppeteerInfiniteScroller = require("../index");

async function extractElementsFromResponse() {
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
  // const images = await scrapeInfiniteScroller(page, {
  //   pageFunction: extractElements,
  //   itemCount: 20,
  // });

  // using selector
  const boxes = await puppeteerInfiniteScroller(page, {
    selector: ".blocks .blocks__block",
    itemCount: 200,
  });

  await browser.close();

  // write to file
  writeToFile("boxes.json", JSON.stringify(boxes));
}
function extractElements() {
  // this method is executed in every scrolled page
  // You have access to document here
  // select the elements you want and push them into the array
  const extractedElements = document.querySelectorAll(
    "[role='list'] > [role='listitem']"
  );
  const items = [];
  for (let element of extractedElements) {
    items.push({
      alt: element.querySelector("img").getAttribute("alt"),
      id: element.querySelector("a").getAttribute("href").split("/")[2],
      src: element
        .querySelector("img")
        .getAttribute("src")
        .replace("236x", "564x"),
    });
  }
  // finally return the array of extracted items
  return items;
}
// write response data to a file for debugging
function writeToFile(filename, content) {
  try {
    // Write content into the file
    fs.writeFileSync(filename, content);

    // Return success message
    return "Content written to the file successfully!";
  } catch (error) {
    // Return error message if any error occurs
    return "Error occurred while writing to the file: " + error.message;
  }
}

extractElementsFromResponse();
