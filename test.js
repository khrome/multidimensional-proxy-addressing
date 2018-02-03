proxyAddressing = require('./proximal');
var dims = {
    x : 1000,
    y : 100,
    z : 100
}

/*
var array = new Array(dims.x * dims.y * dims.z);
var proxy = proxyAddressing(array, [1, dims.x, dims.x*dims.y]);
proxy[1][5][4] = 2;
//*/


//*
var start = (new Date()).getTime();
array = new Array(dims.x * dims.y * dims.z);
for(var lcv=0; lcv < array.length; lcv++){
    array[lcv] = 0;
}
var stop = (new Date()).getTime();
console.log('one dimensional', stop - start);

start = (new Date()).getTime();
var array = new Array(dims.x);
for(var x=0; x < dims.x; x++){
    array[x] = new Array(dims.y);
    for(var y=0; y < dims.y; y++){
        array[x][y] = new Array(dims.z);
        for(var z=0; z < dims.z; z++){
            array[x][y][z] = 0;
        }
    }
}
stop = (new Date()).getTime();
console.log('3 dimensional', stop - start)

start = (new Date()).getTime();
array = new Array(dims.x * dims.y * dims.z);
var proxy = proxyAddressing(array, [1, dims.x, dims.x*dims.y]);
for(var x=0; x < dims.x; x++){
    for(var y=0; y < dims.y; y++){
        for(var z=0; z < dims.z; z++){
            proxy[x][y][z] = 0;
        }
    }
}
stop = (new Date()).getTime();
console.log('3 pseudo dimensional', stop - start) //*/
