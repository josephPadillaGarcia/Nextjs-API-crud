'use server'

import { useState } from "react";

async function getWorkerData(){
    const url = 'http://localhost:3000/api/worker';
    const res = await fetch(url, {method: 'GET'});
    const resultado  = await res.json();

    return resultado;
}

async function Colaborador(){

    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [dni, setDni] = useState("");
    const point = 0;

    const dataworker = await getWorkerData();

    const submitForm = (e) =>{
        e.preventDefault();

        try {
            //const data = new FormData();
            const numAge = parseInt(age);
            const numDni = parseInt(dni);
            const newWorker = {
                nombre: name,
                apellido: lastname,
                edad: numAge,
                dni: numDni,
                points: point
            }

            console.log("trabajador: ", newWorker);

            fetch('http://localhost:3000/api/worker', {
                method: 'POST',
                body: JSON.stringify(newWorker),
            });

        } catch (error) {
            
        }


    }

    const deleteworker = () =>{

    }


    return(
        <div>
            <h2>Colaboradores</h2>
            <form method="" action="" onSubmit={submitForm}>
                <div>
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={name}
                        onChange={({target}) => setName(target?.value)}
                    />
                </div>

                <div>
                    <label>Apellido</label>
                    <input 
                        type="text" 
                        name="lastname" 
                        value={lastname}
                        onChange={({target}) => setLastName(target?.value)}
                    />
                </div>

                <div>
                    <label>Edad</label>
                    <input 
                        type="number" 
                        name="age"
                        value={age}
                        onChange={({target}) => setAge(target?.value)}
                    />
                </div>

                <div>
                    <label>DNI</label>
                    <input 
                        type="number" 
                        name="dni"
                        value={dni}
                        onChange={({target}) => setDni(target?.value)}
                    />
                </div>

                <button type="submit">Agregar</button>
            </form>

            <h2>Lista de Trabajadores</h2>
            <pre>{resultado}</pre>
            <div className="content__worker">
                <div className="worker">
                    {dataworker.map((worker, index) => (
                        <div>

                            <p>Trabajador</p>
                            <p>Edad</p>
                            <p>DNI</p>
                            <button onClick={deleteworker}>Borrar</button>
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}

export default Colaborador