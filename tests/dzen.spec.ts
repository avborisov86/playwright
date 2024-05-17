import {Page} from '@playwright/test';
import {test} from 'helpers/fixtures'
import {paths} from "../data/paths";
import {searchQueries} from "../data/searchQueries";
import {KeysEnum} from "../enums/keys";

const {url: {video}} = paths;
const {enter} = KeysEnum;
const {kidMovies} = searchQueries;

test.describe('Тесты портала dzen.ru', async () => {

  test.beforeEach(async ({homePage}) => {
    await homePage.goto();
  })

  test('Отображается "Лента Дзена" на главной странице', async ({ homePage }) => {
    await homePage.assertDzenFeedVisible();
  });

  test('На карточке статьи отображается аватарка, название и описание', async ({ homePage }) => {
    await homePage.assertArticleCardElements();
  });

  test('На карточке статьи отображается кнопка "Подписаться" при наведении курсора', async ({ homePage }) => {
    await homePage.articleCardHover();
    await homePage.assertSubscribeButton();
  });

  test('Изменяется логотип активного пункта главного меню после перехода по нему', async ({ asideMenu }) => {
    await asideMenu.clickMenuBtn(video);
    await asideMenu.assertMenuBtnActiveStatus(video);
  });

  test('Есть возможность найти видео через поисковую выдачу', async ({ asideMenu, searchPage, playerPage}) => {
    await asideMenu.clickMenuBtn(video);
    await searchPage.typeQuery(kidMovies);
    await searchPage.pressKey(enter);
    const popup: Page = await searchPage.clickMovieCard();
    await playerPage.playerFullScreenMode(popup);
  });
});
