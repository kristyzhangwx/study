var salesOffices = {};
salesOffices.clientList = [];
salesOffices.listen = function (key, callback) {
  if (!this.clientList[key]) {
    this.clientList[key] = [];
  }
  this.clientList[key].push(callback);
};
salesOffices.trigger = function () {
  var key = Array.prototype.shift.call(arguments);
  fns = this.clientList[key];
  if (!fns || fns.length === 0) {
    return false;
  }

  for (var i = 0; fn; fn = fns[i++]) {
    fn.apply(this.arguments);
  }
};

// 优化

var event = {
  clientList: [],
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
  trigger: function () {
    var key = Array.prototype.shift.call(arguments);
    fns = this.clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }

    for (var i = 0; fn; fn = fns[i++]) {
      fn.apply(this.arguments);
    }
  },
  revome: function (key, fn) {
    var fns = this.clientList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        var _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
  },
};

// 可以给所有的对象都动态安装发布-订阅功能
var installEvent = function (obj) {
  for (var i in event) {
    obj[i] = event[i];
  }
};

// finally

var Event = (function () {
  var clientList = {},
    listen,
    trigger,
    remove;

  listen = function (key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  };
  trigger = function () {
    var key = Array.prototype.shift.call(arguments);
    fns = clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }

    for (var i = 0; fn; fn = fns[i++]) {
      fn.apply(this, arguments);
    }
  };
  remove = function (key, fn) {
    var fns = clientList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        var _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
  };
  return {
    listen: listen,
    trigger: trigger,
    remove: remove,
  };
})();
