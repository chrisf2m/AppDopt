/* cSpell:disable */
import { Text, View, Modal, TouchableOpacity, StyleSheet } from "react-native";

/**
 * Componente utilizado para mostrar al usuario un mensaje de como debe introducir la contraseña para el registro y restablecimiento.
 * @param {props} props Parámetro que recoge el estado de la visibilidad del componente Modal
 * y los eventos de los componentes TouchableOpacity
 * @returns Componente Modal que contiene componentes View, Text y TouchableOpacity
 */
const ModalContrasenya = (props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View style={estilos.principal}>
        <View style={estilos.recuadroMensaje}>
          <Text style={estilos.textotitulo}>Contraseña no valida</Text>
          <Text style={estilos.texto}>
            {
              "La contraseña debe contener: \n - Mínimo 7 caracteres y máximo 15 \n - 1 letra mayúscula y 1 minúscula. \n - 1 número y un carácter especial: \n !@#$%^&*()_+-=[]{};':,.<>/?"
            }
          </Text>
          <View style={estilos.opciones}>
            <TouchableOpacity onPress={props.aceptar}>
              <Text style={estilos.aceptar}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const estilos = StyleSheet.create({
  principal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  recuadroMensaje: {
    backgroundColor: "#F2F2F2",
    padding: 20,
    borderRadius: 20,
  },
  textotitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: 'red'
  },
  texto: {
    textAlign: "justify",
  },
  opciones: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  aceptar: { color: "#007AFF", marginRight: 20 },
});

export default ModalContrasenya;
