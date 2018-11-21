const five = require("johnny-five");
const firmata = require("firmata").Board;
const EtherPortClient = require("etherport-client").EtherPortClient;

const netList = require('network-list');

const devicePort = 3030
var aliveDevices
var ios = []
var ESPs = null
const netConf = {
  ip:'192.168.137',
  macs: ['5c:cf:7f:c1:7b:ab']
}


const boardHandler = function(){
  console.log('board ready');
  
  let rgb = new five.Led.RGB({
    pins: {
      red: 15,
      green: 12,
      blue: 13
    }
  })

  this.on('exit', function(){
    rgb.off();
    console.log('exit')
  });

  rgb.color("#ff00ff");
}


netList.scan({ip:netConf.ip}, (err, arr) => {
  aliveDevices = arr.filter((device) =>{
      return device.alive && netConf.macs.includes(device.mac)
  })
  console.log(aliveDevices)
  

  // {
  //   io: new firmata(new EtherPortClient({
  //     host: '192.168.137.94',
  //     port: 3030,
  //     mac: "5c:cf:7f:c1:7b:ab"
  //   }))
  // }

  aliveDevices.forEach(device => {
    
    ios.push({
      io: new firmata(new EtherPortClient({
        host: device.ip,
        port: devicePort,
        mac: device.mac
      }))
    })
  });
  ESPs = new five.Boards(ios)
  ESPs(ios).on("ready", boardHandler)
})


