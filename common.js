/* 示範素材共用：角色與圖示（全部用程式畫，不用照片、不用AI生圖） */
var C = {
  main: '#0f6670', main2: '#138995', soft: '#e3f2f3', acc: '#f0a32c', accSoft: '#fff2d9',
  ink: '#1f2a30', cream: '#fbf6ec', red: '#d9534f', skin: '#f6d2b5', skin2: '#e9b994'
};

/* 人物：who = 'an'（小安，23歲）或 'ming'（明叔，56歲）
   mood = 'smile' | 'worry' | 'happy'；pose = 'down' | 'think' | 'up' | 'hold' */
function person(who, mood, pose, extra) {
  mood = mood || 'smile'; pose = pose || 'down'; extra = extra || '';
  var an = who === 'an', yi = who === 'yi';
  var shirt = an ? C.acc : yi ? '#8a5bd6' : C.main;
  var shirt2 = an ? '#d98e1c' : yi ? '#6a3fb8' : '#0b4d55';
  var pants = an ? '#3a5a8c' : yi ? '#4a4560' : '#5b5048';
  var hair = an ? '#2b2b2b' : yi ? '#4a2e22' : '#b9b9b9';
  var s = '<g stroke="#1f2a30" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">';
  // 腿與鞋
  s += '<rect x="78" y="215" width="20" height="62" rx="8" fill="' + pants + '"/>';
  s += '<rect x="102" y="215" width="20" height="62" rx="8" fill="' + pants + '"/>';
  s += '<ellipse cx="86" cy="280" rx="16" ry="7" fill="#fff"/><ellipse cx="114" cy="280" rx="16" ry="7" fill="#fff"/>';
  // 身體
  if (an) {
    s += '<path d="M62 150 Q100 128 138 150 L142 222 Q100 232 58 222 Z" fill="' + shirt + '"/>';
    s += '<path d="M88 136 Q100 150 112 136" fill="none"/>'; // 帽T領
    s += '<rect x="84" y="186" width="32" height="18" rx="6" fill="' + shirt2 + '"/>'; // 口袋
    s += '<path d="M70 150 L76 214" stroke="#3a5a8c" stroke-width="6"/>'; // 背包帶
    s += '<path d="M130 150 L124 214" stroke="#3a5a8c" stroke-width="6"/>';
  } else if (yi) {
    s += '<path d="M60 150 Q100 132 140 150 L144 224 Q100 234 56 224 Z" fill="' + shirt + '"/>';
    s += '<path d="M86 140 L100 176 L114 140 Z" fill="#fff"/>';
    s += '<path d="M90 150 L94 222 M110 150 L106 222" stroke="' + shirt2 + '" stroke-width="4"/>';
  } else {
    s += '<path d="M60 150 Q100 132 140 150 L144 224 Q100 234 56 224 Z" fill="' + shirt + '"/>';
    s += '<path d="M86 138 L100 156 L114 138" fill="#fff"/>'; // POLO領
    s += '<circle cx="100" cy="166" r="2.5" fill="#fff"/><circle cx="100" cy="178" r="2.5" fill="#fff"/>';
  }
  // 手臂
  var armL, armR;
  if (pose === 'up') {
    armL = 'M64 156 Q42 120 40 92'; armR = 'M136 156 Q158 120 160 92';
  } else if (pose === 'think') {
    armL = 'M64 156 Q48 196 62 214'; armR = 'M136 156 Q154 170 112 134';
  } else if (pose === 'hold') {
    armL = 'M64 156 Q56 190 84 196'; armR = 'M136 156 Q144 190 116 196';
  } else {
    armL = 'M64 156 Q50 192 56 218'; armR = 'M136 156 Q150 192 144 218';
  }
  s += '<path d="' + armL + '" fill="none" stroke="#1f2a30" stroke-width="24"/>';
  s += '<path d="' + armR + '" fill="none" stroke="#1f2a30" stroke-width="24"/>';
  s += '<path d="' + armL + '" fill="none" stroke="' + shirt + '" stroke-width="18"/>';
  s += '<path d="' + armR + '" fill="none" stroke="' + shirt + '" stroke-width="18"/>';
  var hands = { up: [[40, 88], [160, 88]], think: [[62, 216], [110, 132]], hold: [[86, 196], [114, 196]], down: [[56, 220], [144, 220]] }[pose];
  var handSvg = '<circle cx="' + hands[0][0] + '" cy="' + hands[0][1] + '" r="9" fill="' + C.skin + '"/><circle cx="' + hands[1][0] + '" cy="' + hands[1][1] + '" r="9" fill="' + C.skin + '"/>';
  if (pose !== 'think') s += handSvg;
  // 頭
  if (yi) s += '<path d="M56 94 Q52 46 100 44 Q148 46 144 94 L148 136 Q124 146 100 138 Q76 146 52 136 Z" fill="' + hair + '"/>';
  s += '<rect x="92" y="122" width="16" height="16" fill="' + C.skin + '" stroke="none"/>';
  s += '<circle cx="100" cy="90" r="40" fill="' + C.skin + '"/>';
  // 頭髮
  if (an) {
    s += '<path d="M60 88 Q58 46 100 46 Q144 46 140 88 Q128 66 112 70 Q98 58 84 70 Q70 66 60 88 Z" fill="' + hair + '"/>';
  } else if (yi) {
    s += '<path d="M60 92 Q60 48 102 48 Q140 50 140 92 Q132 68 112 64 Q96 80 60 92 Z" fill="' + hair + '"/>';
  } else {
    s += '<path d="M62 82 Q62 50 100 50 Q138 50 138 82 Q130 64 100 64 Q72 64 62 82 Z" fill="' + hair + '"/>';
    s += '<path d="M62 82 Q58 96 64 104" fill="none" stroke="' + hair + '" stroke-width="7"/>';
    s += '<path d="M138 82 Q142 96 136 104" fill="none" stroke="' + hair + '" stroke-width="7"/>';
  }
  // 耳朵
  s += '<circle cx="60" cy="94" r="7" fill="' + C.skin + '"/><circle cx="140" cy="94" r="7" fill="' + C.skin + '"/>';
  // 眼睛
  if (mood === 'happy') {
    s += '<path d="M78 92 Q85 84 92 92" fill="none"/><path d="M108 92 Q115 84 122 92" fill="none"/>';
  } else {
    s += '<circle cx="85" cy="92" r="4" fill="#1f2a30"/><circle cx="115" cy="92" r="4" fill="#1f2a30"/>';
  }
  if (who === 'ming') { // 眼鏡
    s += '<circle cx="85" cy="92" r="11" fill="none" stroke-width="2.5"/><circle cx="115" cy="92" r="11" fill="none" stroke-width="2.5"/><path d="M96 92 L104 92" stroke-width="2.5"/>';
  }
  // 眉毛
  if (mood === 'worry') {
    s += '<path d="M76 80 L92 74" /><path d="M124 80 L108 74"/>';
  } else {
    s += '<path d="M77 78 Q85 74 93 78" fill="none"/><path d="M107 78 Q115 74 123 78" fill="none"/>';
  }
  // 嘴
  if (mood === 'worry') s += '<path d="M90 114 Q100 108 110 114" fill="none"/>';
  else if (mood === 'happy') s += '<path d="M86 108 Q100 124 114 108 Z" fill="#c9524b"/>';
  else s += '<path d="M88 110 Q100 120 112 110" fill="none"/>';
  if (yi) s += '<circle cx="58" cy="104" r="3.5" fill="' + C.acc + '"/><circle cx="142" cy="104" r="3.5" fill="' + C.acc + '"/>';
  // 腮紅
  s += '<circle cx="74" cy="106" r="6" fill="#f3a3a0" stroke="none" opacity=".55"/><circle cx="126" cy="106" r="6" fill="#f3a3a0" stroke="none" opacity=".55"/>';
  if (pose === 'think') s += handSvg;
  s += '</g>';
  return s + extra;
}
function personSvg(who, mood, pose, w, extra) {
  return '<svg viewBox="20 30 160 260" width="' + (w || 200) + '" xmlns="http://www.w3.org/2000/svg">' + person(who, mood, pose, extra) + '</svg>';
}

/* 圖示：回傳 <svg>，size 預設 120 */
var ICONS = {
  card: '<rect x="14" y="30" width="92" height="60" rx="10" fill="#5b7fd6"/><rect x="14" y="44" width="92" height="12" fill="#1f2a30"/><rect x="24" y="68" width="30" height="8" rx="3" fill="#fff"/>',
  diploma: '<rect x="18" y="34" width="84" height="54" rx="6" fill="#fff"/><path d="M30 50 H90 M30 62 H78 M30 74 H70" stroke="#9aa"/><circle cx="88" cy="84" r="12" fill="' + C.red + '"/><path d="M82 94 L80 108 L88 102 L96 108 L94 94" fill="' + C.red + '"/>',
  ai: '<rect x="28" y="28" width="64" height="64" rx="12" fill="' + C.main + '"/><text x="60" y="70" font-size="30" font-weight="900" text-anchor="middle" fill="#fff" font-family="Noto Sans TC">AI</text><path d="M40 20 V28 M60 20 V28 M80 20 V28 M40 92 V100 M60 92 V100 M80 92 V100 M20 40 H28 M20 60 H28 M20 80 H28 M92 40 H100 M92 60 H100 M92 80 H100"/>',
  palette: '<path d="M60 18 C28 18 14 44 18 66 C22 88 44 92 52 82 C58 74 50 66 60 62 C72 58 98 72 102 52 C106 32 86 18 60 18 Z" fill="#fff"/><circle cx="40" cy="44" r="7" fill="' + C.red + '"/><circle cx="60" cy="34" r="7" fill="' + C.acc + '"/><circle cx="82" cy="42" r="7" fill="' + C.main + '"/><circle cx="36" cy="66" r="7" fill="#5b7fd6"/>',
  gear: '<circle cx="60" cy="60" r="28" fill="#9aa7ad"/><circle cx="60" cy="60" r="11" fill="#fff"/><path d="M60 18 V32 M60 88 V102 M18 60 H32 M88 60 H102 M30 30 L40 40 M80 80 L90 90 M90 30 L80 40 M30 90 L40 80" stroke-width="10" stroke="#9aa7ad"/>',
  leaf: '<path d="M24 96 C24 46 58 22 100 22 C100 66 74 96 24 96 Z" fill="#4caf6e"/><path d="M28 92 L86 36" stroke="#2f7d4b"/>',
  coin: '<circle cx="60" cy="60" r="38" fill="' + C.acc + '"/><circle cx="60" cy="60" r="28" fill="none" stroke="#b97a12"/><text x="60" y="72" font-size="34" font-weight="900" text-anchor="middle" fill="#7a4d00" font-family="Noto Sans TC">$</text>',
  calendar: '<rect x="18" y="26" width="84" height="76" rx="10" fill="#fff"/><rect x="18" y="26" width="84" height="22" rx="10" fill="' + C.red + '"/><path d="M38 18 V34 M82 18 V34" stroke-width="6"/><path d="M32 62 H48 M52 62 H68 M72 62 H88 M32 80 H48 M52 80 H68 M72 80 H88" stroke="#bbb" stroke-width="6"/>',
  search: '<circle cx="52" cy="52" r="28" fill="#fff"/><path d="M74 74 L100 100" stroke-width="12"/>',
  laptop: '<rect x="26" y="28" width="68" height="46" rx="6" fill="' + C.main + '"/><rect x="32" y="34" width="56" height="34" rx="3" fill="#cfe9eb"/><path d="M14 80 H106 L98 92 H22 Z" fill="#9aa7ad"/>',
  badge: '<circle cx="60" cy="52" r="30" fill="' + C.acc + '"/><path d="M46 52 L56 62 L76 40" stroke-width="7" fill="none" stroke="#fff"/><path d="M44 78 L38 106 L60 96 L82 106 L76 78" fill="' + C.main + '"/>',
  mail: '<rect x="16" y="32" width="88" height="58" rx="8" fill="#fff"/><path d="M16 36 L60 66 L104 36" fill="none"/>',
  gift: '<rect x="22" y="50" width="76" height="52" rx="6" fill="' + C.red + '"/><rect x="16" y="38" width="88" height="18" rx="5" fill="#e57373"/><path d="M60 38 V102" stroke="' + C.acc + '" stroke-width="10"/><path d="M60 38 C44 18 30 30 44 38 M60 38 C76 18 90 30 76 38" fill="none"/>',
  building: '<rect x="24" y="34" width="72" height="68" rx="4" fill="#fff"/><path d="M18 36 L60 14 L102 36 Z" fill="' + C.main + '"/><rect x="50" y="72" width="20" height="30" fill="' + C.acc + '"/><path d="M34 50 H46 M74 50 H86 M34 62 H46 M74 62 H86" stroke-width="6" stroke="#8fc3c8"/>',
  check: '<circle cx="60" cy="60" r="38" fill="#4caf6e"/><path d="M40 60 L54 74 L82 46" stroke="#fff" stroke-width="9" fill="none"/>',
  wrench: '<path d="M30 92 L70 52" stroke-width="16" stroke="#9aa7ad"/><circle cx="78" cy="42" r="20" fill="#9aa7ad"/><circle cx="84" cy="36" r="8" fill="' + C.cream + '" stroke="none"/>',
  heart: '<path d="M60 98 C20 72 18 40 40 32 C52 28 60 38 60 44 C60 38 68 28 80 32 C102 40 100 72 60 98 Z" fill="' + C.red + '"/>',
  pot: '<path d="M22 52 H98 V82 Q98 98 82 98 H38 Q22 98 22 82 Z" fill="#9aa7ad"/><path d="M14 52 H106" stroke-width="7"/><path d="M44 40 Q48 28 44 18 M60 40 Q64 28 60 18 M76 40 Q80 28 76 18" stroke="#bbb" fill="none"/>',
  box: '<path d="M20 40 L60 22 L100 40 L60 58 Z" fill="#e2b77a"/><path d="M20 40 V86 L60 104 V58 Z" fill="#c9965a"/><path d="M100 40 V86 L60 104 V58 Z" fill="#b5834a"/>',
  id: '<rect x="14" y="28" width="92" height="64" rx="8" fill="#fff"/><circle cx="40" cy="56" r="12" fill="' + C.skin2 + '"/><path d="M60 48 H94 M60 62 H88 M24 80 H94" stroke="#bbb" stroke-width="5"/>',
  doc: '<path d="M30 16 H76 L92 32 V104 H30 Z" fill="#fff"/><path d="M76 16 V32 H92" fill="none"/><path d="M42 50 H80 M42 64 H80 M42 78 H68" stroke="#9aa" stroke-width="5"/>',
  game: '<rect x="14" y="40" width="92" height="46" rx="22" fill="#5b7fd6"/><path d="M36 54 V72 M27 63 H45" stroke="#fff" stroke-width="6"/><circle cx="78" cy="58" r="6" fill="#fff"/><circle cx="90" cy="68" r="6" fill="#fff"/>',
  swim: '<path d="M30 30 Q60 50 90 30 L86 92 Q60 104 34 92 Z" fill="#e57373"/>',
  pin: '<path d="M60 104 C40 76 30 62 30 46 A30 30 0 0 1 90 46 C90 62 80 76 60 104 Z" fill="' + C.red + '"/><circle cx="60" cy="46" r="11" fill="#fff"/>',
  bag: '<rect x="24" y="40" width="72" height="62" rx="16" fill="#3a5a8c"/><path d="M42 40 V30 Q42 20 60 20 Q78 20 78 30 V40" fill="none" stroke-width="6"/><rect x="40" y="62" width="40" height="22" rx="6" fill="#5a7ab0"/>'
};
function icon(name, size, extra) {
  return '<svg viewBox="0 0 120 120" width="' + (size || 120) + '" height="' + (size || 120) + '" xmlns="http://www.w3.org/2000/svg" ' + (extra || '') + '><g stroke="#1f2a30" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">' + ICONS[name] + '</g></svg>';
}
