# 🌤️ WeatherReactApp

A modern, minimalistic React app to check the weather for any location by zipcode or street address. Powered by the OpenWeatherMap API.

---

## ✨ Features
- 🔍 Search weather by **zipcode** or **full street address**
- 🌎 Uses OpenWeatherMap Geocoding for address lookup
- 📱 Responsive, sleek, and accessible UI
- ⚡ Fast, Vite-powered React app
- 🔒 API key managed securely via environment variables

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
Create a `.env` file in the project root:
```env
VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key_here
```
> 🔑 Get your free API key at [OpenWeatherMap](https://openweathermap.org/api)

### 4. **Start the development server**
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠️ Customization
- **Styling:** Edit `src/App.css` for colors, layout, and fonts.
- **Weather logic:** Main logic is in `src/App.jsx`.
- **API endpoints:** Uses OpenWeatherMap's `/weather` and `/geo/1.0/direct` endpoints.
- **Environment variables:** All secrets should go in `.env` (never commit this file!).

---

## 🧩 Tech Stack
- [React](https://react.dev/) (with Hooks)
- [Vite](https://vitejs.dev/) (for fast dev/build)
- [OpenWeatherMap API](https://openweathermap.org/api)
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

> Made with ❤️ by Saicharan Ramineni — feel free to use, modify, and share!
