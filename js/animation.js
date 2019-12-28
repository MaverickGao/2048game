//通过动画显示数字
function showNumWithAnimation(x,y,randomNum){
    var numberCell = $('#number-cell-'+x+'-'+y);
    numberCell.text(randomNum);
    //填充上层单元格颜色
    numberCell.css('background-color',getNumberBackgroudColor(randomNum));
    //填充上层单元格数字颜色
    numberCell.css('color',getNumberColor(randomNum));
    //动画填充单元格
    numberCell.animate({
        width:'75px',
        height:'75px',
        //更改层叠单元格位置
        top:getPosTop(x),
        left:getPosLeft(y)
    },200);
}

//移动单元格动画
function showMoveAnimation(x,y,targetX,targetY,nums){
    //获得当前div
    var numberCell = $('#number-cell-'+x+'-'+y);
    //动画填充单元格
    numberCell.animate({
        //更改层叠单元格位置
        top:getPosTop(targetX),
        left:getPosLeft(targetY)
    },200);
    
}

