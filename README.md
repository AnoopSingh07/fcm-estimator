# False Ceiling Material Estimator

## Overview

**False Ceiling Material Estimator** is a web-based tool designed to calculate the quantity of materials required for false ceiling installations. This tool helps users estimate the number of props and materials needed based on input dimensions, ensuring accurate and efficient material management.

## Features

- Accurate estimation of materials required for false ceiling projects
- User-friendly interface to input dimensions and view results
- Optimized algorithm utilizing dynamic programming and data structures

## Technologies Used

- **React JS**: For building the user interface
- **CSS**: For styling the application
- **JavaScript**: For the core logic and algorithm implementation
- **Dynamic Programming**: To optimize the material estimation process

## File Structure

- `.gitignore`: Git ignore file.
- `package-lock.json`: Automatically generated file for managing dependencies.
- `package.json`: Project metadata and dependencies.
  
### Build Directory

- `build/`: Contains the production-ready build files.
  - `asset-manifest.json`: Manifest file for the build assets.
  - `fce_logo.png`: Logo used in the application.
  - `index.html`: Main HTML file for the build.
  - `manifest.json`: Web app manifest for PWA support.
  - `static/`: Contains static assets such as CSS, JS, and media files.

### Public Directory

- `public/`: Contains public assets used in the development.
  - `fce_logo.png`: Logo used in the application.
  - `index.html`: Main HTML file for development.
  - `manifest.json`: Web app manifest for PWA support.

### Source Directory

- `src/`: Contains the source code of the application.
  - `App.css`: CSS styles for the main application component.
  - `App.js`: Main application component.
  - `App.test.js`: Tests for the main application component.
  - `index.css`: Global CSS styles.
  - `index.js`: Entry point for the React application.
  - `setupTests.js`: Configuration for testing framework.
  - `components/`: Contains React components for different functionalities.
    - `FeetInches.css`, `FeetInches.js`, `FeetInchesResults.js`: Components for feet and inches input and results.
    - `Header.js`: Header component.
    - `Landing.css`, `Landing.js`: Landing page component.
    - `Metre.css`, `Metre.js`, `MetreResults.js`: Components for meter input and results.
    - `Results.css`: Styles for the results display.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/false-ceiling-material-estimator.git
    ```
2. Navigate to the project directory:
    ```bash
    cd false-ceiling-material-estimator
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm start
    ```

## Hosting

The application is deployed on Netlify. You can access the live version at:

[[False Ceiling Material Estimator App](https://fcm-estimator.netlify.app/)]

## Usage

Open the application in your web browser to input dimensions and view material estimates. The tool will calculate and display the required quantity of materials for false ceiling installations based on user inputs.

## Acknowledgements

- **React JS**: For the powerful and flexible framework used to build the application.


