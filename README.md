# React Weather App

A simple weather application built with React and Vite. It fetches and displays the current weather for Cairo, featuring a clean UI built with Material-UI and language support for both English and Arabic.

## Features

- **Current Weather Data**: Displays the current temperature, min/max temperature, and a weather description.
- **Dynamic Icons**: Shows a weather icon from OpenWeatherMap that corresponds to the current conditions.
- **Internationalization (i18n)**: Easily switch the application's language between English and Arabic using a dedicated button.
- **Localized Date & Time**: The date and time are displayed in the selected language's format.
- **Modern UI**: Clean and responsive interface built with Material-UI.

## Technologies Used

- **Framework/Library**: React, Vite
- **UI Components**: Material-UI
- **HTTP Client**: Axios
- **Date & Time**: Moment.js
- **Internationalization**: react-i18next

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or later is recommended)
- npm or another package manager like yarn or pnpm

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd weather
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:5173` (or the next available port).

> **Note**: This project uses an API key from OpenWeatherMap which is currently hardcoded in `src/App.jsx`. For your own development or for production, it is highly recommended to move this key to a `.env` file.
