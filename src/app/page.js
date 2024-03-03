'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function Home() {

  const [name, setName] = useState("");
  const [point, setPoint] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    searchForm();
  }, []);

  const searchForm = async (name) =>{
    const url = 'http://localhost:3000/api/worker/'+name;
    const res = await fetch(url, {method: 'GET'});
    const data = await res.json();
    setData(data)
  }

  const updatePoint = async (id, point) => {
    const url = 'http://localhost:3000/api/workerid/'+id;
    const res = await fetch(url, {method: 'PUT'});
    const data = await res.json();
  }

  return (
    <main>
        <h1>
          Buscar
        </h1>
        <div>
            <input 
                type="text" 
                name="name" 
                value={name}
                onChange={({target}) => setName(target?.value)}
            />
        </div>
        <button type="" onClick={() => searchForm(name)}>Buscar</button>

        <div className="content__worker">
            {
                data.map(w => (
                    <div className="worker">
                        <p>{w.nombre}</p>
                        <p>{w.points}</p>
                        <input 
                                type="number" 
                                name="point"
                                value={point}
                                onChange={({target}) => setPoint(target?.value)}
                            />
                            <button onClick={() => updatePoint(w.id, point)}></button>              
                    </div>
                ))
            }                                 
        </div>

        
    </main>
  )
}
