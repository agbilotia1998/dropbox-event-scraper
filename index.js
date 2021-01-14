const fetch = require("node-fetch")
const json2csv = require("json2csv")
const { htmlToText } = require('html-to-text');
const fs = require('fs');

let options = require("./options.json")

const PAGE_SIZE = 250
const CSV_OUTPUT_PATH = './output.csv'

function replacer(attr) {
    const now = new Date()
    const utcMillisecondsSinceEpoch = now.getTime()
    const utcSecondsSinceEpoch = Math.round(utcMillisecondsSinceEpoch / 1000)

    return "timestamp=" + utcSecondsSinceEpoch.toString(10);
}

get_data = async () => {
    options["body"] = options["body"].replace(/page_size=([\d]*)/, "page_size=".concat(PAGE_SIZE.toString(10)))
    options["body"] = options["body"].replace(/timestamp=([\d]*)/, replacer("timestamp="));
    
    let data = await fetch("https://www.dropbox.com/events/ajax", options);

    return data.json();
}

get_data().then(data => {
    const fields = ['name', 'timestamp', 'ago', {
        label: 'blurb',
        value: (item) => {
            return htmlToText(item['blurb'])
        }
    }];
    const opts = { fields };

    try {
        const parser = new json2csv.Parser(opts);
        const csvData = parser.parse(data.events);

        fs.writeFile(CSV_OUTPUT_PATH, csvData, (err) => {
            if(err) {
                console.error(err);
            }
            console.log(csvData);
            console.log(data.events.length)
        });
    } catch (err) {
        console.error(err);
    }
});
