import { BasePage } from './basePage';
import { expect } from '@playwright/test';

export class HomePage extends BasePage {
    private readonly selectors = {
        dzenFeedList: '//*[@aria-label="Лента Дзена"]',
        dzenFeedListCardAvatar: '//*[@id="zen-row-1"]//div[starts-with(@class, "avatar")]',
        dzenFeedListCardTitle: '//*[@id="zen-row-1"]//div[starts-with(@class, "card-part-title")]',
        dzenFeedListCardDescription: '//*[@id="zen-row-1"]//div[starts-with(@class, "card-part-description")]',
        dzenFeedListArticlesShelf: '[data-testid="native_floor"]',
        dzenFeedListArticleCard: '//article[starts-with(@class, "card-part-wrapper")]',
        dzenFeedListArticleCardSubscribeBtn: '//div[@class="subscribe-button__buttonText-oV"]'
    }

    constructor(page, url = '/') {
        super(page, url);
    }

    async assertDzenFeedVisible(): Promise<void> {
        await this.page.locator(this.selectors.dzenFeedList).waitFor({ timeout: 3000 });
    }

    async assertArticleCardElements(cardIndex = 0, timeout = 3000): Promise<void> {
        const selectors: string[] = [
            this.selectors.dzenFeedListCardAvatar,
            this.selectors.dzenFeedListCardTitle,
            this.selectors.dzenFeedListCardDescription
        ]
        await this.page.locator(this.selectors.dzenFeedListArticlesShelf).scrollIntoViewIfNeeded();
        for (const selector of selectors) {
            await this.page.locator(selector).nth(cardIndex).waitFor({ timeout: timeout});
        }
    }

    async articleCardHover(cardIndex = 0): Promise<void> {
        await this.page.locator(this.selectors.dzenFeedListArticleCard).nth(cardIndex).hover();
    }

    async assertSubscribeButton(cardIndex = 0, timeout = 3000): Promise<void> {
        const articleHoverClassValue: string = await this.page.locator(this.selectors.dzenFeedListArticleCard).nth(cardIndex).getAttribute('class');
        await expect(articleHoverClassValue).toContain('hover');
        await this.page.locator(this.selectors.dzenFeedListArticleCardSubscribeBtn).nth(cardIndex).waitFor({state: 'hidden'});
    }
}
