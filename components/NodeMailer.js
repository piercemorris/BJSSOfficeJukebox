var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'playlistsongnames@gmail.com',
        pass: '010011012Ymn'
                   }
   });
   
  let mailOptions = {
      from: '"Playlist songNames" <playlistsongnames@gmail.com>', // sender address
      to: "ynour12@gmail.com", // list of receivers
      subject: "sasdasd", // Subject line
      html: '<b>NodeJS qwert</b>' // html body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });
