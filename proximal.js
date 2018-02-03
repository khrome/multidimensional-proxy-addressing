(function(root, factory){
    if (typeof define === 'function' && define.amd){
        define([], factory);
    }else if(typeof exports === 'object'){
        module.exports = factory();
    }else{
        root.Proximal = factory();
    }
}(this, function(){
    var named = function(fn){
        var str = fn.toString();
        var args = str
            .substring(
                str.indexOf('('),
                str.indexOf(')')
            )
            .split(',')
            .map(function(item){
                return item.trim();
            })
        ;
    }

    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    return function(array, dimensions){
        if(!dimensions) return array; //single dimension if you pass nothing
        var len = dimensions.length;
        var proxies = new Array(len);
        var values = new Array(len).fill(0);
        //for(var lcv=0; lcv < len; lcv++){
        values.forEach(function(value, lcv){
            proxies[lcv] = new Proxy(new Array(), {
                get: function(target, name, v) {
                    if(typeof name === 'symbol') return;
                    if(!isNumber(name)) return;
                    values[lcv] = typeof name === 'number'?name:parseInt(name);
                    var result;
                    try{
                    if(lcv !== len-1){
                        result = proxies[lcv+1]
                    }else{
                        result = values.map(function(value, index){
                            return value * dimensions[index]
                        });
                        result = result.reduce(function(accumulator, currentValue){
                            return accumulator + currentValue;
                        });
                        //console.log('i:', result);
                        return array[result];
                    }
                    }catch(ex){
                        console.log(ex);
                    }
                    return result;
                },
                set: function(target, name, value) {
                    if(typeof name === 'symbol') return;
                    if(!isNumber(name)) return;
                    values[lcv] = typeof name === 'number'?name:parseInt(name);
                    var result = values.map(function(value, index){
                        return value * dimensions[index]
                    });
                    result = result.reduce(function(accumulator, currentValue){
                        return accumulator + currentValue;
                    });
                    //console.log('i:', result, dimensions, values);
                    if(lcv === dimensions.length-1) return array[result];
                    throw new Error('cannot set subarrays, just values');

                },
            });
        });
        return proxies[0]
    };
}));
