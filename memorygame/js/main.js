    var ctx;                //定义画布
    var firstpick = true;    //第一张卡片的flag
    var firstcard = -1;
    var secondcard;            //第二张卡片的flag
    var backcolor = "#ffcccc";        //卡片背景颜色
    var tablecolor = "#ffffff";    //文本框背景颜色
    var deck = [];            //存储卡片的数组
    var firstsx = 30;        //卡片的起始位置
    var firstsy = 50;
    var margin = 30;        //卡片之间的间距
    var cardwidth = 100;    //卡片的尺寸
    var cardheight = 100;
    var tid;                //setTimeout的ID
    var matched;            //是否匹配flag
    var starttime;            //游戏开始时间
    var count = 0;            //匹配数量
    var pairs = [            //存储图片的数组
        ["pic/one1.png","pic/one2.png"],
       [ "pic/two1.png","pic/two2.png"],
      ["pic/three1.png","pic/three2.png"],
       ["pic/four1.png","pic/four2.png"],       
       ["pic/five1.png","pic/five2.png"],
       ["pic/six1.png","pic/six2.png"],
       ["pic/seven1.png","pic/seven2.png"],
       ["pic/eight1.png","pic/eight2.png"]       
    ]
    
//定义Card对象，img表示卡片的图片信息，info是卡片的身份证，验证卡片的唯一性
function Card(sx,sy,swidth,sheight, img, info) {
    this.sx = sx;            //card的初始坐标
    this.sy = sy;
    this.swidth = swidth;    //card的尺寸
    this.sheight = sheight;
    this.info = info;        //card的身份证
    this.img = img;            //card图像源
    this.draw = drawback;    //drawback绘制卡片的背景
}

//makedeck方法用来创建六对儿card
function makedeck() {
    //makedeck方法会创建两个具有相同身份证info的卡片a和b
    var i;//身份证
    var acard;//卡片a
    var bcard;//卡片b
    var pica;//卡片a的图像源
    var picb;//卡片b的图像源
    var cx = firstsx;    //卡片的初始位置
    var cy = firstsy;
    var cx1 = firstsx;
    var cy1 = firstsy;
    
    //遍历卡片的对儿数
    for(i=0;i<pairs.length;i++) {
        //创建卡片a
        if(i<4){
            pica = new Image();
            pica.src = pairs[i][0];
            acard = new Card(cx,cy,cardwidth,cardheight,pica,i);
            deck.push(acard);
            //创建卡片b
            picb = new Image();
            picb.src = pairs[i][1];        
            bcard = new Card(cx,cy+cardheight+margin,cardwidth,cardheight,picb,i);
            deck.push(bcard);
            //卡片的x轴依次向右移动
            cx = cx+cardwidth+ margin;
            //绘制卡片a和b
            acard.draw();
            bcard.draw();
        }
        else{
            pica = new Image();
            pica.src = pairs[i][0];
            acard = new Card(cx1,cy1+(cardheight+margin)*2,cardwidth,cardheight,pica,i);
            deck.push(acard);
            //创建卡片b
            picb = new Image();
            picb.src = pairs[i][1];        
            bcard = new Card(cx1,cy1+(cardheight+margin)*3,cardwidth,cardheight,picb,i);
            deck.push(bcard);
            //卡片的x轴依次向右移动
            cx1 = cx1+cardwidth+ margin;
            //绘制卡片a和b
            acard.draw();
            bcard.draw();
        }
        
    }
    
}

function shuffle() {
    //模仿洗牌动作，打乱pairs里卡片的顺序
//coded to resemble how I shuffled cards when playing concentration
//swaps the changing information: the img and the info indicating the matching
var i;
var k;
var holderinfo;    //临时身份证info
var holderimg;    //临时图片信息，这两个临时变量用来实现两张卡片顺序的互换
var dl = deck.length    //dl卡片的数量
var nt;            //nt for循环进步
    for (nt=0;nt<3*dl;nt++) {  //进行三次遍历互换，为的是把牌洗的更乱
    //要交换的第一张卡片的索引值i
      i = Math.floor(Math.random()*dl);
      //第二张卡片卡片的索引值k
      k = Math.floor(Math.random()*dl);
      //交换两张卡片
      holderinfo = deck[i].info;
      holderimg = deck[i].img;
      deck[i].info = deck[k].info;
      deck[i].img = deck[k].img;
      deck[k].info = holderinfo;
      deck[k].img = holderimg;
    }
}

//drawBack方法,绘制卡片的背面
function drawback() {
    ctx.fillStyle = backcolor;
    ctx.fillRect(this.sx,this.sy,this.swidth,this.sheight);    
}

//用choose方法对每个卡片进行单独选择
function choose(ev) {
    var out;
    var mx;
    var my;
    var pick1;
    var pick2;
    //这里跟第四章里获取鼠标坐标的方法是一样的，根据不用的浏览器，应用不用的鼠标坐标属性
    if ( ev.layerX ||  ev.layerX == 0) { // Firefox
               mx= ev.layerX;
            my = ev.layerY;
          } else if (ev.offsetX || ev.offsetX == 0) { // Opera
            mx = ev.offsetX;
            my = ev.offsetY;
          }
    var i;
    for (i=0;i<deck.length;i++){
        //循环遍历所有的卡片，查找
        //1.第一次点击的卡片
        //2.第二次点击的非重复的卡片
        var card = deck[i];
        if (card.sx >=0) //当卡片被移除后，sx属性被设置为-1，所以，这句代码用来避免已移除的卡片被再次点击
        //利用坐标比较，判断鼠标是否在card上方
        if ((mx>card.sx)&&(mx<card.sx+card.swidth)&&(my>card.sy)&&(my<card.sy+card.sheight)) {
            //check that this isn't clicking on first card
            //点击卡片后，判断卡片是否为第一张卡片
            //或者是否为另外一张不同的卡片，如果是，跳出循环
            //此时的i即为当前卡片的身份证
            if ((firstpick)|| (i!=firstcard)) {
                break;
            }
        }
    }
    if (i<deck.length) {
        if (firstpick) {
            //如果点击的是第一张卡片
            firstcard = i;//存储这张卡片的"身份证"
            firstpick = false;//告诉JS第一次卡片已经点击过了
            //绘制第一张卡片的正面
            ctx.drawImage(card.img,card.sx,card.sy,card.swidth,card.sheight);
        }
        else {
            //否则即为第二张卡片
            secondcard = i;//存储第二张卡片的身份证
            //绘制第二张卡片
            ctx.drawImage(card.img,card.sx,card.sy,card.swidth,card.sheight);
            //判断两张卡片的身份证是否匹配
              if (card.info==deck[firstcard].info) {
                matched = true;//标记匹配
                count++;//匹配数+1
                //绘制提示文字的背景
                ctx.fillStyle= tablecolor;
                ctx.fillRect(10,0,900,40);
                //绘制提示文字
                ctx.fillStyle=backcolor;
                ctx.fillText("Number of matches so far: "+String(count),10,20);
                //判读玩家是否完成了所有5对卡片的配对
                if (count>= 8) {
                    //如果完成了游戏，利用Date对象计算游戏时长
                    var now = new Date();
                    var nt = Number(now.getTime());
                    var seconds = Math.floor(.5+(nt-starttime)/1000);
                    
                    //绘制提示文字的背景和文本内容
                    ctx.fillStyle= tablecolor;
                    ctx.fillRect(0,0,900,1000);
                    ctx.fillStyle=backcolor;
                    out = "You finished in "+String(seconds)+ " secs.";
                    ctx.fillText(out,10,100);
                    ctx.fillText("Reload the page to try again.",10,300);
                    return;
                }
                
            }else {
                matched = false;
            }
            //选择完第二张卡片后，可以选择第一张卡片了，所以将firstpick设置为true
            firstpick = true;
            //点击第二张卡片后，用setTimeout延时，添加游戏停顿，1秒后将卡片翻转回来或移除卡片
            tid = setTimeout(flipback, 500);
        }
    }
}

function flipback() {
    var card;
    if (!matched) {
        //如果两张卡片不匹配，则调用它们的draw()方法，绘制卡片的背面
        deck[firstcard].draw();
        deck[secondcard].draw();
    }
    else {
        //如果两张卡片匹配，设置填充颜色为前景色，这样填充完后，卡片看起来的效果是被移除掉
        /*ctx.fillStyle = tablecolor;
                ctx.fillRect(deck[secondcard].sx,deck[secondcard].sy,deck[secondcard].swidth,deck[secondcard].sheight);
                ctx.fillRect(deck[firstcard].sx,deck[firstcard].sy,deck[firstcard].swidth,deck[firstcard].sheight);
                //将两张卡片的sx属性设置为-1，通过这个值，JS可以判断出这两张卡片已经被移除了
                deck[secondcard].sx = -1;
                deck[firstcard].sx = -1;*/
    }
}
//游戏初始化
function init(){
    //定义画布
   ctx = document.getElementById('canvas').getContext('2d');
   canvas1 = document.getElementById('canvas');
   //侦听鼠标事件
   canvas1.addEventListener('click',choose,false);
   //创建卡片
   makedeck();
   //洗牌
   shuffle();
   //设置文本字体、字号等信息
   ctx.font="bold 20pt sans-serif";
   //ctx.fillText("Click on two cards to make a match.",10,20);
   ctx.fillText("Number of matches so far: 0",40,20);
   //用Date对象开始计时
   starttime = new Date();
   starttime = Number(starttime.getTime());
  }

function btn(){
    document.getElementById("play").disabled = false;
}

