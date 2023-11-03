declare module 'puppeteer-infinite-scroller/index' {
  export {};

}
declare module 'puppeteer-infinite-scroller/types/index' {
  import { EvaluateFunc } from "puppeteer";
  export interface Options {
      scrollDelay?: number;
      itemCount?: 10;
      pageFunction?: EvaluateFunc<any> | undefined;
      selector?: string | undefined;
  }

}
declare module 'puppeteer-infinite-scroller' {
  import main = require('puppeteer-infinite-scroller/index');
  export = main;
}