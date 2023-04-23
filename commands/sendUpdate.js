const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
require("dotenv").config();
const { client } = require("../settings");

module.exports = {
  data: new SlashCommandBuilder().setName("update").setDescription("Create a new update message")
  .addStringOption(option =>
      option.setName('server')
          .setDescription('Which server is this update for?')
          .setRequired(true)
          .addChoices(
              { name: 'Survival', value: 'SURVIVAL' },
              { name: 'SkyBlock', value: 'SKYBLOCK' },
          ))
  .addBooleanOption(option =>
      option.setName('ping')
            .setRequired(true)
            .setDescription('Should members be notified of this? (Defaults to false)'))
    .addStringOption(option =>
        option.setName('description')
            .setDescription('The content of the update')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('title')
            .setDescription('The title of the update'))
    // .addAttachmentOption(option =>
    //     option.setName('image')
    //         .setDescription('The main image'))
    .addAttachmentOption(option =>
        option.setName('thumbnail')
            .setDescription('The thumbnail image')),

  async execute(interaction) {
    const member = await interaction.guild.members.fetch(interaction.user.id);

    if(!member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return interaction.reply({content:"You must be an Admin to do that.", ephemeral:true});
    }

    const ping = interaction.options.getBoolean("ping");
    const server = interaction.options.getString("server");
    const title = interaction.options.getString("title") || `NEW ${server} UPDATE`;
    const description = interaction.options.getString("description");
    //const image = interaction.options.getAttachment("image") || "";
    const thumbnail = interaction.options.getAttachment("thumbnail");

    const updateRole = server === "SURVIVAL" ? process.env.SURVIVALROLE : process.env.SKYBLOCKROLE;
    const channel = server === "SURVIVAL" ? process.env.SURVIVALUPDATECHANNEL : process.env.SKYBLOCKUPDATECHANNEL;
    const arrowEmoji = process.env.ARROWEMOJI;

    let message = "";
    for(str of description.split("|")) {
        message += `${arrowEmoji} ${str}\n\n`;
    }

    const content = ping ? `<@&${updateRole}>` : "";

    const embed = new EmbedBuilder()
      .setColor(0xbd0d0d)
      .setTitle(`${title}`)
      .setDescription(message)
      .setTimestamp()
      .setImage("https://i.imgur.com/iXWdooS.png")
      .setFooter({ text: `Posted by ${member.user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=256` });
    if(thumbnail) embed.setThumbnail(thumbnail.url);

    await interaction.reply({content:"Success!", ephemeral:true});
    client.channels.cache.get(channel).send({ content:content, embeds: [embed] });
  },
};