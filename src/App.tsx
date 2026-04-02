import { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import WeatherCard from "./components/WeatherCard";
import StatusMessage from "./components/StatusMessage";
export type WeatherData = {
  humidity: number;
  temperature: number;
  windSpeed: number;
  location: string;
  icon: string;
};
const App = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const search = async (city: string) => {
    try {
      setErrorMsg("");
      setWeatherData(null);

      setLoading(true);

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTPエラー:${res.status}`);
      }
      const data = await res.json();
      if (data.cod !== 200) {
        throw new Error(data.message || "天気情報を取得できませんでした");
      }

      setWeatherData({
        humidity: data.main.humidity,
        temperature: Math.floor(data.main.temp),
        windSpeed: data.wind.speed,
        location: data.name,
        icon: data.weather[0].icon,
      });
    } catch (err) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("天気情報を取得できませんでした");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search("Tokyo");
  }, []);
  return (
    <>
      <h1>お天気アプリ</h1>
      <h3>英語で都市名を入力してください</h3>
      <SearchForm search={search} />
      <StatusMessage errorMsg={errorMsg} loading={loading} />
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </>
  );
};
export default App;
