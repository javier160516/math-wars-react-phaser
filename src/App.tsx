import React, { useState, useEffect } from "react";
import "./App.css";
import Inicio from "./Inicio";
import Waiting from "./Waiting";
import Swal from "sweetalert2";
import { ws } from "./config";

export default function App() {
  const rooms = ["A", "B", "C"];
  const [room, setRoom] = useState(rooms[0]);
  const [connection, setConnection] = useState(false);
  const [alias, setAlias] = useState("");

  const wsOn = () => {
    return ws.on("connect", () => {
      console.log("Usuario conectado...");
      setConnection(true);
    });
  };

  const handleStart = (e: any) => {
    e.preventDefault();
    const { connected } = wsOn();
    if (connected) {
      setConnection(connected);
      if (alias === "") {
        setConnection(false);
        //AQUI VA UNA ALERTA
        Swal.fire({
          icon: "error",
          title: "El alias es obligatorio",
        });
      } else if (alias.length <= 3) {
        setConnection(false);
        Swal.fire({
          icon: "error",
          title: "El nombre debe tener mas de 3 carácteres",
        });
      } else {
        ws.emit("join", room);
        ws.emit("aliases", {alias});
      }
    }
  };

  // const [name, setName] = useState({ value: "", error: "" });

  // const changeView = () => {
  //   if (name.value.length >= 3) {
  //     setInitialize(true);
  //   } else {
  //     //AQUI VA UNA ALERTA
  //     Swal.fire({
  //       icon: "error",
  //       title: "El nombre debe tener mas de 3 carácteres",
  //     });
  //   }
  // };

  return (
    <div className="App">
      <header className="App-header">
        {!connection ? (
          <>
            <Inicio
              alias={alias}
              setAlias={setAlias}
              handleStart={handleStart}
              connection={connection}
              setConnection={setConnection}
            />
            {/* <img src={logo} className="App-logo" alt="logo" />
          <div onClick={() => setInitialize(true)} className="flex">
            <a href="#1" className="bttn">Initialize</a>
          </div> */}
          </>
        ) : (
          <>
            <Waiting
              alias={alias}
              connection={connection}
              setConnection={setConnection}
            />
            {/*<div onClick={destroy} className="flex destroyButton">
              <a href="#1" className="bttn">Destroy</a>
            </div> */}
          </>
        )}
      </header>
    </div>
  );
}
