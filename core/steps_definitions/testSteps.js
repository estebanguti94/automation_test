const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./core/features/testFeature.feature");
const puppeteer = require('puppeteer');
const { expect }  = require('chai');
const HomePage = require('../pages/homePage');
const SearchResultsPage = require('../pages/searchResultPage');

defineFeature(feature, test => {
    const timeout = 20000;
    let browser;
    let page;

    beforeEach(async () => {
        await jest.setTimeout(timeout);
        browser = await puppeteer.launch({
            headless: false
          });
        page = await browser.newPage()
        await page.setViewport({width:1535, height:756});
        await page.goto('https://www.cnn.com/​');
      });

    afterEach(async () => {
        await browser.close();
    });
    
    test("Verify error meessage in search results", ({ given, when, then }) => {

        given(/^I am on the CNN page$/, async () => { 
            await page.waitFor('body');
        });

        when(/^I search the next word "([^"]*)"$/, async (word) => {
            const homePage = new HomePage(page);
            await homePage.search(word);
        });

        then(/^I (should|should not) see a error message with the next word "([^"]*)"$/, async (expectation, word) => {
            const searchResultsPage = new SearchResultsPage(page);
            this.expectation = expectation === 'should' ? true : false;
            await expect(await searchResultsPage.checkErrorFromSearchResult(word)).to.equal(this.expectation);
        });
    });
});