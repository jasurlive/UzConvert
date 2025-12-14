export const latCyr: Record<string, string> = {
  A: "А",
  B: "Б",
  V: "В",
  G: "Г",
  D: "Д",
  Ye: "Е",
  YE: "Е",
  J: "Ж",
  Z: "З",
  I: "И",
  Y: "Й",
  K: "К",
  L: "Л",
  M: "М",
  N: "Н",
  O: "О",
  P: "П",
  R: "Р",
  S: "С",
  T: "Т",
  U: "У",
  F: "Ф",
  X: "Х",
  Ts: "Ц",
  TS: "Ц",
  Ch: "Ч",
  CH: "Ч",
  Sh: "Ш",
  SH: "Ш",
  EE: "Э",
  Yu: "Ю",
  YU: "Ю",
  Ya: "Я",
  YA: "Я",
  "G'": "Ғ",
  "G`": "Ғ",
  "O'": "Ө",
  "O’": "Ө",
  "O`": "Ө",
  Yo: "Ё",
  YO: "Ё",
  Q: "Қ",
  H: "Ҳ",
  a: "а",
  b: "б",
  v: "в",
  g: "г",
  d: "д",
  ye: "е",
  yE: "е",
  j: "ж",
  z: "з",
  i: "и",
  y: "й",
  k: "к",
  l: "л",
  m: "м",
  n: "н",
  o: "о",
  p: "п",
  r: "р",
  s: "с",
  t: "т",
  u: "у",
  f: "ф",
  x: "х",
  ts: "ц",
  tS: "ц",
  ch: "ч",
  cH: "ч",
  sh: "ш",
  sH: "ш",
  "'": "ъ",
  ee: "э",
  eE: "э",
  yu: "ю",
  yU: "ю",
  ya: "я",
  yA: "я",
  "o'": "ў",
  "o`": "ў",
  q: "қ",
  "g'": "ғ",
  "g`": "ғ",
  yo: "ё",
  yO: "ё",
  h: "ҳ",
  w: "ь",
  ww: "щ",
  Ww: "Щ",
  Qw: "Ы",
  qw: "ы",
  W: "Ь",
};

const cyrLat: Record<string, string> = Object.entries(latCyr).reduce(
  (acc, [lat, cyr]) => {
    if (!acc[cyr]) acc[cyr] = lat;
    return acc;
  },
  {} as Record<string, string>
);

export const getCyrillicText = (latin: string): string => {
  if (!latin) return "";

  let res = "";
  const vowels = "aeiouAEIOU";

  for (let i = 0; i < latin.length; i++) {
    const curr = latin[i];
    const prev = latin[i - 1] || "";
    const next = latin[i + 1] || "";
    const next2 = latin[i + 2] || "";

    if (
      (curr === "y" || curr === "Y") &&
      (next === "o" || next === "O") &&
      (next2 === "'" || next2 === "`")
    ) {
      const yOut = curr === "Y" ? "Й" : "й";
      const oOut = next === "O" ? "Ў" : "ў";
      res += yOut + oOut;
      i += 2;
      continue;
    }

    if (curr === "e" || curr === "E") {
      const isWordStart = i === 0 || /\s|[-–—.,!?()]/.test(prev);

      const afterVowel = vowels.includes(prev) || prev === "'" || prev === "`";

      if (isWordStart || afterVowel) {
        res += curr === "E" ? "Э" : "э";
      } else {
        res += curr === "E" ? "Е" : "е";
      }
      continue;
    }

    const dual = curr + next;
    if (latCyr[dual]) {
      res += latCyr[dual];
      i++;
      continue;
    }

    res += latCyr[curr] || curr;
  }

  return res;
};

export const getLatinText = (cyr: string): string =>
  cyr
    ? Array.from(cyr)
        .map((c) => cyrLat[c] || c)
        .join("")
    : "";
