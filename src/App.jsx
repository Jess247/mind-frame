import { useState, useEffect } from 'react'
import Todo from './components/Todo'
import Focus from './components/Focus'

function App() {
  const time = new Date()
  const [bg, setBg] = useState("https://images.unsplash.com/photo-1715589600919-c0f1b626879d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MTk0NzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTgwMTg3NDJ8&ixlib=rb-4.0.3&q=80&w=1080") 
  const [weather, setWeather] = useState({})
  const [currentTime, setCurrentTime] = useState(time.toLocaleString('de-DE', {hour: '2-digit', minute: '2-digit'}))
  const [quote, setQuote] = useState({})
  const [showTodo, setShowTodo] = useState(true)

  const regionNames = new Intl.DisplayNames(['en'], {type: 'region'})


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => 
      fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
          if(res.ok) {
            return res.json()
          } else {
            return Promise.reject(res.status)
          }
        })
        .then(data => setWeather(
          {
            temp: Math.round(data.main.temp), 
            city: data.name, 
            country: regionNames.of(data.sys.country),
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            description: data.weather[0].description
          }))
        .catch(err => console.log(`The following error occurred fetching the weather: ${err}`))
    )
  },[])

  useEffect(() => {
    fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=universe')
    .then(res => {
      if(res.ok) {
        return res.json()
      } else {
        return Promise.reject(res.status)
      }
    })
    .then(data => setBg(data.urls.full))
    .catch(err => console.log(`The following error occurred: ${err}`))
  },[])

  useEffect(() => {
    const interval = setInterval(() => {
      const currTime = new Date()
      setCurrentTime(currTime.toLocaleString('de-DE', {hour: '2-digit', minute: '2-digit'}))
    }, 60000)
  },[currentTime])

  useEffect(() => {
    fetch('https://type.fit/api/quotes')
    .then(res => {
      if(res.ok) {
        return res.json()
      } else {
        return Promise.reject(res.status)
      }
    })
    .then(data => {
      let randomIdx = Math.floor(Math.random() * data.length)
      setQuote({
        text: data[randomIdx].text,
        author:  data[randomIdx].author
      })
    })
    .catch(err => console.log(`The following error occurred: ${err}`))
  },[])

  function handleClick() {
    setShowTodo(prevShowTodo => !prevShowTodo)
  }


  return (
    <main className={`min-h-screen flex flex-col justify-between p-8 bg-no-repeat bg-cover text-white text-shadow text-xl`} 
          style={{backgroundImage: `url(${bg})`}}>
        <div className='flex justify-between text-shadow'>
          <div>
          <button className='drop-shadow hover:scale-105'>
            Focus
          </button>
          <Focus/>
          </div>
          <div className='flex items-center justify-end flex-wrap w-32'>
            <img className='w-14' 
                 src={weather.icon} 
                 alt={weather.descriptions} />
            <span>{weather.temp}°C</span>
            <span className='-mt-2 text-base text-gray-400'>{weather.city}</span>
          </div>
        </div>
        <div className='flex flex-col items-center gap-1 text-shadow'>
          <time className='text-8xl font-bold'>
            <span>{currentTime}</span>
          </time>
          <figure>
            <blockquote cite='https://type.fit/api/quotes' className='text-lg font-xl italic'>
              "{quote.text}"
              <figcaption className='text-right font-thin'>by {quote.author?.split(',').slice(0,1)}</figcaption>
            </blockquote>
          </figure>
        </div>
        <div className='flex justify-between text-shadow'>
          <p>{weather.city}, {weather.country}</p>
          <button onClick={handleClick} className="hover:scale-105">Todo</button>
          <Todo showTodo={showTodo}/>
        </div>
    </main>
  )
}

export default App
