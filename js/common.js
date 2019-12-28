//用来获取距离上边的位置
function getPosTop(i){
    return 20+95*i;
}

//用来获取距离左边的位置
function getPosLeft(j){
    return 20+95*j;
}

//根据数字填充不同颜色
function getNumberBackgroudColor(num){
    switch(num){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "edcf72";break;
        case 256:return "edcc61";break;
        case 512:return "9c0";break;
        case 1024:return "33b5e5";break;
        case 2048:return "09c";break;
    }
}

//填充上层单元格数字颜色
function getNumberColor(num){
    if(num <= 4){
        return '#776e65';
    }else{
        return '#fff';
    }
}

//判断还有没有空间
function noSpace(nums){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(nums[i][j]==0){
                return false;
            }
        }
    }
    return true;
}

//获取随机一个数字
function getRandomNum(){
    var num = Math.random();
    var returnVal;
    if(num < 0.35){
        returnVal = 2;
    }else if(num >= 0.35 && num < 0.65){
        returnVal = 4;
    }else{
        returnVal = 8;
    }
    return returnVal;
}


//判断是否可以向左移动
function canMoveLeft(nums){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(j>0){
                if(nums[i][j] != 0){
                    //判断左边是否有空格
                    if(nums[i][j-1] == 0){
                        return true;
                    }
                    //判断左边数字是否和当前数字相同
                    if(nums[i][j-1] == nums[i][j]){
                        return true;
                    }

                }
            }
        }
    }
    return false;
}

//判断是否可以向右移动
function canMoveRight(nums){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(j<3){
                if(nums[i][j] != 0){
                    //判断右边是否有空格
                    if(nums[i][j+1] == 0){
                        return true;
                    }
                    //判断右边数字是否和当前数字相同
                    if(nums[i][j+1] == nums[i][j]){
                        return true;
                    }

                }
            }
        }
    }
    return false;
}

//判断是否可以向上移动
function canMoveUp(nums){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(i>0){
                if(nums[i][j] != 0){
                    //判断上边是否有空格
                    if(nums[i-1][j] == 0){
                        return true;
                    }
                    //判断上边数字是否和当前数字相同
                    if(nums[i-1][j] == nums[i][j]){
                        return true;
                    }

                }
            }
        }
    }
    return false;
}

//判断是否可以向下移动
function canMoveDown(nums){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(i<3){
                if(nums[i][j] != 0){
                    //判断下边是否有空格
                    if(nums[i+1][j] == 0){
                        return true;
                    }
                    //判断下边数字是否和当前数字相同
                    if(nums[i+1][j] == nums[i][j]){
                        return true;
                    }

                }
            }
        }
    }
    return false;
}

/*
    向左移动
    1、相同数字相加
    2、所有数字向左移动
*/
function moveLeft(nums){
    //是否移动了数字，如果移动了，重新初始化上层单元格，新增加一个数字
    var isOrNot = false;
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            for(var k=j;k>0;k--){
                if(nums[i][k] != 0){
                    //判断当前单元格左边是否空格
                    if(nums[i][k-1] == 0){
                        //则交换两个单元格
                        nums[i][k-1] = nums[i][k];
                        nums[i][k] = 0;
                        //移动单元格动画
                        showMoveAnimation(i,k,i,k-1,nums);
                        isOrNot = true;
                    }else{
                        //判断左右两个单元格数字是否相等(并且左边不能等于2048)
                        if(nums[i][k-1] == nums[i][k] && (nums[i][k-1] != 2048 || nums[i][k] != 2048)){
                            //如果相等左边数字*2
                            nums[i][k-1] = nums[i][k-1] + nums[i][k];
                            nums[i][k] = 0;
                            //移动单元格动画
                            showMoveAnimation(i,k,i,k-1,nums);
                            //计分
                            score += nums[i][k-1];
                            updateScore(score);
                            isOrNot = true;
                        }else{
                            continue;
                        }
                    }
                }
            }
        }
    }
    if(isOrNot){
        //动态创建上层单元格并初始化
        setTimeout('updateView(nums)',200);
        setTimeout('generateOneNumber(nums)',200);
    }
}

//向右移动
function moveRight(nums){
    //是否移动了数字，如果移动了，重新初始化上层单元格，新增加一个数字
    var isOrNot = false;
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            for(var k=j;k<3;k++){
                if(nums[i][k] != 0){
                    //判断当前单元格右边是否空格
                    if(nums[i][k+1] == 0){
                        //则交换两个单元格
                        nums[i][k+1] = nums[i][k];
                        nums[i][k] = 0;
                        //移动单元格动画
                        showMoveAnimation(i,k,i,k+1,nums);
                        isOrNot = true;
                    }else{
                        //判断左右两个单元格数字是否相等(并且右边不能等于2048)
                        if(nums[i][k+1] == nums[i][k] && (nums[i][k+1] != 2048 || nums[i][k] != 2048)){
                            //如果相等右边数字*2
                            nums[i][k+1] = nums[i][k+1] + nums[i][k];
                            nums[i][k] = 0;
                            //移动单元格动画
                            showMoveAnimation(i,k,i,k+1,nums);
                            //计分
                            score += nums[i][k+1];
                            updateScore(score);
                            isOrNot = true;
                        }else{
                            continue;
                        }
                    }
                }
            }
        }
    }
    if(isOrNot){
        //动态创建上层单元格并初始化
        setTimeout('updateView(nums)',200);
        setTimeout('generateOneNumber(nums)',200);
    }
}

//向上移动
function moveUp(nums){
    //是否移动了数字，如果移动了，重新初始化上层单元格，新增加一个数字
    var isOrNot = false;
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            for(var k=i;k>0;k--){
                if(nums[k][j] != 0){
                    //判断当前单元格上边是否空格
                    if(nums[k-1][j] == 0){
                        //则交换两个单元格
                        nums[k-1][j] = nums[k][j];
                        nums[k][j] = 0;
                        //移动单元格动画
                        showMoveAnimation(k,j,k-1,j,nums);
                        isOrNot = true;
                    }else{
                        //判断上下两个单元格数字是否相等(并且右边不能等于2048)
                        if(nums[k-1][j] == nums[k][j] && (nums[k-1][j] != 2048 || nums[k][j] != 2048)){
                            //如果相等上边数字*2
                            nums[k-1][j] = nums[k-1][j] + nums[k][j];
                            nums[k][j] = 0;
                            //移动单元格动画
                            showMoveAnimation(k,j,k-1,j,nums);
                            //计分
                            score += nums[k-1][j];
                            updateScore(score);
                            isOrNot = true;
                        }else{
                            continue;
                        }
                    }
                }
            }
        }
    }
    if(isOrNot){
        //动态创建上层单元格并初始化
        setTimeout('updateView(nums)',200);
        setTimeout('generateOneNumber(nums)',200);
    }
}

//向下移动
function moveDown(nums){
    //是否移动了数字，如果移动了，重新初始化上层单元格，新增加一个数字
    var isOrNot = false;
    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){
            for(var k=i;k<3;k++){
                if(nums[k][j] != 0){
                    //判断当前单元格下边是否空格
                    if(nums[k+1][j] == 0){
                        //则交换两个单元格
                        nums[k+1][j] = nums[k][j];
                        nums[k][j] = 0;
                        //移动单元格动画
                        showMoveAnimation(k,j,k+1,j,nums);
                        isOrNot = true;
                    }else{
                        //判断上下两个单元格数字是否相等(并且右边不能等于2048)
                        if(nums[k+1][j] == nums[k][j] && (nums[k+1][j] != 2048 || nums[k][j] != 2048)){
                            //如果相等下边数字*2
                            nums[k+1][j] = nums[k+1][j] + nums[k][j];
                            nums[k][j] = 0;
                            //移动单元格动画
                            showMoveAnimation(k,j,k+1,j,nums);
                            //计分
                            score += nums[k+1][j];
                            updateScore(score);
                            isOrNot = true;
                        }else{
                            continue;
                        }
                    }
                }
            }
        }
    }
    if(isOrNot){
        //动态创建上层单元格并初始化
        setTimeout('updateView(nums)',200);
        setTimeout('generateOneNumber(nums)',200);
    }
}

//更新数字
function updateScore(score){
    $('#score').text(score);
}

//判断能否移动
function noMove(){
    if(canMoveLeft(nums) || canMoveRight(nums) || canMoveUp(nums) || canMoveDown(nums)){
        return false;
    }
    return true;
}

//判断游戏是否结束
function isGameOver(){
    if(noSpace(nums) && noMove()){
        alert("游戏结束！恭喜你获得了"+$('#score').text()+"分")
    }
}