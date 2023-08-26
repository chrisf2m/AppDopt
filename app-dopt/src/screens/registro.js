/* cSpell:disable */
import { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import Boton from "../components/boton";
import CryptoJS from "crypto-js";
import ModalContrasenya from "../components/modalContrasenyas";
import UsuarioContext from "../context/datosUsuario";

/**
 * Componente utilizado para el registro de un nuevo usuario.
 * @param {Object} navigation Objeto de React Native, utilizado para la navegación entre pantallas.
 */
const Registro = ({ navigation }) => {
  const { datosUsuario, setDatosUsuario } = useContext(UsuarioContext);
  const [usuario, setUsuario] = useState("");
  const [contrasenya, setContrasenya] = useState("");
  const [confirmarCon, setConfirmarCon] = useState("");
  const [contrasenyaEncriptada, setContrasenyaEncriptada] = useState();
  const [email, setEmail] = useState("");
  const [fechaNac, setfechaNac] = useState("");
  const [telefono, setTelefono] = useState("s/n");
  const [error, setError] = useState(false);
  const [mensajeError, setMensajeError] = useState();
  const [aceptarTerminos, setAceptarTerminos] = useState(false);
  const [mostrarPass, setMostrarPass] = useState(false);
  const [mostrarConPass, setMostrarConPass] = useState(false);
  const [contrasenyaInvalida, setContrasenyaInvalida] = useState(false);

  /**
   * Hook lanzado cuando la @constant {useState} contrasenyaEncriptada es modificada.
   * Si dicha contante no es un objeto indefinido, se guardan los datos introducidos por el usuario
   * y se navega a la pantalla de confirmación de registro.
   */
  useEffect(() => {
    if (contrasenyaEncriptada !== undefined) {
      guardarDatosUsuario();
      navigation.navigate("ConfirmarRegistro");
    }
  }, [contrasenyaEncriptada]);

  /**
   * Calcula la edad del usuario, a partir de su fecha de nacimiento.
   * @returns {String} @var edad edad del usuario
   */
  const calcularEdad = () => {
    let ddMmAa = fechaNac.split("/");
    let nacimiento = new Date(ddMmAa[2], ddMmAa[1] - 1, ddMmAa[0]);
    let fechaAtual = new Date();
    let meses = fechaAtual - nacimiento;
    let años = meses / 31556952000;
    let edad = Math.floor(años).toString();
    return edad;
  };

  /**
   * Encripta la contraseña proporcionada por el usuario a SHA256.
   * Modifica la @constant {useState} contrasenyaEncriptada
   */
  const encriptarContrasenya = () => {
    let pass = CryptoJS.SHA256(contrasenya).toString();
    setContrasenyaEncriptada(pass);
  };

  /**
   * Guarda los datos introducidos por el usuario en la @constant {useContext} datosUsuario
   */
  const guardarDatosUsuario = () => {
    let aux = [...datosUsuario];
    let edad = calcularEdad();
    aux[0] = {
      Usuario: usuario,
      Pass: contrasenyaEncriptada,
      Email: email,
      FecNac: fechaNac,
      Edad: edad,
      Telefono: telefono,
    };
    setDatosUsuario(aux);
  };

  /**
   * Comprueba que el usuario rellene los campos obligatorios parta el registro y que estos sean correctos.
   * Si hay alguna incongruencia, se establece el valor de la @constant {useState} error a True y se restablece el mensaje de error
   * en la @constant {useState} mensajeError según el caso.
   * Si no hay incongruencias se encripta la contraseña.
   */
  const comprobarDatos = () => {
    const patronPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{7,15}$/;
    const patronEmail = /^[^\s@]+@[^\s@]+\.(com|es)$/;
    const patronNac = /^\d{2}\/\d{2}\/\d{4}$/;

    if (
      usuario === "" ||
      contrasenya === "" ||
      confirmarCon === "" ||
      email === "" ||
      fechaNac === ""
    ) {
      setMensajeError("Rellene los campos obligatorios (*)");
      setError(true);
    } else if (!patronEmail.test(email)) {
      setMensajeError("El email introducido es incorrecto");
      setError(true);
    } else if (!patronPass.test(contrasenya)) {
      setContrasenyaInvalida(true);
    } else if (contrasenya != confirmarCon) {
      setMensajeError("Las contraseñas no coinciden");
      setError(true);
    } else if (!patronNac.test(fechaNac)) {
      setMensajeError("Formato para la fecha de nacimiento dd/mm/aaaa");
      setError(true);
    } else if (!aceptarTerminos) {
      setMensajeError("Debe aceptar los terminos y condiciones");
      setError(true);
    } else {
      encriptarContrasenya();
    }
  };

  return (
    <SafeAreaView style={estilos.safe}>
      <ScrollView contentContainerStyle={estilos.principal}>
        <Text style={estilos.appDopt}>AppDopt</Text>
        <View>
          <TextInput
            mode="flat"
            label="Nombre de usuario *"
            activeOutlineColor="#96C231"
            activeUnderlineColor="#96C231"
            style={estilos.textInputs}
            maxLength={20}
            onChangeText={(nuevoUsuario) => {
              setUsuario(nuevoUsuario);
              setError(false);
            }}
            defaultValue={usuario}
          />

          <TextInput
            mode="flat"
            label="Email *"
            activeOutlineColor="#96C231"
            activeUnderlineColor="#96C231"
            style={estilos.textInputs}
            keyboardType={"email-address"}
            onChangeText={(nuevoEmail) => {
              setEmail(nuevoEmail);
              setError(false);
            }}
            defaultValue={email}
          />

          <View style={estilos.cajaInputPass}>
            <TextInput
              mode="flat"
              label="Contraseña *"
              activeUnderlineColor="#96C231"
              secureTextEntry={!mostrarPass}
              style={estilos.textInputsPass}
              maxLength={15}
              onChangeText={(nuevoPass) => {
                setContrasenya(nuevoPass);
                setError(false);
              }}
              defaultValue={contrasenya}
            />
            <TouchableOpacity onPress={() => setMostrarPass(!mostrarPass)}>
              <Feather
                name={mostrarPass ? "eye" : "eye-off"}
                size={20}
                color="grey"
                style={{ marginTop: 18 }}
              />
            </TouchableOpacity>
          </View>

          <View style={estilos.cajaInputPass}>
            <TextInput
              mode="flat"
              label="Confirmar contraseña *"
              activeUnderlineColor="#96C231"
              secureTextEntry={!mostrarConPass}
              style={estilos.textInputsPass}
              maxLength={15}
              onChangeText={(nuevoPass) => {
                setConfirmarCon(nuevoPass);
                setError(false);
              }}
              defaultValue={confirmarCon}
            />
            <TouchableOpacity
              onPress={() => setMostrarConPass(!mostrarConPass)}
            >
              <Feather
                name={mostrarConPass ? "eye" : "eye-off"}
                size={20}
                color="grey"
                style={{ marginTop: 18 }}
              />
            </TouchableOpacity>
          </View>

          <TextInput
            mode="flat"
            label="Fecha de nacimiento *"
            activeOutlineColor="#96C231"
            activeUnderlineColor="#96C231"
            style={estilos.textInputs}
            maxLength={10}
            placeholder="dd/mm/aaaa"
            placeholderTextColor={"grey"}
            onChangeText={(nac) => {
              setfechaNac(nac);
              setError(false);
            }}
            defaultValue={fechaNac}
          />

          <TextInput
            mode="flat"
            label="Telefono"
            activeOutlineColor="#96C231"
            activeUnderlineColor="#96C231"
            style={estilos.textInputs}
            maxLength={9}
            keyboardType={"phone-pad"}
            onChangeText={(telefono) => {
              setTelefono(telefono);
              setError(false);
            }}
            defaultValue={""}
          />
          {error && <Text style={estilos.textoError}>{mensajeError}</Text>}
          {contrasenyaInvalida && (
            <ModalContrasenya aceptar={() => setContrasenyaInvalida(false)} />
          )}
        </View>
        <Boton texto={"Registrarse"} evento={comprobarDatos} />

        <View style={estilos.cajaAceptar}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={aceptarTerminos ? "#96C231" : "#f4f3f4"}
            onValueChange={() => {
              setAceptarTerminos((estadoAnterior) => !estadoAnterior);
              setError(false);
            }}
            value={aceptarTerminos}
          />
          <Text style={{ fontSize: 12 }}>Acepto la política de AppDopt</Text>
        </View>

        <Text
          style={estilos.terminos}
          onPress={() => navigation.navigate("Terminos")}
        >
          Términos y condiciones
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Registro;

const estilos = StyleSheet.create({
  principal: {
    backgroundColor: "white",
    alignItems: "center",
    paddingBottom: 20,
  },
  appDopt: {
    fontSize: 30,
    color: "#96C231",
    marginTop: 30,
    marginBottom: 30,
    fontFamily: "monospace",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  textInputs: { backgroundColor: "white", width: 250, marginBottom: 25 },
  cajaInputPass: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInputsPass: { backgroundColor: "white", width: 230, marginBottom: 25 },
  textoError: {
    marginTop: 5,
    marginBottom: 5,
    color: "red",
    textAlign: "center",
  },
  cajaAceptar: { flexDirection: "row", alignItems: "center" },
  terminos: { textDecorationLine: "underline", alignSelf: "center" },
});
