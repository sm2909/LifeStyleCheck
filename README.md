# LifeStyleCheck

LifeStyleCheck is a **Smart AI-Based Lifestyle Self-Assessment Tool** designed to support workers, artisans, and students by helping them understand and improve their daily routines. This chat-based web application asks 10 simple, non-medical lifestyle questions covering areas such as sleep, physical activity, diet, hydration, stress, screen time, work–life balance, and social interaction.

Using **Generative AI (Google Gemini API)**, the system analyzes user responses and generates a structured lifestyle report highlighting positive habits, potential risk areas, and realistic improvement suggestions. The solution does not store personal data, ensuring privacy and ethical usage.

This project aligns with NSS themes of **Artisans, Industries and Livelihood** and **Basic Amenities**, focusing on improving daily well-being, awareness, and productivity through smart technology.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🤖 **AI-Powered Assessment**: 10-question conversational self-assessment using Google Gemini API
- 📱 **User-Friendly Interface**: Dark-themed, SaaS-style UI with Tailwind CSS
- 🔒 **Privacy-Focused**: No personal data storage, anonymous usage
- 📝 **Structured Reports**: Actionable lifestyle insights and improvement suggestions
- 🎯 **Non-Medical Approach**: Focus on habits and routines, not health diagnosis
- 🌍 **Accessible Design**: Suitable for users with varying digital literacy levels
- 📊 **Responsive**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React, Tailwind CSS, Lucide React icons
- **AI Integration**: Google Generative AI (Gemini API)
- **Build Tool**: Create React App (with Vite support for testing)
- **Deployment**: Cloudflare Pages (Wrangler)
- **Testing**: Vitest, React Testing Library
- **Markdown Rendering**: React Markdown

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Google Gemini API key (from Google AI Studio)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/sm2909/LifeStyleCheck.git
cd LifeStyleCheck
```

2. Install dependencies:

```bash
npm install
```

## Environment Setup

1. Obtain a Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

2. Create a `.env.local` file in the root directory of the project:

```bash
touch .env.local
```

3. Add your API key to the `.env.local` file:

```
REACT_APP_GOOGLE_API_KEY=your_actual_api_key_here
```

**Important**: Never commit the `.env.local` file to version control. It is already included in `.gitignore`.

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

### `npm run deploy`

Deploys the app to GitHub Pages using gh-pages.

- Runs `npm run build` first
- Deploys the `build` folder to GitHub Pages

### `npm run eject`

**Note: this is a one-way operation. Once you eject, you can't go back!**

If you need to customize the webpack configuration or other tooling, you can eject. This gives you full control but requires you to maintain the configuration yourself.

## Project Structure

```
LifeStyleCheck/
├── public/
│   ├── index.html          # Main HTML template
│   ├── manifest.json       # PWA manifest for app installation
│   └── robots.txt          # SEO robots configuration
├── src/
│   ├── App.css             # Main application styles
│   ├── App.js              # Root React component
│   ├── App.test.js         # Tests for App component
│   ├── index.css           # Global CSS styles
│   ├── index.js            # React application entry point
│   ├── reportWebVitals.js  # Web vitals reporting
│   └── setupTests.js       # Test setup configuration
├── test/
│   └── index.spec.js       # Additional test files
├── build/                  # Production build output (generated)
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   └── static/
│       ├── css/
│       └── js/
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── vitest.config.js        # Vitest testing configuration
├── wrangler.toml           # Cloudflare Pages deployment config
├── wrangler.jsonc          # Alternative Cloudflare config
├── Report.md               # Project report and documentation
└── README.md               # This file
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
