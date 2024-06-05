import { test as base } from '@playwright/test';
import {HomePage} from "../pages/homePage";
import {BasePage} from "../pages/basePage";
import {PlayerPage} from "../pages/playerPage";
import {SearchPage} from "../pages/searchPage";
import {AsideMenuComponent} from "../components/asideMenu";

export interface FixtureType {
    basePage: BasePage;
    homePage: HomePage;
    playerPage: PlayerPage;
    searchPage: SearchPage;
    asideMenu: AsideMenuComponent;
}

export const test = base.extend<FixtureType>({
    basePage: async ({page}, use) => {
        await use(new BasePage(page, '/'));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    playerPage: async ({page}, use) => {
        await use(new PlayerPage(page));
    },
    searchPage: async ({page}, use) => {
        await use(new SearchPage(page));
    },
    asideMenu: async ({page}, use) => {
        await use(new AsideMenuComponent(page));
    }
});
