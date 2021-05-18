const { networkInterfaces } = require('os');
const interfaces = networkInterfaces();

function check(dev) {
    const ip = Object.keys(dev)
    if (ip.includes('Ethernet')) {
        console.log(dev.Ethernet[1].address)
    } else {
        console.log(dev["Wi-Fi"][1].address);
    }
}

check(interfaces);