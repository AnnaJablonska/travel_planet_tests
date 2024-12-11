
# Automated Travel Search Tests

This project contains automated tests designed to validate the search functionality and offer selection process on multiple travel websites. The tests ensure that users can correctly apply search criteria, retrieve accurate results, and interact seamlessly with the user interface elements across various platforms.

The project is built using Playwright, a powerful browser automation framework, with TypeScript providing type safety. It simulates user interactions like selecting destinations, travel dates, and other filters while verifying the expected behavior of UI elements and the accuracy of search results.

## Project Structure

The project is organized into three main components:

- **Pages**: These encapsulate the locators and interaction methods for different pages (e.g., HomePage, SearchResultsPage, OfferDetailsPage).
- **Tests**: These are the test scenarios that validate various functionalities such as searching for offers, navigating pagination, and selecting specific results.
- **Utils**: Helper functions, such as date manipulation, to aid test implementation.

## Installation and Setup

To run the tests, ensure you have Node.js installed (version 16 or newer). Start by cloning the repository and installing the necessary dependencies. Then, install the required Playwright browsers. Run the following commands:


```bash
git clone https://github.com/your-repo-name.git
cd your-repo-name
npm install
npx playwright install
```

To execute the tests, use the Playwright CLI. You can run all tests with the following command:
```bash
npx playwright test
```

To run tests for a specific site, use the --grep option with a keyword:
```bash
npx playwright test --grep "TravelPlanet (PL)"
```

For debugging, launch the Playwright Test Runner:
```bash
npx playwright test --ui
```
## Test Scenarios

The project includes tests for various functionalities:
	1.	Search for Offers: These tests verify that search results align with the user-provided criteria, such as destination and travel dates.  
	2.	Pagination: These tests check navigation to subsequent pages of search results and validate the current page number.  
	3.	Select Offer: These tests ensure that selecting an offer from the search results opens its details page and that the details match the selection.  
	4.	UI Element Visibility: These tests confirm that essential UI components, such as the destination picker, date picker, and search button, are visible and functional.

## Supported Sites

The tests are run across multiple travel websites to ensure broad compatibility and consistent behavior. The supported sites include: 
- **TravelPlanet(PL)** 
- **Invia (CZ)**   
- **Invia (SK)** 
- **Invia (HU)**
