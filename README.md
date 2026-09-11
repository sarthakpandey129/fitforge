# FITFORGE 🏋️‍♂️

> A premium, data-driven fitness and nutrition tracker built for athletes who value minimalism and performance over clutter.

![FitForge Stack](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

## The "Why"
I built FITFORGE because I was frustrated with modern fitness applications. Most tracking apps are bloated with social feeds, premium paywalls, and distracting interfaces. I wanted a tool that felt like a professional dashboard—dense, data-rich, dark-themed, and hyper-focused on what actually matters: **Metrics, Progression, and Consistency.**

## Core Features
- 📊 **Minimalist Dashboard**: A dense overview of your daily macros, recent workout streaks, and active phase goals.
- 🏋️ **Active Session Tracking**: A custom-built workout interface that tracks sets, reps, and weights with a live session timer.
- 🍎 **Macro & Nutrition Engine**: Fast, seamless food logging against a curated SQLite database of nutritional profiles.
- 📈 **Progress Analytics**: Monochrome data visualizations plotting max strength lifts, weight fluctuations, and caloric intake over time.
- 🌓 **Isolated Theming**: A crisp, bright onboarding flow that intentionally drops the user into a highly-focused, premium dark-mode application shell.

## Technical Architecture & Challenges

### 1. State Management During Active Workouts
One of the core challenges was handling the state of an active workout session. The UI needed to maintain a running timer, allow the user to cycle through exercises, and track dynamic inputs for multiple sets (weight/reps) simultaneously. 
**Solution:** I utilized a unified client-side state object for the active session, deferring database writes until the user hits "Finish." This avoids unnecessary API calls mid-workout and ensures the UI remains lightning-fast.

### 2. Scroll-Driven Animation Architecture
The landing page features a complex, scroll-linked typography sequence. The challenge was keeping the animation smooth without triggering heavy browser repaints or layout shifts.
**Solution:** I implemented a custom `ScrollManager` leveraging `requestAnimationFrame`. Instead of animating top/left properties, the system strictly utilizes hardware-accelerated CSS properties (`transform: translateY`, `scale`, and `opacity`), resulting in a locked 60FPS experience.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Vanilla architecture, strict no-glassmorphism/no-gradient design system)
- **Database:** SQLite with Prisma ORM
- **Authentication:** NextAuth.js
- **Data Visualization:** Recharts

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/sarthakpandey129/fitforge.git
   cd fitforge
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Setup the database
   ```bash
   npx prisma db push
   npm run seed
   ```
4. Run the development server
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---
*Built with discipline and caffeine.*
