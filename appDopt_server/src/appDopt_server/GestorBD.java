package appDopt_server;

import static com.mongodb.client.model.Filters.*;
import org.bson.Document;
import org.json.JSONArray;
import org.json.JSONObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

/**
 * Clase que contiene los metodos para actualizar y/u obtener informacion de la
 * base de datos, segun cada caso
 */
public class GestorBD {

	private static MongoClient clienteMongo;
	private static MongoDatabase bdMongo;
	private static MongoCollection<Document> coleccion;
	private static MongoCursor<Document> cursor;

	/**
	 * Metodo constructor de la clase
	 */
	public GestorBD() {
	}

	/**
	 * Realiza la conexion a la base de datos
	 */
	public void conectar() {
		clienteMongo = new MongoClient("localhost", 27017);
		bdMongo = clienteMongo.getDatabase("appDoptBD");
	}

	/**
	 * Desconecta la base de datos
	 */
	public void desconectar() {
		clienteMongo.close();
	}

	/**
	 * Obtiene los datos de usuario de la base de datos para que el cliente pueda
	 * loguearse
	 * 
	 * @param String con el nombre del usuario
	 * @return Objeto Json con los datos del usuario
	 */
	public JSONObject obtenerDatosUsuario(String nombreUsuario) {
		JSONObject obj = null;
		try {
			coleccion = bdMongo.getCollection("usuarios");
			cursor = coleccion.find(eq("Usuario", nombreUsuario)).iterator();
			while (cursor.hasNext())
				obj = new JSONObject(cursor.next().toJson());
		} catch (Exception e) {
			System.err.println(e);
		}
		return obj;
	}

	/**
	 * Obtiene la lista de las mascotas que el usuario ha elegido
	 * 
	 * @param String con el ID del usuario
	 * @return Array de objetos Json con la lista de las mascotas y sus respectivos
	 *         datos
	 */
	public JSONObject[] obtenerMascotasSeleccionadas(String idUsuario) {
		JSONObject arrayJson[] = null;
		try {
			coleccion = bdMongo.getCollection("mascotas_elegidas");
			long numeroDoc = coleccion.countDocuments(eq("Id_usuario", idUsuario));
			arrayJson = new JSONObject[(int) numeroDoc];
			int contador = 0;

			cursor = coleccion.find(eq("Id_usuario", idUsuario)).iterator();
			while (cursor.hasNext()) {
				JSONObject obj = new JSONObject(cursor.next().toJson());
				arrayJson[contador] = obj;
				contador++;
			}
		} catch (Exception e) {
			System.err.println(e);
		}
		return arrayJson;
	}

	/**
	 * Obtiene y compara el correo electronico del usuario, para ver si coinciden y
	 * devolver una respuesta segun el caso
	 * 
	 * @param String con el correo electronico del usuario
	 * @return String con la respuesta OK o noOK
	 */
	public String verificarCorreo(String correoElectronico) {
		String respuestaOK = "noOK";
		JSONObject obj = null;
		try {
			coleccion = bdMongo.getCollection("usuarios");
			cursor = coleccion.find(eq("Email", correoElectronico)).iterator();
			while (cursor.hasNext()) {
				obj = new JSONObject(cursor.next().toJson());
			}
			if (correoElectronico.equals(obj.get("Email")))
				respuestaOK = "OK";
		} catch (Exception e) {
			System.err.println(e);
		}
		return respuestaOK;
	}

	/**
	 * Obtiene la lista de las mascotas que se encuentran en adopción
	 * 
	 * @return Objeto JsonArray con la lista de las mascotas y sus respectivos datos
	 */
	public JSONArray mascotasEnAdopcion() {
		JSONArray arrayJson = null;
		try {
			coleccion = bdMongo.getCollection("lista_mascotas");
			cursor = coleccion.find().iterator();
			while (cursor.hasNext()) {
				JSONObject obj = new JSONObject(cursor.next().toJson());
				arrayJson = obj.getJSONArray("result");
			}
		} catch (Exception e) {
			System.err.println(e);
		}
		return arrayJson;
	}

	/**
	 * Recibe un objeto de tipo Json con la información de un nuevo usuario, para
	 * almacenarlos en la base de datos
	 * 
	 * @param Objeto Json con los datos del nuevo usuario
	 */
	public void nuevoUsuario(JSONObject datosNuevoUsuario) {
		try {
			coleccion = bdMongo.getCollection("usuarios");
			cursor = coleccion.find().iterator();
			int idInt = 1;

			while (cursor.hasNext()) {
				JSONObject obj = new JSONObject(cursor.next().toJson());
				idInt = Integer.parseInt(obj.getString("Id")) + 1;
			}

			Document newDoc = new Document();
			newDoc.append("Id", String.valueOf(idInt));
			newDoc.append("Usuario", datosNuevoUsuario.getString("Usuario"));
			newDoc.append("Pass", datosNuevoUsuario.getString("Pass"));
			newDoc.append("Email", datosNuevoUsuario.getString("Email"));
			newDoc.append("Fecha_nac", datosNuevoUsuario.getString("FecNac"));
			newDoc.append("Edad", datosNuevoUsuario.getString("Edad"));
			newDoc.append("Telefono", datosNuevoUsuario.getString("Telefono"));
			coleccion.insertOne(newDoc);
		} catch (Exception e) {
			System.err.println(e);
		}
	}

	/**
	 * Recibe un String con el ID de un usuario registrado y un objeto Json, con las
	 * respuestas proporcionadas en la app y la mascota seleccionada. Llama a otros
	 * dos metodos para guardar los datos en las colecciones correspondientes.
	 * 
	 * @param String con el ID del usuario
	 * @param Objeto Json con la mascota seleccionada y las respuestas del
	 *               formulario
	 */
	public void guardarDatos(String idUsuario, JSONObject mascota_Respuestas) {

		// Obtenemos el ID del usuario actual(logueado)
		String nombreUsuario = "";
		coleccion = bdMongo.getCollection("usuarios");
		cursor = coleccion.find(eq("Id", idUsuario)).iterator();
		while (cursor.hasNext()) {
			JSONObject obj = new JSONObject(cursor.next().toJson());
			nombreUsuario = obj.getString("Usuario");
		}
		guardarRespuestasUsuario(idUsuario, nombreUsuario, mascota_Respuestas);
		guardarMascotaSeleccionada(idUsuario, nombreUsuario, mascota_Respuestas);
	}

	/**
	 * Guarda las respuestas del usuario en su respectiva coleccion, junto con su ID
	 * y nombre
	 * 
	 * @param String con el ID de ususario
	 * @param String con el nombre de ususario
	 * @param Objeto Json con los datos a guardar
	 */
	private void guardarRespuestasUsuario(String idUsuario, String nombreUsuario, JSONObject respuestas) {
		try {
			coleccion = bdMongo.getCollection("respuestas_usuarios");
			Document resDoc = new Document();
			resDoc.append("Id_usuario", idUsuario);
			resDoc.append("Nombre_usuario", nombreUsuario);
			// resDoc.append("Id_mascota", String.valueOf(jsO.getInt("IdMascota")));
			resDoc.append("Nombre_mascota", respuestas.getString("Nombre"));
			resDoc.append("R1", respuestas.getString("R1"));
			resDoc.append("R2", respuestas.getString("R2"));
			resDoc.append("R3", respuestas.getString("R3"));
			resDoc.append("R4", respuestas.getString("R4"));
			resDoc.append("R5", respuestas.getString("R5"));
			resDoc.append("R6", respuestas.getString("R6"));
			coleccion.insertOne(resDoc);
		} catch (Exception e) {
			System.err.println(e);
		}
	}

	/**
	 * Guarda la mascota seleccionada poe el usuario en su respectiva coleccion,
	 * junto con su ID y nombre
	 * 
	 * @param String con el ID de ususario
	 * @param String con el nombre de ususario
	 * @param Objeto Json con los datos a guardar
	 */
	private void guardarMascotaSeleccionada(String idUsuario, String nombreUsuario, JSONObject mascotaSeleccionada) {
		try {
			coleccion = bdMongo.getCollection("mascotas_elegidas");
			Document datDoc = new Document();
			datDoc.append("Id_usuario", idUsuario);
			datDoc.append("Nombre_usuario", nombreUsuario);
			datDoc.append("Id_mascota", String.valueOf(mascotaSeleccionada.getInt("IdMascota")));
			datDoc.append("Nombre_mascota", mascotaSeleccionada.getString("Nombre"));
			datDoc.append("Foto", mascotaSeleccionada.getString("Foto"));
			datDoc.append("Edad", mascotaSeleccionada.getString("Edad"));
			datDoc.append("Raza", mascotaSeleccionada.getString("Raza"));
			datDoc.append("Sexo", mascotaSeleccionada.getString("Sexo"));
			datDoc.append("Tamanyo", mascotaSeleccionada.getString("Tamanyo"));
			datDoc.append("Numero_chip", mascotaSeleccionada.getString("MicroChip"));
			datDoc.append("Numero_cartilla", mascotaSeleccionada.getString("Cartilla"));
			datDoc.append("Rabia", mascotaSeleccionada.getString("Rabia"));
			datDoc.append("Fecha_rabia", mascotaSeleccionada.getString("FechaRabia"));
			datDoc.append("Esterilizado", mascotaSeleccionada.getString("Esterilizado"));
			datDoc.append("Observaciones", mascotaSeleccionada.getString("Observaciones"));
			coleccion.insertOne(datDoc);
		} catch (Exception e) {
			System.err.println(e);
		}
	}

	/**
	 * Elimina un usuario de la base de datos y toda su informacion, filtrando por
	 * su ID. Llama a otros dos metodos, para eliminar tambien sus respuestas y sus
	 * mascotas seleccionadas.
	 * 
	 * @param String con el ID de ususario
	 */
	public void eliminarUsuario(String idUsuario) {
		try {
			eliminarMascotasSeleccionadas(idUsuario);
			eliminarRespuestasUsuario(idUsuario);
			coleccion = bdMongo.getCollection("usuarios");
			coleccion.deleteOne(eq("Id", idUsuario));
		} catch (Exception e) {
			System.err.println(e);
		}
	}

	/**
	 * Elimina las respuestas de un usuario, filtrando por su ID.
	 * 
	 * @param String con el ID de ususario
	 */
	private void eliminarRespuestasUsuario(String idUsuario) {
		try {
			coleccion = bdMongo.getCollection("respuestas_usuarios");
			coleccion.deleteMany(eq("Id_usuario", idUsuario));
		} catch (Exception e) {
			System.err.println(e);
		}
	}

	/**
	 * Elimina las mascotas seleccionadas de un usuario, filtrando por su ID.
	 * 
	 * @param String con el ID de ususario
	 */
	private void eliminarMascotasSeleccionadas(String idUsuario) {
		try {
			coleccion = bdMongo.getCollection("mascotas_elegidas");
			coleccion.deleteMany(eq("Id_usuario", idUsuario));
		} catch (Exception e) {
			System.err.println(e);
		}
	}

	/**
	 * Actualiza la contraseña de un usuario, filtrando por su correo electronico.
	 * 
	 * @param String con la nueva contraseña
	 * @param String con el correo del usuario
	 */
	public void restablecerContrasenya(String nuevaCon, String correoUsuario) {
		try {
			coleccion = bdMongo.getCollection("usuarios");
			coleccion.updateOne(eq("Email", correoUsuario), new Document("$set", new Document("Pass", nuevaCon)));
		} catch (Exception e) {
			System.err.println(e);
		}
	}

}
