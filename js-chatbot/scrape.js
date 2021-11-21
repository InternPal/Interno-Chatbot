//WEB SCRAPPING
const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs')


const scrape = async (company)=>{
    const url = `https://en.wikipedia.org/wiki/${company}`;
    rp(url)
    .then((html)=>{
        const $ = cheerio.load(html);
        const labels = [];
        const dataList = [];

        $(".infobox-label").each((i, data) => {
            labels.push($(data).text());
        });
        $(".infobox-data").each((i, data) => {
            dataList.push($(data).text());
        });;

        let corpusObject = {
            "name": "Corpus",
            "locale": "en-US",
            "data": []
        };

        labels.forEach((label, i) => {
            corpusObject["data"].push({
                "intent": "agent." + label,
                "utterances": [label],
                "answers": [dataList[i]]
            })
        })


        const jsonString = JSON.stringify(corpusObject)
        fs.writeFile('./corpus-en.json', jsonString, (_)=>{})
    })
}

module.exports = scrape;

