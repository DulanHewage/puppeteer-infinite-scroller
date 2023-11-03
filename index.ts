import { Page, EvaluateFunc } from "puppeteer";
import { Options } from "./types";
async function puppeteerInfiniteScroller(
  page: Page,
  options: Options
): Promise<any[]> {
  // Destructure options
  const {
    scrollDelay = 1000,
    itemCount = 10,
    pageFunction,
    selector,
  } = options;

  // Validate options
  if (!selector && !pageFunction) {
    throw new Error(
      "Either selector or pageFunction must be provided as an option"
    );
  }

  if (selector && typeof selector !== "string") {
    throw new Error("Selector must be a string");
  }

  if (pageFunction && typeof pageFunction !== "function") {
    throw new Error("PageFunction must be a function");
  }

  if (typeof itemCount !== "number") {
    throw new Error("ItemCount must be a number");
  }

  if (typeof scrollDelay !== "number") {
    throw new Error("ScrollDelay must be a number");
  }

  try {
    const items = await recursiveScroll(
      page,
      [],
      itemCount,
      selector,
      pageFunction,
      scrollDelay
    );
    return items;
  } catch (e: any) {
    console.log("Error:", e.message);
    return []; // Return an empty array in case of an error
  }
}

async function recursiveScroll(
  page: Page,
  items: any[],
  itemCount: number,
  selector: string | undefined,
  pageFunction: Function | undefined,
  scrollDelay: number
) {
  if (itemCount <= items.length) {
    // slice the array to match the itemCount
    return items.slice(0, itemCount);
  }
  let extractedItems: object[] = [];

  if (selector) {
    extractedItems = await page.evaluate((selector) => {
      const elements = document.querySelectorAll(selector);
      const els = Array.from(elements);
      return els.map((element) => {
        const attributes = Array.from(element.attributes).reduce(
          (acc: any, attr) => {
            acc[attr.name] = element.getAttribute(attr.name);
            return acc;
          },
          {}
        );
        return {
          tagName: element.tagName,
          ...attributes,
        };
      });
    }, selector);
  } else if (pageFunction) {
    extractedItems = (await page.evaluate(
      pageFunction as EvaluateFunc<any>
    )) as object[];
  }

  items.push(...extractedItems);

  const previousHeight = await page.evaluate("document.body.scrollHeight");
  await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
  await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
  await page.waitForTimeout(scrollDelay);

  return recursiveScroll(
    page,
    items,
    itemCount,
    selector,
    pageFunction,
    scrollDelay
  );
}

module.exports = puppeteerInfiniteScroller;
