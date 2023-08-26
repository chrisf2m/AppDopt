package appDopt_server;

import java.util.Properties;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

/**
 * Clase que proporciona un servicio de mensajería al cliente.
 */
public class ServicioMail {

	/**
	 * Metodo que contiene la logica para enviar un correo electronico a un
	 * destinatario, utilizando el servicio SMTP de Office365
	 * 
	 * @param String mensaje con Mensaje a enviar
	 * @param String destinatario con el correo  del destinatario
	 */
	public void altaUsuario(String mensaje, String destinatario) {

		try {
			String puertoTls = "587"; // Puerto para TLS.
			String servidorSMTP = "smtp.office365.com";
			String remitente = "chmemo@floridauniversitaria.es";
			String contrasenya = "Cra.7225";
			String asunto = "Confirmacion del registro";

			System.out.println("Envio de correos:");
			System.out.println(" > Remitente: " + remitente);
			System.out.println(" > Asunto: " + asunto);
			System.out.println(" > Mensaje: " + mensaje);

			// Creamos las propiedades del servicio de mensajeria:
			Properties propiedades = System.getProperties();
			propiedades.put("mail.smtp.host", servidorSMTP);
			propiedades.put("mail.smtp.user", remitente);
			propiedades.put("mail.smtp.clave", contrasenya);
			propiedades.put("mail.smtp.auth", "true");
			propiedades.put("mail.smtp.starttls.enable", "true");
			propiedades.put("mail.smtp.port", puertoTls);

			// Creamos la sesion, pasandole las propiedades:
			Session sesion = Session.getDefaultInstance(propiedades);
			// Creacion del mensaje, pasandole la sesion:
			MimeMessage email = new MimeMessage(sesion);
			// Remitente:
			email.setFrom(new InternetAddress(remitente));
			// Destinatario:
			email.addRecipients(Message.RecipientType.TO, destinatario);
			// Asunto:
			email.setSubject(asunto);

			// Cuerpo del mensaje:
			BodyPart cuerpoMensaje = new MimeBodyPart();
			cuerpoMensaje.setText(mensaje);
			// Combinamos todas las partes del cuerpo del mensaje:
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(cuerpoMensaje);
			// Mensaje resultante:
			email.setContent(multipart);

			// Envio del mensaje resultante:
			Transport transport = sesion.getTransport("smtp");
			transport.connect(servidorSMTP, remitente, contrasenya);
			transport.sendMessage(email, email.getAllRecipients());
			transport.close();
			System.out.println("Correo enviado");

		} catch (MessagingException e) {
			System.err.println(e);
		}
	}

}
