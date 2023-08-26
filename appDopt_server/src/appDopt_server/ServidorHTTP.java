package appDopt_server;

import java.net.InetSocketAddress;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;
import com.sun.net.httpserver.HttpServer;

/**
 * Clase principal del programa que contiene la logica del servidor.
 */
public class ServidorHTTP {
	/**
	 * Es el metodo principal del programa el cual se encrga de arrancar el
	 * servidor.
	 * 
	 * @param array de String 
	 */
	public static void main(String[] args) throws Exception {

		try {
			String host = "192.168.0.12";
			int puerto = 50000;
			InetSocketAddress direccionTCPIP = new InetSocketAddress(host, puerto);
			int backlock = 0;
			HttpServer servidor = HttpServer.create(direccionTCPIP, backlock);
			String contextPath = "/appDopt";
			GestorHTTP gestorHttp = new GestorHTTP();
			servidor.createContext(contextPath, gestorHttp);
			ThreadPoolExecutor threadPoolExecutor = (ThreadPoolExecutor) Executors.newFixedThreadPool(10);
			servidor.setExecutor(threadPoolExecutor);
			servidor.start();
			System.out.println("Servidor AppDopt arranca en el puerto " + puerto + "...");
		} catch (Exception e) {
			System.err.println(e);
		}
	}
}
