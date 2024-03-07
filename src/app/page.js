'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function Home() {

  const [name, setName] = useState("");
  const [point, setPoint] = useState([]);
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

  const updatePoint = async (id, point, updatepoint) => {
    const Numpoint = parseInt(updatepoint);  
    const respoint = point + Numpoint;
    const changePoint = {
      id: id,
      point: point,
        points: respoint
    }

    //console.log(changePoint)
    /*const url = 'http://localhost:3000/api/workerid/'+id;
    const res = await fetch(url, {method: 'PUT', body:JSON.stringify(changePoint)});
    searchForm(name);*/
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
                data.map((w, k) => (
                    <div className="worker">
                        <p>{w.nombre}</p>
                        <p>{w.apellido}</p>
                        <p>{w.points}</p>
                        <input 
                                type="number" 
                                name="point"
                                value={point.find(p => p.id == w.idworker)}
                                onChange={({target}) => 
                                {setPoint([...point,{id: w.idworker, value: target?.value}])
                                  console.log(target?.value)
                                  console.log(point) 
                                }}

                              //onChange={({target}) => setPoint(target?.value)}
                            />
                            <button onClick={() => updatePoint(w.idworker, w.points, point.find(p => p.id == w.idworker))}>Agregar punto</button>              
                    </div>
                ))
            }                                 
        </div>

        
    </main>
  )
}
