/* cSpell:disable */
import * as React from "react";
import { useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";

/**
 * Componente utilizado, para renderizar una pantalla Splash de presentación de la app con su logo.
 * @param {Object} navigation Objeto de React Native, utilizado para la navegación entre pantallas.
 */
const SplashScreen = ({ navigation }) => {
  /**
   * Hook que se lanza automáticamente para navegar a la pantalla de loguin y/o registro pasado un tiempo establecido,
   * mediante la  @function setTimeout
   * @returns {Function} @function clearTimeout que restablece el tiempo de espera
   */
  useEffect(() => {
    const temporizador = setTimeout(() => {
      navigation.replace("Login");
    }, 5000);
    return () => clearTimeout(temporizador);
  }, []);

  return (
    <View style={estilos.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={estilos.logo}
      />
      <View style={estilos.piePagina}>
        <Text style={estilos.texto1}>creado por </Text>
        <Text style={estilos.texto2}>CFM2</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#96C231",
  },
  logo: {
    alignSelf: "center",
    width: 200,
    height: 200,
    marginTop: 250,
  },
  piePagina: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 200,
  },
  texto1: { color: "white", fontSize: 15 },
  texto2: {
    color: "white",
    fontSize: 15,
    fontFamily: "sans-serif-condensed",
    fontVariant: "small-caps",
    fontWeight: "900",
  },
});
