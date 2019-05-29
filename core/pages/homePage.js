class HomePage {

    constructor(page) {
        this.page = page;
    }

    async search(word) {
        await this.page.click('#search-button');
        await this.page.type('.search__input-field', word);
        await this.page.click('#submit-button');
        await this.page.waitForSelector('.cnn-search__results-list');
    }

}

module.exports = HomePage;