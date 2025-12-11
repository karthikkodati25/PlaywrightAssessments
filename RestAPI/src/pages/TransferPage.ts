import { Page, Locator } from '@playwright/test';
export class TransferPage {
    readonly page: Page;
    readonly amountInput: Locator;
    readonly fromAccountSelect: Locator;
    readonly toAccountSelect: Locator;
    readonly transferBtn: Locator;
    readonly successMsg: Locator;
    constructor(page: Page) {
        this.page = page;
        this.amountInput = page.locator('input[name="amount"]');
        this.fromAccountSelect = page.locator('select[name="fromAccountId"]');
        this.toAccountSelect = page.locator('select[name="toAccountId"]');
        this.transferBtn = page.locator('input[type="submit"][value="Transfer"], button:has-text("Transfer")');
        this.successMsg = page.locator('text=Transfer Complete, text=Transfer Successful');
    }
    async goto() {
        await this.page.goto('/parabank/transfer.htm');
        await this.page.waitForLoadState('networkidle');
    }
    async transfer(amount: string, fromValue: string, toValue: string) {
        await this.amountInput.fill(amount);
        await this.fromAccountSelect.selectOption({ value: fromValue });
        await this.toAccountSelect.selectOption({ value: toValue });
        await this.transferBtn.click();
        await this.successMsg.waitFor({ timeout: 5000 });
    }
}