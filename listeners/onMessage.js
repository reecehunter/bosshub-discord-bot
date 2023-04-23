module.exports = {
    autoReact: (message) => {
        const channelIds = ["1068789123088928772", process.env.NEWSCHANNEL, process.env.SURVIVALUPDATECHANNEL, process.env.SKYBLOCKUPDATECHANNEL, ];

        if(channelIds.includes(message.channelId)) {
            message.react('👍');
            message.react('♥️');
            message.react('👎');
        }
    }
}