// 节流函数
var throttle = function (fn, interval) {
  var timer,
    firstTime = true;
  return function () {
    var _self = this;
    if (firstTime) {
      fn.apply(this, arguments);
      return (firstTime = false);
    }
    if (timer) return false;
    timer = setTimeout(function () {
      clearTimeout(timer);
      fn.apply(_self, arguments);
    }, interval || 500);
  };
};

// 分时函数
var timeChunk = function (ary, fn, count) {
  var obj, t;
  var len = ar.length;
  var start = function () {
    for (var i = 0; i < Math.min(count || 1, len); i++) {
      obj = ary.shift();
      fn(obj);
    }
  };

  return function () {
    t = setInterval(function () {
      if (len === 0) {
        return clearInterval(t);
      }
      start();
    }, 200);
  };
};

// 惰性加载函数
var addEvent = function (elem, type, handler) {
  if (window.addEventListener) {
    addEvent = function (elem, type, handler) {
      elem.addEventListener(type, handler, false);
    };
  } else if (window.attachEvent) {
    addEvent = function (elem, type, handler) {
      elem.attachEvent('on' + type, handler);
    };
  }
  addEvent(elem, type, handler);
};
