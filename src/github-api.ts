import * as github from "@actions/github";
import { config } from "./config";
import * as octokit from "@octokit/rest";

type Conclusion = "success" | "failure" | "neutral" | "cancelled" | "timed_out" | "action_required" | undefined;

async function createCheck(summary: string, conclusion: Conclusion, githubKit: github.GitHub) {
    const path = process.env["GITHUB_REF"] ?? ""; // should be of the fomr refs/pull/:prNumber/merge
    const prNumber = /refs\/pull\/(\d+)\/merge/g.exec(path);
    if (prNumber === null) return;

    const [, issue_number] = prNumber;
    const checkRequest: octokit.Octokit.RequestOptions & octokit.Octokit.IssuesCreateCommentParams = {
        ...github.context.repo,
        issue_number: Number.parseInt(issue_number),
        body: summary,
    };

    // eslint-disable-next-line no-console
    console.error(JSON.stringify(checkRequest));

    try {
        await githubKit.issues.createComment(checkRequest);
        // await githubKit.checks.create(checkRequest);
    } catch (error) {
        throw new Error(
            `Request to create annotations failed - request: ${JSON.stringify(checkRequest)} - error: ${error.message} `
        );
    }
}

interface TestInfo {
    time: string;
    passed: number;
    failed: number;
    total: number;
    conclusion: Conclusion;
}

export async function publishTestResults(testInformation: TestInfo) {
    const { time, passed, failed, total, conclusion } = testInformation;

    const githubKit = new github.GitHub(config.accessToken);
    const summary =
        "#### These are all the test results I was able to find from your jest-junit reporter\n" +
        `**${total}** tests were completed in **${time}s** with **${passed}** passed ✔ and **${failed}** failed ✖ tests.`;

    await createCheck(summary, conclusion, githubKit);
}
