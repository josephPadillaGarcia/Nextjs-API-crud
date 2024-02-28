'use client'
//import { useState } from "react";

const deleteworker = () =>{

}

async function Colaborador(){

    const name = "";
    const lastname = "";
    const age = "";
    const dni = "";
    const point = 0;

    const dataworkers = await getDataWorker();

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

            fetch('http://localhost:3000/api/worker', {
                method: 'POST',
                body: JSON.stringify(newWorker),
            });

        } catch (error) {
            
        }
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
                        //onChange={({target}) => setName(target?.value)}
                    />
                </div>

                <div>
                    <label>Apellido</label>
                    <input 
                        type="text" 
                        name="lastname" 
                        value={lastname}
                        //onChange={({target}) => setLastName(target?.value)}
                    />
                </div>

                <div>
                    <label>Edad</label>
                    <input 
                        type="number" 
                        name="age"
                        value={age}
                        //onChange={({target}) => setAge(target?.value)}
                    />
                </div>

                <div>
                    <label>DNI</label>
                    <input 
                        type="number" 
                        name="dni"
                        value={dni}
                        //onChange={({target}) => setDni(target?.value)}
                    />
                </div>

                <button type="submit">Agregar</button>
            </form>


            <h2>Lista de Trabajadores</h2>
                <div className="content__worker">
                <div className="worker">
                                <p>{dataworkers.data.nombre}</p>
                                <button onClick={deleteworker}>Borrar</button>                    
                            </div>
                                 
                </div>
        </div>
    )
}

export const getDataWorker = async () =>{
    const url = 'http://localhost:3000/api/worker';
    const res = await fetch(url, {method: 'GET', cache: 'no-cache'});
    const resultados  = await res.json();
    console.log(resultados)
    return resultados;
    /*return {
        props:{
            resultado: resultados
        }
    };*/
}

export default Colaborador