var wave1Top = -130;
var wave2Top = -134;
var canClick = true;
var onTime;
var btnStatus;

var timeMap = {
  0: 60000 * 15,
  1: 60000 * 30,
  2: 60000 * 45,
};
var timeOut = false;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  wave1Top = request.wave1Top === undefined ? wave1Top : request.wave1Top;
  wave2Top = request.wave2Top === undefined ? wave2Top : request.wave2Top;
  btnStatus = request.btnStatus === undefined ? btnStatus : request.btnStatus;
  canClick = request.canClick === undefined ? canClick : request.canClick;
  timeOut = request.timeOut === undefined ? timeOut : request.timeOut;
  sendResponse(timeOut);
});

function tipsModal() {
  chrome.notifications.clear('1', (id) => {});
  chrome.notifications.create('1', {
    type: 'basic',
    iconUrl: './img/icon.png',
    title: '喝水提醒',
    message: '快起来活动一下，记得勤喝水，勤写code~',
  });
}

function timeDrink(time) {
  onTime = setTimeout(() => {
    tipsModal();
    timeOut = true;
    clearTimeout(onTime);
  }, timeMap[time]);
}
