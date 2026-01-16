/** @jest-environment jsdom */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "./App";

/**
 * Verify something should render
 */
test("App should render", () => {
  render(<App />);

  expect(screen.getByText("Welcome, party people!")).toBeInTheDocument();
});

test("Button should render", () => {
  render(<App />);
  expect(
    screen.getByRole("button", { name: /current theme:/i })
  ).toBeInTheDocument();
});

/**
 * Verify clicking button should change theme
 * hint: use fireEvent.click(element) to trigger a click event on an element
 */
test("theme button should update button text", () => {
  render(<App />);
  const themeButton = screen.getByRole("button", { name: /current theme:/i });
  expect(themeButton).toHaveTextContent("Current theme: light");
  fireEvent.click(themeButton);
  expect(themeButton).toHaveTextContent("Current theme: dark");
});

test("theme button should toggle styles", () => {
  render(<App />);
  const themeButton = screen.getByRole("button", { name: /current theme:/i });
  // Initial style: light theme
  expect(document.body).toHaveStyle("color: #333");
  expect(document.body).toHaveStyle("background-color: #FFF");
  fireEvent.click(themeButton);
  // After click: dark theme
  expect(document.body).toHaveStyle("color: #FFF");
  expect(document.body).toHaveStyle("background-color: #333");
});

/**
 * Verify clicking button should toggle hidden content
 *
 * hint: you can check if something does not exist by using .not
 * e.g. expect(element).not.toBeInTheDocument()
 *
 * hint: use `queryByText` instead of `getByText` to check if something is _not_ rendered
 * (getByText will throw an error if it is not rendered)
 */
test("hidden button should toggle hidden content", () => {
  render(<App />);
  expect(
    screen.queryByText("this content is hidden by default")
  ).not.toBeInTheDocument();
  const toggleButton = screen.getByRole("button", { name: /hidden content/i });
  fireEvent.click(toggleButton);
  expect(
    screen.getByText("this content is hidden by default")
  ).toBeInTheDocument();
  fireEvent.click(toggleButton);
  expect(
    screen.queryByText("this content is hidden by default")
  ).not.toBeInTheDocument();
});

/**
 * Want more? Try these:
 *   - check for the presence of a specific element, like the paragraph containing the text "Click the button to toggle the theme"
 *   - check the for the class name .container on the surrounding div
 *   - after clicking the toggle hidden content button, check for the button text to update to "hide" instead of "show"
 */
