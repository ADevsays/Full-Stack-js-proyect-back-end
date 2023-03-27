import nodemailer from 'nodemailer';

export default async function emailRegister(data) {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const { email, name, token } = data;
    //Send email

    const info = await transport.sendMail({
        from: 'APV - ADMINISTRADOR DE PACIENTES DE VETERINARIA',
        to: email,
        subject: 'Comprueba tu cuenta en APV',
        text: 'Comprueba tu cuenta en APV',
        html: `
        <div style="margin:auto; text-align:center; padding: 2rem 12px; box-shadow: 1px 1px 20px black;
        max-width: 600px; border-radius: 15px; margin-top:20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-weight: 500;">
          <h3>Hola: ${name}</h3>
          <p>Comprueba tu cuenta de APV</p>
          <p style="font-size: .9em;">Tu cuenta ya está lista, solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONT_URL}/confirmar/${token}"
            style="display: block; text-decoration: none; max-width: 180px; background-color: rgb(255, 17, 0); color: white; padding: 12px; margin: 30px auto; font-size: 0.8em;  border-radius: 7px;">Comprobar cuenta</a>
          </p>
          <p style="font-size: 0.7em;">Si tu no creaste esta cuenta, ignora este mensaje</p>
        </div>
            `
    });

    console.log('Message send sucessfully', info.messageId);

}