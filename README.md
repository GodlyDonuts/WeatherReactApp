# 🏓 Pickleball Weather App

A modern, responsive web app to find the best times to play pickleball based on weather conditions in your area. Powered by LocationIQ for geolocation and Open-Meteo for weather data.

---

## ✨ Features
- 🔍 **Location Autocomplete:** Fast, US-only address search with LocationIQ
- 📅 **Multi-day Forecast:** See hourly weather for today and the next 6 days
- 🟢 **Perfect Pickleball Hours:** Highlights hours with ideal temperature and no recent rain
- 🌡️ **Custom Temperature Range:** Adjust what you consider "perfect" for pickleball
- 📱 **Mobile-friendly:** Clean, modern, and fully responsive UI
- ⚡ **Fast:** Built with React + Vite

---

## 🚀 Getting Started

### 1. **Clone the repository**
```bash
git clone https://github.com/yourusername/WeatherReactApp.git
cd WeatherReactApp
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Set up environment variables**
- **LocationIQ:** No .env needed for the provided public key (see below)
- **Open-Meteo:** No API key required
- **If you want to use your own LocationIQ key:**
  - Get one at [LocationIQ](https://locationiq.com/)
  - Replace the key in `src/App.jsx` (`LOCATIONIQ_KEY`)

### 4. **Start the development server**
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠️ Customization
- **Styling:** Edit `src/App.css` for colors, layout, and fonts.
- **Weather logic:** Main logic is in `src/App.jsx`.
- **API endpoints:**
  - LocationIQ Autocomplete: `https://api.locationiq.com/v1/autocomplete`
  - LocationIQ Search: `https://us1.locationiq.com/v1/search`
  - Open-Meteo: `https://api.open-meteo.com/v1/forecast`
- **Environment variables:** Only needed if you want to use your own LocationIQ key.

---

## 🧩 Tech Stack
- [React](https://react.dev/) (with Hooks)
- [Vite](https://vitejs.dev/) (for fast dev/build)
- [LocationIQ](https://locationiq.com/) (geocoding & autocomplete)
- [Open-Meteo](https://open-meteo.com/) (weather data)
- Modern CSS (no frameworks)

---

## 🤝 Contributing
1. Fork this repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit and push (`git commit -am 'Add new feature' && git push`)
5. Open a Pull Request

---

## 📄 License
MIT

---

> Made with ❤️ for pickleball players everywhere!
