# LifeStyleCheck

LifeStyleCheck is a React application designed to help users monitor and improve their lifestyle choices. This project leverages modern web technologies, including Tailwind CSS for styling, Lucide React icons for beautiful UI elements, markdown support for rich content, and Google's Generative AI for intelligent recommendations.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🎯 **Lifestyle Tracking**: Monitor your daily habits and lifestyle choices.
- 🎨 **Modern UI**: Clean and intuitive interface with Tailwind CSS styling.
- 📝 **Markdown Support**: Rich text editing and display with React Markdown.
- 🤖 **AI Integration**: Powered by Google's Generative AI for smart recommendations.
- 🎭 **Icon Library**: Beautiful icons from Lucide React.
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices.

## Tech Stack

- **React**: UI library for building interactive components.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Lucide React**: Icon library with hundreds of beautiful SVG icons.
- **React Markdown**: Component for rendering markdown content.
- **Google Generative AI**: Integration for AI-powered features.
- **Create React App**: Build and development tooling.

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/LifeStyleCheck.git
cd LifeStyleCheck/life-style-check
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (if using Google Generative AI):

Create a `.env.local` file in the root directory:

```
REACT_APP_GOOGLE_API_KEY=your_api_key_here
```

## Getting Started

To run the application in development mode:

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000) in your default browser. The page will automatically reload when you make changes.

## Available Scripts

### `npm start`

Runs the app in development mode.

- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- The page will reload when you make edits.
- Console will show any lint errors.

### `npm test`

Launches the test runner in interactive watch mode.

See the [running tests](https://facebook.github.io/create-react-app/docs/running-tests) documentation for more information.

### `npm run build`

Builds the app for production to the `build` folder.

- Correctly bundles React in production mode.
- Optimizes the build for the best performance.
- Build is minified and filenames include hashes.

### `npm run eject`

**Note: this is a one-way operation. Once you eject, you can't go back!**

If you need to customize the webpack configuration or other tooling, you can eject. This gives you full control but requires you to maintain the configuration yourself.

## Project Structure

```
life-style-check/
├── public/
│   ├── index.html        # Main HTML file
│   ├── manifest.json     # PWA manifest
│   └── robots.txt        # SEO robots file
├── src/
│   ├── App.js            # Main application component
│   ├── App.css           # Application styles
│   ├── index.js          # Entry point
│   ├── index.css         # Global styles
│   ├── reportWebVitals.js # Performance monitoring
│   └── setupTests.js     # Test configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── package.json          # Project dependencies
└── README.md             # This file
```
