import { BasePage } from './basePage';
import {Page} from "@playwright/test";
import {allure} from "allure-playwright";

export class PlayerPage extends BasePage {
    private readonly selectors = {
        playerWrapper: '//*[@class="video-viewer-player__player-wrap"]',
        playerTimeLine: '//*[@data-testid="timeline-clickable-zone"]'
    }

    constructor(page, url = '/video/watch') {
        super(page, url);
    }

    async playerFullScreenMode (popup: Page): Promise<void> {
        await allure.step('Переключаем плеер в fullscreen режим', async () => {
            await allure.step('Ожидаем, пока скроется таймлайн плеера', async () => {
                await popup.locator(this.selectors.playerTimeLine).waitFor({state: 'hidden'});
            });
            await allure.step('Кликаем 2 раза по области плеера', async () => {
                await popup.locator(this.selectors.playerWrapper).dblclick();
            });
        });
    }
}
