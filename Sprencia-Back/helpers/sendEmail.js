const nodemailer = require('nodemailer');

const sendEmail = async (email) => {

  const bodyMessage = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    p,
    a,
    h1,
    h2 {
      font-family: Arial, Helvetica, sans-serif;
    }

    h1 {
      font-size: 60px;
    }

    h2 {
      font-size: 20px;
    }

    p,
    a {
      font-size: 15px;
    }

    .btn {
      width: 15%;
      background-color: #000000;
      color: #ddd !important;
      border-radius: 10px;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      font-weight: bold;
      display: inline-block;
      font-size: 15px;
      margin: 5px;
      transition-duration: .4s;
      cursor: pointer
    }

    .btn:hover {
      background-color: #000000e8;
      color: #ddd;
    }
  </style>
</head>

<body>

  <div style="background-color: #e3e3e3; height: 100vh">
    <div style="padding: 10px">
      <h1 style="text-align: center; padding: 5px;">SPRENCIA</h1>
      <!-- Cuerpo del mensaje -->
      <div style="padding: 5px 0px 5px 0px; text-align: center;">
        <p>¿Has olvidado tu contraseña?</p>
        <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta</p>
        <h2>Para restablecer tu contraseña pulsa en el botón</h2>
        <a class="btn" href="http://localhost:4200/reset-password">Cambiar contraseña</a>
      </div>
    </div>
  </div>

</body>

</html>`

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_APP_PASS,
    }
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Reset de contraseña",
    html: bodyMessage
  }
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log("Correo enviado")
    }
  })
}

module.exports = {
  sendEmail
};
