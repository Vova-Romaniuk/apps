import { useEffect, useState } from "react";
import ActionButton from "./ActionButton";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface User {
  id?: string;
  name: { first: string; last: string };
  gender?: string;
  email?: string;
  location: {
    city?: string;
    country?: string;
    coordinates?: Coordinates;
  };
  picture?: {
    large: string;
  };
}

interface WeatherData {
  temp: number;
  temp_min: number;
  temp_max: number;
  windspeed: number;
  weathercode: number;
}

interface Props {
  user: User;
  onSave?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export default function UserCard({ user, onSave, onDelete }: Props) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchWeather = async () => {
    try {
      const coords = user.location.coordinates;
      if (!coords) return;

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

      const res = await fetch(url);
      const data = await res.json();

      setWeather({
        temp: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        weathercode: data.current_weather.weathercode,
        temp_max: data.daily.temperature_2m_max[0],
        temp_min: data.daily.temperature_2m_min[0],
      });
    } catch (err) {
      console.warn("Weather error", err);
    } finally {
      setLoadingWeather(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [user.location.coordinates]);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return "☀️";
    if ([1, 2, 3].includes(code)) return "🌤";
    if ([45, 48].includes(code)) return "🌫";
    if ([51, 53, 55, 56, 57].includes(code)) return "🌦";
    if ([61, 63, 65, 66, 67].includes(code)) return "🌧";
    if ([71, 73, 75, 77].includes(code)) return "❄️";
    if ([80, 81, 82].includes(code)) return "⛈";
    return "🌍";
  };

  return (
    <div className='p-4 flex bg-white/40 backdrop-blur-mg rounded-xl shadow-xl  hover:shadow-lg transition duration-200 relative'>
      <div className='flex items-center gap-4'>
        <img
          src={user.picture?.large || "/default-avatar.png"}
          alt='profile'
          className='w-20 h-20 rounded-full object-cover border'
        />
        <div className='flex-1'>
          <h2 className='font-semibold text-lg text-gray-800'>
            {user.name.first} {user.name.last}
          </h2>
          {user.gender && (
            <p className='text-sm text-gray-500 capitalize'>{user.gender}</p>
          )}
          {user.location.city && (
            <p className='text-sm text-gray-600'>
              {user.location.city}, {user.location.country}
            </p>
          )}
          {user.email && <p className='text-sm text-blue-700'>{user.email}</p>}
        </div>
      </div>

      <div className=''>
        {loadingWeather ? (
          <p className='text-sm text-gray-400 italic'>Loading weather...</p>
        ) : weather ? (
          <div className='flex items-center gap-3'>
            <span className='text-3xl'>
              {getWeatherIcon(weather.weathercode)}
            </span>
            <div>
              <p className='text-sm font-medium text-gray-700'>
                Temp: {weather.temp.toFixed(1)}°C
              </p>
              <p className='text-xs text-gray-500'>
                Min: {weather.temp_min.toFixed(1)}°C | Max:{" "}
                {weather.temp_max.toFixed(1)}°C
              </p>
              <p className='text-xs text-gray-500'>
                Wind: {weather.windspeed} km/h
              </p>
            </div>
          </div>
        ) : (
          <p className='text-sm text-red-500'>Weather data unavailable</p>
        )}
      </div>

      <div className='mt-4 flex gap-2 absolute top-0 right-2'>
        {onSave && (
          <ActionButton
            isActive={isSaved}
            onClick={() => {
              onSave(user);
              setIsSaved(true);
            }}
            text='Save'
            activeText='Saved'
            color='green'
          />
        )}
        {onDelete && (
          <ActionButton
            isActive={isDeleted}
            onClick={() => {
              onDelete(user);
              setIsDeleted(true);
            }}
            text='Delete'
            activeText='Deleted'
            color='red'
          />
        )}
      </div>
    </div>
  );
}
