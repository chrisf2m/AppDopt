/* cSpell:disable */
import { Text, StyleSheet, TouchableOpacity } from "react-native";

/**
 *
 * Componente utilizado, para renderizar los botones de la aplicación
 * @param {props} props parámetros que reciben el texto que se ve en los botones y el evento que ejecutan.
 * @returns Componente TouchableOpacity con un componente Text.
 */
const Boton = (props) => {
  return (
    <TouchableOpacity style={estilos.botons} onPress={props.evento}>
      <Text style={estilos.textoBotones}>{props.texto}</Text>
    </TouchableOpacity>
  );
};

export default Boton;

const estilos = StyleSheet.create({
  botons: {
    marginTop: 5,
    marginBottom: 5,
    width: 100,
    height: 40,
    backgroundColor: "#B41D5C",
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "center",
  },
  textoBotones: {
    color: "white",
    fontSize: 15,
    alignSelf: "center",
    fontStyle: "italic",
    fontWeight: "bold",
  },
});
