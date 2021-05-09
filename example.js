// super hacky, gets the main price

const puppeteer = require('puppeteer');
const fs = require('fs');

let rawproducts = fs.readFileSync('products.json');
let products = JSON.parse(rawproducts);
console.log(products);

(async () => {
  console.log('launch browser');
  const browser = await puppeteer.launch({ headless: true }); // default is true
  const page = await browser.newPage();

  // TODO: Set user agent

  console.log('visit site');
  await page.goto(products.mh2c);


  console.log('wait for priceblock');
  // let z = await page.waitForSelector('#priceblock_ourprice');
  // console.log(z);

  console.log('get priceblock');

  try {
    const price = await page.$eval('#priceblock_ourprice', (el) => {
      console.log('choo choo')
      console.log(el);
      return el.textContent;
    });
  } catch {
    console.log('sad!');
    price = 'sorrow';
  }

  console.log(price);

  // console.log('other way');

  // var charles = await page.evaluate(() => {
  //   console.log('in here');
  //   var p = document.querySelector(`#priceblock_ourprice`);
  //   var spans = document.querySelectorAll(`span`);
  //   console.log(p);

  //   console.log(spans);
  //   return p.textContent;
  // });

  // console.log('charles');
  // console.log(charles);

  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
