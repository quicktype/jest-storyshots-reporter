import * as core from "@actions/core";
import { config } from "./config";

async function run(): Promise<void> {
    try {
        const workingDir = core.getInput("working_directory");
    } catch (error) {
        core.setFailed(error.message);
    }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run();
