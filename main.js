const five = require("johnny-five");
const firmata = require("firmata").Board;
const EtherPortClient = require("etherport-client").EtherPortClient;

const netList = require('network-list');
const devicesPort = 3030
const colors = {
  RED:   "#ff0000",
  GREEN: "#00ff00",
  BLUE:  "#0000ff"
}

var aliveDevices
var ios = []
var ESPs = []
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

  rgb.color(colors.BLUE);
}


netList.scan({ip:netConf.ip}, (err, arr) => {
  console.log('start scanning for devices')
  aliveDevices = arr.filter((device) =>{
      return device.alive && netConf.macs.includes(device.mac)
  })
  
  console.log(`all devices: ${aliveDevices.length}`)

  aliveDevices.forEach(device => {
    console.log(`configuring device: ${device.ip}`)
    ESPs.push(new five.Board({
    io: new firmata(new EtherPortClient({
      host: device.ip,
      port: devicesPort,
      mac: device.mac
      }))
    }))
    // console.log(`${ESPs.length} device: ${device.ip}`)
  });

  console.log(`all ESPs finded: ${ESPs.length}`)
  
  ESPs.forEach(device => {
    console.log(device.mac)
    device.on("ready", boardHandler)  
  });
  
})


