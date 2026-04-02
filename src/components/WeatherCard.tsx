import type { WeatherData } from "../App"
type Props ={
  weatherData:WeatherData
}


export default function ({weatherData}:Props){
  return (   <div>
          <h3>お天気情報：{weatherData.location}</h3>
          <p>気温 : {weatherData.temperature}℃</p>
          <p>湿度 : {weatherData.humidity}%</p>
          <p>風速 : {weatherData.windSpeed}m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
            alt="weather icon"
          ></img>
        </div>)
}