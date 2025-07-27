import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async getPage(): Promise<Page> {
    if (!this.page) {
      this.browser = await chromium.launch();
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
      await this.page.goto('http://localhost:5173');
      await this.page.waitForLoadState('load');
      await this.page.waitForSelector('input[placeholder="Username"]');
    }
    return this.page;
  }

  async closeApp() {
    console.log("Closing browser...");
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
