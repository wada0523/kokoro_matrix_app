// 心の三層構造インテグラル（HTML+CSS+JS）
// - 54問（A1〜A3 / B1〜B3）を2択で回答
// - A×Bの組み合わせでCグリッド（3階層）を色分け
// - 結果マスクリックで詳細表示
//
// 保存：LocalStorage（「途中保存」「保存を復元」）

const QUESTIONS = [
  {
    "id": "A1-1",
    "layer": "A1",
    "pair": "B1-1",
    "time": "過去",
    "axis": "反応",
    "text": "過去の出来事を思い出すと、どんな感情が湧く？",
    "neg": "後悔している",
    "pos": "誇りに思っている"
  },
  {
    "id": "A1-2",
    "layer": "A1",
    "pair": "B1-2",
    "time": "過去",
    "axis": "選択",
    "text": "過去の影響を今も感じている？",
    "neg": "過去に縛られている",
    "pos": "乗り越えている"
  },
  {
    "id": "A1-3",
    "layer": "A1",
    "pair": "B1-3",
    "time": "過去",
    "axis": "創造",
    "text": "やりきった感覚はある？",
    "neg": "やり残したと感じる",
    "pos": "意味があったと感じる"
  },
  {
    "id": "A1-4",
    "layer": "A1",
    "pair": "B1-4",
    "time": "現在",
    "axis": "反応",
    "text": "今この瞬間、気持ちは安定している？",
    "neg": "不安で落ち着かない",
    "pos": "安心している"
  },
  {
    "id": "A1-5",
    "layer": "A1",
    "pair": "B1-5",
    "time": "現在",
    "axis": "選択",
    "text": "今の状況や選択に自信はある？",
    "neg": "モヤモヤしている",
    "pos": "自分で決めている"
  },
  {
    "id": "A1-6",
    "layer": "A1",
    "pair": "B1-6",
    "time": "現在",
    "axis": "創造",
    "text": "今の自分の状態に満足している？",
    "neg": "進めていない",
    "pos": "充実している"
  },
  {
    "id": "A1-7",
    "layer": "A1",
    "pair": "B1-7",
    "time": "未来",
    "axis": "反応",
    "text": "未来を考えると不安が大きい？ワクワクする？",
    "neg": "怖れている",
    "pos": "楽しみにしている"
  },
  {
    "id": "A1-8",
    "layer": "A1",
    "pair": "B1-8",
    "time": "未来",
    "axis": "選択",
    "text": "未来の意思決定に迷いがある？",
    "neg": "決めきれない",
    "pos": "意志がある"
  },
  {
    "id": "A1-9",
    "layer": "A1",
    "pair": "B1-9",
    "time": "未来",
    "axis": "創造",
    "text": "未来の自分を信じられている？",
    "neg": "自信がない",
    "pos": "希望を持っている"
  },
  {
    "id": "B1-1",
    "layer": "B1",
    "pair": "A1-1",
    "time": "過去",
    "axis": "反応",
    "text": "過去の出来事に対して、今どんな見方をしている？",
    "neg": "自分を責めている",
    "pos": "学びにしている"
  },
  {
    "id": "B1-2",
    "layer": "B1",
    "pair": "A1-2",
    "time": "過去",
    "axis": "選択",
    "text": "過去への執着が残っていると感じる？",
    "neg": "過去に執着している",
    "pos": "教訓にしている"
  },
  {
    "id": "B1-3",
    "layer": "B1",
    "pair": "A1-3",
    "time": "過去",
    "axis": "創造",
    "text": "過去の出来事に意味を見出せている？",
    "neg": "意味はないと感じる",
    "pos": "意味づけしている"
  },
  {
    "id": "B1-4",
    "layer": "B1",
    "pair": "A1-4",
    "time": "現在",
    "axis": "反応",
    "text": "今、自分や状況をコントロールしようとしすぎていない？",
    "neg": "コントロールしたがっている",
    "pos": "委ねられている"
  },
  {
    "id": "B1-5",
    "layer": "B1",
    "pair": "A1-5",
    "time": "現在",
    "axis": "選択",
    "text": "白黒はっきりつけたくなる場面が多い？",
    "neg": "白黒つけたがっている",
    "pos": "柔軟に考えている"
  },
  {
    "id": "B1-6",
    "layer": "B1",
    "pair": "A1-6",
    "time": "現在",
    "axis": "創造",
    "text": "物事の捉え方に偏りがないか、自覚してる？",
    "neg": "偏った解釈をしている",
    "pos": "多面的に捉えている"
  },
  {
    "id": "B1-7",
    "layer": "B1",
    "pair": "A1-7",
    "time": "未来",
    "axis": "反応",
    "text": "まだ起きていない未来を不安視していない？",
    "neg": "不安視している",
    "pos": "備えている"
  },
  {
    "id": "B1-8",
    "layer": "B1",
    "pair": "A1-8",
    "time": "未来",
    "axis": "選択",
    "text": "未来に対して視野が狭くなっていない？",
    "neg": "最悪を想定している",
    "pos": "選択肢を持っている"
  },
  {
    "id": "B1-9",
    "layer": "B1",
    "pair": "A1-9",
    "time": "未来",
    "axis": "創造",
    "text": "未来の自分の可能性を信じられている？",
    "neg": "無理だと思っている",
    "pos": "可能性を信じている"
  },
  {
    "id": "A2-1",
    "layer": "A2",
    "pair": "B2-1",
    "time": "過去",
    "axis": "反応",
    "text": "過去の出来事にどう意味づけしていますか？",
    "neg": "あのときの意味を見出せない",
    "pos": "できごとを整理して捉えている"
  },
  {
    "id": "A2-2",
    "layer": "A2",
    "pair": "B2-2",
    "time": "過去",
    "axis": "選択",
    "text": "過去の選択に対してどう向き合っていますか？",
    "neg": "いつまでも後悔している",
    "pos": "過去を糧に選び直している"
  },
  {
    "id": "A2-3",
    "layer": "A2",
    "pair": "B2-3",
    "time": "過去",
    "axis": "創造",
    "text": "過去をどのように未来につなげていますか？",
    "neg": "もしもあの時〇〇していたら…と考えがち",
    "pos": "今につながる学びとして捉えている"
  },
  {
    "id": "A2-4",
    "layer": "A2",
    "pair": "B2-4",
    "time": "現在",
    "axis": "反応",
    "text": "いま考えがどう巡っていますか？",
    "neg": "思考が堂々巡りしている",
    "pos": "今できることに集中している"
  },
  {
    "id": "A2-5",
    "layer": "A2",
    "pair": "B2-5",
    "time": "現在",
    "axis": "選択",
    "text": "日々の選択はどう決めていますか？",
    "neg": "決めきれず他人の意見に振り回されている",
    "pos": "自分の考えを軸に選べている"
  },
  {
    "id": "A2-6",
    "layer": "A2",
    "pair": "B2-6",
    "time": "現在",
    "axis": "創造",
    "text": "失敗への不安とどう向き合っていますか？",
    "neg": "失敗を恐れて動けない",
    "pos": "試行錯誤を前提に行動している"
  },
  {
    "id": "A2-7",
    "layer": "A2",
    "pair": "B2-7",
    "time": "未来",
    "axis": "反応",
    "text": "未来についてどんな考え方をしていますか？",
    "neg": "最悪のシナリオばかり想定している",
    "pos": "起こりうる可能性を複数想定している"
  },
  {
    "id": "A2-8",
    "layer": "A2",
    "pair": "B2-8",
    "time": "未来",
    "axis": "選択",
    "text": "これからの可能性をどう捉えていますか？",
    "neg": "「こうするしかない」と思っている",
    "pos": "他にも道があるかもしれないと考えられている"
  },
  {
    "id": "A2-9",
    "layer": "A2",
    "pair": "B2-9",
    "time": "未来",
    "axis": "創造",
    "text": "未来に希望を持てていますか？",
    "neg": "「どうせ無理」と思いがち",
    "pos": "未来に対して構想を持てている"
  },
  {
    "id": "B2-1",
    "layer": "B2",
    "pair": "A2-1",
    "time": "過去",
    "axis": "反応",
    "text": "昔の出来事を思い返したとき、感情的に反応してしまうことはありますか？",
    "neg": "昔の体験が今も自動反応として出ることがある",
    "pos": "昔の体験を自然に手放せている"
  },
  {
    "id": "B2-2",
    "layer": "B2",
    "pair": "A2-2",
    "time": "過去",
    "axis": "選択",
    "text": "今でも親や先生の価値観が無意識に選択に影響していると感じますか？",
    "neg": "無意識に刷り込まれた価値観で選んでしまう",
    "pos": "今の自分の価値観で選べている"
  },
  {
    "id": "B2-3",
    "layer": "B2",
    "pair": "A2-3",
    "time": "過去",
    "axis": "創造",
    "text": "過去の経験が「自分はこういう人間だ」という思い込みにつながっていませんか？",
    "neg": "自分はこういう人間だという決めつけがある",
    "pos": "過去に縛られず、新しい自分を描けている"
  },
  {
    "id": "B2-4",
    "layer": "B2",
    "pair": "A2-4",
    "time": "現在",
    "axis": "反応",
    "text": "似たような場面で、なぜかモヤモヤしたり不快になることはありますか？",
    "neg": "理由のない不快感に振り回されることがある",
    "pos": "状況に応じた反応ができている"
  },
  {
    "id": "B2-5",
    "layer": "B2",
    "pair": "A2-5",
    "time": "現在",
    "axis": "選択",
    "text": "選択のとき、つい他人の期待や反応を先に考えていませんか？",
    "neg": "他人の期待に合わせて選んでしまう",
    "pos": "自分の感覚を軸にして選べている"
  },
  {
    "id": "B2-6",
    "layer": "B2",
    "pair": "A2-6",
    "time": "現在",
    "axis": "創造",
    "text": "またこのパターンかも…と思うような出来事が繰り返されていませんか？",
    "neg": "同じような壁に何度もぶつかっている",
    "pos": "無意識のパターンから抜け出せている"
  },
  {
    "id": "B2-7",
    "layer": "B2",
    "pair": "A2-7",
    "time": "未来",
    "axis": "反応",
    "text": "未来を考えると、根拠のない不安が先に出てくることはありますか？",
    "neg": "理由もなく未来が怖い気がする",
    "pos": "必要以上に未来を怖がっていない"
  },
  {
    "id": "B2-8",
    "layer": "B2",
    "pair": "A2-8",
    "time": "未来",
    "axis": "選択",
    "text": "未来に対して「どうせうまくいかない」と諦めがちになっていませんか？",
    "neg": "どうせ○○になるという思い込みがある",
    "pos": "未来は変えられると感じている"
  },
  {
    "id": "B2-9",
    "layer": "B2",
    "pair": "A2-9",
    "time": "未来",
    "axis": "創造",
    "text": "期待したら傷つくかも…と考えて、あえて理想を描かないようにしていませんか？",
    "neg": "傷つきたくなくて希望を抑えてしまう",
    "pos": "自然に理想や未来をイメージできている"
  },
  {
    "id": "A3-1",
    "layer": "A3",
    "pair": "B3-1",
    "time": "過去",
    "axis": "反応",
    "text": "過去に落ち込んだとき、どんなふうに行動していましたか？",
    "neg": "落ち込み続けて何もできなかった",
    "pos": "立ち直って行動できていた"
  },
  {
    "id": "A3-2",
    "layer": "A3",
    "pair": "B3-2",
    "time": "過去",
    "axis": "選択",
    "text": "過去のつらい出来事が原因で、今でも行動を止めてしまうことがありますか？",
    "neg": "引きずって動けなかったことがある",
    "pos": "そこから一歩踏み出せていた"
  },
  {
    "id": "A3-3",
    "layer": "A3",
    "pair": "B3-3",
    "time": "過去",
    "axis": "創造",
    "text": "「失敗が怖いから動けない」と思った経験はありますか？",
    "neg": "失敗を避けて動かなかった",
    "pos": "トライして学ぼうとしていた"
  },
  {
    "id": "A3-4",
    "layer": "A3",
    "pair": "B3-4",
    "time": "現在",
    "axis": "反応",
    "text": "今、やるべきことから逃げてしまっていませんか？",
    "neg": "つい後回しにしてしまうことが多い",
    "pos": "向き合って行動できている"
  },
  {
    "id": "A3-5",
    "layer": "A3",
    "pair": "B3-5",
    "time": "現在",
    "axis": "選択",
    "text": "今の行動は、誰かの影響や流れに流されていませんか？",
    "neg": "他人に任せてしまっている",
    "pos": "主体的に動けている"
  },
  {
    "id": "A3-6",
    "layer": "A3",
    "pair": "B3-6",
    "time": "現在",
    "axis": "創造",
    "text": "最近、自分から意図して行動を起こせていますか？",
    "neg": "受け身で流されていることが多い",
    "pos": "自分で目的を持って動いている"
  },
  {
    "id": "A3-7",
    "layer": "A3",
    "pair": "B3-7",
    "time": "未来",
    "axis": "反応",
    "text": "未来を思い描いたとき、身体が自然に動きたくなる感覚がありますか？",
    "neg": "未来を考えると体が重くなり、避けたくなる",
    "pos": "未来に向かうイメージで行動が軽くなる"
  },
  {
    "id": "A3-8",
    "layer": "A3",
    "pair": "B3-8",
    "time": "未来",
    "axis": "選択",
    "text": "チャンスを見送った経験はありますか？",
    "neg": "行動できずに逃したことがある",
    "pos": "勇気を出してつかみにいけている"
  },
  {
    "id": "A3-9",
    "layer": "A3",
    "pair": "B3-9",
    "time": "未来",
    "axis": "創造",
    "text": "未来に希望を持って動けていますか？",
    "neg": "諦めてしまっている",
    "pos": "希望を持って動こうとしている"
  },
  {
    "id": "B3-1",
    "layer": "B3",
    "pair": "A3-1",
    "time": "過去",
    "axis": "反応",
    "text": "過去に「本能的に避けた」行動がありますか？",
    "neg": "怖くて逃げた経験がある",
    "pos": "怖さに向き合って行動した"
  },
  {
    "id": "B3-2",
    "layer": "B3",
    "pair": "A3-2",
    "time": "過去",
    "axis": "選択",
    "text": "過去の安心ゾーンから抜け出すとき、どんな反応をしていましたか？",
    "neg": "居心地のよい場所にしがみついていた",
    "pos": "怖さを抱えながら一歩を踏み出した"
  },
  {
    "id": "B3-3",
    "layer": "B3",
    "pair": "A3-3",
    "time": "過去",
    "axis": "創造",
    "text": "本能的な恐れや欲求が、あなたの過去の選択にどう影響しましたか？",
    "neg": "欲求や恐れに振り回されて選んでいた",
    "pos": "その存在を理解しながら選択していた"
  },
  {
    "id": "B3-4",
    "layer": "B3",
    "pair": "A3-4",
    "time": "現在",
    "axis": "反応",
    "text": "今、無意識に“危険を避ける”反応をしていませんか？",
    "neg": "安全な道ばかり選んでいる気がする",
    "pos": "あえて不確実性のある挑戦をしている"
  },
  {
    "id": "B3-5",
    "layer": "B3",
    "pair": "A3-5",
    "time": "現在",
    "axis": "選択",
    "text": "今、身体や感覚が「やめとけ」と言ってきたことに対して、どう動いていますか？",
    "neg": "本能に従って避けている",
    "pos": "意図的に判断して選んでいる"
  },
  {
    "id": "B3-6",
    "layer": "B3",
    "pair": "A3-6",
    "time": "現在",
    "axis": "創造",
    "text": "衝動や快楽を感じたとき、どんな行動をとっていますか？",
    "neg": "我慢できずにすぐ動いてしまう",
    "pos": "欲求を感じながらも制御できている"
  },
  {
    "id": "B3-7",
    "layer": "B3",
    "pair": "A3-7",
    "time": "未来",
    "axis": "反応",
    "text": "将来の不安が先に立って、行動を止めていませんか？",
    "neg": "未来の不確実性に怯えて足がすくむ",
    "pos": "不安を感じながらも準備して進もうとしている"
  },
  {
    "id": "B3-8",
    "layer": "B3",
    "pair": "A3-8",
    "time": "未来",
    "axis": "選択",
    "text": "自分の“身を守りたい”という感覚が、チャレンジを妨げていませんか？",
    "neg": "傷つかない選択ばかりしてしまう",
    "pos": "守る意識を持ちながらも一歩踏み出している"
  },
  {
    "id": "B3-9",
    "layer": "B3",
    "pair": "A3-9",
    "time": "未来",
    "axis": "創造",
    "text": "未来の理想に向けて、“本能的な欲求”をどう扱っていますか？",
    "neg": "欲望に流されたり、逆に抑え込みすぎてしまう",
    "pos": "欲求をエネルギーに変えて活用できている"
  }
];

const LAYERS = {
  A1: { title: "A1：感情（表層）", group: "A", level: 1 },
  A2: { title: "A2：思考（表層）", group: "A", level: 2 },
  A3: { title: "A3：行動（表層）", group: "A", level: 3 },
  B1: { title: "B1：理性（裏層）", group: "B", level: 1 },
  B2: { title: "B2：無意識（裏層）", group: "B", level: 2 },
  B3: { title: "B3：本能（裏層）", group: "B", level: 3 },
};

const PAIRS = {
  1: { A: "A1", B: "B1", C: "C1" },
  2: { A: "A2", B: "B2", C: "C2" },
  3: { A: "A3", B: "B3", C: "C3" },
};

const STORAGE_KEY = "kokoro_integral_answers_v1";

// {"A1-1":"pos", ...}
let answers = loadFromStorage() ?? {};

// ===== util =====
function qs(sel) { return document.querySelector(sel); }

function escapeHtml(s) {
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function judge(a, b) {
  if (a === "pos" && b === "pos") return { color: "blue", type: "安定・理想" };
  if (a === "pos" && b === "neg") return { color: "yellow", type: "空転型" };
  if (a === "neg" && b === "pos") return { color: "yellow", type: "理性昇華型" };
  return { color: "red", type: "停滞型" };
}

function answerLabel(q, val) {
  if (!val) return "未回答";
  return val === "pos" ? q.pos : q.neg;
}

// ===== render questions =====
function renderQuestions() {
  const root = qs("#questions");
  root.innerHTML = "";

  const order = ["A1","A2","A3","B1","B2","B3"];
  for (const layerId of order) {
    const layerQs = QUESTIONS.filter(q => q.layer === layerId);

    const header = document.createElement("div");
    header.className = "sectionTitle";
    header.innerHTML = `
      <h2>${escapeHtml(LAYERS[layerId].title)}</h2>
      <span class="badge">9問（3×3）</span>
    `;
    root.appendChild(header);

    layerQs.forEach((q, index) => {
      const card = document.createElement("div");
      card.className = "qCard";

      const name = q.id; // radio group name
      const picked = answers[name];

      card.innerHTML = `
        <div class="qHead">
          <div class="qMeta">${escapeHtml(q.time)} × ${escapeHtml(q.axis)}　<span class="muted">(${index+1}/9)</span></div>
          <div class="qMeta muted">ID: ${escapeHtml(q.id)}</div>
        </div>
        <p class="qText">${escapeHtml(q.text)}</p>

        <div class="choices" role="radiogroup" aria-label="${escapeHtml(q.text)}">
          <label class="choice">
            <input type="radio" name="${escapeHtml(name)}" value="neg" ${picked==="neg"?"checked":""} />
            <span class="cLabel">${escapeHtml(q.neg)}</span>
          </label>

          <label class="choice">
            <input type="radio" name="${escapeHtml(name)}" value="pos" ${picked==="pos"?"checked":""} />
            <span class="cLabel">${escapeHtml(q.pos)}</span>
          </label>
        </div>
      `;

      card.addEventListener("change", (ev) => {
        const target = ev.target;
        if (target && target.matches("input[type=radio]")) {
          answers[name] = target.value;
          updateProgress();
        }
      });

      root.appendChild(card);
    });
  }

  updateProgress();
}

function countAnswered() {
  let c = 0;
  for (const q of QUESTIONS) {
    if (answers[q.id] === "neg" || answers[q.id] === "pos") c++;
  }
  return c;
}

function updateProgress() {
  const answered = countAnswered();
  qs("#answeredCount").textContent = String(answered);
  qs("#progressFill").style.width =
    Math.round((answered / 54) * 100) + "%";

  if (answered === 54) {
    showResults();

    // 結果後メール入力を表示
    qs("#emailAfterResult").classList.remove("hidden");
  }
}

// ===== results =====
function showResults() {
  const answered = countAnswered();
  if (answered < 54) {
    alert(`未回答があります（${answered}/54）。すべて回答すると、より正確に可視化できます。`);
  }

  const resultsSection = qs("#results");
  const gridsRoot = qs("#resultGrids");
  gridsRoot.innerHTML = "";
  resultsSection.classList.remove("hidden");

  const legendHtml = `
    <div class="legend">
      <span><i class="swatch" style="background: color-mix(in srgb, var(--blue) 28%, white)"></i>青：安定・理想（ポジ×ポジ）</span>
      <span><i class="swatch" style="background: color-mix(in srgb, var(--yellow) 38%, white)"></i>黄：空転/理性昇華（ポジ×ネガ / ネガ×ポジ）</span>
      <span><i class="swatch" style="background: color-mix(in srgb, var(--red) 28%, white)"></i>赤：停滞（ネガ×ネガ）</span>
    </div>
  `;

  Object.values(PAIRS).forEach(pair => {
    const wrap = document.createElement("div");
    wrap.className = "resultWrap card";

    const aQs = QUESTIONS.filter(q => q.layer === pair.A);
    const cells = aQs.map(a => {
      const b = QUESTIONS.find(x => x.id === a.pair);
      const aAns = answers[a.id];
      const bAns = answers[b.id];
      const r = judge(aAns, bAns);
      return { a, b, aAns, bAns, r };
    });

    wrap.innerHTML = `
      <div class="gridTitle">
        <h3>${escapeHtml(pair.C)}（${escapeHtml(LAYERS[pair.A].title)} × ${escapeHtml(LAYERS[pair.B].title)}）</h3>
      </div>
      ${legendHtml}
      <div class="grid" data-grid="${escapeHtml(pair.C)}"></div>
    `;

    const gridEl = wrap.querySelector(".grid");

    cells.forEach(cell => {
      const el = document.createElement("div");
      el.className = `cell ${cell.r.color}`;
      el.innerHTML = `
        <div class="type">${escapeHtml(cell.r.type)}</div>
        <div class="sub">${escapeHtml(cell.a.time)}・${escapeHtml(cell.a.axis)}</div>
      `;
      el.addEventListener("click", () => openDetail(pair.C, cell));
      gridEl.appendChild(el);
    });

    gridsRoot.appendChild(wrap);
  });

  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openDetail(cId, cell) {
  const modal = qs("#modal");
  const title = qs("#modalTitle");
  const sub = qs("#modalSub");
  const body = qs("#modalBody");

  title.textContent = `${cId} 詳細`;
  sub.textContent = `${cell.a.time}・${cell.a.axis}`;

  const aLabel = answerLabel(cell.a, cell.aAns);
  const bLabel = answerLabel(cell.b, cell.bAns);

  body.innerHTML = `
    <div class="kv">
      <div class="kvItem">
        <div class="k">${escapeHtml(LAYERS[cell.a.layer].title)}（表）</div>
        <div class="v">${escapeHtml(cell.a.text)}</div>
        <div class="answerLine">
          <span class="pill">回答：${escapeHtml(aLabel)}</span>
          <span class="pill">記録：${escapeHtml(cell.aAns ?? "未回答")}</span>
        </div>
      </div>

      <div class="kvItem">
        <div class="k">${escapeHtml(LAYERS[cell.b.layer].title)}（裏）</div>
        <div class="v">${escapeHtml(cell.b.text)}</div>
        <div class="answerLine">
          <span class="pill">回答：${escapeHtml(bLabel)}</span>
          <span class="pill">記録：${escapeHtml(cell.bAns ?? "未回答")}</span>
        </div>
      </div>

      <div class="kvItem">
        <div class="k">判定</div>
        <div class="v">${escapeHtml(cell.r.type)}</div>
        <div class="answerLine">
          <span class="pill">色：${escapeHtml(cell.r.color)}</span>
          <span class="pill">A×B：${escapeHtml((cell.aAns ?? "-") + " × " + (cell.bAns ?? "-"))}</span>
        </div>
      </div>
    </div>
  `;

  modal.style.display = "block";
  modal.setAttribute("aria-hidden","false");
}

function closeModal() {
  const modal = qs("#modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden","true");
}

// ===== storage =====
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, savedAt: Date.now() }));
  const hint = qs("#saveHint");
  const dt = new Date();
  hint.textContent = `保存しました：${dt.toLocaleString("ja-JP")}`;
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (!obj || typeof obj !== "object") return null;
    return obj.answers ?? null;
  } catch {
    return null;
  }
}

function restoreFromStorage() {
  const restored = loadFromStorage();
  if (!restored) {
    alert("保存データが見つかりませんでした。");
    return;
  }
  answers = restored;
  renderQuestions();
  qs("#saveHint").textContent = "保存を復元しました。";
}

function resetAll() {
  if (!confirm("回答と保存をリセットします。よろしいですか？")) return;

  answers = {};
  localStorage.removeItem(STORAGE_KEY);

  qs("#progressCard").classList.remove("hidden");
  qs("#questions").classList.remove("hidden");
  qs("#results").classList.add("hidden");
  qs("#emailAfterResult").classList.add("hidden");

  renderQuestions();
}

// ===== events =====
document.addEventListener("DOMContentLoaded", () => {
  renderQuestions();
  qs("#btnSave").addEventListener("click", saveToStorage);
  qs("#btnLoad").addEventListener("click", restoreFromStorage);
  qs("#btnReset").addEventListener("click", resetAll);
  qs("#btnCloseModal").addEventListener("click", closeModal);

  qs("#emailAfterForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const input = qs("#emailAfterInput");
    const error = qs("#emailAfterError");
    const button = e.target.querySelector("button");

    const email = input.value.trim();

    if (!email) {
      error.textContent = "メールアドレスを入力してください。";
      return;
    }

    error.textContent = "";
    button.disabled = true;
    button.textContent = "送信中…";

    await sendResultMail(email);

    button.textContent = "送信完了 ✓";
  });

});

async function sendResultMail(email) {
  try {
    await fetch("/api/send-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        payload: buildResultPayload(email)
      })
    });
  } catch (e) {
    console.error("メール送信失敗", e);
  }
}

function buildResultPayload(email) {
  return {
    answeredAt: new Date().toISOString(),
    email,
    answers
  };
}