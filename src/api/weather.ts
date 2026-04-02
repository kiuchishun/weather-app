 export  const fetchWeather = async (city: string) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `HTTPエラー:${res.status}`);
    }

    return {
      humidity: data.main.humidity,
      temperature: Math.floor(data.main.temp),
      windSpeed: data.wind.speed,
      location: data.name,
      icon: data.weather[0].icon,
    };
  };