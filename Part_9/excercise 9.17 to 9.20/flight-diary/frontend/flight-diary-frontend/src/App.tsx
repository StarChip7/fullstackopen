import { useEffect, useState } from 'react'
import axios from 'axios'


enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

const Notification = ( { error}: { error: string | null }) => {

  if (!error) return null

  return (
    <div style={{ color: 'red' }}>
      {error}
    </div>
  )
}

function App() {

  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/diaries')
      .then(response => {
        setDiaries(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Flight Diary</h1>
      <h1>Add New Diary Entry</h1>
      <Notification error={error}/>
      <form onSubmit={(e) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const newEntry: NewDiaryEntry = {
          date: formData.get('date') as string,
          weather: formData.get('weather') as Weather,
          visibility: formData.get('visibility') as Visibility,
          comment: formData.get('comment') as string,
        }
        axios.post<NonSensitiveDiaryEntry>('/api/diaries', newEntry)
          .then(response => {
            setDiaries(diaries.concat(response.data))
            form.reset()
          }).catch(error).then(() => {
            if (axios.isAxiosError(error)) {
              setError(error.response?.data || 'Error adding diary entry')
            }else {
              console.error(error)
            }
          })
      }}>
        <div>
          <label>Date:</label>
          <input type="date" name="date" required />
        </div>
        <div>
          <label>Weather:</label>
          {Object.values(Weather).map(w => (
            <label key={w}>
              <input type="radio" name="weather" value={w} required />
              {w}
            </label>
          ))}
        </div>
        <div>
          <label>Visibility:</label>
          {Object.values(Visibility).map(v => (
            <label key={v}>
              <input type="radio" name="visibility" value={v} required />
              {v}
            </label>
          ))}
        </div>
        <div>
          <label>Comment:</label>
          <input type="text" name="comment" required />
        </div>
        <button type="submit">Add Diary Entry</button>
      </form>
      <ul>
        {diaries.map(diary => (
          <li key={diary.id}>
            <strong>{diary.date}</strong> - Weather: {diary.weather}, Visibility: {diary.visibility}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
