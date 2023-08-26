/* cSpell:disable */
import { createContext, useState } from "react";

const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [datosUsuario, setDatosUsuario] = useState([]);

  return (
    <UsuarioContext.Provider
      value={{
        datosUsuario,
        setDatosUsuario,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};

export default UsuarioContext;
