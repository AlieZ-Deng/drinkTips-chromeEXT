const $addBtn = document.querySelector('.add-logo');
const $wave1 = document.querySelector('.wave1');
const $wave2 = document.querySelector('.wave2');
const $title = document.querySelector('.target-wrap');
const $btn = document.querySelector('.btn-wrap');
const $btns = document.querySelectorAll('.btn-wrap >div');
let originText;

// 初始化元素节点的样式
const bg = chrome.extension.getBackgroundPage();
let wave1Top = bg.wave1Top;
let wave2Top = bg.wave2Top;
let btnStatus = bg.btnStatus;
let canClick = bg.canClick;
let timeOut = bg.timeOut;
const timeMap = bg.timeMap;
$wave1.style.top = wave1Top + '%';
$wave2.style.top = wave2Top + '%';
if (btnStatus) {
  changeBtnStyle(btnStatus);
}

setInterval(() => {
  listenTimeout();
}, 1000);
// 初始化监听是否监听倒数时间已到
listenTimeout();
function listenTimeout() {
  chrome.runtime.sendMessage({}, function (res) {
    if (res) {
      if (!btnStatus) return;
      $btns[btnStatus].innerText = originText;
      resetBtnStyle();
      canClick = true;
      chrome.runtime.sendMessage({
        btnStatus: 3,
        canClick: true,
        timeOut: false,
      });
    }
  });
}

$btn.onclick = function (e) {
  if (!canClick) return false;
  const val = e.target.getAttribute('val');
  canClick = false;
  btnStatus = val;
  chrome.runtime.sendMessage({
    btnStatus: val,
    canClick: canClick,
  });
  bg.timeDrink(val);
  changeBtnStyle(val);
};

// 点击按钮后的状态样式修改
function changeBtnStyle(val) {
  if (val >= 3) return;
  originText = $btns[val].innerText;
  for (let i = 0; i < $btns.length; i++) {
    $btns[i].classList.add('disabled');
  }
  $btns[val].classList.remove('disabled');
  $btns[val].innerText = '倒计时ing...';
}

// 按钮样式重置包括文字
function resetBtnStyle() {
  for (let i = 0; i < $btns.length; i++) {
    $btns[i].classList.remove('disabled');
  }
}

$addBtn.addEventListener('click', function () {
  if (wave1Top < -230 || wave2Top < -230) {
  }
  wave1Top = wave1Top - 10;
  wave2Top = wave2Top - 10;
  chrome.runtime.sendMessage({
    wave1Top: wave1Top,
    wave2Top: wave2Top,
  });
  $wave1.style.top = wave1Top + '%';
  $wave2.style.top = wave2Top + '%';
});
