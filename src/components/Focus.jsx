import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'


export default function Focus() {
    const [isFocus, setIsFocus] = useState(true) 
    const [value, setValue] = useState(0)
    const [on, setOn] = useState(false)

    const maxVal = isFocus ? 1500 : 300
    const beep = new Audio('../assets/beep.mp3')


    useEffect(() => {
        let timer

        if (value === maxVal || !on) {
            if(!on && value < maxVal) {
                clearInterval(timer)
            } else {
                setValue(0)
                setIsFocus(preFocus => !preFocus)
                clearInterval(timer) 
            }
        } 
        
        if(on) {
            timer = setInterval(() => {
                setValue(prevVal => prevVal + 1)
            }, 1000)
        }

        return () => clearInterval(timer) 

    
    }, [on, value])

    function handleClick() {
        setOn(prevOn => !prevOn)
    }



    return(
        <section className='bg-slate-800/[.54] p-5 absolute text-center rounded-xl w-1/4 flex flex-col items-center gap-6'>
            <div>
                <p className='mb-1 text-3xl'>Promodoro</p>
                <p className='text-base font-light'>Focus for 25 minutes, than take a break.</p>    
            </div>
            <div className=' w-40 '>
                <CircularProgressbar 
                    value={value} 
                    maxValue={maxVal} 
                    text={isFocus ? 'Focus' : 'Break'}
                    styles={buildStyles({
                        pathColor: `rgba(59, 227, 104)`,
                        textColor: '#fff',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7'  
                    })}/>
            </div>
            <button className='bg-green-400 text-black py-1 px-4 rounded-lg text-base font-bold hover:bg-slate-500/[.54]'
                    onClick={handleClick}>
                {on ? 'Pause' : 'Start'}
            </button>
        </section>
    )
}