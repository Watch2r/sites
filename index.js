// Замените 'YOUR_API_KEY' на ваш собственный ключ с OpenWeatherMap
const apiKey = '48f6474e55bb773cca24b29812550d23';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Функция для получения данных о погоде
async function getWeather(city) {
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
}

// Функция для обновления интерфейса с данными о погоде
function updateUI(weatherData) {
    document.getElementById('city').innerText = weatherData.name;
    document.getElementById('temperature').innerText = `${Math.round(weatherData.main.temp)}°C`;
    document.getElementById('description').innerText = weatherData.weather[0].description;

    // Используйте иконки погоды от OpenWeatherMap
    document.getElementById('weather-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" alt="Weather Icon">`;
}

// Функция для обработки запроса пользователя
async function searchWeather() {
    const cityInput = prompt('Введите название города:');
    if (cityInput) {
        try {
            const weatherData = await getWeather(cityInput);
            updateUI(weatherData);
        } catch (error) {
            console.error('Ошибка получения данных о погоде', error);
            alert('Не удалось получить данные о погоде. Пожалуйста, попробуйте еще раз.');
        }
    }
}

// Запуск функции при открытии страницы
searchWeather();