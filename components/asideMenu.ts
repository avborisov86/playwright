import { BasePage } from '../pages/basePage';
import {expect} from '@playwright/test';
import {allure} from "allure-playwright";

export class AsideMenuComponent extends BasePage {
    private readonly selectors = {
        menuBtn: (href: string) => `//*[starts-with(@class, "navigation-tab-list")]//*[@href="${href}"]//li`
    };

    constructor (page, url = '/') {
        super(page, url);
    };

    async clickMenuBtn (name: string): Promise<void> {
        await allure.step(`Переходим в меню '${this.selectors.menuBtn(name)}'`, async () => {

            await allure.step(`Нажимаем на кнопку меню '${this.selectors.menuBtn(name)}'`, async () => {
                await this.page.locator(this.selectors.menuBtn(name)).click();
            });
            await allure.step('Ожидаем полной загрузки страницы', async () => {
                await this.page.waitForLoadState('load');
            });
        });
    }

    async assertMenuBtnActiveStatus (name: string): Promise<void> {
        await allure.step(`Проверяем статус кнопки меню '${this.selectors.menuBtn(name)}'`, async () => {

            await allure.step(`Проверяем наличие у кнопки '${this.selectors.menuBtn(name)}' атрибута 'aria-selected'`, async () => {
                const activeBtnAttr: string = await this.page.locator(this.selectors.menuBtn(name)).getAttribute('aria-selected');
                await expect(activeBtnAttr).toContain('true');
            });
        });
    }
}
