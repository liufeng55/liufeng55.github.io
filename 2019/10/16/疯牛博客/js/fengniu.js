
var p1 = document.getElementById("p1");
var date = new Date("2020/01/24");
function fn(){
	var nowDate = Date.now();
	var date1 = date-nowDate;
	var DD = Math.floor(date1/1000/60/60/24);
	var hh = Math.floor(date1/1000/60/60)%24;
	var mm = Math.floor(date1/1000/60)%60;
	var ss = Math.floor(date1/1000)%60;
	var str = `${DD}天${a(hh)}小时${a(mm)}分${a(ss)}秒`;
	p1.innerHTML = str;
}
fn();
setInterval(fn,1000);
function a(n){
	return n<10 ? "0" + n : n
}