/* cSpell:disable */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import MascotaContext from "../context/datosMascota";

/**
 * Componente que contiene una ficha con la información de la mascota seleccionada.
 */
const InfoMascota = () => {
  const { current, setCurrent } = useContext(MascotaContext);
  const { datosMascota, setDatosMascota } = useContext(MascotaContext);

  return (
    <View style={estilos.principal}>
      <Text style={estilos.nombreMascota}>{datosMascota[current].nombre}</Text>

      <View>
        <View style={estilos.lineas}>
          <Text style={estilos.titulosDatos}>Raza: </Text>
          <Text style={estilos.datos}>{datosMascota[current].raza}</Text>
        </View>

        <View style={estilos.lineas}>
          <Text style={estilos.titulosDatos}>Edad: </Text>
          <Text style={estilos.datos}>{datosMascota[current].edad}</Text>
        </View>

        <View style={estilos.lineas}>
          <Text style={estilos.titulosDatos}>Sexo: </Text>
          <Text style={estilos.datos}>{datosMascota[current].sexo}</Text>
        </View>

        <View style={estilos.lineas}>
          <Text style={estilos.titulosDatos}>Tamaño: </Text>
          <Text style={estilos.datos}>{datosMascota[current].tamanyo}</Text>
        </View>

        <View style={estilos.lineas}>
          <Text style={estilos.titulosDatos}>Microchip: </Text>
          <Text style={estilos.datos}>{datosMascota[current].microChip}</Text>
        </View>

        <View style={estilos.lineas}>
          <Text style={estilos.titulosDatos}>Cartilla de vacunación: </Text>
          <Text style={estilos.datos}>{datosMascota[current].cartilla}</Text>
        </View>

        <View style={estilos.lineas}>
          <Text style={estilos.titulosDatos}>Ha pasado la rabia: </Text>
          <Text style={estilos.datos}>{datosMascota[current].rabia}</Text>
        </View>

        <View style={estilos.lineas}>
          <Text style={estilos.titulosDatos}>Fecha de la rabia: </Text>
          <Text style={estilos.datos}>{datosMascota[current].fechaRabia}</Text>
        </View>

        <View style={estilos.lineas}>
          <Text style={estilos.titulosDatos}>Esterilizado: </Text>
          <Text style={estilos.datos}>
            {datosMascota[current].esterilizado}
          </Text>
        </View>
      </View>
      <Text style={estilos.tituloObs}>Observaciones:</Text>
      <Text style={estilos.parrafoObs}>
        {datosMascota[current].observaciones}
      </Text>
    </View>
  );
};
const estilos = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
  },
  nombreMascota: {
    color: "#B41D5C",
    fontFamily: "monospace",
    fontStyle: "italic",
    fontSize: 25,
    marginTop: 35,
    marginBottom: 20,
    textDecorationLine: "underline",
  },
  lineas: { flexDirection: "row", textAlign: "center" },
  titulosDatos: { fontSize: 10, marginBottom: 16, fontWeight: "900" },
  datos: { fontSize: 10, marginBottom: 16, color: "black" },
  tituloObs: { color: "#B41D5C", fontSize: 20, marginBottom: 10 },
  parrafoObs: {
    fontSize: 12,
    margin: 10,
    color: "black",
    textAlign: "justify",
  },
});
export default InfoMascota;
