export interface JUnit {
    testsuites: Testsuites;
}

export interface Testsuites {
    attr: TestsuitesAttr;
    testsuite: Testsuite[];
}

export interface TestsuitesAttr {
    name: string;
    tests: number;
    failures: number;
    time: string;
}

export interface Testsuite {
    attr: TestsuiteAttr;
    testcase: Testcase[];
}

export interface TestsuiteAttr {
    name: string;
    errors: string;
    failures: string;
    skipped: string;
    timestamp: Date;
    time: string;
    tests: string;
}

export interface Testcase {
    attr: TestcaseAttr;
    failure?: string;
}

export interface TestcaseAttr {
    classname: string;
    name: string;
    time: string;
}
