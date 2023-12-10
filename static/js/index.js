var inp = document.getElementById("TEL");

var old = 0;
inp.onclick = function (e) {
  inp.value = "+";
  old = 0;
};

inp.onkeydown = function (e) {
  var curLen = inp.value.length;

  if (!e.code.startsWith("Digit")) {
    return;
  }
  if (curLen == 0) {
    inp.value = "+";
  }
  if (curLen < old) {
    old--;
    return;
  }

  if (curLen == 2) inp.value = inp.value + "(";

  if (curLen == 6) inp.value = inp.value + ")-";

  if (curLen == 11) inp.value = inp.value + "-";

  if (curLen == 14) inp.value = inp.value + "-";

  if (curLen > 16) inp.value = inp.value.substring(0, inp.value.length - 1);

  old++;
};
