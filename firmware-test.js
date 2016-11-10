var http = require('http');
var url = require('url');
var util = require('util');

// { RomName: 'BoxRom', RomVersion: '20161025', RomType: 'YB' }

// http://7xt5k7.com1.z0.glb.clouddn.com/DragonKey_V2.1.rar   md5:e1d2eceb6b2e168e17caf8d1ec74c546
// url: 'http://7xt5k7.com1.z0.glb.clouddn.com/h3-gd03-rom-beta-2016110311.tar.gz', md5:e7780eb58992fac7c906d54043af98c8
// http://7xt5k7.com1.z0.glb.clouddn.com/anzhuoshichang_16791539.apk    md5: 4c6554242eb86cc7424001a8f932b164
// http://7xt5k7.com1.z0.glb.clouddn.com/anzhuoshichang_16791539.apk  4c6554242eb86cc7424001a8f932b164
var fw_url = 'http://7xt5k7.com1.z0.glb.clouddn.com/gd03-ota-signed-full-201611091851.zip';
var fw_md5 = 'c0b1f81f9bd93c6370efc75dd5b5cddf';
var fw_info = '1.update test \n2.settings type changed';
var fw_ver = '201611091851';
var fw_type = 1;

var firmware_req = {
	code: 1,
	msg: "new OTA udpatezip",
	data: {
		firmware: {
			md5: fw_md5,
			url: fw_url,
			info: fw_info,
			version: fw_ver,
			type: fw_type,
		},
		other: "",
	},
}
var other_req = {
	code: 2,
	msg: "no udatezip",
	data:"",
}
var other_req = {
	code: 3,
	msg: "other query",
	data:"",
}

function isFirmareQuery(pathname){

}

http.createServer(function(req, res){
	var params = url.parse(req.url, true).query;
	var pathname = url.parse(req.url).pathname;
	var reqdata;

	if(pathname == "/favicon.ico"){
		console.log("query favicon");
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end();
		return;
	}

	if (pathname == "/firmware"){
		reqdata = firmware_req;
		console.log("query firmware ...");
	}else {
		console.log(pathname);
		reqdata = other_req;
		console.log("query others ...");
	}

	console.log(params);
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(JSON.stringify(reqdata));
}).listen(9001);

console.log("listen on port 9001");

