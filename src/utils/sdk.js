const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isAndroid = /android/i.test(navigator.userAgent);

window.callByWebview = function callByWebview(tag, data) {
  if (typeof window[tag] === "function") {
    window[tag](data);
  }
  // alert(`${tag}11`);

  return "call function callByWebview";
};

// 生成一个唯一的回调方法
function generateCallback(callback) {
  const callbackName = "webview_callback_" + Math.round(100000 * Math.random());
  window[callbackName] = (res) => {
    callback(res);
    delete window[callbackName];
  };

  return callbackName;
}

/**
 * 发送消息给webview
 *
 * */

(function () {
  function sendToWebview(action, data, callback) {
    const params = { action };
  
    if (data) {
      params.data = data;
    }
  
    if (callback) {
      params.callbackTag = generateCallback(callback);
    }
  
    let sendParams = params;
  
    if (isIos) {
      window.webkit.messageHandlers.scan.postMessage(sendParams);
    } else if (isAndroid) {
      // eslint-disable-next-line no-undef
      Android.postMessage(JSON.stringify(sendParams));
    } else {
      console.log(sendParams);
    }
  }
  
  window.sendToWebview = sendToWebview;
})();
