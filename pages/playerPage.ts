import { BasePage } from './BasePage';
import {Page} from "@playwright/test";

export class PlayerPage extends BasePage {
    private readonly selectors = {
        playerWrapper: '//*[@class="video-viewer-player__player-wrap"]',
        playerTimeLine: '//*[@data-testid="timeline-clickable-zone"]'
    }

    constructor(page, url = '/video/watch') {
        super(page, url);
    }

    async playerFullScreenMode (popup: Page): Promise<void> {
        await popup.locator(this.selectors.playerTimeLine).waitFor({state: 'hidden'});
        await popup.locator(this.selectors.playerWrapper).dblclick();
    }
}
