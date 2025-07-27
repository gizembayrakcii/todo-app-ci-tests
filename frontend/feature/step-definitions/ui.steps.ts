import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

// Launches the web application before running tests
Given('I launch the app', async function (this: CustomWorld) {
  const page = await this.getPage();
  await page.waitForLoadState();
});

// Logs in using provided username and password via UI input fields
When('I login with username {string} and password {string}', async function (this: CustomWorld, username: string, password: string) {
  const page = await this.getPage();
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
});

// Verifies that specific text is present on the page (positive assertion)
Then('I should see {string}', async function (this: CustomWorld, text: string) {
  const page = await this.getPage();
  await expect(page.locator('body')).toContainText(text);
});

// Verifies that specific text is not present on the page (negative assertion)
Then('I should not see {string}', async function (this: CustomWorld, text: string) {
  const page = await this.getPage();
  await expect(page.locator('body')).not.toContainText(text);
});

// Placeholder step to indicate the user is on the Todo page (can be expanded if needed)
Given('I am on the todo page', async function (this: CustomWorld) {
  const page = await this.getPage();
  await page.waitForSelector('input[placeholder="Username"]');
  await page.getByPlaceholder('Username').fill('admin');
  await page.getByPlaceholder('Password').fill('1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForSelector('input[placeholder="Enter todo"]', { timeout: 10000 });
});

// Fills the todo input field with the specified text
When('I enter {string} into the todo input', async function (this: CustomWorld, todoText: string) {
  const page = await this.getPage();
  await page.getByPlaceholder('Enter todo').fill(todoText);
});

// Clicks a button with the specified name (e.g., Add, Update, Delete)
When('I click the {string} button', async function (this: CustomWorld, buttonText: string) {
  const page = await this.getPage();
  await page.getByRole('button', { name: buttonText }).click();
});


// Clicks a button (e.g., Edit/Delete) for a specific todo item based on its text
When('I click the {string} button for {string}', async function (this: CustomWorld, action: string, todoText: string) {
  const page = await this.getPage();
  const todoItem = page.locator('li').filter({ hasText: todoText }).first();
  const button = todoItem.getByRole('button', { name: action });
  await expect(button).toBeVisible();
  await button.click();
});


// Updates the selected todo item with new text and clicks the Update button
When('I update it to {string}', async function (this: CustomWorld, newText: string) {
  const page = await this.getPage();
  await page.getByPlaceholder('Enter todo').fill(newText);
  await page.getByRole('button', { name: 'Update' }).click();
});

// To check todo item presence
Given('{string} exists in the list', async function (this: CustomWorld, todoText: string) {
  const page = await this.getPage();
  const item = page.locator('li').filter({ hasText: todoText }).first();
  await expect(item).toBeVisible();
});