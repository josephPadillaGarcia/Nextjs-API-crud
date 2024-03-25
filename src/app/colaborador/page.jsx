'use client'
import { useState, useEffect } from "react";
import estilo from "../../../public/scss/main.module.scss"

function Colaborador(){

    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [dni, setDni] = useState("");
    const [cargo, setCargo] = useState("");
    /*const cargoPromotor = "promotor";    
    const cargoCabeza = "cabeza";
    const cargoCoordinador = "coordinador";
    const cargoJefe = "jefe de equipo"*/
    const cargoworker = "";
    const point = 0;

    const [data, setData] = useState([]);

    useEffect(() => {
        getDataWorker();
        //getDataCargoWorker(cargoworker);
        /*if (cargoworker == "") {
            const cargoworker = "promotor";
            getDataCargoWorker(cargoworker);
        }*/
    }, [])

    const getDataWorker = async () =>{
        const url = 'http://localhost:3000/api/worker';
        const res = await fetch(url, {method: 'GET', cache: 'no-cache'});
        const resultados  = await res.json();
        setData(resultados.data);
    }

    const getDataCargoWorker = async (cargoworker) =>{
             
        console.log("cargo: " + cargoworker);
        if (data.length > 0) {
            setData([]);
        }
        //console.log("data:"+data);
        const url = 'http://localhost:3000/api/workercargo/'+cargoworker;
        const res = await fetch(url, {method: 'GET', cache: 'no-cache'});
        const resultcargo  = await res.json();
        setData(resultcargo.data);
    }

    const getDataPromotoresWorker = async (cargoworker) => {
        if (cargoworker == "") {
            const cargoworker = "promotor";
            getDataCargoWorker(cargoworker);
            //console.log("cargo: " + cargoworker);
        }
        //console.log("cargo: " + cargoworker);
    }

    const deleteworker = async (id) =>{        
        //console.log("id: " + id);
        const url = 'http://localhost:3000/api/workerid/'+id;
        const res = await fetch(url, {method: 'DELETE'});
        getDataWorker();
    }

    const submitForm = (e) =>{
        e.preventDefault();

        try {
            const numAge = parseInt(age);
            const numDni = parseInt(dni);
            const newWorker = {
                nombre: name,
                apellido: lastname,
                edad: numAge,
                dni: numDni,
                points: point,
                cargo: cargo
            }

            fetch('http://localhost:3000/api/worker', {
                method: 'POST',
                body: JSON.stringify(newWorker),
            }).then(()=>(getDataWorker())).catch((e)=>(console.log(e)))
            
        } catch (error) {
            
        }
    }

    return(
        <div className="main">
            <div className={estilo.headerworker}>

                <div className={estilo.container}>
                    <div className={estilo.gridcol}>
                        <div className={`${estilo.grids12} ${estilo.gridm6} ${estilo.gridl3}`}>
                            <div className={estilo.headerworker__logo}>
                                <img src="/image/morena-isotipo-blanco.png" alt="" />
                            </div>
                        </div>
                        <div className={`${estilo.grids12} ${estilo.gridm6} ${estilo.gridl6}`}></div>
                        <div className={`${estilo.grids12} ${estilo.gridm6} ${estilo.gridl3}`}>                        
                            <div className={estilo.headerworker__boton}>
                                <a href="#!">Agregar Usuario</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className={estilo.tipocargoworker}>
                <div className={estilo.container}>
                    <div className={estilo.gridcol}>
                        <div className={`${estilo.grids12} ${estilo.gridm6} ${estilo.gridl3}`}>                        
                            <div className={estilo.tipocargoworker__boton}>
                                <button onClick={() => getDataPromotoresWorker(cargoworker)}>PROMOTORES</button>
                            </div>
                        </div>
                        <div className={`${estilo.grids12} ${estilo.gridm6} ${estilo.gridl3}`}>                        
                            <div className={estilo.tipocargoworker__boton}>
                                <button onClick={() => getDataCabezasWorker(cargoworker)}>CABEZAS</button>
                            </div>
                        </div>
                        <div className={`${estilo.grids12} ${estilo.gridm6} ${estilo.gridl3}`}>                        
                            <div className={estilo.tipocargoworker__boton}>
                                <button onClick={() => getDataCoordinadoresWorker(cargoworker)}>COORDINADORES</button>
                            </div>
                        </div>
                        <div className={`${estilo.grids12} ${estilo.gridm6} ${estilo.gridl3}`}>                        
                            <div className={estilo.tipocargoworker__boton}>
                                <button onClick={() => getDataJefeWorker(cargoworker)}>JEFE DE EQUIPO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content">
                <div className="form-content">
                    <h2>Colaboradores</h2>
                    <form method="" action="" onSubmit={submitForm}>
                        <div className="form-block">
                            <label>Nombre</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={name}
                                onChange={({target}) => setName(target?.value)}
                            />
                        </div>

                        <div className="form-block">
                            <label>Apellido</label>
                            <input 
                                type="text" 
                                name="lastname" 
                                value={lastname}
                                onChange={({target}) => setLastName(target?.value)}
                            />
                        </div>

                        <div className="form-block">
                            <label>Edad</label>
                            <input 
                                type="number" 
                                name="age"
                                value={age}
                                onChange={({target}) => setAge(target?.value)}
                            />
                        </div>

                        <div className="form-block">
                            <label>DNI</label>
                            <input 
                                type="number" 
                                name="dni"
                                value={dni}
                                onChange={({target}) => setDni(target?.value)}
                            />
                        </div>

                        <div className="form-block">
                            <label>Cargo</label>
                            <input 
                                type="text" 
                                name="Cargo"
                                value={cargo}
                                onChange={({target}) => setCargo(target?.value)}
                            />
                        </div>

                        <button type="submit" className="button">Agregar Colaborador</button>
                    </form>
                </div>
            </div>

            <div className={estilo.tableworker}>
                <div className={estilo.container}>
                    <div className={estilo.gridcol}>
                        <div className={`${estilo.grids12} ${estilo.gridm6} ${estilo.gridl9}`}>
                            <div className="content__worker  content__worker__scroll">
                                <div className="">
                                    <div className="worker">
                                        <p>NOMBRE Y APELLIDO</p>
                                        <p>PUNTAJE</p>
                                        <p>ACTION</p>
                                    </div>
                                </div>
                                {
                                    data.map(w => (
                                        <div className="worker">
                                            <p>{w.nombre} {w.apellido}</p>
                                            <p>{w.points}</p>
                                            <button className="button" onClick={() => deleteworker(w.idworker)}>Borrar</button>                    
                                        </div>
                                    ))
                                }                                 
                            </div>
                        </div>
                        <div className={`${estilo.grids12} ${estilo.gridm6} ${estilo.gridl3}`}>
                            <div className={estilo.tipocargoworker__content}>
                                <div className={estilo.tipocargoworker__boton}>
                                    <button onClick={() => deleteworker(w.idworker)}>ELIMINAR PUNTAJE</button>
                                </div>
                                <div className={estilo.tipocargoworker__img}>
                                    <img src="/image/editado.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Colaborador