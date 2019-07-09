function pages(num){
    path = window.location.href;
    pattern = /[1-9][0-9]*/g;
    // // alert(path);
    path = path.match(pattern);
    // console.log(parseInt(path));
    if (num == -1) {//上一页
        if (!path){
            return;
        }
        if (parseInt(path) == 2){
            window.location.href="https://lewistian.github.io/netease/";
        }
        else{
            path = (window.location.href).replace(/[1-9][0-9]*/g, parseInt(path)-1); 
            window.location.href = path;
        }
        // window.location.href="你所要跳转的页面";
    }
    else if(num == -2){//下一页
        if (!path){
            window.location.href="https://lewistian.github.io/netease/?2";
        }
        else if(parseInt(path) == 15){
            return;
        }
        else{
            path = (window.location.href).replace(/[1-9][0-9]*/g, parseInt(path)+1);
            window.location.href = path;
        }
    }
    else{//跳到指定页
        if (num == 1) {
            window.location.href="https://lewistian.github.io/netease";
        }
        else if(num > 15){
            return;
        }
        else{
            window.location.href = "https://lewistian.github.io/netease/?"+num;
        }
    }
}