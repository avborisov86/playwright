import {Page} from '@playwright/test';
import {test} from 'helpers/fixtures';
import {paths} from "../data/paths";
import {searchQueries} from "../data/searchQueries";
import {KeysEnum} from "../enums/keys";
import {allure} from "allure-playwright";
import {Severity} from 'allure-js-commons';

const {url: {video}} = paths;
const {enter} = KeysEnum;
const {kidMovies} = searchQueries;

test.describe('Тесты портала dzen.ru', async () => {

  test.beforeEach(async ({homePage}) => {
    await homePage.goto();
  });

  test('Отображается "Лента Дзена" на главной странице', async ({ homePage }) => {
    await allure.description('Проверка отображения "Лента Дзена" на главной странице портала');
    await allure.severity(Severity.NORMAL);

    await homePage.assertDzenFeedVisible();
  });

  test('На карточке статьи отображается аватарка, название и описание', async ({ homePage }) => {
    await allure.description('Проверка отображения аватарки, названия и описания на карточке статьи');
    await allure.severity(Severity.NORMAL);

    await homePage.assertArticleCardElements();
  });

  test('На карточке статьи отображается кнопка "Подписаться" при наведении курсора', async ({ homePage }) => {
    await allure.description('Проверка отображения кнопки "Подписаться" при наведении курсора на карточку статьи');
    await allure.severity(Severity.NORMAL);

    await homePage.articleCardHover();
    await homePage.assertSubscribeButton();
  });

  test('Изменяется логотип активного пункта главного меню после перехода по нему', async ({ asideMenu }) => {
    await allure.description('Проверка изменения логотипа активного пункта главного меню после перехода по нему');
    await allure.severity(Severity.NORMAL);

    await asideMenu.clickMenuBtn(video);
    await asideMenu.assertMenuBtnActiveStatus(video);
  });

  test('Есть возможность найти и воспроизвести видео через поисковую выдачу', async ({ asideMenu, searchPage, playerPage}) => {
    await allure.description('Проверка возможности найти и воспроизвести видео через поисковую выдачу');
    await allure.severity(Severity.NORMAL);

    await asideMenu.clickMenuBtn(video);
    await searchPage.typeQuery(kidMovies);
    await searchPage.pressKey(enter);
    const popup: Page = await searchPage.clickMovieCard();
    await playerPage.playerFullScreenMode(popup);
  });
});
