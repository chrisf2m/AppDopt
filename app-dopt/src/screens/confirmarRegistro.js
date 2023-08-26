/* cSpell:disable */
import { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import axios from "axios";
import Boton from "../components/boton";
import UsuarioContext from "../context/datosUsuario";

/**
 * Componente utilizado para confirmar el registro de un nuevo usuario, mediante un código numérico generado por la app
 * y enviado al correo electrónico del usuario.
 * @param {Object} navigation Objeto de React Native, utilizado para la navegación entre pantallas.
 */
const Confirmar = ({ navigation }) => {
  const { datosUsuario, setDatosUsuario } = useContext(UsuarioContext);
  const [numeroAleatorio, setNumeroAleatorio] = useState();
  const [numeroUsuario, setNumeroUsuario] = useState();
  const [error, setError] = useState(false);

  /**
   * Hook utilizado en cuanto se navegue a esta pantalla, genere un código de comprobación de 4 cifras
   * y lo envié por correo electrónico al usuario.
   */
  useEffect(() => {
    let numAlt = Math.floor(Math.random() * 10000);
    if (numAlt < 1000) {
      numAlt += 1000;
    }
    let numStr = numAlt.toString();
    enviarComprobacion(numStr);
  }, []);

  /**
   * Método que realiza una petición de tipo POST al servidor con el Email del usuario y el código de comprobación.
   * @param {String} numAlt Código de comprobación de 4 cifras.
   */
  const enviarComprobacion = async (numAlt) => {
    try {
      await axios.post("http://192.168.0.12:50000/appDopt", {
        IdPeticion: "emailConf",
        Email: datosUsuario[0].Email,
        NumAlt: numAlt,
      });
    } catch (error) {
      console.error(error);
    }
    setNumeroAleatorio(numAlt);
  };

  /**
   * Comprueba si el código de comprobación es igual al introducido por el usuario.
   */
  const comprobarNumero = () => {
    if (numeroAleatorio === numeroUsuario) {
      enviarDatosUsuario();
      navigation.navigate("Login");
    } else {
      setError(true);
    }
  };

  /**
   * Realiza una petición de tipo POST, enviando un objeto Json con los datos del nuevo usuario, si la comprobación ha sido exitosa.
   */
  const enviarDatosUsuario = async () => {
    try {
      await axios.post("http://192.168.0.12:50000/appDopt", {
        IdPeticion: "registro",
        Usuario: datosUsuario[0].Usuario,
        Pass: datosUsuario[0].Pass,
        Email: datosUsuario[0].Email,
        FecNac: datosUsuario[0].FecNac,
        Edad: datosUsuario[0].Edad,
        Telefono: datosUsuario[0].Telefono,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={estilos.principal}>
      <Text style={estilos.titulo}>Confirma tu identidad</Text>
      <Text style={estilos.texto}>
        {"Introduce el código de verificación que hemos enviado " +
          datosUsuario[0].Email}
      </Text>

      <TextInput
        mode="flat"
        label="Código"
        activeOutlineColor="#96C231"
        activeUnderlineColor="#96C231"
        style={estilos.input}
        maxLength={4}
        keyboardType={"numeric"}
        onChangeText={(numero) => {
          {
            setNumeroUsuario(numero);
            setError(false);
          }
        }}
      />
      {error && <Text style={estilos.textoError}>Codigo Incorrecto</Text>}

      <Boton texto={"Verificar"} evento={comprobarNumero} />
    </View>
  );
};

export default Confirmar;

const estilos = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 50,
  },
  titulo: {
    marginTop: 70,
    color: "#96C231",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 20,
  },
  texto: {
    fontSize: 15,
    padding: 20,
    color: "black",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "white",
    width: 250,
    marginBottom: 15,
    fontSize: 30,
    textAlign: "center",
  },
  textoError: {
    marginTop: 5,
    marginBottom: 5,
    color: "red",
    textAlign: "center",
  },
});
