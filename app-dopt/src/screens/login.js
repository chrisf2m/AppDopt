/* cSpell:disable */
import { useState, useEffect, useContext, Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import CryptoJS from "crypto-js";
import axios from "axios";
import Boton from "../components/boton";
import UsuarioContext from "../context/datosUsuario";

/**
 * Componente que permite el logueo o registro de un usuario.
 * @param {Object} navigation Objeto de React Native, utilizado para la navegación entre pantallas.
 */
const Login = ({ navigation }) => {
  const { datosUsuario, setDatosUsuario } = useContext(UsuarioContext);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasenya, setContrasenya] = useState("");
  const [idUsuario, setIdeUsuario] = useState();
  const [email, setEmail] = useState();
  const [fecNac, setFecNac] = useState();
  const [edad, setEdad] = useState();
  const [tel, setTel] = useState();
  const [match, setMatch] = useState(false);
  const [error, setError] = useState(false);
  const [mensajeError, setMensajeError] = useState();
  const [mostrarPass, setMostrarPass] = useState(false);

  /**
   * Hook que actualiza la @constant {context} datosUsuario
   * Cuando se modifica el valor de @constant {const} match
   * Da acceso a la App cuando se cumple la condición.
   */
  useEffect(() => {
    if (match) {
      setError(false);
      let aux = [...datosUsuario];
      aux[0] = {
        IdUsuario: idUsuario,
        NombreUsuario: nombreUsuario,
        Edad: edad,
        FecNac: fecNac,
        Email: email,
        Tel: tel,
      };
      setDatosUsuario(aux);
      navigation.navigate("Home");
    }
    setMatch(false);
  }, [match]);

  /**
   * Da la opción al usuario de Loguearse o Registrarse, según el botón pasado por parámetro,
   * @param {Component} boton Según el Botón pulsado, se hará una cosa u otra.
   */
  const accion = (boton) => {
    if (boton == "login") {
      if (nombreUsuario == "" || contrasenya == "") {
        setMensajeError("Rellene los campos");
        setError(true);
      } else {
        comprobarUsuario();
      }
    } else if (boton == "registro") {
      navigation.navigate("Registro");
    }
  };

  /**
   * Encripta la contraseña proporcionada por el usuario, en caso de que este se quiera identificar.
   * Realiza una petición al servidor de tipo GET para buscar al usuario en la base de datos.
   * Si los datos introducidos por el usuario y los de la base de datos coinciden. Se le dará acceso a la app.
   */
  const comprobarUsuario = async () => {
    let respuesta;
    let contrasenyaEncriptada = CryptoJS.SHA256(contrasenya).toString();
    try {
      const peticion = await axios.get(
        "http://192.168.0.12:50000/appDopt?login=" + nombreUsuario
      );
      respuesta = peticion.data;
      setIdeUsuario(respuesta.Id);
      setEmail(respuesta.Email);
      setFecNac(respuesta.Fecha_nac);
      setEdad(respuesta.Edad);
      setTel(respuesta.Telefono);
    } catch (error) {
      setMensajeError("Intentelo de nuevo más tarde");
      setError(true);
    }

    if (
      respuesta.Usuario === nombreUsuario &&
      respuesta.Pass === contrasenyaEncriptada
    ) {
      setMatch(true);
      setMostrarPass(false);
    } else {
      setMensajeError("Nombre de usuario y/o contraseña incorrectos");
      setError(true);
    }
  };

  return (
    <View style={estilos.principal}>
      <Text style={estilos.appDopt}>AppDopt</Text>
      <TextInput
        mode="flat"
        label="Nombre de usuario"
        activeOutlineColor="#96C231"
        activeUnderlineColor="#96C231"
        style={{ backgroundColor: "white", width: 250 }}
        onChangeText={(usuario) => {
          setError(false);
          setNombreUsuario(usuario);
        }}
        defaultValue={""}
      />
      <View style={estilos.cajaInputPass}>
        <TextInput
          mode="flat"
          label="Contraseña"
          activeUnderlineColor="#96C231"
          secureTextEntry={!mostrarPass}
          style={{ backgroundColor: "white", width: 230 }}
          onChangeText={(pass) => {
            setError(false);
            setContrasenya(pass);
          }}
          defaultValue={""}
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

      {error && <Text style={estilos.textoError}>{mensajeError}</Text>}

      <Text
        style={estilos.textoPregunta}
        onPress={() => navigation.navigate("Recuperacion")}
      >
        ¿Ha olvidado la contraseña?
      </Text>

      <Boton texto={"Login"} evento={() => accion("login")} />

      <View style={estilos.cajaRegistro}>
        <Text>¿No eres ususario?</Text>
        <Boton texto={"Regístrate"} evento={() => accion("registro")} />
      </View>
    </View>
  );
};
export default Login;

const estilos = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  appDopt: {
    fontSize: 45,
    color: "#96C231",
    marginTop: 100,
    marginBottom: 50,
    fontFamily: "monospace",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  cajaRegistro: {
    marginTop: 20,
  },
  cajaInputPass: {
    flexDirection: "row",
    alignItems: "center",
  },
  textoPregunta: {
    textDecorationLine: "underline",
    marginTop: 5,
    marginBottom: 20,
  },
  textoError: {
    marginTop: 5,
    marginBottom: 5,
    color: "red",
    textAlign: "center",
  },
});
