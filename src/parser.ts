import * as xmlParser from "xml2js";

import { promises as fs } from "fs";
import { JUnit } from "./junit-types";

export async function readAndParseXMLFile(file: string): Promise<JUnit> {
    const data = await fs.readFile(file);
    const parser = new xmlParser.Parser({
        explicitArray: true,
        attrkey: "attr",
    });

    const junit: JUnit = await parser.parseStringPromise(data);

    return junit;
}
