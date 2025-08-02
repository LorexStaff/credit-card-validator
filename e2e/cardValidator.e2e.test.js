const puppeteer = require('puppeteer');

jest.setTimeout(30000);

describe('Credit Card Validator form', () => {
  let browser;
  let page;
  const baseUrl = 'http://localhost:9000';

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: true,
      // headless: false,
      // slowMo: 100,
      // devtools: true,
    });
    page = await browser.newPage();
  });

  afterEach(async () => {
    await browser.close();
  });

  test('should validate a correct card number', async () => {
    await page.goto(baseUrl);
    await page.type('#card-input', '4532015112830366');
    await page.click('#validate-btn');
    await page.waitForSelector('#result.valid');
    const text = await page.$eval('#result', el => el.textContent.trim());
    expect(text).toContain('VISA');
  });

  test('should show error for invalid card number', async () => {
    await page.goto(baseUrl);
    await page.type('#card-input', '4532015112830367');
    await page.click('#validate-btn');
    await page.waitForSelector('#result.invalid');
    const text = await page.$eval('#result', el => el.textContent.trim());
    expect(text).toBe('Неверный номер');
  });

  test('should highlight Visa icon when typing 4', async () => {
    await page.goto(baseUrl);
    await page.type('#card-input', '4');
    await page.waitForFunction(() => {
      const icon = document.querySelector('img[data-system="visa"]');
      return icon?.classList.contains('active');
    });
    const isVisible = await page.$eval('img[data-system="visa"].active', el => !!el);
    expect(isVisible).toBe(true);
  });

  test('should show unknown system for invalid prefix', async () => {
    await page.goto(baseUrl);
    await page.type('#card-input', '1234567812345678');
    await page.click('#validate-btn');
    await page.waitForSelector('#result.invalid');
    const text = await page.$eval('#result', el => el.textContent.trim());
    expect(text).toBe('Неизвестная система');
  });

  test('should show error when input is empty', async () => {
    await page.goto(baseUrl);
    await page.click('#validate-btn');
    await page.waitForSelector('#result.invalid');
    const text = await page.$eval('#result', el => el.textContent.trim());
    expect(text).toBe('Введите номер карты');
  });
});