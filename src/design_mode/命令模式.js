var setCommand = function (button, command) {
  button.onclick = function () {
    command.execute();
  };
};

var MenuBar = {
  refresh: function () {
    console.log('refresh');
  },
};

var SubMenu = {
  add: function () {
    console.log('add');
  },
  del: function () {
    console.log('del');
  },
};

var RefreshMenuBarCommand = function (receiver) {
  this.receiver = receiver;
};

RefreshMenuBarCommand.prototype.execute = function () {
  this.receiver.refresh();
};

// 闭包模式
// var RefreshMenuBarCommand = function (receiver) {
//   return function () {
//     receiver.refresh();
//   };
// };

var AddSubMenuCommand = function (receiver) {
  this.receiver = receiver;
};

AddSubMenuCommand.prototype.execute = function () {
  this.receiver.add();
};

var DelSubMenuCommand = function (receiver) {
  this.receiver = receiver;
};

DelSubMenuCommand.prototype.execute = function () {
  this.receiver.del();
};

var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
var delSubMenuCommand = new DelSubMenuCommand(SubMenu);

setCommand(button1, refreshMenuBarCommand);
setCommand(button2, addSubMenuCommand);
setCommand(button3, delSubMenuCommand);
