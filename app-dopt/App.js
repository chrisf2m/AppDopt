/* cSpell:disable */
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import SplashScreen from "./src/screens/splashScreen";
import Login from "./src/screens/login";
import RestablecerPass from "./src/screens/restablecerPass";
import Registro from "./src/screens/registro";
import Confirmar from "./src/screens/confirmarRegistro";
import Home from "./src/screens/home";
import InfoMascota from "./src/screens/infoMascota";
import Formulario from "./src/screens/formulario";
import Mensaje from "./src/screens/mensaje";
import Terminos from "./src/screens/terminos";
import Perfil from "./src/screens/perfilUsuario";
import { MascotaProvider } from "./src/context/datosMascota";
import { UsuarioProvider } from "./src/context/datosUsuario";

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  return (
    <UsuarioProvider>
      <MascotaProvider>
        <NavigationContainer>
          <Stack.Navigator options="false">
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Registro"
              component={Registro}
              options={{
                title: "Registro",
                headerStyle: { backgroundColor: "#96C231" },
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="Terminos"
              component={Terminos}
              options={{
                title: "Términos y condiciones",
                headerStyle: { backgroundColor: "#96C231" },
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="ConfirmarRegistro"
              component={Confirmar}
              options={{
                title: "Registro",
                headerStyle: { backgroundColor: "#96C231" },
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Recuperacion"
              component={RestablecerPass}
              options={{
                title: "",
              }}
            />
            <Stack.Screen
              name="Perfil"
              component={Perfil}
              options={{
                title: "Perfil y ajustes",
                headerStyle: { backgroundColor: "#96C231" },
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                title: "Adopta",
                headerStyle: {
                  backgroundColor: "#96C231",
                },
                headerTintColor: "white",
                headerRight: () => (
                  <FontAwesome5
                    onPress={() => navigation.navigate("Perfil")}
                    name="user-cog"
                    size={30}
                    color="white"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="Info"
              component={InfoMascota}
              options={({ navigation }) => ({
                title: "Ficha de datos",
                headerStyle: {
                  backgroundColor: "#96C231",
                },
                headerTintColor: "white",
                headerRight: () => (
                  <FontAwesome5
                    onPress={() => navigation.navigate("Perfil")}
                    name="user-cog"
                    size={30}
                    color="white"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="Formulario"
              component={Formulario}
              options={({ navigation }) => ({
                headerStyle: {
                  backgroundColor: "#96C231",
                },
                headerTintColor: "white",
                headerRight: () => (
                  <FontAwesome5
                    onPress={() => navigation.navigate("Perfil")}
                    name="user-cog"
                    size={30}
                    color="white"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="Mensaje"
              component={Mensaje}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MascotaProvider>
    </UsuarioProvider>
  );
};

export default App;
