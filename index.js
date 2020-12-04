require('dotenv').config()
const oDiscord = require('discord.js'); 
const oMysql = require('mysql');
const {prefix,token,tokengiphy,bddhost,bddname,bddlogin,bddpassword,idchannel} = require('./config.json');
const oFs = require('fs');
const oText2png = require('text2png');
const oClientDiscord = new oDiscord.Client();
const OGoogleSpeech = require('@google-cloud/speech')
const { Transform } = require('stream')
const sModeDebug=false;


const GphApiClient = require('giphy-js-sdk-core')
oGihpyClient = GphApiClient(tokengiphy)

function convertBufferTo1Channel(buffer) {
  const convertedBuffer = Buffer.alloc(buffer.length / 2)

  for (let i = 0; i < convertedBuffer.length / 2; i++) {
    const uint16 = buffer.readUInt16LE(i * 4)
    convertedBuffer.writeUInt16LE(uint16, i * 2)
  }

  return convertedBuffer
}

class ConvertTo1ChannelStream extends Transform {
  constructor(source, options) {
    super(options)
  }

  _transform(data, encoding, next) {
    next(null, convertBufferTo1Channel(data))
  }
}


oClientDiscord.on('ready', () => {
    console.log('Ready to work !');
    
});
  


/*  
const oConnexion = oMysql.createConnection({
host: bddhost,
user: bddlogin,
password: bddpassword
});

oConnexion.connect(function(err) {
if (err) throw err;
console.log("Connected!");
});

TO  DO : ACTION TO SAVE IN DATABASE
*/

function fnDisplayLog(sText)
{
  fnLogAction(sText,'Debug Data');
  if(sModeDebug){
    
    console.log(sText);
  }
}

function fnGnerateDateHeure(){
    let oDate=new Date();

    let sYear = oDate.getFullYear();
    let sMonth = (oDate.getMonth())+1;
    let sDay = oDate.getDate();
    let sHour = oDate.getHours();
    let sMinute = oDate.getMinutes();
    
    if(sMonth< 10){
        sMonth = '0' + sMonth;
    }
    if(sDay< 10){
        sDay = '0' + sDay;
    }
    if(sHour< 10){
        sHour = '0' + sHour;
    }
    if(sMinute< 10){
        sMinute = '0' + sMinute;
    }

    let sDateHeure=sDay+'/'+sMonth+'/'+sYear+' '+sHour+':'+sMinute;

    return sDateHeure;
}
function fnLogAction(sAction,sOther){
   
    let oDate=new Date();
    let sText=sAction+'|'+sOther;

    let sYear = oDate.getFullYear();
    let sMonth = (oDate.getMonth())+1;
    let sDay = oDate.getDate();
    
    if(sMonth< 10){
        sMonth = '0' + sMonth;
    }
    if(sDay< 10){
        sDay = '0' + sDay;
    }
    let sNameFile='logaction'+sYear+sMonth+sDay+'.txt';

    oFs.appendFile('log/'+sNameFile,fnGnerateDateHeure()+' : '+sText+'\r\n', (err) => { 
        if (err) { 
          fnDisplayLog('Erreur du fichier de log:'+err); 
        } 
      });
    
}

function fnGetRandomInt(max) {
return Math.floor(Math.random() * Math.floor(max));
}

function fnGenerateimage(sType,sText){
    let iTemp = fnGetRandomInt(1000000);
    let sName= 'image'+sType+iTemp+'.png'
    oFs.writeFileSync(sName, oText2png(sText, {
        font: '160px Futura',
        color: '#1832E1',
        backgroundColor: '#E7846F',
        lineSpacing: 10,
        padding: 30
    }));
    return sName;
}
function fnSendImage(sType,sText,oMessage){
    let sName=fnGenerateimage(sType,sText);
    let oAttachment = new oDiscord.MessageAttachment('./'+sName, sName);
    oMessage.channel.send({
            embed: {
                files: [
                    oAttachment
                ],
                image: {
                    url: 'attachment://'+sName
                }
            }
        }).then(result   => fnDeleteFile(sName))
        .then(result   => fnLogAction(sType,oMessage.content))
        ;
}

function fnDeleteFile(sName){
    
    oFs.unlink(sName, function (err) {
        if (err) throw fnDisplayLog('Erreur de suprpession de fichier :'+err); 
        fnLogAction('Supression réussi du fichier',sName);
        });
        
}

function fnDetectText(oMsg)
{
        //TO DO mettre l'espression, un libellé et la reponse dans une bdd pour en rajotuer autant qu'on le souhaite
    //TO DO enregistrer l'utilisateur  et sa demande et l'heure pour ne pas se faire spam, et au bout de 3 fois lui repondre arrete de spam
    //TO DO ne pas repondre 2 fois a le meme question pendans 5 minutes

    let sMessage=oMsg.content;
    let oExpressionaccraid = new RegExp("^.*acc.*raid.*$");
    let oExpressionquandraid = new RegExp("^.*(quand|qund).*raid.*$");
    let oExpressionquand6g = new RegExp("^.*(quand|qund).*6g.*$");
    let oExpressionquandkyurem = new RegExp("^.*(quand|qund).*kyurem.*$");

    if (oExpressionaccraid.test(sMessage)) {
        fnSendImage('accraid','Va dans le salon #sdfsdf et lit  les instructions !!!!',oMsg);
    }
    if (oExpressionquandraid.test(sMessage)) {
        fnSendImage('quandraid','Les raid c\'est de  6h à 22h',oMsg);
    }
    if (oExpressionquand6g.test(sMessage)) {
        fnSendImage('quand6g','La new generation c\'est le 2 decembre 10h local',oMsg);
    }
    if (oExpressionquandkyurem.test(sMessage)) {
        fnSendImage('quandkyurem','kyurem c\'est du 2 à 22h(Donc le 3 à 6h) au 31 à 22h',oMsg);
    }
}


oClientDiscord.on('message', msg => {

    fnDetectText(msg);
});

  oClientDiscord.login(token);

  oClientDiscord.on('message', async message => {
    // Voice only works in guilds, if the message does not come from a guild,
    // we ignore it
    if (!message.guild) return;
  
    if (message.content === '/join') {
      // Only try to join the sender's voice channel if they are in one themselves
      if (message.member.voice.channel) {
        global.soChannel = message.guild.channels.cache.get(idchannel); //General salon 
        const connection = await message.member.voice.channel.join();
      } else {
        message.reply('You need to join a voice channel first!');
      }
    }
  });


  oClientDiscord.on('guildMemberSpeaking',async  (member, speaking) => {
    
    
    const oGoogleSpeechClient = new OGoogleSpeech.SpeechClient()
    const connection = await member.voice.channel.join();
    const receiver = connection.receiver;

	if(speaking) {
      fnDisplayLog(member.displayName + ' started talking save.');    
        // this creates a 16-bit signed PCM, stereo 48KHz stream
    const audioStream = receiver.createStream(member, { mode: 'pcm' })
    const requestConfig = {
      encoding: 'LINEAR16',
      sampleRateHertz: 48000,
      languageCode: 'fr-FR'
    }
    const request = {
      config: requestConfig
    }
    const recognizeStream = oGoogleSpeechClient
      .streamingRecognize(request)
      .on('error', console.error)
      .on('data', response => {
        let sTranscription = response.results
          .map(result => result.alternatives[0].transcript)
          .join('\n')
          .toLowerCase()
          fnDisplayLog(`Transcription: ${sTranscription}`)
        if (sTranscription === 'oui' || sTranscription === 'chat' || sTranscription === 'non' || sTranscription === 'stop') {
          /// Gif Search
        
          oGihpyClient.search('gifs', {"q": sTranscription,"lang": "fr"})
            .then((response) => {
                let iTotalResponses = response.data.length;
                let iResponseIndex = Math.floor((Math.random()*10)+1) % iTotalResponses;
                let oReponseFinal = response.data[iResponseIndex];

                soChannel.send( ":wave: Commande "+sTranscription,{
                  files: [oReponseFinal.images.fixed_height.url]
                });
              
            })
            .catch((err) => {
              fnDisplayLog(err);
              soChannel.send( "Commande non trouvé : "+sTranscription)
            })
        }

      })

    const convertTo1ChannelStream = new ConvertTo1ChannelStream()

    audioStream.pipe(convertTo1ChannelStream).pipe(recognizeStream)

    audioStream.on('end', async () => {
      fnDisplayLog('audioStream end')
    })
    fnDisplayLog(member.displayName + ' stoped talking save.');    
	
	}
	
});

  
