import { EvaluateFunc } from "puppeteer";
export interface Options {
  scrollDelay?: number;
  itemCount?: 10;
  pageFunction?: EvaluateFunc<any> | undefined;
  selector?: string | undefined;
}
