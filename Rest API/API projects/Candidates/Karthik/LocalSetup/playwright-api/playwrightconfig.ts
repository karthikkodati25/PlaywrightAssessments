import type { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
    testDir: "./tests",
    timeout: 30000,
    expect: { timeout: 5000 },
    reporter: [
        ["list"],
        ["html", { outputFolder: "playwright-report" }]
    ],
    use: {}
};
export default config;