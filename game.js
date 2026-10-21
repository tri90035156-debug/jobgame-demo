/* 小遊戲共用引擎（仿臺南yo：一關一個簡單互動、過關蓋章、看「為什麼？」）
   網址參數：?lv=0 開場、?lv=1..4 第幾關、&mid=1 互動進行中、&done=1 過關後、?lv=end 完成頁 */
var G = { levels: [], intro: null, end: null, color: C.main, soft: C.soft, stamps: 0 };
var Q = new URLSearchParams(location.search);

function $(s, el) { return (el || document).querySelector(s); }
function h(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

function frame() {
  var app = $('#app'); app.innerHTML = '';
  var top = h('div', 'top');
  top.innerHTML = '<div class="home">⌂</div><div class="gname">' + G.name + '</div><div class="stamps">' +
    G.levels.map(function (_, i) { return '<i class="' + (i < G.stamps ? 'on' : '') + '">' + (i < G.stamps ? '✓' : '') + '</i>'; }).join('') + '</div>';
  app.appendChild(top);
  return app;
}

function showIntro() {
  G.stamps = 0;
  var app = frame();
  var b = h('div', 'intro');
  b.innerHTML = '<div class="kick">' + G.kick + '</div><h1>' + G.title + '</h1>' +
    '<div class="hero">' + G.intro.art + '</div><p class="story">' + G.intro.text + '</p>';
  var go = h('button', 'go', '出發'); go.onclick = function () { showLevel(0); };
  b.appendChild(go);
  app.appendChild(b);
}

function showLevel(i, opt) {
  opt = opt || {};
  G.stamps = i;
  var L = G.levels[i];
  var app = frame();
  var wrap = h('div', 'lv');
  wrap.innerHTML = '<div class="lvno">第' + (i + 1) + '關・' + L.kind + '</div><h2>' + L.title + '</h2><p class="ask">' + L.ask + '</p>';
  var stage = h('div', 'stage');
  wrap.appendChild(stage);
  var foot = h('div', 'foot');
  wrap.appendChild(foot);
  app.appendChild(wrap);
  function done() {
    G.stamps = i + 1;
    $('.stamps').innerHTML = G.levels.map(function (_, k) { return '<i class="' + (k < G.stamps ? 'on' : '') + '">' + (k < G.stamps ? '✓' : '') + '</i>'; }).join('');
    foot.innerHTML = '<div class="why"><b>為什麼？</b>' + L.why + '</div>';
    var nx = h('button', 'go small', i + 1 < G.levels.length ? '下一關 ›' : '完成！');
    nx.onclick = function () { if (i + 1 < G.levels.length) showLevel(i + 1); else showEnd(); };
    foot.appendChild(nx);
    var st = h('div', 'stampfx', '過關'); wrap.appendChild(st);
  }
  L.play(stage, done, opt);
}

function showEnd() {
  G.stamps = G.levels.length;
  var app = frame();
  var b = h('div', 'intro');
  b.innerHTML = '<div class="kick">全部過關</div><h1>' + G.end.title + '</h1><div class="hero">' + G.end.art + '</div><p class="story">' + G.end.text + '</p>' +
    '<button class="go">' + G.end.cta + '</button><p class="note">' + G.end.note + '</p>';
  app.appendChild(b);
}

function startGame() {
  document.documentElement.style.setProperty('--main', G.color);
  document.documentElement.style.setProperty('--soft', G.soft);
  var lv = Q.get('lv');
  if (lv === 'end') return showEnd();
  if (lv && +lv > 0) {
    var i = +lv - 1;
    showLevel(i, { mid: Q.get('mid') === '1', done: Q.get('done') === '1' });
    return;
  }
  showIntro();
}
