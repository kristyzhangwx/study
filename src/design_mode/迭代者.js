var Iterator = function (obj) {
  var current = 0;
  var next = function () {
    current += 1;
  };
  var isDone = function () {
    return current >= obj.length;
  };

  var getCurrentItem = function () {
    return obj[current];
  };

  return {
    next: next,
    isDone: isDone,
    getCurrentItem: getCurrentItem,
    length: obj.length,
  };
};

var compare = function (iterator1, iterator2) {
  if (iterator1.length != iterator2.length) {
    alert('不相等');
  }
  while (!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrentItem() != iterator2.getCurrentItem()) {
      throw new Error('不相等');
    }
    iterator1.next();
    iterator2.next();
  }
  alert('相等');
};

// 上传

var getActiveUploadObj = function () {
  try {
    return new ActiveXObject('TXFTNActiveX.FTNUpload');
  } catch (e) {
    return false;
  }
};

var getFlashUploadObj = function () {
  if (supportFlash()) {
    var str = '<object type="application/x-shockwave-flash"></object>';
    return $(str).appendTo($('body'));
  }
  return false;
};

var getFormUploadObj = function () {
  var str = '<input name="file" type="file" class="ui-file"/>';
  return $(str).appendTo($('body'));
};

var iteratorUloadObj = function () {
  for (var i = 0, fn; (fn = arguments[i++]); ) {
    var uploadObj = fn();
    if (uploadObj !== false) {
      return uploadObj;
    }
  }
};

var uploadObj = iteratorUloadObj(getActiveUploadObj, getFlashUploadObj, getFormUploadObj);
