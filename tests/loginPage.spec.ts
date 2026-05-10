import { test } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";

test("TC001 - Login success", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("tomsmith", "SuperSecretPassword!");
  await loginPage.verifySuccessLogin();
});

test("TC002 - Login fail - wrong password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("tomsmith", "WrongPassword");
  await loginPage.verifyFailedLogin("Your password is invalid!");
});

test("TC003 - Login fail - wrong username", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("wronguser", "SuperSecretPassword!");
  await loginPage.verifyFailedLogin("Your username is invalid!");
});

test("TC004 - Login fail - empty password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("tomsmith", "");
  await loginPage.verifyFailedLogin("Your password is invalid!");
});

test("TC005 - Login fail - empty username", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("", "SuperSecretPassword!");
  await loginPage.verifyFailedLogin("Your username is invalid!");
});
