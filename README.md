# Front-End Interview Task

## Description
You are tasked with building a simple React application that includes a search box. The
application should allow users to enter a query in the search box, fetch data from a mock API
based on the query and display the results in a table.

## Requirements
### Search Box
- Create a search box component that allows users to input a search query.
- Implement a clear or reset button within the search box to allow users to easily clear the
input.
### Search Button
- Include a button component next to the search box that users can click to trigger the
search.
- When the button is clicked, it should initiate the search based on the current query in the
search box.
### API Integration
- Use a mock API or any public API of your choice (e.g., JSONPlaceholder) to fetch data
based on the user's search query.
- Make an asynchronous request to the API when the search button is clicked.
- Handle loading and error states appropriately.
### Table Component
- Display the results in a table format.
- Include columns for relevant information such as title, description, and any other relevant
fields from the API response.
- Implement sorting functionality for the table columns (ascending and descending order).
Styling
- Apply basic styling to make the user interface visually appealing and user-friendly.
### Bonus
- Implement an autocomplete feature for the search box. As the user types in the search
box, provide real-time suggestions based on a predefined list
    - Autocomplete Suggestions:
        - Use a predefined list of suggestions (e.g. 'BRCA1', 'TP53', 'EGFR',
'KRAS', 'ALK', 'PTEN', 'FLT3', 'MYC', 'MAP2K1', 'NOTCH1').
    - Suggestions should update dynamically as the user types.
    - Dropdown or List Display:
        - Display the autocomplete suggestions in a dropdown or list below the
search box.
    - Selection and Update:
        - Allow users to select a suggestion either by clicking on it or navigating
through the suggestions with keyboard keys.
        - When a suggestion is selected, update the search box with the selected
suggestion.
    - Styling:
        - Apply visually appealing styles to the autocomplete dropdown or list.
### Submission
- Provide a GitHub repository link with the React application code. Include clear
instructions on how to run the application locally.


## Available Scripts

In the project directory, you can run:

### `npm start` or `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run type`

Checks the code for errors and missing things using **TypeScript compiler**

### `npm run lint`

Checks the code for errors and missing things using **ESLint**

### `npm run format`

Formats the code according to `./prettierrc.js` config

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
