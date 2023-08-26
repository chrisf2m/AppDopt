/* cSpell:disable */
import React from "react";
import { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import axios from "axios";
import Boton from "../components/boton";
import MascotaContext from "../context/datosMascota";
import UsuarioContext from "../context/datosUsuario";

/**
 * Componente que contiene un formulario de preguntas para el usuario y envía sus respuestas al servidor.
 * @param {Object} navigation Objeto de React Native, utilizado para la navegación entre pantallas.
 */
const Formulario = ({ navigation }) => {
  const { current, setCurrent } = useContext(MascotaContext);
  const { datosMascota, setDatosMascota } = useContext(MascotaContext);
  const { datosUsuario, setDatosUsuario } = useContext(UsuarioContext);
  const [respuesta1, setRespuesta1] = useState("Sin respuesta");
  const [respuesta2, setRespuesta2] = useState("Sin respuesta");
  const [respuesta3, setRespuesta3] = useState("Sin respuesta");
  const [respuesta4, setRespuesta4] = useState("Sin respuesta");
  const [respuesta5, setRespuesta5] = useState("Sin respuesta");
  const [respuesta6, setRespuesta6] = useState("Sin respuesta");

  /**
   * Envía las respuestas y la información de la mascota seleccionada del usuario al servidor,
   * mediante un objeto Json en una petición de tipo POST
   */
  const enviarDatos = async () => {
    try {
      await axios.post("http://192.168.0.12:50000/appDopt", {
        IdPeticion: "respuestas",
        IdUsuario: datosUsuario[0].IdUsuario,
        R1: respuesta1,
        R2: respuesta2,
        R3: respuesta3,
        R4: respuesta4,
        R5: respuesta5,
        R6: respuesta6,
        IdMascota: current,
        Foto: datosMascota[current].foto,
        Nombre: datosMascota[current].nombre,
        Edad: datosMascota[current].edad,
        Raza: datosMascota[current].raza,
        Sexo: datosMascota[current].sexo,
        Tamanyo: datosMascota[current].tamanyo,
        MicroChip: datosMascota[current].microChip,
        Cartilla: datosMascota[current].cartilla,
        Rabia: datosMascota[current].rabia,
        FechaRabia: datosMascota[current].fechaRabia,
        Esterilizado: datosMascota[current].esterilizado,
        Observaciones: datosMascota[current].observaciones,
      });
    } catch (error) {
      console.error(error);
    }
    navigation.navigate("Mensaje");
  };

  return (
    <View style={estilos.principal}>
      <ScrollView style={estilos.contenedorScroll}>
        <Text style={estilos.pregunta}>¿Estás preparado?</Text>
        <Text style={estilos.preguntas}>
          Conteste a las siguientes preguntas. Sus respuestas nos ayudarán a
          saber si está preparado para el cuidado de una mascota así que tómese
          su tiempo y hágalo de manera concienzuda:
        </Text>

        <Text style={estilos.preguntas}>
          1.¿Porque quiere un animal de compañía?
        </Text>
        <TextInput
          style={estilos.inputs}
          onChangeText={(respuesta) => {
            setRespuesta1(respuesta);
          }}
          defaultValue={""}
          multiline={true}
        />

        <Text style={estilos.preguntas}>
          2.¿Tienes suficiente tiempo para ella?
        </Text>
        <TextInput
          style={estilos.inputs}
          onChangeText={(respuesta) => {
            setRespuesta2(respuesta);
          }}
          defaultValue={""}
          multiline={true}
        />

        <Text style={estilos.preguntas}>3.¿Puedes mantenerla?</Text>
        <TextInput
          style={estilos.inputs}
          onChangeText={(respuesta) => {
            setRespuesta3(respuesta);
          }}
          defaultValue={""}
          multiline={true}
        />

        <Text style={estilos.preguntas}>
          4.¿Te ves con ánimos de afrontar los problemas que te puede dar un
          animal de compañía?
        </Text>
        <TextInput
          style={estilos.inputs}
          onChangeText={(respuesta) => {
            setRespuesta4(respuesta);
          }}
          defaultValue={""}
          multiline={true}
        />

        <Text style={estilos.preguntas}>
          5.¿Es ahora un buen momento para adoptar una mascota?
        </Text>
        <TextInput
          style={estilos.inputs}
          onChangeText={(respuesta) => {
            setRespuesta5(respuesta);
          }}
          defaultValue={""}
          multiline={true}
        />

        <Text style={estilos.preguntas}>6.¿Serás responsable?</Text>
        <TextInput
          style={estilos.inputs}
          onChangeText={(respuesta) => {
            setRespuesta6(respuesta);
          }}
          defaultValue={""}
          multiline={true}
        />
        <Boton texto={"Enviar"} evento={enviarDatos} />
        <View style={estilos.final}></View>
      </ScrollView>
    </View>
  );
};

export default Formulario;

const estilos = StyleSheet.create({
  principal: { flex: 1 },
  contenedorScroll: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  pregunta: { color: "#B41D5C", fontSize: 30, alignSelf: "center" },
  inputs: {
    backgroundColor: "white",
    height: 100,
    borderColor: "black",
    borderWidth: 0.2,
    borderRadius: 10,
    textAlignVertical: "top",
    paddingLeft: 10,
    paddingRight: 10,
  },
  preguntas: {
    color: "black",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "justify",
  },
  final: { height: 20 },
});
