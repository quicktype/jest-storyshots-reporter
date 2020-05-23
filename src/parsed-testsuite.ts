export interface ParsedTestsuite {
    path: string;
    errors: string;
    failures: string;
    skipped: string;
    time: string;
    testcases: ParsedTestcase[];
}

export interface ParsedTestcase {
    describe: string;
    test: string;
    time: string;
    failure: string | boolean;
}
