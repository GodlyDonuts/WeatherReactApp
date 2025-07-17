# 🌤️ Weather Search App

A modern, responsive web application for searching and viewing detailed weather forecasts. Built with React and Vite, featuring location autocomplete, multi-day hourly forecasts, and customizable temperature preferences.

---

## ✨ Features
- 🔍 **Smart Location Search:** Real-time autocomplete with LocationIQ API
- 📅 **7-Day Hourly Forecast:** Detailed weather data for today and the next 6 days
- 🌡️ **Customizable Temperature Range:** Set your preferred temperature range for ideal conditions
- 💨 **Wind Speed Data:** View wind conditions alongside temperature and precipitation
- 📱 **Mobile-First Design:** Fully responsive interface optimized for all devices
- ⚡ **Fast Performance:** Built with React 19 and Vite for optimal speed
- 🚀 **Deployed:** Live on GitHub Pages

---

## 🚀 Getting Started

### 1. **Clone the repository**
```bash
git clone https://github.com/GodlyDonuts/WeatherReactApp.git
cd WeatherReactApp
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Set up environment variables (optional)**
- **LocationIQ:** Uses a public key by default, but you can use your own:
  - Get a free key at [LocationIQ](https://locationiq.com/)
  - Create a `.env` file and add: `VITE_LOCATIONIQ_KEY=your_key_here`
- **Open-Meteo:** No API key required (free weather data)

### 4. **Start the development server**
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### 5. **Build for production**
```bash
npm run build
```

### 6. **Deploy to GitHub Pages**
```bash
npm run deploy
```

---

## 🛠️ Features in Detail

### **Location Search**
- Real-time autocomplete as you type
- Supports cities, zip codes, and addresses
- US-focused location search
- Fallback search for broader area matching

### **Weather Data**
- **Temperature:** Current and forecasted temperatures in Fahrenheit
- **Precipitation:** Hourly precipitation amounts in inches
- **Wind Speed:** Wind conditions in mph (converted from m/s)
- **7-Day Forecast:** Hourly data for today plus 6 days ahead

### **Customization**
- **Temperature Range:** Adjust minimum and maximum temperature preferences
- **Day Selection:** Click between different days to view hourly forecasts
- **Mobile Responsive:** Optimized layout for phones and tablets

---

## 🧩 Tech Stack
- [React 19](https://react.dev/) (with Hooks)
- [Vite](https://vitejs.dev/) (fast development and build)
- [LocationIQ](https://locationiq.com/) (geocoding & autocomplete)
- [Open-Meteo](https://open-meteo.com/) (free weather data API)
- [GitHub Pages](https://pages.github.com/) (deployment)
- Modern CSS (responsive design, no frameworks)

---

## 📱 Live Demo
Visit the live application: [Weather Search App](https://GodlyDonuts.github.io/WeatherReactApp/)

---

## 🚀 Deployment
The app is automatically deployed to GitHub Pages. The `gh-pages` package is configured for easy deployment:

```bash
npm run deploy
```

---

## 🤝 Contributing
1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

## 📄 License
MIT License - feel free to use this project for your own weather applications!

---

> Built with ❤️ using React and modern web technologies
