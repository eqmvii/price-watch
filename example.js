// super hacky, gets the main price

const interval = 30 * 1000 + (Math.floor(Math.random() * 60));

const puppeteer = require('puppeteer');
const fs = require('fs');

let rawproducts = fs.readFileSync('products.json');
let products = JSON.parse(rawproducts);
console.log(products);

setInterval(async () => {
  let rightNow = new Date();

  console.log(`launch browser at ${rightNow.toLocaleTimeString()}`);
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] }); // default is true. Args for heroku.
  const page = await browser.newPage();

  // TODO: Set user agent

  console.log('visit site');
  await page.goto(products.jumpstart);


  // console.log('wait for priceblock');
  // let z = await page.waitForSelector('#priceblock_ourprice');
  // console.log(z);

  console.log('get priceblock');

  let price = 'Not Found'

  try {
    price = await page.$eval('#priceblock_ourprice', (el) => {
      console.log('choo choo')
      console.log(el);
      return el.textContent;
    });
  } catch {
    console.log('sad!');
  }

  console.log(price);

  // await page.screenshot({ path: 'example.png' });

  await browser.close();
}, interval);
