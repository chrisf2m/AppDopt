/* cSpell:disable */
import React from "react";
import { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import Boton from "../components/boton";
import UsuarioContext from "../context/datosUsuario";

/**
 * Componente que muestra un mensaje informativo al usuario, una vez ha seleccionado una mascota y contestado las preguntas del formulario.
 * @param {Object} navigation Objeto de React Native, utilizado para la navegación entre pantallas.
 */
const Mensaje = ({ navigation }) => {
  const { datosUsuario, setDatosUsuario } = useContext(UsuarioContext);

  return (
    <View style={estilos.principal}>
      <Text style={estilos.titulo}>AppDopt</Text>
      <Text style={estilos.texto}>
        {"Los datos de la mascota seleccionada y sus respuestas han sido enviadas para su estudio. En breves la protectora de la mascota se pondrá en contacto con usted a travéz de su correo electrónico  " +
          datosUsuario[0].Email +
          " para ultimar algunos detalles. \n\nSi desea aportar mas información o concertar una visita con la protectora, puede hacerlo a travéz de unmatchunavida@appdopt.es. Gracias por confiar en nosotros."}
      </Text>
      <Boton texto={"Volver"} evento={() => navigation.navigate("Home")} />
    </View>
  );
};

export default Mensaje;

const estilos = StyleSheet.create({
  principal: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
  titulo: {
    fontSize: 40,
    marginTop: 100,
    color: "#96C231",
    fontFamily: "monospace",
    fontStyle: "italic",
    fontWeight: 'bold'
  },
  texto: {
    color: "black",
    marginBottom: 40,
    marginTop: 50,
    textAlign: "justify",
  },
});
