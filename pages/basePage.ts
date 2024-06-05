import { Page } from '@playwright/test';
import {allure} from "allure-playwright";

export class BasePage {
    readonly page: Page;
    readonly url: string;

    constructor (page: Page, url: string) {
        this.page = page;
        this.url = url;
    }

    async goto (): Promise<void> {
        await allure.step(`Переходим по url '${process.env.BASE_URL + this.url}'`, async () => {
            await this.page.goto(this.url, { waitUntil: 'load' });
        });
    }

    async pressKey (key: string): Promise<void> {
        await allure.step(`Нажимаем на клавиатуре кнопку '${key}'`, async () => {
            await this.page.keyboard.press(key);
        });
    }
}
