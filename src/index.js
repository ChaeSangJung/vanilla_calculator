// setting DOM
const result = document.querySelector(".js-result");
const reset = document.querySelector(".js-reset");
const equals = document.querySelector(".js-equals");
const decimal = document.querySelector(".js-decimal");
const toggle = document.querySelector(".js-toggle");
const numbers = Array.from(document.querySelectorAll(".js-number"));
const operations = Array.from(document.querySelectorAll(".js-operation"));

// setting 전역변수
let prevValue = "0";
let prevDone = false;

let nextValue = "0";
let nextDone = false;

let currentOparator = "";

// 정수 실수 구분하는 함수
function flotOrInt(str) {
  let foi = "";

  if (str.includes(".")) {
    foi = parseFloat(str);
  } else {
    foi = parseInt(str, 10);
  }
  return foi;
}

// 연산자 선택하여 연산 된 값을 return
function selectOparator() {
  let notStrPrev = "";
  let notStrNext = "";
  let resultOparation = "";

  notStrPrev = flotOrInt(prevValue);
  notStrNext = flotOrInt(nextValue);

  if (currentOparator === "+") {
    resultOparation = notStrPrev + notStrNext;
  } else if (currentOparator === "-") {
    resultOparation = notStrPrev - notStrNext;
  } else if (currentOparator === "/") {
    resultOparation = notStrPrev / notStrNext;
  } else if (currentOparator === "*") {
    resultOparation = notStrPrev * notStrNext;
  }

  if (Number.isInteger(resultOparation)) {
    return resultOparation;
  } else {
    return resultOparation.toFixed(5);
  }
}

// 두 값을 받아 계산을 수행
function onCalulate() {
  let doneOparation = selectOparator();
  result.innerHTML = doneOparation;
  prevValue = doneOparation.toString();
  nextDone = false;
  nextValue = "0";

  // console.log(notStrPrev, typeof(notStrPrev), notStrNext, typeof(notStrNext));
  // console.log(currentOparator)
}

// 연산자 버튼 클릭 함수
function onOperationClick(e) {
  const targetOperator = e.target.innerText;
  if (!prevDone) {
    prevDone = true;
  }
  if (prevDone && nextDone) {
    onCalulate();
  }
  currentOparator = targetOperator;
}

// 소수점 . 찍는 함수
function onDecimal() {
  if (!result.innerHTML.includes(".")) {
    if (!prevDone) {
      prevValue += ".";
      result.innerHTML = prevValue;
    } else {
      nextValue += ".";
      result.innerHTML = nextValue;
    }
  }
}

// +/- toggle
function ontoggle() {
  if (result.innerHTML !== "0" && typeof result.innerHTML === "string") {
    let tmp_value = result.innerHTML;
    tmp_value = flotOrInt(tmp_value);
    tmp_value *= -1;
    result.innerHTML = tmp_value;
    if (!prevDone) {
      prevValue = tmp_value;
      prevValue = prevValue.toString();
    } else {
      nextValue = tmp_value;
      nextValue = nextValue.toString();
    }
    // console.log(tmp_value, typeof tmp_value);
  }
}

// 숫자 클릭 함수
function onNumberClick(e) {
  const targetNum = e.target.innerText;
  if (prevDone === false) {
    if (prevValue === "0") {
      prevValue = targetNum;
    } else {
      prevValue = prevValue + targetNum;
    }
    result.innerHTML = prevValue;
  } else {
    if (nextValue === "0") {
      nextValue = targetNum;
    } else {
      nextValue = nextValue + targetNum;
    }
    result.innerHTML = nextValue;
    nextDone = true;
  }
  // console.log(prevValue, nextValue);
}

// 리셋 함수
function handleReset() {
  prevValue = "0";
  nextValue = "0";
  prevDone = false;
  nextDone = false;
  currentOparator = "";
  result.innerHTML = "0";
}

// = 클릭 함수
function handleEqualsClick() {
  if (prevDone || nextDone) {
    onCalulate();
  }
}

// number click event
numbers.forEach(function (number) {
  number.addEventListener("click", onNumberClick);
});

// making parseFloat click event
decimal.addEventListener("click", onDecimal);

// operator click evnet
operations.forEach(function (operation) {
  operation.addEventListener("click", onOperationClick);
});

// +/- toggle evnet
toggle.addEventListener("click", ontoggle);

// 리셋 이벤트
reset.addEventListener("click", handleReset);

// "=" 클릭 이벤트
equals.addEventListener("click", handleEqualsClick);
