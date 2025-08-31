# 🎵 Vibelog

**Your Spotify listening habits, visualized.**

A music analytics dashboard that connects to your Spotify account and shows you beautiful insights about your listening patterns.

## What's implemented

- **Spotify OAuth login** - authenticate with your Spotify account
- **Analytics dashboard** - beautiful charts showing your music data
- **Listening activity tracking** - see your daily/monthly music consumption
- **Audio features analysis** - discover patterns in your music taste
- **Profile page** - view your personalized music analytics

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS + ECharts
- **Backend**: Node.js + Express + MongoDB
- **Integration**: Spotify Web API for listening data

## Quick Start

```bash
# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Set up environment variables (Spotify app credentials + MongoDB)
# See .env.example files

# Run the app
npm run dev  # in both frontend/ and backend/
```

## Current Features

- **Spotify login flow** - OAuth integration working
- **Real-time analytics** - pulls your actual listening data  
- **Beautiful charts** - smooth lines with gradients using ECharts
- **Profile dashboard** - duplicate of results page for logged-in users

Built for a hackathon, now actually useful for tracking your music habits.