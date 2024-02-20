const container = document.querySelector('.container')
const search = document.querySelector('.search-box button')
const weatherBox = document.querySelector('.weather-box')
const error404 = document.querySelector('.not-found')
const weatherDetails = document.querySelector('.weather-information')
const searchInput = document.querySelector('.search-box input')

searchInput.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		APIpetition()
	}
}) || search.addEventListener('click', () => APIpetition())

const APIpetition = () => {
	const APIKey = 'b58a9c5966d35c37630cb2da9e140c2d'
	const cityName = document.querySelector('.search-box input').value

	if (cityName === '') return

	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`,
	)
		.then((response) => response.json())
		.then((json) => {
			if (json.cod === '404') {
				container.style.height = '400px'
				weatherBox.style.display = 'none'
				weatherDetails.style.display = 'none'
				error404.style.display = 'block'
				error404.classList.add('fade-in')
				return
			}
			error404.style.display = 'none'
			error404.classList.remove('fade-in')

			console.log(json)

			const weatherImage = document.querySelector('.weather-box img')
			const temperature = document.querySelector('.weather-box .temperature')
			const description = document.querySelector('.weather-box .description')
			const humidity = document.querySelector(
				'.weather-information .humidity span',
			)
			const wind = document.querySelector(
				'.weather-information .wind-speed span',
			)

			switch (json.weather[0].main) {
				case 'Clear':
					weatherImage.src = './images/clear.png'
					break

				case 'Rain':
					weatherImage.src = './images/rain.png'
					break

				case 'Snow':
					weatherImage.src = './images/snow.png'
					break

				case 'Clouds':
					weatherImage.src = './images/cloud.png'
					break

				case 'Mist':
					weatherImage.src = './images/mist.png'
					break

				case 'Drizzle':
					weatherImage.src = './images/drizzle.png'
					break
				case 'Thunderstorm':
					weatherImage.src = './images/snow.png'
					break
				default:
					weatherImage.src = ''
			}
			temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
			description.innerHTML = `${json.weather[0].description}`
			humidity.innerHTML = `${json.main.humidity}%`
			wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`

			weatherBox.style.display = ''
			weatherDetails.style.display = ''
			weatherBox.classList.add('fade-in')
			weatherDetails.classList.add('fade-in')
			container.style.height = '590px'
		})
}

searchInput.addEventListener('click', () => {
	searchInput.value = ''
	container.style.height = '105px'
	weatherBox.style.display = 'none'
	weatherDetails.style.display = 'none'
	weatherBox.classList.add('fade-in')
	weatherDetails.classList.add('fade-in')
})

searchInput.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		searchInput.value = ''
		container.style.height = '105px'
		weatherBox.style.display = 'none'
		weatherDetails.style.display = 'none'
		weatherBox.classList.add('fade-in')
		weatherDetails.classList.add('fade-in')
	}
})
