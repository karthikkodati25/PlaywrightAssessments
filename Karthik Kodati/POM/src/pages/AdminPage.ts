import { Page, Locator, expect } from '@playwright/test';
export class AdminPage {
    readonly page: Page;
    readonly rows: Locator;
    constructor(page: Page) {
        this.page = page;
        // rows selector for OrangeHRM table body rows
        this.rows = this.page.locator('.oxd-table-body .oxd-table-row');
    }

    // Adjust nth indexes to match table columns
    // 0: checkbox, 1: username, 2: userRole, last: actions
    cellLocator(row: Locator, cellName: 'username' | 'userRole' | 'actions'): Locator {
        if (cellName === 'username') return row.locator('.oxd-table-cell').nth(1);
        if (cellName === 'userRole') return row.locator('.oxd-table-cell').nth(2);
        return row.locator('.oxd-table-cell').last();
    }

    // Wait for table to be ready 
    async waitForTable(timeout = 8000) {
        await this.page.waitForSelector('.oxd-table-body', { timeout }).catch(() => { });
        const c = await this.rows.count().catch(() => 0);
        if (c > 0) await this.rows.first().waitFor({ state: 'visible', timeout }).catch(() => { });
    }

    // Find by username 
    async findRowByUsername(username: string): Promise<Locator | null> {
        await this.waitForTable();
        const target = username.trim().toLowerCase();
        const count = await this.rows.count();
        for (let i = 0; i < count; i++) {
            const r = this.rows.nth(i);
            const unameCell = await this.cellLocator(r, 'username');              // await locator
            const uname = (await unameCell.innerText().catch(() => '')).trim().toLowerCase(); // await innerText
            if (!uname) continue;
            if (uname === target || uname.includes(target)) return r;
        }
        return null;
    }

    // Click edit 
    async clickEditUserByUsername(username: string) {
        const row = await this.findRowByUsername(username);
        if (!row) {
            // helpful dump for debugging
            const dump = await this.dumpAllRowsText();
            console.warn(`User not found: ${username}. Current rows:\n`, dump.join('\n---\n'));
            throw new Error(`User not found: ${username}`);
        }

        const actionsCell = this.cellLocator(row, 'actions');
        const editBtn = actionsCell.locator('button[aria-label*="Edit"], button:has-text("Edit")');
        if ((await editBtn.count()) > 0) {
            await editBtn.first().click();
            return;
        }

        const anyBtn = actionsCell.locator('button, a, svg').first();
        if ((await anyBtn.count()) > 0) {
            await anyBtn.click();
            return;
        }
        throw new Error('Edit button not found for user ' + username);
    }

    // Delete helper 
    async clickDeleteUserByUserRole(userrole: string, confirm = true) {
        const row = await this.findRowByUsername(userrole) ?? await this.findRowByUserRole(userrole);
        if (!row) throw new Error(`User not found: ${userrole}`);
        const actionsCell = this.cellLocator(row, 'actions');
        const deleteBtn = actionsCell.locator('button[aria-label*="Delete"], button:has-text("Delete")');
        if ((await deleteBtn.count()) > 0) {
            await deleteBtn.first().click();
        } else {
            const lastBtn = actionsCell.locator('button, a, svg').last();
            if ((await lastBtn.count()) > 0) await lastBtn.click();
            else throw new Error('Delete button not found for user ' + userrole);
        }
        if (confirm) {
            try { this.page.once('dialog', async dialog => { await dialog.accept(); }); } catch (e) { }
            const confirmBtn = this.page.locator('button:has-text("Confirm"), button:has-text("Ok"), button:has-text("Yes")');
            if ((await confirmBtn.count()) > 0) await confirmBtn.first().click().catch(() => { });
        }
    }

    // Find by role
    async findRowByUserRole(userrole: string): Promise<Locator | null> {
        await this.waitForTable();
        const target = userrole.trim().toLowerCase();
        const count = await this.rows.count();
        for (let i = 0; i < count; i++) {
            const r = this.rows.nth(i);
            const roleCell = await this.cellLocator(r, 'userRole');
            const roleText = (await roleCell.innerText().catch(() => '')).trim().toLowerCase();
            if (!roleText) continue;
            if (roleText === target || roleText.includes(target)) return r;
        }
        return null;
    }

    async assertUserExists(username: string) {
        const r = await this.findRowByUsername(username);
        if (!r) throw new Error(`Expected user "${username}" to exist but not found.`);
        await expect(r).toBeVisible();
    }

    async assertUserNotExists(username: string) {
        const r = await this.findRowByUsername(username);
        if (r) {
            const visible = await r.isVisible().catch(() => false);
            if (visible) throw new Error(`Expected user "${username}" to not exist but it is visible.`);
        }
    }

    // dump helper for debugging
    async dumpAllRowsText(): Promise<string[]> {
        await this.waitForTable();
        const cnt = await this.rows.count();
        const out: string[] = [];
        for (let i = 0; i < cnt; i++) out.push(await this.rows.nth(i).innerText().catch(() => ''));
        return out;
    }
}
