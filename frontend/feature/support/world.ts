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

      // Retry until frontend is available
      let success = false;
      for (let i = 0; i < 10; i++) {
        try {
          const response = await this.page.goto('http://localhost:5173', { waitUntil: 'load', timeout: 3000 });
          if (response && response.ok()) {
            success = true;
            break;
          }
        } catch (e) {
          console.log(`Retry ${i + 1}: Frontend not ready yet. Waiting 1s...`);
          await new Promise(r => setTimeout(r, 1000));
        }
      }

      if (!success) {
        throw new Error("Frontend application did not become ready in time.");
      }

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