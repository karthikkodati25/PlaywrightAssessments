import { test, expect, Page, Locator } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

// Small utility helpers

async function avoidAdNetworks(page: Page) {
    await page.route('**/*', (route) => {
        const u = route.request().url();
        if (/doubleclick|googlesyndication|pagead|gstaticadssl|ads\?/.test(u)) return route.abort();
        return route.continue();
    });
}
async function dragMouse(page: Page, from: { x: number; y: number }, toX: number, toY = from.y) {
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    await page.mouse.move(toX, toY, { steps: 12 });
    await page.mouse.up();
    await page.waitForTimeout(200);
}
async function ctrlDragHorizontal(page: Page, element: Locator, offsetX: number) {
    const box = await element.boundingBox();
    if (!box) return;
    const startX = Math.round(box.x + box.width / 2);
    const startY = Math.round(box.y + box.height / 2);
    await page.keyboard.down('Control');
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + offsetX, startY, { steps: 12 });
    await page.mouse.up();
    await page.keyboard.up('Control');
    await page.waitForTimeout(300);
}

/* slider helpers used near bottom */

async function sliderMoveLeft(page: Page, handle: Locator, distance: number) {
    const b = await handle.boundingBox();
    if (!b) return;
    await page.mouse.move(Math.round(b.x + b.width / 2), Math.round(b.y + b.height / 2));
    await page.keyboard.down('Control');
    await page.mouse.down();
    await page.mouse.move(Math.round(b.x + b.width / 2 - distance), Math.round(b.y + b.height / 2), { steps: 12 });
    await page.mouse.up();
    await page.keyboard.up('Control');
    await page.waitForTimeout(600);
}
async function sliderMoveRight(page: Page, handle: Locator, distance: number) {
    const b = await handle.boundingBox();
    if (!b) return;
    await page.mouse.move(Math.round(b.x + b.width / 2), Math.round(b.y + b.height / 2));
    await page.keyboard.down('Control');
    await page.mouse.down();
    await page.mouse.move(Math.round(b.x + b.width / 2 + distance), Math.round(b.y + b.height / 2), { steps: 12 });
    await page.mouse.up();
    await page.keyboard.up('Control');
    await page.waitForTimeout(600);
}


// Global beforeEach (navigate + block ads)

test.beforeEach(async ({ page }) => {
    await avoidAdNetworks(page);
    await page.goto('https://www.globalsqa.com/demo-site/');
    // ensure demo nav/header loaded
    await expect(page.locator('[title="GlobalSQA"]')).toBeVisible();
    await page.waitForTimeout(300);
});


// Tabs & Accordion suite

test('Tabs + Accordions (open, resize, toggle icons)', async ({ page }) => {
    // open Tabs section
    const tabsNav = page.getByRole('link', { name: 'Tabs' });
    await expect(tabsNav).toBeVisible();
    await tabsNav.click();

    // verify heading to confirm navigation
    await expect(page.locator('.page_heading')).toHaveText(/Accordion And Tabs/);

    // frame 1 - simple accordion
    const accFrameA = page.frameLocator('iframe[src*="accordion/collapsible.html"]');
    const hdr1 = accFrameA.locator('#ui-id-1');
    const hdr2 = accFrameA.locator('#ui-id-3');
    const hdr3 = accFrameA.locator('#ui-id-5');
    const hdr4 = accFrameA.locator('#ui-id-7');
    await expect(hdr1).toBeVisible();
    await hdr2.click();
    await hdr3.click();
    await hdr4.click();

    // verify content snippets
    const c1 = accFrameA.locator('#ui-id-2');
    const c2 = accFrameA.locator('#ui-id-4');
    const c3 = accFrameA.locator('#ui-id-6');
    const c4 = accFrameA.locator('#ui-id-8');
    await expect(c1).toContainText('Mauris');
    await expect(c2).toContainText('Sed non urna');
    await expect(c3).toContainText('Nam enim risus');
    await expect(c4).toContainText('Cras dictum');

    // tab: re-size accordion
    const resizeTab = page.locator('.resp-tabs-list').getByText('Re-Size Accordion');
    await resizeTab.click();
    const accFrameB = page.frameLocator('iframe[src*="accordion/fillspace.html"]');
    const handle = accFrameB.locator('div.ui-resizable-handle.ui-resizable-e');
    await expect(accFrameB.locator('#ui-id-1')).toBeVisible();

    // attempt controlled resize (drag with ctrl)
    await ctrlDragHorizontal(page, handle, 340);

    // quick sanity check: handle boundingBox exists and width > small value
    const after = await handle.boundingBox();
    if (after) await expect(after.width).toBeGreaterThan(5);

    // tab: toggle icons
    const toggleTab = page.locator('.resp-tabs-list').getByText('Toggle Icons');
    await toggleTab.click();
    const accFrameC = page.frameLocator('iframe[src*="accordion/custom-icons.html"]');
    const icon1 = accFrameC.locator('#ui-id-1 span');
    const icon2 = accFrameC.locator('#ui-id-3 span');
    const icon3 = accFrameC.locator('#ui-id-5 span');
    const icon4 = accFrameC.locator('#ui-id-7 span');

    // hide icons via control in frame
    const toggleControl = accFrameC.getByText('Toggle icons');
    await toggleControl.click();
    await page.waitForTimeout(400);
    await expect(icon1).not.toBeVisible();
    await expect(icon2).not.toBeVisible();
    await expect(icon3).not.toBeVisible();
    await expect(icon4).not.toBeVisible();
});

// Sliders (color, range, steps)

test('Sliders - color picker, range and step slider', async ({ page }) => {
    const sliderNav = page.getByRole('link', { name: 'Slider' });
    await sliderNav.click();

    // -- color picker slider frame
    const colorFrame = page.frameLocator('iframe[src*="slider/colorpicker.html"]');
    const redHandle = colorFrame.locator('#red');
    const greenHandle = colorFrame.locator('#green');
    const blueHandle = colorFrame.locator('#blue');
    const swatch = colorFrame.locator('#swatch');
    await expect(redHandle).toBeVisible();

    // move red little then bigger, assert swatch background is rgb
    await sliderMoveRight(page, redHandle, 30);
    await expect(swatch).toHaveCSS('background-color', /rgb\(/);
    await sliderMoveRight(page, redHandle, 110);
    await expect(swatch).toHaveCSS('background-color', /rgb\(/);

    // green forward/back
    await sliderMoveRight(page, greenHandle, 150);
    await expect(swatch).toHaveCSS('background-color', /rgb\(/);
    await sliderMoveLeft(page, greenHandle, 150);
    await expect(swatch).toHaveCSS('background-color', /rgb\(/);

    // blue forward/back
    await sliderMoveRight(page, blueHandle, 150);
    await expect(swatch).toHaveCSS('background-color', /rgb\(/);
    await sliderMoveLeft(page, blueHandle, 150);
    await expect(swatch).toHaveCSS('background-color', /rgb\(/);

    // -- range slider
    const rangeTab = page.locator('.resp-tabs-list').getByText('Range');
    await rangeTab.click();
    const rangeFrame = page.frameLocator('iframe[src*="slider/range.html"]');

    // range handles are inside #slider-range; we locate by style left attributes (works on that demo)
    const leftThumb = rangeFrame.locator('#slider-range [style*="left"]').first();
    const rightThumb = rangeFrame.locator('#slider-range [style*="left"]').nth(1);
    const priceBox = rangeFrame.getByRole('textbox', { name: 'Price range:' });
    await expect(leftThumb).toBeVisible();
    await sliderMoveRight(page, leftThumb, 60);
    await expect(priceBox).toHaveValue(/^\$/);
    await sliderMoveLeft(page, rightThumb, 100);
    await expect(priceBox).toHaveValue(/^\$/);

    // -- steps slider
    const stepsNav = page.locator('#Steps');
    await stepsNav.click();
    const stepsFrame = page.frameLocator('iframe[src*="slider/steps.html"]');
    const stepHandle = stepsFrame.locator('#slider .ui-slider-handle');
    const stepValueBox = stepsFrame.getByRole('textbox', { name: /Donation amount/ });
    await expect(stepHandle).toBeVisible();
    await sliderMoveRight(page, stepHandle, 100);
    await expect(stepValueBox).toHaveValue(/\$/);
});

// Tooltips: image/video/form

test('Tooltips: image, video and form hints', async ({ page }) => {
    const tooltipNav = page.getByRole('link', { name: 'ToolTip' });
    await tooltipNav.click();

    // image-based
    const frameImages = page.frameLocator('iframe[src*="tooltip/custom-content.html"]');
    const vienna = frameImages.getByRole('link', { name: 'Vienna, Austria' });
    const imgTooltipBox = frameImages.locator('div.ui-tooltip-content');
    await vienna.hover();
    await expect(imgTooltipBox).toBeVisible();

    // read alt attribute if an img exists inside tooltip
    const alt = await imgTooltipBox.locator('img').getAttribute('alt');
    if (alt) await expect(alt).toBe('Vienna, Austria');

    // video-based:
    const videoTab = page.locator('.resp-tabs-list').getByText('Video Based');
    await videoTab.click();
    const frameVideo = page.frameLocator('iframe[src*="tooltip/video-player.html"]');
    const likeBtn = frameVideo.getByTitle('I like this');
    const tipBoxVideo = frameVideo.locator('div.ui-tooltip-content');
    await likeBtn.hover();
    await expect(tipBoxVideo).toBeVisible();
    await expect(tipBoxVideo).toHaveText('I like this');

    // form-based:
    const formTab = page.locator('.resp-tabs-list').getByText('Forms Based');
    await formTab.click();
    const frameForm = page.frameLocator('iframe[src*="tooltip/forms.html"]');
    const firstName = frameForm.locator('#firstname');
    const formHint = frameForm.locator('div.ui-tooltip-content');
    await firstName.hover();
    await expect(formHint).toBeVisible();
    await expect(formHint).toContainText('Please provide your firstname.');
    await firstName.fill('demo');
});

// Alerts / Confirm / Prompt flows

test('Alerts, confirm and prompt handlers', async ({ page }) => {
    const alertNav = page.getByRole('link', { name: 'AlertBox' });
    await alertNav.click();

    // simple alert: accept it
    page.once('dialog', async (dlg) => {
        await page.waitForTimeout(200);
        await dlg.accept();
    });
    await page.getByRole('button', { name: 'Try it' }).click();
    await page.waitForTimeout(200);

    // confirmation: accept
    const confTab = page.locator('.resp-tabs-list').getByText('Confirmation Box');
    await confTab.click();
    page.once('dialog', async (dlg) => {
        await dlg.accept();
    });
    await page.getByRole('button', { name: 'Try it' }).click();
    await page.waitForTimeout(300);

    // prompt: send text
    const promptTab = page.locator('.resp-tabs-list').getByText('Prompt Box');
    await promptTab.click();
    page.once('dialog', async (dlg) => {
        await dlg.accept('user input');
    });
    await page.getByRole('button', { name: 'Try it' }).click();
    await page.waitForTimeout(300);
});

// Dialogs: form creation + message + confirmation

test('Modal dialogs - create user, message and confirm modal', async ({ page }) => {
    const dialogNav = page.getByRole('link', { name: 'DialogBox' });
    await dialogNav.click();

    // create user modal
    const modalFrame = page.frameLocator('iframe[src*="dialog/modal-form.html"]');
    const createButton = modalFrame.locator('#create-user');
    await createButton.click();
    const nameInput = modalFrame.locator('#name');
    const emailInput = modalFrame.locator('#email');
    const passInput = modalFrame.locator('#password');
    const submitBtn = modalFrame.locator('.ui-dialog-buttonset').getByText('Create an account');
    await expect(nameInput).toBeVisible();
    await nameInput.fill('reuser');
    await emailInput.fill('reuser@example.com');
    await passInput.fill('pwd123');

    // click create
    await submitBtn.click();
    await page.waitForTimeout(600);

    // verify new row appears (table row check)
    const insertedRow = modalFrame.locator('table tbody tr').nth(1);
    await expect(insertedRow.locator('td').nth(0)).toHaveText(/reuser/);

    // message box modal
    const messageTab = page.locator('.resp-tabs-list').getByText('Message Box');
    await messageTab.click();
    const messageFrame = page.frameLocator('iframe[src*="dialog/modal-message.html"]');
    const okBtn = messageFrame.getByRole('button', { name: 'Ok' });
    const messageText = messageFrame.locator('#dialog-message');
    await expect(messageText).toBeVisible();
    await expect(messageText).toContainText('Your files have downloaded successfully');
    await okBtn.click();
    await page.waitForTimeout(300);
    await expect(messageText).not.toBeVisible();

    // confirmation modal - delete all
    const confTab = page.locator('.resp-tabs-list').getByText('Confirmation Box');
    await confTab.click();
    const confFrame = page.frameLocator('iframe[src*="dialog/modal-confirmation.html"]');
    const deleteBtn = confFrame.locator('.ui-dialog-buttonset').getByText('Delete all items');
    await deleteBtn.waitFor({ state: 'visible' });
    await deleteBtn.click();
    await page.waitForTimeout(400);
    await expect(deleteBtn).not.toBeVisible();
});

// Progress bars tests

test('Progress indicators and controls', async ({ page }) => {
    const progressNav = page.getByRole('link', { name: 'ProgressBar' });
    await progressNav.click();

    // deterministic progress: download button
    const frameA = page.frameLocator('iframe[src*="progressbar/download.html"]');
    const downloadBtn = frameA.locator('#downloadButton');
    const progressLabel = frameA.locator('#dialog .progress-label');
    const progressBarMeter = frameA.locator('#progressbar');
    await expect(downloadBtn).toBeVisible();
    await downloadBtn.click();

    // wait until progress finishes - progress label shows "Complete!"
    await expect(progressLabel).toHaveText(/Complete/, { timeout: 20000 });

    // check aria-valuenow attribute equals 100
    const ariaVal = await progressBarMeter.getAttribute('aria-valuenow');
    if (ariaVal) await expect(ariaVal).toBe('100');
    const closeBtn = frameA.locator('.ui-dialog-buttonset').getByText('Close');
    await closeBtn.click();
    await page.waitForTimeout(300);

    // Random/indeterminate progress
    const randomTab = page.locator('.resp-tabs-list').getByText('Random Progress Bar');
    await randomTab.click();
    const frameB = page.frameLocator('iframe[src*="progressbar/indeterminate.html"]');
    const progressEl = frameB.locator('#progressbar');
    const btnNum = frameB.locator('#numButton');
    const btnFalse = frameB.locator('#falseButton');
    const btnColor = frameB.locator('#colorButton');
    await btnNum.click();
    await expect(progressEl).toBeVisible();
    const val1 = await progressEl.getAttribute('aria-valuenow');
    await btnNum.click();
    const val2 = await progressEl.getAttribute('aria-valuenow');

    // ensure we got some value(s)
    await expect(val1).not.toBeNull();
    await expect(val1).not.toBe(val2);
    await btnFalse.click();
    await expect(progressEl).toBeVisible();
    await btnColor.click();

    // check that element has background color style present
    await expect(progressEl).toHaveCSS('background-color', /rgb\(|rgba\(/);
});

test('Second Step — Frames/Windows / Dropdown / Autocomplete (minimal)', async ({ page }) => {

    // ---------- 1) FRAMES & WINDOWS ----------
    const framesLink = page.getByText('Frames', { exact: true });
    await framesLink.click();

    // Open New Tab (button inside page)
    // wait for popup opened by clicking the button

    const openNewTabBtn = page.locator('a').filter({ hasText: 'Click Here' }).first();
    const [tab] = await Promise.all([
        page.waitForEvent('popup'),
        openNewTabBtn.click()
    ]);
    await expect(tab).toBeTruthy();

    // quick sanity check on popup url or title (if available)

    await expect(tab).toHaveURL(/globalsqa|demo-site/);

    // Close popup then continue
    await tab.close();

    // Open New Window (similar to new tab)
    const openNewWindowBtn = page.locator('li:has-text("Open New Window")'); // fallback if same button
    await openNewWindowBtn.click
    const clickHereBtns = page.locator('a').filter({ hasText: 'Click Here' }).first();
    // Use waitForEvent again in case it opens a separate window
    // (some sites open tabs/windows via same button; this code handles the popup the same way)
    const [win] = await Promise.all([
        page.waitForEvent('popup'),
        clickHereBtns.click()
    ]);
    await expect(win).toBeTruthy();
    await win.close();

    // IFRAME tab: click & assert we can access its content
    const iframeTab = page.locator('li:has-text("iFrame")');
    if (await iframeTab.count() > 0) {
        await iframeTab.click();
    }

    // Target iframe — selector uses partial src (matches screenshot patterns)
    const framesIframe = page.locator('div.single_tab_div.resp-tab-content.resp-tab-content-active');
    await framesIframe.waitFor({ state: 'visible' });

    // check an element inside iframe (logo or heading)
    const logo = page.frameLocator('[name="globalSqa"]').getByRole('img', { name: 'GlobalSQA' });

    // ---------- 2) DROP-DOWN (Select country) ----------
    page.goto('https://www.globalsqa.com/demo-site/');
    const dropdownLink = page.getByText('DropDown', { exact: true });
    await dropdownLink.click();

    // the "select" UI appears as a custom box; click the visible box or open the list
    const selectBox = page.getByRole('combobox');
    await page.waitForTimeout(400);
    await selectBox.click();
    await selectBox.selectOption({ label: 'India' });

    // assert selection shown
    await expect(selectBox).toHaveText(/India/);

    // ---------- 3) AUTOCOMPLETE / COMBOBOX ----------
    await page.waitForTimeout(400);
    page.goto('https://www.globalsqa.com/demo-site/');
    const autoCompleteBtn = page.getByText('AutoComplete');
    await autoCompleteBtn.click();

    // Detect iframe 
    const autoFrame = page.frameLocator('iframe[src*="categories"], iframe[src*="combobox"], iframe');

    // Input field
    const autoInput = page.frameLocator('[src*="categories.html"]').getByRole('textbox');
    await expect(autoInput).toBeVisible();

    // Type and wait for suggestions
    await autoInput.fill('a');
    const firstSuggestion = page.frameLocator('[src*="categories.html"]').locator('#ui-id-1');
    await firstSuggestion.click();

    // ---------- 4) SELECT ELEMENTS (multi-select demo) ----------

    page.goto('https://www.globalsqa.com/demo-site/');
    const selectElementsLink = page.getByRole('link', { name: /SelectElements|SelectElements/i }).first();
    await selectElementsLink.click();

    // The screenshot shows categories/combobox tab; try to pick a value from the grid/combobox
    const selectFrame = page.frameLocator('iframe[src*="combobox"], iframe[src*="select"]');

    // a "search" input is visible in screenshot — use that
    const searchInput = selectFrame.locator('input[type="text"], input[role="combobox"]').first();
    if (await searchInput.count() > 0) {
        await searchInput.fill('a');

        // Pick first drop suggestion
        const firstPick = selectFrame.locator('.ui-menu-item, .ui-autocomplete li, li[role="option"]').first();
        await firstPick.waitFor({ state: 'visible', timeout: 3000 });
        await firstPick.click();

        // no strict assertion — just confirm selection list is not empty
        await expect(searchInput).not.toHaveValue('');
    }
    await page.waitForTimeout(400);
});

test('Third Step – Sorting, Spinner, Toolbar, DatePicker, DragAndDrop, DraggableBox', async ({ page }) => {
    
// 1) SORTING

    const sortButton = page.getByRole('link', { name: 'Sorting' });
    await sortButton.click();
    const items = page.getByText('Re-Order Elements provided. For Ex : Move Shopping to Feeds place', { exact: true });

    // Move item 1 to the bottom (simple reorder)
    const item1 = items.nth(0);
    const item4 = items.nth(0);
    const box1 = await item1.boundingBox();
    const box4 = await item4.boundingBox();
    if (box1 && box4) {
        await page.mouse.move(box1.x + box1.width / 2, box1.y + box1.height / 2);
        await page.mouse.down();
        await page.mouse.move(box4.x + box4.width / 2, box4.y + box4.height / 2, { steps: 10 });
        await page.mouse.up();
    }
    await page.waitForTimeout(500);

    /* -------------------------------------
       2) SPINNER
    ------------------------------------- */
    page.goto('https://www.globalsqa.com/demo-site/');
    const spinnerButton = page.getByRole('link', { name: 'Spinner' });
    await spinnerButton.click();
    
    const spinnerInput = page.frameLocator('[src*="currency.html"]').getByRole('spinbutton');
    await spinnerInput.fill('10');
    await page.waitForTimeout(300);

    // click spinner up arrow
    const upArrow = page.frameLocator('[src*="currency.html"]').locator('span.ui-button-icon.ui-icon.ui-icon-triangle-1-n');
    await upArrow.click();
    await expect(spinnerInput).toHaveValue('$30.00');

    /* -------------------------------------
       3) TOOLBAR
    ------------------------------------- */
    page.goto('https://www.globalsqa.com/demo-site/');
    const toolbarButton = page.getByRole('link', { name: 'Toolbar' });
    await toolbarButton.click();
    const zoom = page.frameLocator('[src*="toolbar.html"]').locator('#zoom');
    await page.waitForTimeout(400);
    await expect(zoom).toHaveValue('Zoom');
    await page.mouse.down(); 

    /* -------------------------------------
       4) DATEPICKER
    ------------------------------------- */
    page.goto('https://www.globalsqa.com/demo-site/');
    const datePickerBtn = page.getByRole('link', { name: 'DatePicker' });
    await datePickerBtn.click();
    const dateFrame = page.frameLocator('iframe[src*="datepicker/default.html"]');
    const dateInput = dateFrame.locator('#datepicker');
    await dateInput.click();

    // choose a date — click 15
    const day15 = dateFrame.locator('//a[text()="15"]');
    await day15.click();
    await expect(dateInput).toHaveValue(/\d{2}\/15\/\d{4}/);

    /* -------------------------------------
       5) DRAG AND DROP
    ------------------------------------- */
    page.goto('https://www.globalsqa.com/demo-site/');
    const dragDropBtn = page.getByRole('link', { name: 'DragAndDrop' });
    await page.waitForTimeout(400);
    await dragDropBtn.click();
    const draggable = page.frameLocator('[src*="photo-manager.html"]').locator('#gallery').locator('li').nth(0);
    const droppable = page.frameLocator('[src*="photo-manager.html"]').getByText('Trash Trash', { exact: true });
    
    const dragBox = await draggable.boundingBox();
    const dropBox = await droppable.boundingBox();
    if (dragBox && dropBox) {
        await page.mouse.move(dragBox.x + dragBox.width / 2, dragBox.y + dragBox.height / 2);
        await page.mouse.down();
        await page.mouse.move(dropBox.x + dropBox.width / 2, dropBox.y + dropBox.height / 2, { steps: 15 });
        await page.mouse.up();
    }
    await page.waitForTimeout(500);
    await expect(droppable).toContainText('Trash Trash');

});
