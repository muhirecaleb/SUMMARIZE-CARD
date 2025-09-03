SUMMARIZE-CARD

A web app that lets you upload documents and uses AI to summarize them into flash cards for easier studying and revision.

Built with React, Tailwind CSS, React-Toastify, and powered by Gemini API.

✨ Features

📂 Upload documents

🤖 AI summarization using Gemini API

🃏 Generate interactive flash cards

🎨 Clean UI with Tailwind CSS

🔔 Notifications with React-Toastify

🚀 Installation

Clone the repository:

git clone https://github.com/muhirecaleb/SUMMARIZE-CARD.git
cd SUMMARIZE-CARD


Install dependencies:

npm install


Add your Gemini API key in data.js:

// data.js
export const GEMINI_API_KEY = "your_api_key_here";


Run the app:

npm run dev

📖 Usage

Open http://localhost:5173/ in your browser.

Upload your document (PDF, text, etc.).

The AI will summarize it.

Flash cards are generated for you to review and study.

🛠️ Tech Stack

React — UI framework

Tailwind CSS — Styling

React-Toastify — Notifications

Vite — Fast dev server and bundler

Gemini API — AI text summarization

📂 Project Structure
.
├── public/          # Static assets
├── src/             # React components & logic
│   ├── components/  # UI components
│   ├── pages/       # Page components
│   ├── data.js      # Gemini API key
│   └── App.js       # Main app
├── package.json     # Dependencies & scripts
├── tailwind.config.js
├── vite.config.js
└── README.md

⚠️ Notes

You must add your own Gemini API key in data.js.

Keep your API key private and never commit it to GitHub.

🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

📜 License

This project is licensed under the MIT License
.
