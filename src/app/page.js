'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function Home() {

  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [point , setPoint] = useState('');

  useEffect(() => {
    searchForm();
  }, []);

  const searchForm = async (name) =>{
    const url = 'http://localhost:3000/api/worker/'+name;
    const res = await fetch(url, {method: 'GET'});
    const data = await res.json();
    setData(data)
  }

  const updatePoint = async (id, workerpoint, addpoint) => {      
    const respoint = workerpoint + addpoint;
    const changePoint = {
      points: respoint
    }
    const url = 'http://localhost:3000/api/workerid/'+id;
    const res = await fetch(url, {method: 'PUT', body:JSON.stringify(changePoint)});
    searchForm(name);
  }

  return (
    <main className='content'>
        <h1>
          Buscar
        </h1>
        <div className='search'>
            <input 
                type="text" 
                name="name" 
                value={name}
                onChange={({target}) => setName(target?.value)}
            />
            <button type="" className="button" onClick={() => searchForm(name)}>Buscar</button>
        </div>

        <div className="content__worker">
            {
                data.map((w, k) => (
                    <div className="worker">
                        <p>{w.nombre}</p>
                        <p>{w.apellido}</p>
                        <p>{w.points}</p>
                        <input 
                                type="number" 
                                name="point"
                                onChange={({target}) => setPoint(parseInt(target?.value))}
                            />
                            <button 
                              onClick={() => updatePoint(w.idworker, w.points, point)}
                              className="button"
                              >Agregar punto</button>              
                    </div>
                ))
            }                                 
        </div>

        
    </main>
  )
}
