var http = require('http');
var url = require('url');
var util = require('util');

// { RomName: 'BoxRom', RomVersion: '20161025', RomType: 'YB' }

// http://7xt5k7.com1.z0.glb.clouddn.com/DragonKey_V2.1.rar   md5:e1d2eceb6b2e168e17caf8d1ec74c546
// url: 'http://7xt5k7.com1.z0.glb.clouddn.com/h3-gd03-rom-beta-2016110311.tar.gz', md5:e7780eb58992fac7c906d54043af98c8
// http://7xt5k7.com1.z0.glb.clouddn.com/anzhuoshichang_16791539.apk    md5: 4c6554242eb86cc7424001a8f932b164
// http://7xt5k7.com1.z0.glb.clouddn.com/anzhuoshichang_16791539.apk  4c6554242eb86cc7424001a8f932b164
// http://www.avlight.com:8003/ota/gd03-ota-signed-full-201611091851.zip c0b1f81f9bd93c6370efc75dd5b5cddf
//'http://7xt5k7.com1.z0.glb.clouddn.com/gd03-ota-signed-full-201611091851.zip';
//var fw_url = 'http://7xt5k7.com1.z0.glb.clouddn.com/anzhuoshichang_16791539.apk';
//var fw_md5 = '4c6554242eb86cc7424001a8f932b164';
//var fw_url = 'http://219.136.252.150:8003/ota/gd03-ota-signed-full-201611091851.zip';
//var fw_md5 = 'c0b1f81f9bd93c6370efc75dd5b5cddf';
var fw_url = 'http://219.136.252.150:8003/ota/gd03-ota-signed-full-201611252104.zip';
var fw_md5 = '5cd8b566b4416bc411ae61051fb8c2d4';
var fw_info = '20161125版固件更新\n\n------------------------------------------------------------------------------------------\n1. 支持OTA后台升级以及断点续传等功能\n2. 支持长按Power键关机（同时硬件也需修改）\n3. 支持长按Home键清理内存\n4. 支持屏保功能\n5. 设置界面优化\n6. 增加小白文件管理器\n7. PPPoE和密码对齐\n8. 修改系统版本号\n9. 修改OTTA名称以及去除TID和IEMI\n10. 解决无法关闭键盘按键音的问题\n11. 解决开关屏幕时声音与设置不一致的问题\n12. 解决开机电视机与音响同时发出声音问题\n13. 无线WiFi“断开连接”修改为忽略网络\n14. 蓝牙模式和AUX模式下低音与GDS功能为不可点击状态\n------------------------------------------------------------------------------------------\n'

var fw_ver = '201611091851';
var fw_type = 3;

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
var other_req2 = {
	code: 2,
	msg: "no udatezip",
	data:"",
}
var other_req3 = {
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
		//reqdata = other_req3;
		console.log("query firmware for test ...");
	}else {
		console.log(pathname);
		reqdata = other_req3;
		console.log("query others ...");
	}

	console.log(params);
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(JSON.stringify(reqdata));
}).listen(9001);

console.log("listen on port 9001");

