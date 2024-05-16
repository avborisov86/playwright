import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly url: string;

    constructor(page: Page, url: string) {
        this.page = page;
        this.url = url;
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url, { waitUntil: 'load' });
    }

    async pressKey(key: string): Promise<void> {
        await this.page.keyboard.press(key);
    }
}
