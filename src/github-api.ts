import * as github from "@actions/github";
import { config } from "./config";
import * as octokit from "@octokit/rest";

type Conclusion = "success" | "failure" | "neutral" | "cancelled" | "timed_out" | "action_required" | undefined;

async function createCheck(summary: string, conclusion: Conclusion, githubKit: github.GitHub) {
    const commentRequest: octokit.Octokit.RequestOptions & octokit.Octokit.IssuesCreateCommentParams = {
        ...github.context.repo,
        issue_number: github.context.issue.number,
        body: summary,
    };

    const checkRequest: octokit.Octokit.RequestOptions & octokit.Octokit.ChecksCreateParams = {
        ...github.context.repo,
        head_sha: github.context.sha,
        name: "Storyshots",
        conclusion,
        output: {
            title: "Jest Test Results",
            summary,
        },
    };

    try {
        if (conclusion === "failure") {
            await githubKit.issues.createComment(commentRequest);
        }
        console.log("Sending check request", JSON.stringify(checkRequest));
        await githubKit.checks.create(checkRequest);
    } catch (error) {
        throw new Error(
            `Request to create annotations failed - request: ${JSON.stringify(commentRequest)} - error: ${
                error.message
            } `
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
