let fetch = require("node-fetch")
let options = require("./options.json")

function replacer(attr) {
    const now = new Date()
    const utcMillisecondsSinceEpoch = now.getTime()
    const utcSecondsSinceEpoch = Math.round(utcMillisecondsSinceEpoch / 1000)

    return "timestamp=" + utcSecondsSinceEpoch.toString(10);
}

get_data = async () => {
    const page_size = 250

    options["body"] = options["body"].replace(/page_size=([\d]*)/, "page_size=".concat(page_size.toString(10)))
    options["body"] = options["body"].replace(/timestamp=([\d]*)/, replacer("timestamp="));
    
    let data = await fetch("https://www.dropbox.com/events/ajax", options);

    data.json().then(json => {
        console.log(json.events)
    })
}

get_data();
