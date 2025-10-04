const puppeteer = require('puppeteer');

module.exports = async function findCard(searchString) {
    const browser = await puppeteer.launch(
        {
            headless: true,
            args: ['--no-sandbox']}
    );
    const page = await browser.newPage();
    
    var newSearchString = "";
    for(var i=0; i<searchString.length; i++) {
        if(searchString[i] == ' ') {
            newSearchString += '-';
        } else {
            newSearchString += searchString[i];
        }
    }
    url = 'https://formatlibrary.com/cards/' + newSearchString;
    await page.goto(url, { timeout: 0, waitUntil: "domcontentloaded" });

    await new Promise(r => setTimeout(r, 500));

    
    let name = await page.$eval('.single-card-title.pwk-border-bottom', (e) => e.innerText)
    let description = await page.$eval('.single-card-description-box', (e) => e.innerText)
    let crdPic = await page.$eval('.vertical-centered-flexbox > img', (e) => e.getAttribute('src'))

    console.log(name);
    console.log(description);
    console.log(crdPic);

    const cards = {
        name: name,
        description: description,
        imagePath: crdPic
    };

    await browser.close();
    return cards;
}