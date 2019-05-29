class SearchResultPage {

    constructor(page){
        this.page = page;
    }

    async checkErrorFromSearchResult(word) {
        try {
            await this.page.waitForSelector('.cnn-search__no-results');
            const text = await this.page.evaluate(() => {
                    return document.querySelector('.cnn-search__results-list h3').textContent;
            });
            return text.includes("Your search for " + word + " did not match any documents.");
        } catch (err) {
            console.log(err);
            return false;
        }    
    }

}

module.exports = SearchResultPage;