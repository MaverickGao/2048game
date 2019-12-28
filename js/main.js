//定义二维数组
var nums = new Array();
var score = 0;
$(document).ready(function(){
    //加载新游戏事件
    newGame(nums);
});

//开始新游戏
function newGame(nums){
    init(nums);
    //随机两个格子里面生成两个数字
    generateOneNumber(nums);
    generateOneNumber(nums);
}

//初始化页面
function init(nums){
    //初始化单元格位置
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            //获取单元格
            var gridCell = $('#grid-cell-'+i+'-'+j);
            //更改层叠单元格位置
            gridCell.css('top',getPosTop(i));
            gridCell.css('left',getPosLeft(j));
        }
    }
    //初始化数组
    for(var k=0;k<4;k++){
        nums[k] = new Array();
        for(var l=0;l<4;l++){
            nums[k][l] = 0;
        }
    }

    //动态创建上层单元格并初始化
    updateView(nums);

    //初始化分数
    score = 0;
    updateScore(score);
}

//动态生成上次单元格
function updateView(nums){
    //将上层所有单元格清空，然后重新初始化创建
    $('.number-cell').remove();

    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            //得到当前上次单元格
            var numberCell = $('#number-cell-'+i+'-'+j);
            //根据当前上层单元格数字添加上层单元格样式
            if(nums[i][j] == 0){
                //等于零不显示，设置上层单元格长宽为0像素
                numberCell.css('width','0px');
                numberCell.css('height','0px');   
                //更改层叠单元格位置
                numberCell.css('top',getPosTop(i)+37.5);
                numberCell.css('left',getPosLeft(j)+37.5); 
            }else{
                //不等于零，长宽100%
                numberCell.css('width','75px');
                numberCell.css('height','75px');   
                //更改层叠单元格位置
                numberCell.css('top',getPosTop(i));
                numberCell.css('left',getPosLeft(j));
                //填充数字
                numberCell.text(nums[i][j]);
                //填充上层单元格颜色
                numberCell.css('background-color',getNumberBackgroudColor(nums[i][j]));
                //填充上层单元格数字颜色
                numberCell.css('color',getNumberColor(nums[i][j]));
            }
        }
    }
}

/*
    在随机单元格中生成一个随机数
    1、在空余的单元格中随机找一个
    2、随机产生一个2或4或8
*/
function generateOneNumber(nums){
    //首先判断是否还有空间，如果没有空间返回
    if(noSpace(nums)){
        return;
    }
    //随机一个位置
    var count = 0;
    var temp = new Array();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(nums[i][j] == 0){
                temp[count] = i*4 + j; // 1*4+3=7 ------> 7/4=1 7%4=3
                count++;
            }
        }
    }
    //拿到随机坐标
    var pos = Math.floor(Math.random()*count);
    var x = Math.floor(temp[pos]/4);
    var y = Math.floor(temp[pos]%4);
    //随机一个数字
    var randomNum = getRandomNum();
    nums[x][y] = randomNum;
    showNumWithAnimation(x,y,randomNum);
}

//实现键盘的响应
$(document).keydown(function(e){
    //组织事件的默认行为，屏幕小的时候上下键不会来回调整页面位置
    e.preventDefault();
    switch(e.keyCode){
        //按上键
        case 38:
            //判断是否可以向上移动
            if(canMoveUp(nums)){
                moveUp(nums);
                setTimeout('isGameOver()',200);
            }    
            break;
        //按下键
        case 40:
            //判断是否可以向下移动
            if(canMoveDown(nums)){
                moveDown(nums);
                setTimeout('isGameOver()',200);
            }    
            break;
        //按左键
        case 37:
            //判断是否可以向左移动
            if(canMoveLeft(nums)){
                moveLeft(nums);
                setTimeout('isGameOver()',200);
            }    
            break;
        //按右键
        case 39:
            //判断是否可以向右移动
            if(canMoveRight(nums)){
                moveRight(nums);
                setTimeout('isGameOver()',200);
            }    
            break;
    }
});

