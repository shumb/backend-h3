var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var url = require('url');
var fs = require("fs");

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({
	extended: false
})

app.use(express.static('public'));
//app.use(express.static('ui'));

app.get('/index.htm', function(req, res) {
	res.sendFile(__dirname + "/" + "index-fw.htm");
})

var fw_config = JSON.parse(fs.readFileSync("fw.json"));
var fw_url = 'http://219.136.252.150:8003/ota/gd03-ota-signed-full-201611252104.zip';
var fw_md5 = '5cd8b566b4416bc411ae61051fb8c2d4';
var fw_info = '20161125版固件更新\n\n------------------------------------------------------------------------------------------\n1. 支持OTA后台升级以及断点续传等功能\n2. 支持长按Power键关机（同时硬件也需修改）\n3. 支持长按Home键清理内存\n4. 支持屏保功能\n5. 设置界面优化\n6. 增加小白文件管理器\n7. PPPoE和密码对齐\n8. 修改系统版本号\n9. 修改OTTA名称以及去除TID和IEMI\n10. 解决无法关闭键盘按键音的问题\n11. 解决开关屏幕时声音与设置不一致的问题\n12. 解决开机电视机与音响同时发出声音问题\n13. 无线WiFi“断开连接”修改为忽略网络\n14. 蓝牙模式和AUX模式下低音与GDS功能为不可点击状态\n------------------------------------------------------------------------------------------\n'

var fw_ver = 'V0.9.2';
var fw_type = 3;

var res_firmware = {
	code: 1,
	msg: "new OTA udpatezip",
	data: {
		firmware: fw_config,
		other: "",
	}
}
var res_firmware2 = {
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
var res_no_update = {
	code: 2,
	msg: "No udatezip",
	data:"",
}
var res_last_update = {
	code: 2,
	msg: "Last udatezip",
	data:"",
}
var res_type_invalid = {
	code: 2,
	msg: "Device type invalid",
	data:"",
}
var res_sn_invalid = {
	code: 2,
	msg: "Device SN invalid",
	data:"",
}
var res_info1 = {
	code: 3,
	msg: "other query",
	data:"",
}

// { SN: 'GD0300010001',
//   RomName: 'Avlight-S1',
//   RomVersion: 'V0.9.2',
//   RomType: 'GD03' }

function isTypeValid( params ){
	if(params.RomName == 'Avlight-S1' &&
		params.RomType == 'GD03'){
		return true;
	}
	return false;
}
function isSnValid( params ){
	if(!params.SN){
		console.log("SN is null");
		return false;
	}
	console.log("SN length=%d", params.SN.length);
	if(params.SN.length > 3 ){
		return true;
	}
	return false;
}
function isUpdateLast( params ){
	if(params.RomVersion == fw_config.version){
		return true;
	}
	return false;
}

var alwayUpdate = false;

app.get('/firmware', function(req, res) {
	var params = url.parse(req.url, true).query;
	var resdata;
	//console.log(fw_config);
	console.log("version:%s", fw_config.version);
	if ( alwayUpdate == true ){
		resdata = res_firmware;
	}else if(! isTypeValid(params)){
		resdata = res_type_invalid;
	}else if(! isSnValid(params)){
		resdata = res_sn_invalid;
	}else if(isUpdateLast(params)){
		resdata = res_last_update;
	}else{
		resdata = res_firmware;
	}
	console.log(params);
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(JSON.stringify(resdata));
	console.log("done");
})

app.post('/process_post', urlencodedParser, function(req, res) {

	response = {
		user: req.body.user,
		passwd: req.body.passwd
	};
	console.log(response);
	res.writeHead(200, {'Content-Type': 'text/plain'});

	res.end('');
	//res.end(JSON.stringify(response));
})

var server = app.listen(9002, function() {

	var host = server.address().address
	var port = server.address().port

	console.log("firmware server port: %s", port)

})
