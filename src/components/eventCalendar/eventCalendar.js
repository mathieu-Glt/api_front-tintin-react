import React from 'react'

export default function EventCalendar({ handleSubmit, eventData, handleChange}) {
  console.log("🚀 ~ EventCalendar ~ handleChange:", handleChange)
  console.log("🚀 ~ EventCalendar ~ eventData:", eventData)
  console.log("🚀 ~ EventCalendar ~ handleSubmit:", handleSubmit)
  return (
    <div>
        {/* Formulaire de création d'événement */}
        <h3>Créer un évènement</h3>
        <form onSubmit={handleSubmit}>
        <div>
            <label>Titre:</label>
              <input type="text" name="summary" value={eventData.summary} onChange={handleChange} />
            </div>
            <div>
              <label>Description:</label>
              <textarea name="description" value={eventData.description} onChange={handleChange} />
            </div>
            <div>
              <label>Date de début:</label>
              <input type="datetime-local" name="startDateTime" value={eventData.startDateTime} onChange={handleChange} />
            </div>
            <div>
              <label>Date de fin:</label>
              <input type="datetime-local" name="endDateTime" value={eventData.endDateTime} onChange={handleChange} />
            </div>
            <button type="submit">Créer l'événement</button>
        </form>

    </div>
  )
}
