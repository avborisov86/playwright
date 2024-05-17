import { BasePage } from 'pages/basePage';
import {expect} from '@playwright/test';

export class AsideMenuComponent extends BasePage {
    private readonly selectors = {
        menuBtn: (href: string) => `//*[starts-with(@class, "navigation-tab-list")]//*[@href="${href}"]//li`
    }

    constructor(page, url = '/') {
        super(page, url);
    }

    async clickMenuBtn(name: string): Promise<void> {
        await this.page.locator(this.selectors.menuBtn(name)).click();
        await this.page.waitForLoadState('load');
    }

    async assertMenuBtnActiveStatus(name: string): Promise<void> {
        const activeBtnAttr: string = await this.page.locator(this.selectors.menuBtn(name)).getAttribute('aria-selected');
        await expect(activeBtnAttr).toContain('true');
    }
}
