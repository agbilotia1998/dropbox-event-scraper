// A little helper to read a varint (returns [value, bytesRead]):
function readVarint(buf, pos) {
  let result = 0, shift = 0, b, i = pos;
  do {
    b = buf[i++];
    result |= (b & 0x7f) << shift;
    shift += 7;
  } while (b & 0x80);
  return [result, i - pos];
}

function decode(base64Str) {
    const bin = Uint8Array.from(atob(base64Str), c => c.charCodeAt(0));

    // 4. Walk the buffer:
    let offset = 0;
    const decoder = new TextDecoder("utf-8");
    let uri = "";

    while (offset < bin.length) {
    // — read the tag (fieldNumber << 3 | wireType)
    const [tag, tagBytes] = readVarint(bin, offset);
    offset += tagBytes;
    const fieldNumber = tag >> 3;
    const wireType   = tag & 7;

    let value;
    switch (wireType) {
        case 0: { // varint
            const [v, sz] = readVarint(bin, offset);
            offset += sz;
            value = v;
            break;
        }
        case 1: // 64‑bit
        value = bin.slice(offset, offset + 8);
        offset += 8;
        break;
        case 2: { // length-delimited (string, bytes, nested message)
        const [len, sz] = readVarint(bin, offset);
        offset += sz;
        const slice = bin.slice(offset, offset + len);
        // try to decode as UTF‑8 string, else show hex
        const text = decoder.decode(slice);
        value = (/[ -~]+/.test(text)) ? text : slice;
        offset += len;

        if (typeof value === 'string') {
            let match = value.match(/https:\/\/www\.dropbox\.com\/event_details\/\d+\/\d+\/\d+\/\d+/);
            match ? uri = match[0] : "";

            match = value.match(/https:\/\/www\.dropbox\.com\/pri\/get\/[^\s"]+/);
            match ? uri = match[0] : "";
        }
        break;
        }
        case 5: // 32‑bit
        value = bin.slice(offset, offset + 4);
        offset += 4;
        break;
        default:
        throw new Error(`Unsupported wireType ${wireType} at offset ${offset}`);
    }
    //   console.log(`field #${fieldNumber} (wireType ${wireType}):`, value);
    }

    return uri
}

module.exports = {
    decode: decode
}
