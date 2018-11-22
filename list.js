const netList = require('./newtork-list');
const netConf = {
  ip:'192.168.137',
  macs: ['5c:cf:7f:c1:7b:ab']
}

console.log('start scaning')
netList.scan({ip: netConf.ip}, (err, arr) => {
  
  let aliveDevices = arr.filter((device) =>{
    return device.alive && netConf.macs.includes(device.mac)
  })
  console.log(aliveDevices); // array with all devices
});