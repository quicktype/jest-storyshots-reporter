import * as core from "@actions/core";

function parseWorkingDir(dir: string) {
    if (/\/$/.test(dir)) return dir;
    return `${dir}/`;
}

export const config = {
    junitFile: core.getInput("junit-file"),
    accessToken: core.getInput("access-token"),
    workingDir: parseWorkingDir(core.getInput("working-directory")),
};
