/* cSpell:disable */
import React from "react";
import { useContext, useEffect } from "react";
import {
  Text,
  ImageBackground,
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import MascotaContext from "../context/datosMascota";

const ANCHO_PANTALLA = Dimensions.get("window").width;

/**
 * Componente que contiene la pantalla principal de la app, la cual muestra un catalogo de fotos con las mascotas disponibles para la adopción.
 * @param {Object} navigation Objeto de React Native, utilizado para la navegación entre pantallas.
 */
const Home = ({ navigation }) => {
  const { current, setCurrent } = useContext(MascotaContext);
  const { datosMascota, setDatosMascota } = useContext(MascotaContext);

  /**
   * Hook que obtiene los datos de las mascotas en adopción, de manera automática.
   */
  useEffect(() => {
    obtenerDatos();
  }, []);

  /**
   * Realiza una petición de tipo GET al servidor, para obtener el catalogo de mascotas en adopción.
   * Una vez obtenidos los datos los almacena en la @constant {context} datosMascota Contexto de la app.
   * Comprobando que se corrijan los campos erróneos.
   */
  const obtenerDatos = async () => {
    try {
      const peticion = await axios.get(
        "http://192.168.0.12:50000/appDopt?mascotas=appdopt"
      );
      let respuesta = peticion.data;
      let aux = [...datosMascota];

      for (let i = 0; i < respuesta.length; i++) {
        if (i == 0) {
          aux[0] = {
            foto: "https:" + respuesta[i].foto,
            nombre: respuesta[i].nombre,
            edad: respuesta[i].edad,
            raza: respuesta[i].raza,
            sexo: respuesta[i].sexo,
            tamanyo: respuesta[i].tamagno,
            microChip: respuesta[i].microchip,
            cartilla: respuesta[i].cartilla,
            rabia: respuesta[i].rabia,
            fechaRabia: respuesta[i].fechaRabia,
            esterilizado: respuesta[i].esterilizado,
            observaciones: respuesta[i].observaciones,
          };
        } else {
          aux.push({
            foto: "https:" + respuesta[i].foto,
            nombre: respuesta[i].nombre,
            edad: respuesta[i].edad,
            raza: respuesta[i].raza,
            sexo: respuesta[i].sexo,
            tamanyo: respuesta[i].tamagno,
            microChip: respuesta[i].microchip,
            cartilla: respuesta[i].cartilla,
            rabia: respuesta[i].rabia,
            fechaRabia: respuesta[i].fechaRabia,
            esterilizado: respuesta[i].esterilizado,
            observaciones: respuesta[i].observaciones,
          });
        }
      }

      for (let i = 0; i < aux.length; i++) {
        if (
          aux[i].edad == "" ||
          aux[i].edad == null ||
          aux[i].edad === "Undefined"
        )
          aux[i].edad = "Desconocida";
        if (aux[i].rabia == true) aux[i].rabia = "Si";
        if (aux[i].rabia == false) aux[i].rabia = "No";
        if (aux[i].esterilizado == true) aux[i].esterilizado = "Si";
        if (aux[i].esterilizado == false) aux[i].esterilizado = "No";
        if (aux[i].observaciones == null)
          aux[i].observaciones = "Sin observaciones.";
      }

      setDatosMascota(aux);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Recoge y procesa el evento recogido en el FlatList mediante la propiedad onScroll,
   * para actualizar el @constant {context} current El cual sirve para ir recorriendo cada una de las mascotas del @constant {context} datosMascota
   * @param {handleScroll} event Evento recogido en el FlatList.
   */
  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const centerIndex = Math.round(contentOffset.x / layoutMeasurement.width);
    if (centerIndex !== current) {
      setCurrent(centerIndex);
    }
  };

  return (
    <View style={estilos.principal}>
      <StatusBar hidden />
      <Text style={estilos.titulo}>Un match, una vida!</Text>
      <FlatList
        data={datosMascota}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ANCHO_PANTALLA}
        keyExtractor={(item, index) => index.toString()}
        decelerationRate={0}
        onScroll={handleScroll}
        renderItem={({ item, index }) => {
          return (
            <View style={estilos.cajaImagen}>
              <ImageBackground
                source={{ uri: item.foto }}
                style={estilos.fotoMascota}
                resizeMode="stretch"
                imageStyle={{ borderRadius: 20 }}
              >
                <Text style={estilos.textoNombreMascota}>{item.nombre}</Text>
              </ImageBackground>
            </View>
          );
        }}
      />

      <View style={estilos.cajaIconos}>
        <Entypo
          name="info-with-circle"
          size={50}
          onPress={() => navigation.navigate("Info")}
          color="#B41D5C"
        />
        <MaterialIcons
          name="pets"
          size={50}
          onPress={() => navigation.navigate("Formulario")}
          color="#96C231"
        />
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  principal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  titulo: {
    fontSize: 20,
    color: "#96C231",
    marginTop: 15,
    marginBottom: 30,
    fontFamily: "monospace",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  cajaImagen: {
    width: ANCHO_PANTALLA,
    paddingLeft: 10,
    paddingRight: 10,
  },
  fotoMascota: {
    height: ANCHO_PANTALLA * 1.2,
    borderRadius: 20,
  },
  textoNombreMascota: {
    color: "black",
    fontFamily: "monospace",
    fontStyle: "italic",
    fontWeight: "bold",
    textShadowRadius: 20,
    textShadowColor: "white",
    fontSize: 30,
    marginLeft: 10,
    // marginTop: 400, // Android Studio
    marginTop: 350, // Expo GO
  },
  cajaIconos: {
    width: ANCHO_PANTALLA,
    flexDirection: "row",
    marginBottom: 50, // Expo GO
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
});

export default Home;
