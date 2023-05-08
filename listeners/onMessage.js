module.exports = {
    autoReact: (message) => {

        // List of channels for rating reactions
        const ratingChannelIds = [
            // "1068789123088928772",
            process.env.NEWSCHANNEL,
            process.env.SURVIVALUPDATECHANNEL,
            process.env.SKYBLOCKUPDATECHANNEL
        ];

        // Automatic announcement reactions
        if(ratingChannelIds.includes(message.channelId)) {
            message.react('👍');
            message.react('♥️');
            message.react('👎');
        } else if(message.channelId === process.env.BOOSTSCHANNEL) {
            message.react('♥️');
        } else {
            // Automatic "bosshub" reaction
            if(message.content.toLowerCase().includes("bosshub")) {
                message.react(process.env.BOSSHUBEMOJI);
            }
        }

    }
}