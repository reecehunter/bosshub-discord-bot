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

            // Close ticket command
            } else if(message.content.toLowerCase() == "?closeticket") {
                if(message.member.roles.cache.some(role => role.id === process.env.TICKETMASTERROLE)) {
                    message.channel.send("Hello just checking in to make sure your concern been addressed.\n\nIf it has, please close this ticket by clicking the button at the top of this conversation.\n\nIf it hasn't, please respond to this message within 12 hours of your last message or the ticket will be closed and the problem will be considered solved.");
                    message.delete();
                }
            }
        }

    }
}