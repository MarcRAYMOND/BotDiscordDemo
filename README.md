# discord-bot-demo - 0.2

Functionnality demo of this bot :<br/>
Listen write channel , detect a combo of word(You can change for you regex) and for action generate image with a text(You can change text)<br/>
Join your voice channel with /join and listen, warning dection in french fr-Fr you can change, after dectet yes bot use giphy sdk generate gif (Same you can change param lang )<br/>
Database connexion, not use again<br/>
And log generate to trace the application<br/>

## Installation
You needed install NODEJS and configure a bot in discord (https://discordpy.readthedocs.io/en/latest/discord.html )<br/>
git clone https://github.com/Flam3rboy/discord-bot-client<br/>
Rename config.json.default in config.json.default<br/>
Param bddhost,bddname,discord,bddlogin,bddpassword are parameter for you database<br/>
Param token is the token of the bot discord(See a tutorial how to create bot discord)<br/>
Param tokengiphy is a token to use giphy-sdk (Go to https://developers.giphy.com/ create an acocunt and get a token)<br/>
Param idchannel is the id channel where the bot write to generate giphy<br/>
<br/>
For use audio detection we use Google Cloud Speech-to-Text (Create a project and generate identify of service at the google generate file json give the botdiscordapigoogle.json and put this file on root director)<br/>

## Launch
nodejs index.js in you console<br/>
Tape your text corresponding the regex<br/>
To try vocaln got to the channel vocal tape /join, and say yes for english  ou oui fo french<br/>
Good Luck

