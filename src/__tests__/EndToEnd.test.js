import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  // Has to be placed outside the BeforeAll() function, otherwise is not going to fire!
  jest.setTimeout(30000);
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      //   headless: false,
      //   slowMo: 250, // slow down by 250ms
      //   ignoreDefaultArgs: ['--disable-extensions'], // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    // page.$() selects an element on the page, returns first element found matching selector
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});
