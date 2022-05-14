// 单例模式
// 意义并不大
var Singleton = function (name) {
  this.name = name;
  this.instance = null;
};

Singleton.prototype.getName = function () {
  alert(this.name);
};

Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
};

// 用代理模式实现单例模式
// 基于“类”的单例模式
var ProxySingleton = function () {
  var instance;
  return function (html) {
    if (!instance) {
      instance = new CreateDiv(html);
    }
    return instance;
  };
};

var CreateDiv = function (html) {
  this.html = html;
  this.init();
};

CreateDiv.prototype.init = function () {
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

// 惰性单例，需要的时候再创建
Singleton.getInstance = (function () {
  var instance = null;
  return function (name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  };
})();

var getSingle = function (fn) {
  var result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  };
};

var createLoginLayer = function () {
  var div = document.createElement('div');
  div.innerHTML = '我是登录框';
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
};

var createSingleLoginLayer = getSingle(createSingleLoginLayer);
