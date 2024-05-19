import { defineConfig, devices } from '@playwright/test';
import {testPlanFilter} from "allure-playwright/dist/testplan";
import {configDotenv} from 'dotenv';
import * as os from "os";
import {resolve} from 'path'

configDotenv({ path: resolve(__dirname, process.env.ENV_FILE ?? '.env.stage'), override: true });

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  grep: testPlanFilter(),
  reporter: [
      ['list'],
    [
        'allure-playwright',
      {
        detail: true,
        suiteTitle: false,
        environmentInfo: {
          os_platform: os.platform(),
          os_version: os.version(),
          node_version: process.version,
          url: process.env.BASE_URL
        }
      }
    ]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.BASE_URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
        viewport: { width: 1920, height: 1080 }
      },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //   ...devices['Desktop Firefox'],
    //     headless: true,
    //     viewport: { width: 1920, height: 1080 }
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //   ...devices['Desktop Safari'],
    //     headless: false,
    //     viewport: { width: 1920, height: 1080 }
    //   },
    // }
  ]
});
