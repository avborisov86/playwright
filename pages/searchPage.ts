import { BasePage } from './basePage';
import {Page} from "@playwright/test";

export class SearchPage extends BasePage {
    private readonly selectors = {
        searchInput: '//*[starts-with(@class, "search-desktop")]//input',
        movieCard: '//*[@class="card-layer-video-view__player-block"]'
    }

    constructor(page, url = '/search') {
        super(page, url);
    }

    async typeQuery (query: string): Promise<void> {
        await this.page.locator(this.selectors.searchInput).fill(query);
    }

    async clickMovieCard (cardIndex = 0): Promise<Page> {
        await this.page.locator(this.selectors.movieCard).nth(cardIndex).click();
        const popup: Page = await this.page.waitForEvent('popup');
        await popup.waitForLoadState('load');
        return popup;
    }
}
