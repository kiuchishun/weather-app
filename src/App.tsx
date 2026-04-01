import { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
type WeatherData = {
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
      setWeatherData(null)

      setLoading(true);

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const res = await fetch(url)
      if(!res.ok){
        throw new Error (`HTTPエラー:${res.status}`)
      }
      const data = await res.json()
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

  const display = () => {
    if (errorMsg) {
      return <div>{errorMsg}</div>;
    }
    if (!weatherData) {
      return <div>データなし</div>;
    }

    return (
      <div>
        <h3>お天気情報：{weatherData.location}</h3>
        <p>気温 : {weatherData.temperature}℃</p>
        <p>湿度 : {weatherData.humidity}%</p>
        <p>風速 : {weatherData.windSpeed}m/s</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
          alt="weather icon"
        ></img>
      </div>
    );
  };

  useEffect(() => {
    search("Tokyo");
  }, []);
  return (
    <>
      <h1>お天気アプリ</h1>
      <h3>英語で都市名を入力してください</h3>
      <SearchForm search={search}/>
      

      <div> {loading ? "ロード中" : display()}</div>
    </>
  );
};
export default App;
