import {Page, test} from '@playwright/test';
import {BasePage} from "pages/basePage";
import {HomePage} from "@pages/homePage";
import {AsideMenuComponent} from "../components/asideMenu";
import {SearchPage} from "@pages/searchPage";
import {PlayerPage} from "@pages/playerPage";

test.describe('Тесты портала dzen.ru', async () => {

  test.beforeEach(async ({page}) => {
    const basePage: BasePage = new BasePage(page, '/');

    await basePage.goto();
  })

  test('Отображается "Лента Дзена" на главной странице', async ({ page }) => {
    const homePage: HomePage = new HomePage(page);

    await homePage.assertDzenFeedVisible();
  });

  test('На карточке статьи отображается аватарка, название и описание', async ({ page }) => {
    const homePage: HomePage = new HomePage(page);

    await homePage.assertArticleCardElements();
  });

  test('На карточке статьи отображается кнопка "Подписаться" при наведении курсора', async ({ page }) => {
    const homePage: HomePage = new HomePage(page);

    await homePage.articleCardHover();
    await homePage.assertSubscribeButton();
  });

  test('Изменяется логотип активного пункта главного меню после перехода по нему', async ({ page }) => {
    const btnName: string = 'video';
    const asideMenu: AsideMenuComponent = new AsideMenuComponent(page);

    await asideMenu.clickMenuBtn(btnName);
    await asideMenu.assertMenuBtnActiveStatus(btnName);
  });

  test('Есть возможность найти видео через поисковую выдачу', async ({ page}) => {
    const asideMenu: AsideMenuComponent = new AsideMenuComponent(page);
    const searchPage: SearchPage = new SearchPage(page);
    const playerPage: PlayerPage = new PlayerPage(page);

    const searchQuery: string = 'Синий трактор';

    await asideMenu.clickMenuBtn('video');
    await searchPage.typeQuery(searchQuery);
    await searchPage.pressKey('Enter');
    const popup: Page = await searchPage.clickMovieCard();
    await playerPage.playerFullScreenMode(popup);
  });
});
