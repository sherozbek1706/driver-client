import Cookies from "js-cookie";

export const lotinKirilOtkazish = (matn) => {
  let loc = Cookies.get("language");
  if (loc != "kiril") {
    return matn;
  }

  var alifbo = {
    a: "а",
    b: "б",
    d: "д",
    e: "е",
    f: "ф",
    g: "г",
    h: "ҳ",
    i: "и",
    j: "ж",
    k: "к",
    l: "л",
    m: "м",
    n: "н",
    o: "о",
    p: "п",
    q: "қ",
    r: "р",
    s: "с",
    t: "т",
    u: "у",
    v: "в",
    x: "х",
    y: "й",
    z: "з",
    A: "А",
    B: "Б",
    D: "Д",
    E: "Е",
    F: "Ф",
    G: "Г",
    H: "Ҳ",
    I: "И",
    J: "Ж",
    K: "К",
    L: "Л",
    M: "М",
    N: "Н",
    O: "О",
    P: "П",
    Q: "Қ",
    R: "Р",
    S: "С",
    T: "Т",
    U: "У",
    V: "В",
    X: "Х",
    Y: "Й",
    Z: "З",
  };

  var kirilMatn = "";
  var i = 0;
  while (i < matn.length) {
    var harf = matn[i].toLowerCase();
    if (
      harf === "s" &&
      i < matn.length - 1 &&
      matn[i + 1].toLowerCase() === "h"
    ) {
      kirilMatn += "ш";
      i += 2;
    } else if (
      harf === "c" &&
      i < matn.length - 1 &&
      matn[i + 1].toLowerCase() === "h"
    ) {
      kirilMatn += "ч";
      i += 2;
    } else if (
      harf === "o" &&
      i < matn.length - 1 &&
      matn[i + 1].toLowerCase() === "'"
    ) {
      kirilMatn += "у";
      i += 2;
    } else if (alifbo.hasOwnProperty(harf)) {
      kirilMatn += alifbo[harf];
      i++;
    } else {
      kirilMatn += harf;
      i++;
    }
  }

  return kirilMatn;
};
