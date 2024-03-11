'use client'
import { useState, useEffect } from "react";

function Colaborador(){

    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [dni, setDni] = useState("");
    const point = 0;

    const [data, setData] = useState([]);

    useEffect(() => {
        getDataWorker();
    }, [])

    const getDataWorker = async () =>{
        const url = 'http://localhost:3000/api/worker';
        const res = await fetch(url, {method: 'GET', cache: 'no-cache'});
        const resultados  = await res.json();
        setData(resultados.data);
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
                points: point
            }

            fetch('http://localhost:3000/api/worker', {
                method: 'POST',
                body: JSON.stringify(newWorker),
            }).then(()=>(getDataWorker())).catch((e)=>(console.log(e)))
            
        } catch (error) {
            
        }
        
        

    }

    return(
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

                    <button type="submit" className="button">Agregar Colaborador</button>
                </form>
            </div>


            <h2>Lista de Trabajadores</h2>
                <div className="content__worker  content__worker__scroll">
                    {
                        data.map(w => (
                            <div className="worker">
                                <p>{w.nombre}</p>
                                <p>{w.apellido}</p>
                                <p>{w.edad}</p>
                                <p>{w.dni}</p>
                                <p>{w.points}</p>
                                <button className="button" onClick={() => deleteworker(w.idworker)}>Borrar</button>                    
                            </div>
                        ))
                    }                                 
                </div>
        </div>
    )
}

export default Colaborador