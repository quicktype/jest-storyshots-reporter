import * as xmlParser from "xml2js";

import { promises as fs } from "fs";

export async function readAndParseXMLFile(file, { $fs = fs, $xmlParser = xmlParser } = {}): Promise<any> {
    const data = await $fs.readFile(file);
    const parser = new $xmlParser.Parser();

    const json = await parser.parseStringPromise(data);

    return json;
}
