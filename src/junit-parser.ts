import { Testsuites, Testsuite, Testcase } from "./junit-types";
import { config } from "./config";
import { ParsedTestsuite } from "./parsed-testsuite";

export function parseTestInformation(testsuites: Testsuites) {
    const {
        attr: { tests, failures, time },
    } = testsuites;

    return { tests, failures, time };
}

function parseTestcase(testcase: Testcase) {
    const {
        attr: { classname, name, time },
        failure,
    } = testcase;

    return {
        describe: classname,
        test: name,
        time,
        failure: failure !== undefined ? failure : false,
    };
}

export function parseTestsuite(testsuite: Testsuite): ParsedTestsuite {
    const {
        attr: { name, errors, failures, skipped, time },
        testcase,
    } = testsuite;

    return {
        path: `${config.workingDir}${name}`,
        errors,
        failures,
        skipped,
        time,
        testcases: Array.isArray(testcase) ? testcase.map(parseTestcase) : [parseTestcase(testcase)],
    };
}
