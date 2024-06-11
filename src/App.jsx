import { useState, useEffect } from 'react'


function App() {
  const [bg, setBg] = useState("https://images.unsplash.com/photo-1715589600919-c0f1b626879d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MTk0NzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTgwMTg3NDJ8&ixlib=rb-4.0.3&q=80&w=1080") 
  const [weather, setWeather] = useState({})


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
            temp:Math.round(data.main.temp), 
            city: data.name, 
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
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${location.lat}&long=${location.long}&units=metric`)
      .then(res => {
        if(res.ok) {
          return res.json()
        } else {
          return Promise.reject(res.status)
        }
      })
      .then(data => setWeather(data))
      .catch(err => console.log(`The following error occurred fetching the weather: ${err}`))
  }, [location])


  return (
    <main className={`min-h-screen flex flex-col justify-between p-8 bg-no-repeat bg-cover text-white text-shadow text-xl`} 
          style={{backgroundImage: `url(${bg})`}}>
        <div className='flex justify-between text-shadow'>
          <p className='drop-shadow'>Focus</p>
          <div className='flex items-center justify-end flex-wrap w-32 '>
            <img className='w-14' 
                 src={weather.icon} 
                 alt={weather.descriptions} />
            <span>{weather.temp}°C</span>
            <span className='-mt-2 text-base text-gray-400'>{weather.city}</span>
          </div>
        </div>
        <div className='flex flex-col items-center gap-1 text-shadow'>
          <time className='text-9xl font-bold'>
            <span id='hour'>1</span>:<span id='minutes'>00</span>
          </time>
          <p className='text-lg font-medium'>
            I am constantly growing and evolving into a better person
          </p>
        </div>
        <div className='flex justify-between text-shadow'>
          <p>Bremen, Germany</p>
          <button>todo</button>
          <div className='absolute right-8 bottom-20 opacity-0'>
            <p>Todo</p>
            <ul>
              <li><input type='checkbox' /> Sample todo <button>del</button></li>
            </ul>
            <input type='text'/>
          </div>
        </div>
    </main>
  )
}

export default App
