
const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const bot = new discord.Client();


bot.on("ready", () => {
    bot.channels.get('563772719120908304').send(`${bot.user.username} is online `).then(msg => msg.delete(10000));
    console.log(`${bot.user.username} is online `)
    bot.user.setPresence({
        game: {
            name: 'the elmo song                                                                      ',
            type: 'LISTENING'
        },
        status: 'dnd'
    })
})
bot.on('guildMemberAdd', member => {
    var member = member
    bot.channels.get('536648539883700225').send(`+ ${member}`); 
    member.send(`Welkom op de DahRealCompany discord! peel jij de game Minetopia op de DDG Server?  Druk dan op de :house: emotie in #welkom , hiermee krijg je de Minetopia Speler rank en heb je toegang voor meer chats`)
});
bot.on('guildMemberRemove', member => {
    var member = member
    bot.channels.get('536648539883700225').send(`- ${member}`);
});
bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    var prefix = botConfig.prefix;
    var messageArray = message.content.split(" ");
    var command = messageArray[0];
    var arguments = messageArray.slice(1);
    if (command === `${prefix}time`) {
        var member1 = message.author
        if (!message.member.roles.has('477835161698959371')) return message.channel.send("U heeft geen permisies om dit commando te gebruiken ")
        message.channel.send("Check uw prive berichten").then(msg => msg.delete(10000))
        message.author.send('Hallo, Wat is jouw minecraft naam?')
            .then(function () {
                message.author.dmChannel.awaitMessages(response => message.content, {
                    max: 1,
                })

                    .then((collected) => {
                        var minecraftnaam = collected.first().content
                        message.author.send(`Oke je naam is genoteerd als: ${collected.first().content}! \n\n**Volgende vraag.**\n\nWat is jouw momentele time op minetopia? Gelieve dit in een screenshot te sturen als een link!`)

                            .then(function () {
                                message.author.dmChannel.awaitMessages(response => message.content, {
                                    max: 1,
                                })
                                    .then((collected) => {
                                        message.author.send(`Bedankt voor het melden van je time. \n\n**Jij heb als time dit gemeldt:**\n${collected.first().content}`);
                                        bot.channels.get('563772719120908304').send(`**Time melding** \n\n ${message.member} heeft zijn time gemeldt \n\n**Minecraft naam:**\n${minecraftnaam} \n\n${collected.first().content}`)
                                        .then(function () {
                                            message.author.dmChannel.awaitMessages(response => message.content, {
                                                max: 1,
                                        
                                    })
                                    .then((collected) => {
                                        var jaofnee = collected.first().content
                                        if (jaofnee = "ja") return message.author.send("**Jouw time melding is succesvol verzonden!**"),  bot.channels.get('563772719120908304').send(`**Time melding** \n\n ${message.member} heeft zijn time gemeldt \n\n**Minecraft naam:**\n${minecraftnaam} \n\n${collected.first().content}`)
                                        else {
                                            message.author.send("Oke uw time melding is gecanceld!");
                                        }
                                        
                                    })
                                    })
                                })
                            })

                    });
            })
    }
    if (command === `${prefix}afmelden`) {
        var member1 = message.author
        if (!message.member.roles.has('477835161698959371')) return message.channel.send("U heeft geen permisies om dit commando te gebruiken ")
        message.channel.send("Check uw prive berichten").then(msg => msg.delete(10000))
        message.author.send('Hallo, Wat is jouw minecraft naam?')
            .then(function () {
                message.author.dmChannel.awaitMessages(response => message.content, {
                    max: 1,
                })
                    .then((collected) => {
                        var minecraftnaam = collected.first().content
                        message.author.send(`Oke je naam is genoteerd als: ${collected.first().content}! \n\n**Volgende vraag.**\n\nVan wanneer tot wanneer ben jij er niet?`)

                            .then(function () {
                                message.author.dmChannel.awaitMessages(response => message.content, {
                                    max: 1,
                                })
                                    .then((collected) => {
                                        var afwezigheid = collected.first().content
                                        message.author.send(`Bedankt. \n\n**Jij heb voor je tijd afwezig het volgende gemeldt:**\n${collected.first().content}.\n\nVolgende vraag. Waarom ben je afwezig?`)

                                            .then(function () {
                                                message.author.dmChannel.awaitMessages(response => message.content, {
                                                    max: 1,
                                                })
                                                    .then((collected) => {
                                                        var reden = collected.first().content
                                                        message.author.send(`**Afwezig**\n\nMinecraft naam: ${minecraftnaam}\n\nTijd afwezig: ${afwezigheid}\n\nReden: ${reden}\n\n**Weet je zeker dat je deze melding wil versturen? Typ ja voor ik weet het zeker en nee voor niet versturen!**`)
                                                        .then(function () {
                                                            message.author.dmChannel.awaitMessages(response => message.content, {
                                                                max: 1,
                                                        
                                                    })
                                                    .then((collected) => {
                                                        var jaofnee = collected.first().content
                                                        if (jaofnee = "ja") return message.author.send("**Jouw afmelding is succesvol verzonden!**"), bot.channels.get('563772719120908304').send(`**Afwezig**\n\nMinecraft naam: ${minecraftnaam}\n\nTijd afwezig: ${afwezigheid}\n\nReden: ${reden}`);
                                                        else {
                                                            message.author.send("Oke uw afmelding is gecanceld!");
                                                        }
                                                        
                                                    })
                                                })
                                            })

                                            });
                                    })
                            })
                    })
            })
        }
    if (command === `${prefix}help`) {

            var boticon = bot.user.displayAvatarURL;
            var botEmbed = new discord.RichEmbed()


            return message.channel.send(botEmbed);
        }
        if (command === `${prefix}kick`) {
            var ban3 = new discord.RichEmbed()
                .setDescription("U heeft geen permissies om dit commando te gebruiken")
                .setColor("#ee0000");
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(ban3);
            var kick = message.guild.member(message.mentions.users.first());
            var ban2 = new discord.RichEmbed()
                .setDescription("**Fout** gebruik: \n!kick @gebruiker reden")
                .setColor("#ee0000");

            if (!kick) return message.channel.send(ban2);

            var reason = arguments.join(" ").slice(22);
            if (!reason) return message.channel.send(ban2);

            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("U heeft geen permisies om dit commando te gebruiken ")

            if (kick.hasPermission("KICK_MEMBERS")) return message.channel.send("Het is niet toegestaan om deze persoon te kicken!")

            var kick1 = new discord.RichEmbed()
                .setDescription(":regional_indicator_m: :regional_indicator_o: :regional_indicator_d: :regional_indicator_e: :regional_indicator_r: :regional_indicator_a: :regional_indicator_t: :regional_indicator_i: :regional_indicator_o: :regional_indicator_n: \n**Kick**")
                .setColor("#ee0000")
                .addField("**Speler: **", kick)
                .addField("**Gekickd door: **", message.author)
                .addField("**Reden:** ", reason);

            var kickch = message.guild.channels.find(`name`, "straf")
            if (!kickch) return message.channel.send("Log kanaal niet gevonden");

            message.guild.member(kick).kick(reason);
            message.channel.send("Deze gebruiker is gekickt")
            kickch.send(kick1);

            message.guild.member(kick).send(`:regional_indicator_k: :regional_indicator_i: :regional_indicator_c: :regional_indicator_k: \n\n\n**U bent gekickt van de DahRealCompany discord!**\n\n**Reden:** ${reason}`);


            return;
        }

        if (command === `${prefix}ban`) {


            var ban = message.guild.member(message.mentions.users.first());
            var text = "**Hack Protection** \n\nU bent verbannen van de Hack Protection discord \nWegens: ", reason;
            var ban2 = new discord.RichEmbed()
                .setDescription("**Fout** gebruik: \n!ban @gebruiker reden")
                .setColor("#ee0000");
            var ban4 = new discord.RichEmbed()
                .setDescription("U heeft geen permissies om dit commando te gebruiken")
                .setColor("#ee0000");
            if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(ban4);

            if (!ban) return message.channel.send(ban2);

            var reason = arguments.join(" ").slice(22);
            if (!reason) return message.channel.send(ban2);

            if (ban.hasPermission("BAN_MEMBERS")) return message.channel.send("Het is niet toegestaan om deze persoon te bannen!")

            var ban1 = new discord.RichEmbed()
                .setDescription(":regional_indicator_m: :regional_indicator_o: :regional_indicator_d: :regional_indicator_e: :regional_indicator_r: :regional_indicator_a: :regional_indicator_t: :regional_indicator_i: :regional_indicator_o: :regional_indicator_n: \n**Ban**")
                .setColor("#ee0000")
                .addField("**Speler: **", ban)
                .addField("**Geband door: **", message.author)
                .addField("**Reden: **", reason);

            var banch = message.guild.channels.find(`name`, "straf")
            if (!banch) return message.channel.send("Log kanaal niet gevonden");

            message.channel.send("Deze gebruiker is verbannen")

            banch.send(ban1);

            message.guild.member(ban).send(`:regional_indicator_b: :regional_indicator_a: :regional_indicator_n:  \n\n\n**U bent verbannen van de DahRealCompany discord!**\n\n**Reden:** ${reason}`);


            return;

        }
        if (command === `${prefix}moderation`) {
            if (!message.member.hasPermission("MENTION_EVERYONE")) return message.channel.send("U heeft geen permisies om dit commando te gebruiken ")
            var boticon = bot.user.displayAvatarURL;
            var botEmbed2 = new discord.RichEmbed()
                .setDescription(":regional_indicator_m: :regional_indicator_o: :regional_indicator_d: :regional_indicator_e: :regional_indicator_r: :regional_indicator_a: :regional_indicator_t: :regional_indicator_i: :regional_indicator_o: :regional_indicator_n: \n\n**Kick:** !kick @gebruiker Reden \n\n**Ban:** !ban @gebruiker reden ")
                .setThumbnail(boticon)
                .setColor("#ee0000");


            return message.channel.send(botEmbed2);
        }
        if (command === `${prefix}clear`) {
            var clear = new discord.RichEmbed()
                .setDescription("U heeft geen permissies om dit commando te gebruiken")
                .setColor("#ee0000");
            var clear1 = new discord.RichEmbed()
                .setDescription(`**Fout** gebruik:\n\n${prefix}clear Aantal berichten`)
                .setColor("#ee0000");

            if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(clear);

            if (!arguments[0]) return message.channel.send(clear1);

            if (Number.isInteger(parseInt(arguments[0]))) {
                var amount = parseInt(arguments[0]);
                var clear2 = new discord.RichEmbed()
                    .setDescription(`**verwijderdt**\n\nEr zijn ${amount} berichten verwijderdt.`)
                    .setColor("#ee0000");
                message.channel.bulkDelete(amount).then(() => { })

                message.channel.send(clear2).then(msg => msg.delete(10000));
            } else {
                return message.channel.send(clear1)
            }
        }
        if (botConfig.FILTER_LIST.some(word => message.content.toLowerCase().includes(word))) {
            if (message.member.hasPermission("MANAGE_MESSAGES")) return;
            var kut = new discord.RichEmbed()
                .setDescription(`**Gelieve niet te schelden**`)
                .setColor("#ee0000");
            message.delete(), message.channel.send(kut).then(msg => msg.delete(10000));
        }

        if (command === `${prefix}ticket`) {

            // ID van de categorie van de tickets.
            const categoryId = "558397340076212265";
            var boticon = bot.user.displayAvatarURL;
            // Verkrijg Gebruikersnaam
            var userName = message.author.username;
            // Verkrijg discriminator
            var userDiscriminator = message.author.discriminator;

            // Als ticket al gemaakt is
            var bool = false;

            // Kijk na als ticket al gemaakt is.
            message.guild.channels.forEach((channel) => {

                // Als ticket is gemaakt, zend bericht.
                if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {

                    message.channel.send("U heeft al een ticket openstaan");

                    bool = true;

                }

            });
            if (bool == true) return;

            var embedCreateTicket = new discord.RichEmbed()
                .setTitle("Hallo, " + message.author.username)
                .setColor("#56f442")
                .setFooter("Uw ticket kanaal wordt aangemaakt!");

            message.channel.send(embedCreateTicket);

            // Maak kanaal en zet in juiste categorie.
            message.guild.createChannel("Ticket" + "-" + userName, "text").then((createdChan) => { // Maak kanaal

                createdChan.setParent(categoryId).then((settedParent) => { // Zet kanaal in category.

                    settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), { "READ_MESSAGES": false, "VIEW_CHANNEL": false });
                    settedParent.overwritePermissions(message.author, {

                        "READ_MESSAGES": true, "SEND_MESSAGES": true,
                        "ATTACH_FILES": true, "CONNECT": true,
                        "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true

                    });
                    settedParent.overwritePermissions(message.guild.roles.find('id', "541200602714210312"), { "READ_MESSAGES": true, "VIEW_CHANNEL": true });

                    var embedParent = new discord.RichEmbed()
                        .setTitle("Hallo, " + message.author.username.toString())
                        .setDescription("Hoe kunnen wij uw helpen?\n\nStuur alsvast jouw vraag dan kunnen wij uw zo snel mogelijk helpen!\n")
                        .setThumbnail(boticon)
                        .setColor("#56f442")
                        .setFooter("©DahRealCompany")

                    settedParent.send(embedParent);

                }).catch(err => {
                    message.channel.send("Er is iets fout gelopen.");
                });

            }).catch(err => {
                message.channel.send("Er is iets fout gelopen.");
            });

        }
        if (command === `${prefix}lockdown`) {
            if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("U heeft geen permissie");
            var embedParent1 = new discord.RichEmbed()
                .setTitle("Lockdown geactiveert voor 1 minuut!")
                .setThumbnail(boticon)
                .setColor("#56f442")
                .setFooter("©DahRealCompany");
            var embedParent2 = new discord.RichEmbed()
                .setTitle("Lockdown afgelopen!")
                .setThumbnail(boticon)
                .setColor("#56f442")
                .setFooter("©DahRealCompany");

            message.channel.send(embedParent1).then(msg => msg.delete(70000)), message.channel.overwritePermissions(message.guild.id, { "SEND_MESSAGES": false });
            function timer() { message.channel.overwritePermissions(message.guild.id, { "SEND_MESSAGES": true }), message.channel.send(embedParent2).then(msg => msg.delete(10000)) };

            setTimeout(timer, 60000);


        }
        if (command === `${prefix}close`) {
            const categoryId = "558397340076212265";
            if (message.channel.parentID == categoryId) {

                message.channel.delete();



                var embedCloseTicket = new discord.RichEmbed()
                    .setTitle(!timessage.channel.name)
                    .setDescription("Je ticket is gesloten. Wil je een nieuwe maken doe dan !ticket")
                    .setThumbnail(boticon)
                    .setColor("#56f442")
                    .setFooter("©DahRealHelpDesk");

                var logChannel = message.guild.channels.find(`name`, "straf");
                if (!logChannel) return message.channel.send("Dit kanaal bestaat niet");

                logChannel.send(embedCloseTicket);
                message.guild.member(message.author).send(embedCloseTicket);
            }
        }

        if (command === `${prefix}rename`) {
            var reason = arguments.join(" ").slice(0);
            const categoryId = "541198738262327299";
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("U heef geen permissies voor dit command");
            if (message.channel.parentID == categoryId) {

                return message.channel.setName(`Ticket-${reason}`), message.channel.send(`De kanaal naam is gewijzigt naar: ${reason}`)
            }
            else message.channel.send("Dit kanaal kan niet worden gerenamed");
        }

    });



bot.login(botConfig.token);