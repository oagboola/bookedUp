var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

module.exports = {
  sendMail: function(req, res){
    var messageContent = req.body;
    var mail = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: {
        personalizations: [{
          to: [{email: 'lydexmail@gmail.com'}],
          subject: messageContent.subject
        }],
        from: {
          email: messageContent.email,
          name: messageContent.name
        },
        content: [{
                  type: 'text/plain',
                  value: messageContent.content
                }]
      }
    })

    sg.API(mail, function(error, response){
      if(error){
        res.json(error)
      }
      res.json(response)
    })
  }
}