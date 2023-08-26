package appDopt_server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import org.json.JSONArray;
import org.json.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

/**
 * Clase donde se gestiona las peticiones Http del cliente Implementa el
 * manejador Http de Java
 */
public class GestorHTTP implements HttpHandler {
	/**
	 * Metodo que gestiona las peticiones, segun si dson de tipo GET o POST
	 * 
	 * @param Objeto HttpExchange
	 */
	@Override
	public void handle(HttpExchange exchange) throws IOException {
		if ("GET".equals(exchange.getRequestMethod())) {
			peticionesGet(exchange);
		} else if ("POST".equals(exchange.getRequestMethod())) {
			peticionesPOST(exchange);
		}
	}

	/**
	 * Metodo que obtiene una peticion de tipo GET del cliente y devuelve una
	 * respuesta distinta de la base de datos, segun cada caso.
	 * 
	 * @param Objeto HttpExchange
	 */
	private void peticionesGet(HttpExchange exchange) {
		try {
			String peticion = exchange.getRequestURI().toString().split("\\?")[1];
			String parametro = peticion.split("=")[0];
			String valor = peticion.split("=")[1];
			OutputStream os = exchange.getResponseBody();
			byte[] bytes = null;
			GestorBD bd = new GestorBD();
			bd.conectar();

			if (parametro.equals("login")) {
				JSONObject datosUsuario = bd.obtenerDatosUsuario(valor);
				if (datosUsuario == null) {
					bytes = "noOK".getBytes(StandardCharsets.UTF_8);
				} else {
					bytes = datosUsuario.toString().getBytes(StandardCharsets.UTF_8);
				}
			} else if (parametro.equals("mascotaselegidas")) {
				JSONObject[] mascotasElegidas = bd.obtenerMascotasSeleccionadas(valor);
				bytes = Arrays.toString(mascotasElegidas).getBytes(StandardCharsets.UTF_8);
			} else if (parametro.equals("verificar")) {
				String respuestaOK = bd.verificarCorreo(valor);
				bytes = respuestaOK.getBytes(StandardCharsets.UTF_8);
			} else if (parametro.equals("mascotas")) {
				JSONArray listaMascotas = bd.mascotasEnAdopcion();
				bytes = listaMascotas.toString().getBytes(StandardCharsets.UTF_8);
			}
			exchange.sendResponseHeaders(200, bytes.length);
			os.write(bytes);
			os.flush();
			os.close();
			bd.desconectar();
		} catch (Exception e) {
			System.err.println(e);
		}

	}

	/**
	 * Metodo que obtiene una peticion de tipo POST del cliente y actualiza la
	 * informacion en la base de datos.
	 * 
	 * @param Objeto HttpExchange
	 */
	private void peticionesPOST(HttpExchange exchange) {
		try {
			String linea, lineasJson = "", idUsuario;
			InputStream is = exchange.getRequestBody();
			InputStreamReader isr = new InputStreamReader(is);
			BufferedReader br = new BufferedReader(isr);

			while ((linea = br.readLine()) != null) {
				lineasJson += linea;
			}
			br.close();
			JSONObject jsonPost = new JSONObject(lineasJson);
			String idPeticion = jsonPost.getString("IdPeticion");
			GestorBD bd = new GestorBD();
			bd.conectar();

			if (idPeticion.equals("registro")) {
				bd.nuevoUsuario(jsonPost);
			} else if (idPeticion.equals("respuestas")) {
				idUsuario = jsonPost.getString("IdUsuario");
				bd.guardarDatos(idUsuario, jsonPost);
			} else if (idPeticion.equals("eliminar")) {
				idUsuario = jsonPost.getString("IdUsuario");
				bd.eliminarUsuario(idUsuario);
			} else if (idPeticion.equals("restablecer")) {
				String nuevaCon = jsonPost.getString("Pass");
				String correoUsuario = jsonPost.getString("Email");
				bd.restablecerContrasenya(nuevaCon, correoUsuario);
			} else if (idPeticion.equals("emailConf")) {
				String destinatario = jsonPost.getString("Email");
				String mensaje = "Su código de confirmación de alta en AppDopt es " + jsonPost.getString("NumAlt");
				ServicioMail servicioMail = new ServicioMail();
				servicioMail.altaUsuario(mensaje, destinatario);
			}
			bd.desconectar();
			String respuesta = "200 OK";
			exchange.sendResponseHeaders(200, respuesta.length());
			OutputStream os = exchange.getResponseBody();
			os.write(respuesta.getBytes());
			os.flush();
			os.close();
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}
