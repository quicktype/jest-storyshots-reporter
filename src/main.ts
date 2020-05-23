import * as core from "@actions/core";
import { config } from "./config";
import { readAndParseXMLFile } from "./parser";
import { parseTestInformation } from "./junit-parser";
import { publishTestResults } from "./github-api";

async function run(): Promise<void> {
    try {
        const result = await readAndParseXMLFile(`${config.workingDir}${config.junitFile}`);

        const { time, tests, failures } = parseTestInformation(result.testsuites);

        // const testsuites = result.testsuites.testsuite.map(parseTestsuite);

        // const { annotations, unknownFailures } = await createAnnotationsFromTestsuites(testsuites);
        const testInformation = {
            time,
            passed: tests - failures,
            failed: failures,
            total: tests,
            conclusion: failures > 0 ? "failure" : ("success" as "failure" | "success"),
        };

        await publishTestResults(testInformation);
    } catch (error) {
        core.setFailed(error.message);
    }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run();
