// alert(123)

window.onload = function(){
    // 生成125个li
    (function(){
        var length = 5*5*5,
        oUl = document.getElementById("list").children[0],
        aLi = oUl.children;
        for(var i = 0; i<length; i++){
            var oLi = document.createElement("li");
            oLi.x = i%5;  //每个i所取到的值为 0 1 2 3 4
            oLi.y = Math.floor(i/5%5);  //每个值取值的时候，都是整数
            oLi.z = Math.floor(i/25);
            oLi.innerHTML = i;

            var tx = Math.random()*6000 -3000;
            var ty = Math.random()*6000 -3000;
            var tz = Math.random()*6000 -3000;
            oLi.style.transform = `translate3D(${tx}px,${ty}px,${tz}px)`;
            oUl.appendChild(oLi);
        };
        setTimeout(Gird,200);

        //拖拽以及缩放
        (function(){
            var trZ = -1200;
            var roX = 0;
            var roY = 0;
            document.ondrag = function(){
                return false;
            }
            document.onselectstart = function(){
                return false;
            }

            document.onmousedown = function(e){
                var sX = e.clientX;
                var sY = e.clientY;
                // console.log(sX,sY);
                var rX = roX,rY = roY;
                document.onmousemove = function(e){
                    var _X = e.clientX - sX;
                    var _Y = e.clientY - sY;
                    rX = roX + (-_Y)*0.1;
                    rY = roY + _X*0.1;
                    oUl.style.transform = `translateZ(${trZ}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
                    


                }
                
                document.onmouseup = function(){
                    roX = rX;
                    roY = rY;
                    document.onmousemove = null;
                }
            };

            //滚轮事件
            (function(fn){
                // console.log(456)

                function pandi(e){
                    var d = e.wheelDelta / Math.abs(e.wheelDelta) || -e.detail / Math.abs(e.detail);
                    console.log(d)
                    fn.call(this,d)
                    console.log(123)
                }

                //兼容火狐浏览器
                if(document.onmousewheel === null){
                    var type = 'mousewheel';
                }else{
                    var type = 'DOMMouseScroll'
                };
                document.addEventListener( type , pandi, false);

            })(function(d){
                trZ += d*100;
                oUl.style.transform = `translateZ(${trZ}px) rotateX(${roX}deg) rotateY(${roY}deg)`;
                
            });

        })();


        //点击转换形状
        (function(){
            var aBtn = document.getElementById("btn").getElementsByTagName("li");
            var arr = [Table,Sphere,Helix,Gird];
            for(var i=0; i<arr.length; i++){
                (function(i){
                    aBtn[i].onclick = arr[i];
                    // console.log(i);
                })(i)
            }
            // console.log(aBtn);
        })();

        

        //方正布局
        // Gird()
        function Gird(){
            console.log("方正");
            var disx = 250,
                disy = 250,
                disz = 500;
            for(var i=0; i<length; i++){
                var oLi = aLi[i];
                var x = (oLi.x-2) * disx,
                    y = (oLi.y-2) * disy,
                    z = (oLi.z-2) * disz;
                // console.log(oLi.x)
                oLi.style.transform = `translate3D( ${x}px, ${y}px, ${z}px)`;
            }

        };

        // Helix()
        function Helix(){
            console.log("螺旋状");
            var h = 4;
            var num = length / h;
            var deg = 360/num;
            var tY = 7;
            var mid = length/2;
            for(var i=0; i<length; i++){
                // console.log(aLi[i])
                aLi[i].style.transform = `rotateY(${i*deg}deg) translateY(${(i-mid)*7}px) translateZ(800px)`;
                // transform: translateZ(-1200px) rotateX(0deg) rotateY(0deg);
            }

        };

        // Sphere  球
        function Sphere(){
            var arr = [1,3,6,9,12,15,17,16,15,12,9,6,3,1];
            // var h = 14;
            for(var i=0; i<length; i++){
                var numC = 0, numG = 0, arrNum =0;
                for(var j=0; j<arr.length; j++){
                    arrNum += arr[j];
                    if(arrNum > i){
                        numC = j;
                        numG = arr[j] - (arrNum -i);
                        break;
                    }
                }
                console.log(`第${numC}层，第${numG}个`);
                var ydeg = 360/arr[numC];
                var xdeg = 180/(arr.length -1);
                aLi[i].style.transform = `rotateY(${(numG-1.3)*ydeg}deg) rotateX(${90-numC*xdeg}deg) translateZ(800px)`;
            }
        };

        // Table 元素表
        function Table(){
            var arr = [
                {x:0,y:0},
                {x:17,y:0},
                {x:0,y:1},
                {x:1,y:1},
                {x:12,y:1},
                {x:13,y:1},
                {x:14,y:1},
                {x:15,y:1},
                {x:16,y:1},
                {x:17,y:1},
                {x:0,y:2},
                {x:1,y:2},
                {x:12,y:2},
                {x:13,y:2},
                {x:14,y:2},
                {x:15,y:2},
                {x:16,y:2},
                {x:17,y:2},
            ];
            var disX = 180;
            var disY = 210;
            var midX = 18/2;
            var midY = Math.ceil((length-18)/18 +3)/2;

            console.log(midY);
            for(var i=0; i<length; i++){
                var x,y;
                if(i<18){
                    x = arr[i].x;
                    y = arr[i].y;
                }else{
                    x = i%18;
                    y = Math.floor((i/18))+2;

                }
                aLi[i].style.transform = `translate3D(${(x-midX)*disX}px,${(y-midY)*disY}px,0px)`;
            }
        };


    })();
}