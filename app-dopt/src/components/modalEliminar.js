/* cSpell:disable */
import { Text, View, Modal, TouchableOpacity, StyleSheet } from "react-native";

/**
 * Componente utilizado para mostrar al usuario un mensaje de confirmación para eliminar su cuenta.
 * @param {props} props Parámetro que recoge el estado de la visibilidad del componente Modal
 * y los eventos de los componentes TouchableOpacity
 * @returns Componente Modal que contiene componentes View, Text y TouchableOpacity
 */
const ModalEliminar = (props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View style={estilos.principal}>
        <View style={estilos.recuadroMensaje}>
          <Text style={estilos.textoPregunta}>¿Deseas eliminar tu cuenta?</Text>
          <Text>
            Esta acción no se puede deshacer y se eliminarán todos tus datos.
          </Text>
          <View style={estilos.opciones}>
            <TouchableOpacity onPress={props.cancelar}>
              <Text style={estilos.cancelar}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.confirmar}>
              <Text style={estilos.eliminar}>Eliminar</Text>
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
    borderRadius: 20
  },
  textoPregunta: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: 'red'
  },
  opciones: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  cancelar: { color: "#007AFF", marginRight: 20 },
  eliminar: { color: "red" },
});

export default ModalEliminar;
