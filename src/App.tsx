import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Inicio from './Inicio'
import Waiting from './Waiting'
import { title } from 'process'
import Swal from 'sweetalert2'

export default function App () {
  
  const [initialize, setInitialize] = useState(false)
  const [name, setName] = useState({value: '', error: ''});
  const changeView = () => {
  if(name.value.length > 4){
    setInitialize(true);
  }else{
    //AQUI VA UNA ALERTA
    
    Swal.fire({
      icon: 'error',
      title: 'El nombre debe tener mas de 4 letras'
    })
  }
  
}

  

  return (
    <div className="App">
      <header className="App-header">
        { initialize ? (
          <>
             <Waiting 
              initialize={initialize}
              setInitialize={setInitialize}
             />
            {/*<div onClick={destroy} className="flex destroyButton">
              <a href="#1" className="bttn">Destroy</a>
            </div> */}
          </>
        ) : (
          <>
          <Inicio 
            setInitialize={setInitialize}
            initialize={initialize}
            name={name}
            setName={setName}
            changeView={changeView}
          />
            {/* <img src={logo} className="App-logo" alt="logo" />
            <div onClick={() => setInitialize(true)} className="flex">
              <a href="#1" className="bttn">Initialize</a>
            </div> */}
          </>
        )}
      </header>
     
      
    </div>

  );
}
