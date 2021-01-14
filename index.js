const fetch = require("node-fetch")
const json2csv = require("json2csv")
const { htmlToText } = require('html-to-text');
const sleep = require('util').promisify(setTimeout);
const fs = require('fs');

let options = require("./options.json")

const PAGE_SIZE = 250
const CSV_OUTPUT_PATH = './output.csv'
const START_DATE = 'November 10, 2020 00:00:00 GMT+00:00'
const START_EPOCH_TIME = Math.round(new Date(START_DATE).getTime() / 1000)

const END_DATE = 'January 14, 2021 00:00:00 GMT+00:00'
const END_EPOCH_TIME = Math.round(new Date(END_DATE).getTime() / 1000)
let epochTime = END_EPOCH_TIME

function replacer(attr) {
    return "timestamp=" + epochTime.toString(10);
}

get_data = async () => {
    options["body"] = options["body"].replace(/page_size=([\d]*)/, "page_size=".concat(PAGE_SIZE.toString(10)))
    options["body"] = options["body"].replace(/timestamp=([\d]*)/, replacer("timestamp="));
    let date = new Date(0); // The 0 there is the key, which sets the date to the epoch
    date.setUTCSeconds(epochTime);
    console.log(date)
    let data = await fetch("https://www.dropbox.com/events/ajax", options);

    return data.json();
}

async function main() {
    return get_data().then(data => {
        const fields = ['name', 'timestamp', 'ago', 'event_blurb', {
            label: 'blurb',
            value: (item) => {
                return htmlToText(item['blurb'])
            }
        }];
        const opts = {fields};

        try {
            const parser = new json2csv.Parser(opts);
            const csvData = parser.parse(data.events);
            let totalEvents = data.events.length
            console.log(totalEvents)
            epochTime = data.events[totalEvents - 1]['timestamp']

            fs.appendFile(CSV_OUTPUT_PATH, csvData, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        } catch (err) {
            console.error(err);
        }
    }).catch(err => {
    });
}

async function entryPoint() {
    fs.exists(CSV_OUTPUT_PATH, function(exists) {
        if(exists) {
            fs.unlinkSync(CSV_OUTPUT_PATH)
        }
    });
    while (START_EPOCH_TIME < epochTime) {
        await sleep(10000)
        await main()
        await sleep(10000)
    }
}

entryPoint()
