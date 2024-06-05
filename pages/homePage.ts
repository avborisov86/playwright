import { BasePage } from './basePage';
import { expect } from '@playwright/test';
import {allure} from "allure-playwright";

export class HomePage extends BasePage {
    private readonly selectors = {
        dzenFeedList: '//*[@aria-label="Лента Дзена"]',
        dzenFeedListCardAvatar: '//*[@id="zen-row-1"]//div[starts-with(@class, "avatar")]',
        dzenFeedListCardTitle: '//*[@id="zen-row-1"]//div[starts-with(@class, "card-part-title")]',
        dzenFeedListCardDescription: '//*[@id="zen-row-1"]//div[starts-with(@class, "card-part-description")]',
        dzenFeedListArticlesShelf: '[data-testid="native_floor"]',
        dzenFeedListArticleCard: '//article[starts-with(@class, "card-part-wrapper")]',
        dzenFeedListArticleCardSubscribeBtn: '//div[@class="subscribe-button__buttonText-oV"]'
    };

    constructor (page, url = '/') {
        super(page, url);
    }

    async assertDzenFeedVisible (): Promise<void> {
        await allure.step(`Проверяем отображение элемента "Лента Дзена" - '${this.selectors.dzenFeedList}'`, async () => {
            await this.page.locator(this.selectors.dzenFeedList).waitFor({ timeout: 3000 });
        });
    }

    async assertArticleCardElements (cardIndex = 0, timeout = 3000): Promise<void> {
        await allure.step(`Проверяем отображение аватарки, названия и описания на карточке статьи`, async () => {

            const selectors: string[] = [
                this.selectors.dzenFeedListCardAvatar,
                this.selectors.dzenFeedListCardTitle,
                this.selectors.dzenFeedListCardDescription
            ];

            await allure.step(`Скроллим страницу до блока элементов - '${this.selectors.dzenFeedListArticlesShelf}'`, async () => {
                await this.page.locator(this.selectors.dzenFeedListArticlesShelf).scrollIntoViewIfNeeded();
            });

            await allure.step(`Проверяем отображение необходимых элементов - '${selectors}'`, async () => {
                for (const selector of selectors) {
                    await this.page.locator(selector).nth(cardIndex).waitFor({ timeout: timeout});
                }
            });
        });
    }

    async articleCardHover (cardIndex = 0): Promise<void> {
        await allure.step(`Наводим курсор на карчтоку элемента - '${this.selectors.dzenFeedListArticleCard}'`, async () => {
            await this.page.locator(this.selectors.dzenFeedListArticleCard).nth(cardIndex).hover();
        });
    }

    async assertSubscribeButton (cardIndex = 0): Promise<void> {
        await allure.step('Проверяем отображение кнопки "Подписаться" при наведении курсора на карточку статьи', async () => {

            await allure.step(`Проверяем значение атрибута 'class' на элементе '${this.selectors.dzenFeedListArticleCard}'`, async () => {
                const articleHoverClassValue: string = await this.page.locator(this.selectors.dzenFeedListArticleCard).nth(cardIndex).getAttribute('class');
                await expect(articleHoverClassValue).toContain('hover');
            });

            await allure.step(`Проверяем 'hidden' статус кнопки "Подписаться" - '${this.selectors.dzenFeedListArticleCardSubscribeBtn}'`, async () => {
                await this.page.locator(this.selectors.dzenFeedListArticleCardSubscribeBtn).nth(cardIndex).waitFor({state: 'hidden'});
            });
        });
    }
}
