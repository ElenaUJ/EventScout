import puppeteer from 'puppeteer';

describe('filter events by city', () => {
  jest.setTimeout(30000);
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 250, // slow down by 250ms
      // ignoreDefaultArgs: ['--disable-extensions'], // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
  });

  afterAll(() => {
    browser.close();
  });

  test("When user hasn't searched for city, show upcoming events for all cities", async () => {
    await page.waitForSelector('.event-list');
    const eventList = await page.$$('.event-list .event');
    expect(eventList).toHaveLength(2);
  });

  test('User gets list of suggestions when they search for city', async () => {
    await page.waitForSelector('.CitySearch');
    await page.type('.city', 'Berlin');
    const suggestions = await page.$$('.suggestions li');
    expect(suggestions).toHaveLength(2);
  });

  test('User can select a city', async () => {
    let suggestions = await page.$$('.suggestions li');
    await suggestions[0].click();
    const eventList = await page.$$('.event-list .event');
    expect(eventList).toHaveLength(1);
  });
});

describe('show/hide event details', () => {
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
