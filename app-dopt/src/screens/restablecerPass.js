/* cSpell:disable */
import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import CryptoJS from "crypto-js";
import axios from "axios";
import ModalContrasenya from "../components/modalContrasenyas";
import Boton from "../components/boton";

/**
 * Componente utilizado para restablecer la contraseña del usuario.
 * @param {Object} navigation Objeto de React Native, utilizado para la navegación entre pantallas.
 */
const RestablecerPass = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [nuevaCon, setNuevaCon] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState(false);
  const [mensajeError, setMensajeError] = useState();
  const [contrasenyaEncriptada, setContrasenyaEncriptada] = useState();
  const [mostrarPass, setMostrarPass] = useState(false);
  const [mostrarConPass, setMostrarConPass] = useState(false);
  const [contrasenyaInvalida, setContrasenyaInvalida] = useState(false);

  /**
   * Hook lanzado cuando la @constant {useState} contrasenyaEncriptada es modificada.
   * Si dicha contante no es un objeto indefinido, se restablece la contraseña
   * y se navega a la pantalla de loguin y/o registro.
   */
  useEffect(() => {
    if (contrasenyaEncriptada !== undefined) {
      restablecerCon();
      navigation.navigate("Login");
    }
  }, [contrasenyaEncriptada]);

  /**
   * Comprueba que el usuario rellene los campos obligatorios parta el registro y que estos sean correctos.
   * Si hay alguna incongruencia, se establece el valor de la @constant {useState} error a True y se restablece el mensaje de error
   * en la @constant {useState} mensajeError según el caso.
   * Si no hay incongruencias se comprueba el correo electrónico del usuario.
   */
  const comprobarDatos = () => {
    const patronPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{7,15}$/;
    const patronEmail = /^[^\s@]+@[^\s@]+\.(com|es)$/;

    if (email === "" || nuevaCon === "" || confirmar === "") {
      setMensajeError("Rellene los campos obligatorios (*)");
      setError(true);
    } else if (nuevaCon != confirmar) {
      setMensajeError("Las contraseñas no coinciden");
      setError(true);
    } else if (!patronPass.test(nuevaCon)) {
      setContrasenyaInvalida(true);
    } else if (!patronEmail.test(email)) {
      setMensajeError("El email introducido es incorrecto");
      setError(true);
    } else {
      comprobarCorreo();
    }
  };

  /**
   * Encripta la contraseña proporcionada por el usuario a SHA256.
   * Modifica la @constant {useState} contrasenyaEncriptada
   */
  const encriptarContrasenya = () => {
    let pass = CryptoJS.SHA256(nuevaCon).toString();
    setContrasenyaEncriptada(pass);
  };

  /**
   * Realiza una petición de tipo GET para comprobar que el correo electrónico del usuario sea correcto.
   * Si es correcto se encripta la nueva contraseña.
   */
  const comprobarCorreo = async () => {
    try {
      const peticion = await axios.get(
        "http://192.168.0.12:50000/appDopt?verificar=" + email
      );
      let respuesta = peticion.data;
      if (respuesta === "OK") encriptarContrasenya();
    } catch (error) {
      setMensajeError("Error! Intentelo de nuevo más tarde");
      setError(true);
    }
  };

  /**
   * Realiza una petición de tipo POST, para modificar en la base de datos la contraseña del usuario.
   */
  const restablecerCon = async () => {
    try {
      await axios.post("http://192.168.0.12:50000/appDopt", {
        IdPeticion: "restablecer",
        Email: email,
        Pass: contrasenyaEncriptada,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={estilos.principal}>
      <Text style={estilos.titulo}>Restablece tu contraseña</Text>
      <View style={{ marginBottom: 15 }}>
        <TextInput
          mode="flat"
          label="Email *"
          activeOutlineColor="#96C231"
          activeUnderlineColor="#96C231"
          style={{ backgroundColor: "white", width: 250 }}
          keyboardType={"email-address"}
          onChangeText={(email) => {
            setEmail(email);
            setError(false);
          }}
          defaultValue={email}
        />

        <View style={estilos.cajaIputPass}>
          <TextInput
            mode="flat"
            label="Contraseña *"
            activeUnderlineColor="#96C231"
            secureTextEntry={!mostrarPass}
            style={{ backgroundColor: "white", width: 230 }}
            maxLength={15}
            onChangeText={(nuevoPass) => {
              setNuevaCon(nuevoPass);
              setError(false);
            }}
          />
          <TouchableOpacity onPress={() => setMostrarPass(!mostrarPass)}>
            <Feather
              name={mostrarPass ? "eye" : "eye-off"}
              size={20}
              color="grey"
              style={{ marginTop: 45 }}
            />
          </TouchableOpacity>
        </View>

        <View style={estilos.cajaIputPass}>
          <TextInput
            mode="flat"
            label="Confirmar contraseña *"
            activeUnderlineColor="#96C231"
            secureTextEntry={!mostrarConPass}
            style={{ backgroundColor: "white", width: 230 }}
            maxLength={15}
            onChangeText={(confirmacion) => {
              setConfirmar(confirmacion);
              setError(false);
            }}
          />
          <TouchableOpacity onPress={() => setMostrarConPass(!mostrarConPass)}>
            <Feather
              name={mostrarConPass ? "eye" : "eye-off"}
              size={20}
              color="grey"
              style={{ marginTop: 45 }}
            />
          </TouchableOpacity>
        </View>

        {error && <Text style={estilos.textoError}>{mensajeError}</Text>}
        {contrasenyaInvalida && (
          <ModalContrasenya aceptar={() => setContrasenyaInvalida(false)} />
        )}
      </View>
      <Boton texto="Confirmar" evento={comprobarDatos} />
    </ScrollView>
  );
};

export default RestablecerPass;

const estilos = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: 'center',
    paddingBottom: 50,
  },
  titulo: {
    fontSize: 20,
    color: "#96C231",
    marginBottom: 10,
    fontWeight: "bold",
  },
  cajaIputPass: {
    flexDirection: "row",
    alignItems: "center",
  },
  textoError: {
    marginTop: 5,
    marginBottom: 5,
    color: "red",
    textAlign: "center",
  },
});
