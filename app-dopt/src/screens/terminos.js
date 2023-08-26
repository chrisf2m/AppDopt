/* cSpell:disable */
import React from "react";
import { Text, ScrollView, StyleSheet } from "react-native";

/**
 * Componente utilizado para mostrar textos con los terminos y condiciones de la app.
 */
const Terminos = () => {
  return (
    <ScrollView style={estilos.principal}>
      <Text style={estilos.parrafos}>
        Bienvenido a AppDopt. Al acceder y utilizar nuestra aplicación móvil,
        aceptas cumplir con los siguientes términos y condiciones de uso:
      </Text>
      <Text style={estilos.parrafos}>
        1. Aceptación de los términos y condiciones Al utilizar appDopt, aceptas
        cumplir con estos términos y condiciones de uso y nuestra política de
        privacidad. Si no estás de acuerdo con estos términos, no uses nuestra
        aplicación.
      </Text>
      <Text style={estilos.parrafos}>
        2. Uso de la aplicación: La aplicación appDopt es una plataforma para
        conectar a personas interesadas en adoptar mascotas con organizaciones y
        refugios que buscan hogares para animales. La información proporcionada
        en nuestra aplicación es solo con fines informativos y no debe ser
        considerada como asesoramiento profesional. appDopt no se hace
        responsable de la información incorrecta proporcionada por terceros.
      </Text>
      <Text style={estilos.parrafos}>
        3. Propiedad intelectual Los derechos de propiedad intelectual de
        appDopt, incluidos los derechos de autor y marca registrada, son
        propiedad exclusiva de appDopt y están protegidos por las leyes de
        propiedad intelectual aplicables. No puedes utilizar nuestro contenido,
        imágenes, marca registrada o cualquier otro material sin nuestro
        consentimiento previo por escrito.
      </Text>
      <Text style={estilos.parrafos}>
        4. Limitación de responsabilidad appDopt no se hace responsable de
        cualquier daño directo o indirecto, consecuente, incidental, especial o
        punitivo que surja del uso de nuestra aplicación o de la información
        proporcionada por ella. appDopt no se hace responsable de ninguna
        inexactitud o error en la información proporcionada por terceros.
      </Text>
      <Text style={estilos.parrafos}>
        5. Cambios en los términos y condiciones Nos reservamos el derecho de
        cambiar estos términos y condiciones en cualquier momento. Es tu
        responsabilidad revisar periódicamente estos términos y condiciones para
        estar al tanto de los cambios.
      </Text>
      <Text style={estilos.parrafos}>Política de Privacidad: </Text>
      <Text style={estilos.parrafos}>
        En appDopt, nos tomamos muy en serio la privacidad de nuestros usuarios.
        Esta política de privacidad describe cómo recopilamos, utilizamos y
        protegemos tus datos personales.
      </Text>
      <Text style={estilos.parrafos}>
        1. Información que recopilamos Recopilamos información personal que nos
        proporcionas directamente al utilizar nuestra aplicación, como tu
        nombre, dirección de correo electrónico y número de teléfono. También
        podemos recopilar información anónima a través de cookies y otras
        tecnologías similares.
      </Text>
      <Text style={estilos.parrafos}>
        2. Uso de la información Utilizamos la información personal que
        recopilamos para proporcionar y mejorar nuestra aplicación, para
        comunicarnos contigo y para cumplir con nuestras obligaciones legales.
      </Text>
      <Text style={estilos.parrafos}>
        3. Compartir información No compartimos tu información personal con
        terceros sin tu consentimiento previo por escrito, excepto cuando sea
        necesario para proporcionar nuestros servicios o cuando esté legalmente
        permitido.
      </Text>
      <Text style={estilos.parrafos}>
        4. Seguridad de la información Implementamos medidas de seguridad
        razonables para proteger tu información personal contra la pérdida, el
        acceso no autorizado, la divulgación, la alteración y la destrucción.
      </Text>
      <Text style={estilos.parrafos}>
        5. Tus derechos Tienes derecho a acceder, corregir, actualizar y
        eliminar tu información personal. También tienes derecho a objetar el
        procesamiento de tu información personal y a solicitar que se restrinja
        su procesamiento.
      </Text>
    </ScrollView>
  );
};

export default Terminos;

const estilos = StyleSheet.create({
  principal: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  parrafos: { margin: 10, textAlign: "justify" },
});
