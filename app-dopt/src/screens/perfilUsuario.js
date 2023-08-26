/* cSpell:disable */
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import MascotaContext from "../context/datosMascota";
import UsuarioContext from "../context/datosUsuario";
import ModalEliminar from "../components/modalEliminar";

/**
 * Componente que muestra la información del usuario y sus mascotas elegidas.
 * También permite al usuario darse de baja de la app.
 * @param {Object} navigation Objeto de React Native, utilizado para la navegación entre pantallas.
 */
const Perfil = ({ navigation }) => {
  const { datosUsuario, setDatosUsuario } = useContext(UsuarioContext);
  const { current, setCurrent } = useContext(MascotaContext);
  const [listaMascotas, setListaMascotas] = useState([
    { nombre: "", foto: " " },
  ]);
  const [mostrarModal, setMostrarModal] = useState(false);

  /**Hook que obtiene de manera automática de la base de datos, los datos de las mascotas elegidas por el usuario */
  useEffect(() => {
    obtenerListaMascotas();
  }, []);

  /**
   * Lanza un mensaje de confirmación para que el usuario elija si quiere eliminar su cuenta o no.
   * Estableciendo el valor de la @constant {useState} mostrarModal a true.
   */
  const lanzarMensajeEliminacion = () => {
    setMostrarModal(true);
  };

  /**
   * Cancela el proceso de eliminación de la cuenta.
   *  Estableciendo el valor de la @constant {useState} mostrarModal a false.
   */
  const opcionCancelar = () => {
    setMostrarModal(false);
  };

  /**
   * Elimina la cuenta del usuario después de que este haya realizado la confirmación y sale a la pantalla de loguin o registro.
   */
  const eliminarCuenta = () => {
    eliminarDatosUsuario();
    navigation.navigate("Login");
  };

  /**
   * Realiza una petición de tipo GET al servidor, para obtener una relación de las mascotas que el usuario ha escogido.
   * guarda los datos de dichas mascotas en la @constant {useState} listaMascotas .
   */
  const obtenerListaMascotas = async () => {
    let respuesta;
    try {
      const peticion = await axios.get(
        "http://192.168.0.12:50000/appDopt?mascotaselegidas=" +
          datosUsuario[0].IdUsuario
      );
      respuesta = peticion.data;
      let aux = [...listaMascotas];

      for (let i = 0; i < respuesta.length; i++) {
        if (i == 0) {
          aux[0] = {
            id: respuesta[i].Id_mascota,
            nombre: respuesta[i].Nombre_mascota,
            foto: respuesta[i].Foto,
          };
        } else {
          aux.push({
            id: respuesta[i].Id_mascota,
            nombre: respuesta[i].Nombre_mascota,
            foto: respuesta[i].Foto,
          });
        }
      }
      setListaMascotas(aux);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Realiza una petición de tipo POST para eliminar los datos del usuario de la base de datos.
   */
  const eliminarDatosUsuario = async () => {
    try {
      await axios.post("http://192.168.0.12:50000/appDopt", {
        IdPeticion: "eliminar",
        IdUsuario: datosUsuario[0].IdUsuario,
      });
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Establece el indice de la mascota seleccionada de la @constant {useState} listaMascotas y navega a la
   * pantalla "Info", para mostrar la ficha informativa de dicha mascota.
   * @param {String} index se utiliza para establecer el valor de la @constant {useContext} current
   * utilizando el indice generado por el componente FlatList
   */
  const infoMascotaImagen = (index) => {
    setCurrent(index);
    navigation.navigate("Info");
  };

  return (
    <View style={estilos.principal}>
      <View style={estilos.cajaFotoNombre}>
        <Image
          source={require("../assets/images/usuario.png")}
          style={estilos.iconoPerfilUsuario}
        />
        <Text style={{ color: "#B41D5C" }}>
          {datosUsuario[0].NombreUsuario +
            ", " +
            datosUsuario[0].Edad +
            " años"}
        </Text>
      </View>

      <View style={estilos.cajadatosUsuario}>
        <View style={estilos.datos}>
          <Entypo
            name="email"
            size={24}
            style={estilos.iconos}
            color="#B41D5C"
          />
          <Text>{datosUsuario[0].Email}</Text>
        </View>

        <View style={estilos.datos}>
          <MaterialCommunityIcons
            name="calendar-account-outline"
            size={24}
            style={estilos.iconos}
            color="#B41D5C"
          />
          <Text>{datosUsuario[0].FecNac}</Text>
        </View>

        <View style={estilos.datos}>
          <MaterialIcons
            name="phonelink-ring"
            size={24}
            style={estilos.iconos}
            color="#B41D5C"
          />
          <Text>
            {datosUsuario[0].Tel == undefined ? "s/n" : datosUsuario[0].Tel}
          </Text>
        </View>
      </View>

      {listaMascotas[0].foto === " " && (
        <View style={estilos.cajaMensaje}>
          <Text style={estilos.mensaje}>
            Aún no has seleccionado ninguna mascota.
          </Text>
        </View>
      )}

      {listaMascotas[0].foto !== " " && (
        <View style={estilos.cajaMensaje}>
          <Text>Sus mascotas seleccionadas:</Text>
          <FlatList
            data={listaMascotas}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={estilos.contenedorImagen}
                  onPress={() => infoMascotaImagen(item.id)}
                >
                  <ImageBackground
                    source={{ uri: item.foto }}
                    resizeMode="stretch"
                    style={estilos.imagenFondo}
                    borderRadius={18}
                  >
                    <Text style={estilos.textoImagen}>{item.nombre}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}

      <View style={estilos.cajaTerminos}>
        <Text
          style={{ textDecorationLine: "underline" }}
          onPress={() => navigation.navigate("Terminos")}
        >
          Términos y condiciones
        </Text>
        <Text
          style={{ textDecorationLine: "underline", color: "red" }}
          onPress={lanzarMensajeEliminacion}
        >
          Eliminar cuenta
        </Text>
        <ModalEliminar
          visible={mostrarModal}
          cancelar={opcionCancelar}
          confirmar={eliminarCuenta}
        />
      </View>
    </View>
  );
};

export default Perfil;

const estilos = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  cajaFotoNombre: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  iconoPerfilUsuario: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  cajadatosUsuario: {
    marginBottom: 20,
  },
  iconos: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  datos: { flexDirection: "row", alignItems: "center" },
  textoDatos: { fontSize: 15, color: "black" },
  cajaMensaje: { flex: 1 },
  mensaje: {
    color: "red",
    alignSelf: "center",
    fontSize: 20,
    textAlign: "justify",
  },
  contenedorImagen: {
    height: 120,
    width: 120,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 3,
    borderRadius: 20,
  },
  imagenFondo: {
    flex: 1,
    borderRadius: 20,
  },
  textoImagen: {
    color: "white",
    fontFamily: "monospace",
    fontStyle: "italic",
    fontWeight: "bold",
    textShadowRadius: 20,
    textShadowColor: "black",
    fontSize: 10,
    padding: 5,
    marginLeft: 5,
    marginTop: 80,
  },
  cajaTerminos: {
    alignItems: "center",
    marginBottom: 20,
  },
});
