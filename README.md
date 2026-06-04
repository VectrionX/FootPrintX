
# FootprintX 🛡️

**FootprintX** is a professional-grade, passive OSINT (Open-Source Intelligence) web tool designed for investigators, journalists, and security researchers. It automates the generation of advanced search engine dorks to uncover digital footprints across platforms without ever touching target APIs directly.

![FootprintX Hero Screenshot](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000)
*(Replace the URL above with a real screenshot of your app once hosted or committed to your repo)*

## 🎯 Features

- **Multi-Module OSINT**: Specialized dork engines for Instagram, X (Twitter), LinkedIn, Email, and Person Names.
- **Engine Optimized**: Generates custom queries for Google, Bing, and Yandex.
- **100% Passive**: No scraping, no API calls to social platforms, and no target account interaction.
- **Privacy First**: All data processing happens on the client side. Zero logs, zero tracking.
- **Smart Assistant**: Integrated AI (Gemini 3 Flash) to suggest advanced reconnaissance strategies.
- **Validation**: Strict input validation to ensure high-fidelity search queries.

## 🚀 Getting Started

To run FootprintX locally on your machine, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/SuperMag99/FootprintX.git
cd FootprintX
```

### 2. Install Dependencies
Ensure you have [Node.js](https://nodejs.org/) installed.
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add your Google Gemini API Key to enable the Smart Assistant:
```env
API_KEY=your_gemini_api_key_here
```

### 4. Launch the Application
```bash
npm start
# or if using a modern builder:
npm run dev
```
Open `http://localhost:3000` in your browser to start using the tool.

---

## 📖 Usage Guide

### Step 1: Select a Module
From the homepage or navigation bar, choose the intelligence module relevant to your target:
*   **Instagram**: For handles and profile mirrors.
*   **X (Twitter)**: For interaction history and mentions.
*   **LinkedIn**: For professional footprints and CVs.
*   **Email**: For breach indicators and pivoting.
*   **Person**: For full-name identity discovery.

### Step 2: Input Target Data
Enter the username, name, or email of your target. FootprintX will automatically validate the format to ensure the best search results.

### Step 3: Generate & Review Dorks
The tool will generate categorized sections of search queries. Each query includes:
*   **Title & Description**: Explaining what the dork uncovers.
*   **Engine Tag**: Indicating if it's optimized for Google, Bing, or Yandex.
*   **Copy Button**: Quickly copy the query to your clipboard.
*   **Search Button**: Open the query directly in the corresponding search engine in a new tab.

### Step 4: Use the Smart Assistant
If you're stuck or need deeper insights, scroll to the bottom of any module and ask the **AI Smart Assistant** for specialized reconnaissance strategies or to explain a complex search pattern.

---

## 📸 Screenshots

### Homepage
![Homepage](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000)

### Dork Generation Module
![Module UI](https://images.unsplash.com/photo-1510511459019-5dee211c6757?auto=format&fit=crop&q=80&w=1000)

---

## 🛠️ Tech Stack

- **Framework**: React 19
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Engine**: Google Gemini 3 Flash API

## ⚖️ Legal & Ethical Disclaimer

This tool is for **educational and lawful OSINT use only**. FootprintX only generates search engine queries. It does not collect or store personal data, nor does it perform any intrusive scraping or bypass security controls. Users are solely responsible for ensuring their use of these queries complies with local laws and search engine Terms of Service.

## 📜 License

**MIT License**

Copyright (c) 2025 Mohammad Ghanem

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

## 👤 Maintainer

**Mohammad Ghanem**

🔗 **GitHub**: [https://github.com/SuperMag99](https://github.com/SuperMag99)  
🔗 **LinkedIn**: [https://www.linkedin.com/in/mag99/](https://www.linkedin.com/in/mag99/)

---

*All trademarks and service names mentioned in this project are the property of their respective owners.*
