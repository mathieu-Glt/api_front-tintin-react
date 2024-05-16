import React, { useEffect, useState } from 'react'
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';


function Oclock() {
    const [value, setValue] = useState(new Date());


    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000);
        console.log("🚀 ~ useEffect ~ interval:", interval)


        return () => {
            clearInterval(interval)
        }
    }, [])


    return (
        <div className='oclock'>
            <Clock className="oclock" value={value} />
        </div>
    )
}

export default Oclock;