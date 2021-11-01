const BUZZ_IMAGE = '../src/pictures/buzz.png'

sendBuzz = (client) => {
    client.on("message", (message) => {
        if(mensage.author.bot) return;
        if(message.content.startsWith('!ele')) {
            message.channel.send({files: BUZZ_IMAGE})
        }
    })
}

export default sendBuzz;