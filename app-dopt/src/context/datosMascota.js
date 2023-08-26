/* cSpell:disable */
import { createContext, useState } from "react";

const MascotaContext = createContext();

export const MascotaProvider = ({ children }) => {
  const [current, setCurrent] = useState(0);
  const [datosMascota, setDatosMascota] = useState([
    {
      id:"",
      foto: "https//www.zaragoza.es/cont/paginas/IMSP/mascotas/terry2.jpg",
      nombre: "",
      edad: "",
      raza: "",
      sexo: "",
      tamanyo: "",
      microChip: "",
      cartilla: "",
      rabia: "",
      fechaRabia: "",
      esterilizado: "",
      observaciones: "",
    },
  ]);

  return (
    <MascotaContext.Provider
      value={{
        datosMascota,
        setDatosMascota,
        current,
        setCurrent,
      }}
    >
      {children}
    </MascotaContext.Provider>
  );
};

export default MascotaContext;
