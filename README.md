# Typing Speed Test

## Overview
This is a **Typing Speed Test** application built using **React.js**. It measures the user's **Words Per Minute (WPM)** and **accuracy** while typing a randomly generated text. The app also tracks the total **elapsed time in seconds and milliseconds** and allows users to finish or reset the test anytime.

## Features
-  Displays a **random text** for typing
- Tracks **typing speed (WPM)** in real-time
- Measures **typing accuracy**
- Shows **elapsed time** in seconds and milliseconds
- Allows users to **finish the test manually**
- Reset button to **restart the test**
- Highlights **incorrect characters in red**

## Technologies Used
- **React.js** (Functional Components, Hooks)
- **useState, useEffect, useRef** (State Management & Timer Handling)
- **CSS** (Basic Styling)

## How It Works
1. When the app loads, it fetches a random **150-word text**.
2. As the user starts typing, the **timer starts automatically**.
3. The app continuously calculates:
   - **Elapsed time** in milliseconds.
   - **Words per minute (WPM)**.
   - **Typing accuracy** by comparing input with the original text.
4. If the user completes the text or presses **Finish Test**, the test stops.
5. The user can **reset the test** to start over.

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/varshadhanotiya/typing-speed.git
   cd typing-speed
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage
- Start typing in the **textarea**.
- The timer will start automatically.
- View your **WPM, accuracy, and elapsed time** in real time.
- Click **Finish Test** to stop and review your result.
- Click **Reset Test** to start again.

## 📌 Future Enhancements
- 🔹 Add difficulty levels (easy, medium, hard)
- 🔹 Add leaderboard to track high scores
- 🔹 Add user authentication to save progress
