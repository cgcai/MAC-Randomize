var crypto = require("crypto");
var exec = require("child_process").execSync;

var exports = module.exports = {};

exports.randomMAC = function () {
    var macBytes = crypto.randomBytes(6).toString("hex");
    var randMAC = macBytes.match(/.{2}/g).map(function (val, index, array) {
        return (index < (array.length - 1)) ? val + ":" : val;
    }).reduce(function (initial, val, index, array) {
        return initial + val;
    }, "");
    return randMAC;
};

exports.findMAC = function (iface) {
    var ifEther = exec("sudo ifconfig " + iface + " | grep ether").toString().trim();
    return ifEther.substr(ifEther.search(/([a-zA-Z0-9]{2}:){5}[a-zA-Z0-9]{2}/g));
};

exports.applyMAC = function (iface, mac) {
    exec("sudo ifconfig " + iface + " ether " + mac);
};
