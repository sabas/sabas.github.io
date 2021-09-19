(function(e){if("function"==typeof bootstrap)bootstrap("sexagesimal",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeSexagesimal=e}else"undefined"!=typeof window?window.sexagesimal=e():global.sexagesimal=e()})(function(){var define,ses,bootstrap,module,exports;
return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = element;
module.exports.pair = pair;
module.exports.format = format;
module.exports.formatPair = formatPair;

function element(x, dims) {
    return search(x, dims).val;
}

function formatPair(x) {
    return format(x.lat, 'lat') + ' ' + format(x.lon, 'lon');
}

// Is 0 North or South?
function format(x, dim) {
    var dirs = {
            lat: ['N', 'S'],
            lon: ['E', 'W']
        }[dim] || '',
        dir = dirs[x >= 0 ? 0 : 1],
        abs = Math.abs(x),
        whole = Math.floor(abs),
        fraction = abs - whole,
        fractionMinutes = fraction * 60,
        minutes = Math.floor(fractionMinutes),
        seconds = Math.floor((fractionMinutes - minutes) * 60);

    return whole + '° ' +
        (minutes ? minutes + "' " : '') +
        (seconds ? seconds + '" ' : '') + dir;
}

function search(x, dims, r) {
    if (!dims) dims = 'NSEW';
    if (typeof x !== 'string') return { val: null, regex: r };
    r = r || /[\s\,]*([NSEW])?\s*([\-|\—|\―]?[0-9.]+)°?\s*(?:([0-9.]+)['’′‘]\s*)?(?:([0-9.]+)(?:''|"|”|″)\s*)?([NSEW])?/gi;
    var m = r.exec(x);

    if (!m) return { val: null, regex: r };
    else {
        var deg = ((m[2]) ? parseFloat(m[2]) : 0);
        var min = ((m[3]) ? parseFloat(m[3]) / 60 : 0);
        var sec = ((m[4]) ? parseFloat(m[4]) / 3600 : 0);
        var dim = '';
        if (dims.indexOf(m[5]) !== -1) {
            dim = ((m[5] && m[5] === 'S' || m[5] === 'W') ? -1 : 1);
        }
        if (dims.indexOf(m[1]) !== -1) {
            dim = ((m[1] && m[1] === 'S' || m[1] === 'W') ? -1 : 1);
        }
        if (dim === '') return { val: null, regex: r };

        return {
        val: ((deg +
            min +
            sec) *
            dim
            ),
        regex: r,
        raw: m[0],
        dim: dim
        }
    };
}

function pair(x, dims) {
    x = x.trim();
    var one = search(x, dims);
    if (one.val === null) return null;
    var two = search(x, dims, one.regex);
    if (two.val === null) return null;
    // null if one/two are not contiguous.
    if (one.raw + two.raw !== x) return null;
    if (one.dim) return swapdim(one.val, two.val, one.dim);
    else return [one.val, two.val];
}

function swapdim(a, b, dim) {
    if (dim == 'N' || dim == 'S') return [a, b];
    if (dim == 'W' || dim == 'E') return [b, a];
}

},{}]},{},[1])
(1)
});
;