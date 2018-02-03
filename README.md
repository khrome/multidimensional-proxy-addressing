multidimensional-proxy-addressing
=================================

So I wondered if it would be possible to use 2 parallel arrays of proxies and values to address a one dimensional array as if it were multidimensional **without** altering the original array in any way and without creating more than one object per dimension (static).

It turns out, that while it's ridiculously slow... it is possible, and it works in any number of dimensions.

    proxyAddressing = require('multidimensional-proxy-addressing');
    var dims = {
        x : 1000,
        y : 100,
        z : 100
    }
    var array = new Array(dims.x * dims.y * dims.z);
    var proxy = proxyAddressing(array, [1, dims.x, dims.x*dims.y]);
    proxy[1][5][4] = 2;


For speed reference here are the timings:

- 10000000 one dimensional assignments : 185ms
- 10000000 3 dimensional assignments : 361ms
- 10000000 3 pseudo dimensional assignments : 19650ms (ouch!)
