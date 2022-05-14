var myImage = (function () {
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
    setSrc: function (src) {
      imgNode.src = src;
    },
  };
})();

var proxyImage = (function () {
  var img = new Image();
  img.onload = function () {
    myImage.setSrc(this.src);
  };
  return {
    setSrc: function (src) {
      myImage.setSrc('http://localhost:80/loading.gif');
      img.src = src;
    },
  };
})();

// 代理http请求
var synchronousFile = function (id) {
  console.log('开始同步文件，id为：' + id);
};

var proxySynchronousFile = function () {
  var cache = [],
    timer;
  return function (id) {
    cache.push(id);
    if (timer) {
      return;
    }
    timer = setTimeout(function () {
      synchronousFile(cache.join(', '));
      clearTimeout(timer);
      timer = null;
      cache.length = 0;
    }, 2000);
  };
};

// 懒加载
var miniConsole = function () {
  var cache = [];
  var handler = function (ev) {
    if (ev.keyCode === 113) {
      var script = document.createElement('script');
      script.onload = function () {
        for (var i = 0, fn; (fn = cache[i++]); ) {
          fn();
        }
      };
      script.src = 'miniConsole.js';
      document.getElementsByTagName('head')[0].appendChild(script);
      document.body.removeEventListener('keydown', handler);
    }
  };
  document.body.addEventListener('keydown', handler, false);
  return {
    log: function () {
      var args = arguments;
      cache.push(function () {
        return miniConsole.log.apply(miniConsole, args);
      });
    },
  };
};

miniConsole.log(11);

// miniConsole.js
miniConsole = {
  log: function () {
    console.log(Array.prototype.join.call(arguments));
  },
};

// 缓存代理

var mult = function () {
  console.log('1233333');
};

var proxyMult = (function () {
  var cache = {};
  return function () {
    var args = Array.prototype.join.call(arguments, ', ');
    if (args in cache) {
      return cache[args];
    }
    return (cache[args] = mult.apply(this.arguments));
  };
})();

// 高阶函数动态创建代理
var createProxyFactory = function (fn) {
  var cache = {};
  return function () {
    var args = Array.prototype.join.call(arguments, ', ');
    if (args in cache) {
      return cache[args];
    }
    return (cache[args] = fn.apply(this, arguments));
  };
};

var proxyMult = createProxyFactory(mult);
