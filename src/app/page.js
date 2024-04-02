'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import estilo from "../../public/scss/main.module.scss"

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
    console.log(data)
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

  const restarPoint = async (id, workerpoint, addpoint) => {      
    const respoint = workerpoint - addpoint;
    const changePoint = {
      points: respoint
    }
    const url = 'http://localhost:3000/api/workerid/'+id;
    const res = await fetch(url, {method: 'PUT', body:JSON.stringify(changePoint)});
    searchForm(name);
  }

  return (
    <main className=''>
      <div className={estilo.headerworker}>

        <div className={estilo.container}>
            <div className={estilo.gridcol}>
                <div className={`${estilo.grids2} ${estilo.gridm3} ${estilo.gridl3}`}>
                    <div className={estilo.headerworker__logo}>
                        <img src="/image/morena-isotipo-blanco.png" alt="" />
                    </div>
                </div>
                <div className={`${estilo.grids2} ${estilo.gridm4} ${estilo.gridl5}`}></div>
                <div className={`${estilo.grids8} ${estilo.gridm5} ${estilo.gridl4}`}>                        
                      <div className='search'>
                          <input 
                              type="text" 
                              name="name" 
                              value={name}
                              onChange={({target}) => setName(target?.value)}
                          />
                          <button type="" className="button" onClick={() => searchForm(name)}>Buscar</button>
                      </div>
                </div>
            </div>
        </div>

      </div>

      <div className={estilo.tableworker}>
          <div className={estilo.container}>
              <div className={estilo.gridcol}>
                  <div className={`${estilo.grids12} ${estilo.gridm12} ${estilo.gridl12}`}>
                      <div className="content__worker">
                          <div className="">
                              <div className="worker headworker listainfoworker__search">
                                  <p>NOMBRE Y APELLIDO</p>
                                  <p>PUNTAJE</p>
                                  <p>ACTION</p>
                              </div>
                          </div>    

                          {
                            data.length <= 0 ? (
                              <p className={estilo.mensaje}>COLABORADOR NO REGISTRADO</p>
                            ) : (
                              data.map((w, k) => (
                                  <div className="worker listinfoworker listainfoworker__search">
                                      <p>{w.nombre} {w.apellido}</p>
                                      <p>{w.points}</p>
                                      <div className={`${estilo.tableworker__list} ${estilo.tableworker__search}`}>
                                          <input 
                                              type="number" 
                                              name="point"
                                              onChange={({target}) => setPoint(parseInt(target?.value))}
                                          />
                                          <div className={estilo.listaction}>
                                            <button 
                                              onClick={() => updatePoint(w.idworker, w.points, point)}
                                              className="button button--more"
                                              ><i class="ri-add-line"></i></button>
                                              <button 
                                              onClick={() => restarPoint(w.idworker, w.points, point)}
                                              className="button button--restar"
                                              ><i class="ri-subtract-line"></i></button>   
                                          </div> 
                                      </div>              
                                  </div>
                              ))
                            )
                          }

                      </div>
                  </div>
              </div>
          </div>
      </div>        
    </main>
  )
}
