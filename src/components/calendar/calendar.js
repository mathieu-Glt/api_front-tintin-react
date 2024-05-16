import React, { useEffect, useState } from 'react'
import './calendar.css'
import EventCalendar from '../eventCalendar/eventCalendar';
import axios from 'axios';
import { api_url } from '../../configApi/Request';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


export default function   ReactCalendar(props) {
  console.log("🚀 ~ Calendar ~ props:", props)
  const [accessToken, setAccessToken] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0)
  const [createEvent, setCreateEvent] = useState(false)
  const [eventData, setEventData] = useState({
    summary: '',
    description: '',
    startDateTime: '',
    endDateTime: ''
  })
  const [value, onChange] = useState(new Date());
  console.log("🚀 ~ ReactCalendar ~ value:", value);

  const body = {
     sum: eventData.summary,
     des: eventData.description,
     stT: eventData.startDateTime,
     enT: eventData.endDateTime,
     date: value

  }
  console.log("🚀 ~ ReactCalendar ~ body:", body)

  
  useEffect(() => {
    const tokenStorage = JSON.parse(localStorage.getItem('user')).token
    console.log("🚀 ~ useEffect ~ tokenStorage:", tokenStorage)
    if(tokenStorage){
      setAccessToken(tokenStorage)
    }
    else {
      setAccessToken(null)
    }
  }, [])

  const handleClickCreateEvent = () => {
    setCreateEvent(!createEvent)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const  handleSubmit = async (e) => {
    e.preventDefault()
    try {
         // Créer l'événement dans Google Calendar
      await axios.post(`${api_url}/api/calendar/create`, eventData, {
        headers: {
            "x-access-token": JSON.parse(localStorage.getItem('user')).token,
        },
      });
      console.log('Event created successfully!');

    // Réinitialiser le formulaire
    setEventData({
        summary: '',
        description: '',
        startDateTime: '',
        endDateTime: '',
      });
  
    } catch (error) {
        console.error('Error creating event:', error);
    }

  }
  

  return (
   <>
    { accessToken ? (
        <div className='calendar'>
            <h3> Google calendar events</h3>
            <Calendar showNavigation={true} onChange={onChange} selectRange={true} calendarType='iso8601' value={value}/>
        <button onClick={handleClickCreateEvent}>Create Event</button>
            { createEvent ? <EventCalendar
                                eventData={eventData}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                            /> : null}      

        </div>
    ) : (
        <div>
            <p>Veuillez vous connecter pour afficher vos événements Google Calendar...</p>
        </div>
        
    )}

     </>
   
  )
}
