(function(){
    let $tools = {};
    // 时间转换工具
    $tools.dateFormat=function(data){
        if(data){
            try {
                if((typeof data)=="object"){
                    var time = data
                }else{
                    var time = new Date(data) 
                }
                var y = time.getFullYear();    
                var m = time.getMonth() + 1;    
                m = m < 10 ? ('0' + m) : m;    
                var d = time.getDate();    
                d = d < 10 ? ('0' + d) : d;   
                return  (y + '-' + m + '-' + d)
            } catch (error) {
                console.log(error)
            }
        }else{
            console.log("请传入时间")
        }
    }
    // 数组原型拓展方法
    Array.prototype.delete = function(dx) { 
        if(isNaN(dx)||dx>this.length){return false;} 
        this.splice(dx,1); 
    } 

    window.$tools=$tools;
})()
    
