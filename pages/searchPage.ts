import { BasePage } from './basePage';
import {Page} from "@playwright/test";
import {allure} from "allure-playwright";

export class SearchPage extends BasePage {
    private readonly selectors = {
        searchInput: '//*[starts-with(@class, "search-desktop")]//input',
        movieCard: '//*[@class="card-layer-video-view__player-block"]'
    }

    constructor(page, url = '/search') {
        super(page, url);
    }

    async typeQuery (query: string): Promise<void> {
        await allure.step(`Вводим в поле поиска текст '${query}'`, async () => {
            await this.page.locator(this.selectors.searchInput).fill(query);
        });
    }

    async clickMovieCard (cardIndex = 0): Promise<Page> {
        let popup: Page

        await allure.step(`Нажимаем на элемент '${this.selectors.movieCard}' с индексом '${cardIndex}'`, async () => {
            await this.page.locator(this.selectors.movieCard).nth(cardIndex).click();
        });
        await allure.step('Ожидаем события "popup" - открытия нового окна в браузере и его загрузки', async () => {
            popup = await this.page.waitForEvent('popup');
            await popup.waitForLoadState('load');
        });

        return popup;
    }
}
