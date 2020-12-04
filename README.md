# discord-bot-demo - 0.2

Functionnality demo of this bot :
Listen write channel , detect a combo of word(You can change for you regex) and for action generate image with a text(You can change text)
Join your voice channel with /join and listen, warning dection in french fr-Fr you can change, after dectet yes bot use giphy sdk generate gif (Same you can change param lang )
Database connexion, not use again
And log generate to trace the application

## Installation
You needed install NODEJS and configure a bot in discord (https://discordpy.readthedocs.io/en/latest/discord.html )
git clone https://github.com/Flam3rboy/discord-bot-client
Rename config.json.default in config.json.default
Param bddhost,bddname,discord,bddlogin,bddpassword are parameter for you database
Param token is the token of the bot discord(See a tutorial how to create bot discord)
Param tokengiphy is a token to use giphy-sdk (Go to https://developers.giphy.com/ create an acocunt and get a token)
Param idchannel is the id channel where the bot write to generate giphy

For use audio detection we use Google Cloud Speech-to-Text (Create a project and generate identify of service at the google generate file json give the botdiscordapigoogle.json and put this file on root director)

## Launch
nodejs index.js in you console
Tape your text corresponding the regex
To try vocaln got to the channel vocal tape /join, and say yes for english  ou oui fo french
Good Luck

