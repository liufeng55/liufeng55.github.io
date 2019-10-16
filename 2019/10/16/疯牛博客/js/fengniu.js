var time = document.getElementsByClassName("time");
        var arr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        function fn(){
            for(var i=0; i<time.length; i++){
                (function(num){
                    var date = new Date();
                    var year = date.getFullYear();
                    var month = date.getMonth()+1;
                    var DD = date.getDate();
                    var week = date.getDay();
                    var hh = date.getHours();
                    var mm = date.getMinutes();
                    var ss = date.getSeconds();
                    switch(num){
                        case 0:
                            hh = hh-7;
                            break;
                        case 1:
                            break;
                        case 2:
                            hh = hh+2;
                            break;
                        case 3:
                            if(hh<15){
                                DD = DD-1;
                                week = week-1;
                                if(week<0){
                                    week = 6;
                                }
                                hh = hh+9;
                            }else{
                                hh = hh-15;
                            }
                            break;
                        case 4:
                            if(mm<30){
                                hh = hh-3;
                                mm = mm+30;
                            }else{
                                hh = hh-2;
                                mm = mm-30;
                            }
                            break;
                        case 5:
                            hh = hh-4;
                            break;
                        case 6:
                            hh = hh-6;
                            break;
                        default:
                            console.log("不对哦");
                    }
                    var str = `${year}年${month}月${DD}号 ${arr[week]} ${a(hh)}:${a(mm)}:${a(ss)}`;
                    time[num].innerHTML = str;
                })(i);
            }
        }

        fn()
        setInterval(fn,1000);
        function a(n){
            return n<10 ? "0" + n : n
        }

        var date4 = new Date();
        console.log(date4);