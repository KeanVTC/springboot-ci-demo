// spring-hello/playwright-tests/tests/hello-world.spec.js
const { test, expect } = require('@playwright/test');

test('Hello World app should return greeting message', async ({ request }) => {
  const response = await request.get('/');
  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toContain('Hello'); // adjust based on your actual app output
});
