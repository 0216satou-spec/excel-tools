let currentTool = "";


/* ========================================
   ツール設定
======================================== */

const tools = {

  /* ---------- 条件・判定 ---------- */

  if: {
    title: "IF関数メーカー",
    description: "条件を満たす場合と、満たさない場合の結果を指定します。",
    example: "例：A2が100以上なら「合格」、それ以外なら「不合格」と表示できます。",
    operator: true,
    fields: [
      ["cell", "判定するセル", "A2"],
      ["value", "比較する値", "100"],
      ["true", "条件を満たす場合", "合格"],
      ["false", "条件を満たさない場合", "不合格"]
    ]
  },

  iferror: {
    title: "IFERRORメーカー",
    description: "数式がエラーになった場合に表示する内容を指定します。",
    example: "例：VLOOKUPでデータが見つからない場合に、#N/Aではなく空白を表示できます。",
    fields: [
      ["formula", "元の数式", "VLOOKUP(A2,商品一覧!A:D,4,FALSE)"],
      ["error", "エラー時の表示", ""]
    ]
  },

  andif: {
    title: "AND＋IFメーカー",
    description: "2つの条件を両方満たした場合の結果を指定します。",
    example: "例：A2が100以上、かつB2が20以上なら「達成」と表示できます。",
    doubleOperator: true,
    fields: [
      ["cell1", "条件①のセル", "A2"],
      ["value1", "条件①の値", "100"],
      ["cell2", "条件②のセル", "B2"],
      ["value2", "条件②の値", "20"],
      ["true", "両方満たす場合", "達成"],
      ["false", "満たさない場合", "未達"]
    ]
  },

  orif: {
    title: "OR＋IFメーカー",
    description: "2つの条件のどちらかを満たした場合の結果を指定します。",
    example: "例：A2またはB2のどちらかが100以上なら「対象」と表示できます。",
    doubleOperator: true,
    fields: [
      ["cell1", "条件①のセル", "A2"],
      ["value1", "条件①の値", "100"],
      ["cell2", "条件②のセル", "B2"],
      ["value2", "条件②の値", "100"],
      ["true", "どちらかを満たす場合", "対象"],
      ["false", "どちらも満たさない場合", "対象外"]
    ]
  },


  /* ---------- 検索・参照 ---------- */

  vlookup: {
    title: "VLOOKUPメーカー",
    description: "検索するセル、検索範囲、取得する列番号を指定します。",
    example: "例：A2の商品コードを商品一覧から検索し、4列目の価格を取得できます。",
    fields: [
      ["value", "検索するセル", "A2"],
      ["range", "検索範囲", "商品一覧!A:D"],
      ["column", "取得する列番号", "4"]
    ]
  },

  xlookup: {
    title: "XLOOKUPメーカー",
    description: "検索する範囲と、取得する範囲をそれぞれ指定します。",
    example: "例：A2の商品コードを商品一覧A列から探して、D列の価格を取得できます。",
    fields: [
      ["value", "検索するセル", "A2"],
      ["search", "検索する範囲", "商品一覧!A:A"],
      ["return", "取得する範囲", "商品一覧!D:D"],
      ["notfound", "見つからない場合の表示", ""]
    ]
  },

  indexmatch: {
    title: "INDEX＋MATCHメーカー",
    description: "MATCHで位置を検索し、INDEXで対応する値を取得します。",
    example: "例：A2の商品コードを商品一覧A列から探し、D列の価格を取得できます。",
    fields: [
      ["value", "検索するセル", "A2"],
      ["search", "検索する範囲", "商品一覧!A:A"],
      ["return", "取得する範囲", "商品一覧!D:D"]
    ]
  },


  /* ---------- 条件付き集計 ---------- */

  sumif: {
    title: "SUMIFメーカー",
    description: "1つの条件に一致するデータだけを合計します。",
    example: "例：A列が「りんご」の行だけ、C列の売上を合計できます。",
    fields: [
      ["range", "条件を確認する範囲", "A2:A100"],
      ["criteria", "条件", "りんご"],
      ["sum", "合計する範囲", "C2:C100"]
    ]
  },

  sumifs: {
    title: "SUMIFSメーカー",
    description: "複数の条件に一致するデータだけを合計します。",
    example: "例：商品が「りんご」で、地域が「東北」の売上だけを合計できます。",
    fields: [
      ["sum", "合計する範囲", "C2:C100"],
      ["range1", "条件範囲①", "A2:A100"],
      ["criteria1", "条件①", "りんご"],
      ["range2", "条件範囲②", "B2:B100"],
      ["criteria2", "条件②", "東北"]
    ]
  },

  countif: {
    title: "COUNTIFメーカー",
    description: "指定した条件に一致するセルの件数を数えます。",
    example: "例：A列に「りんご」が何件あるか数えられます。",
    fields: [
      ["range", "確認する範囲", "A2:A100"],
      ["criteria", "条件", "りんご"]
    ]
  },

  countifs: {
    title: "COUNTIFSメーカー",
    description: "複数の条件に一致するデータの件数を数えます。",
    example: "例：「りんご」かつ「東北」に該当する行数を数えられます。",
    fields: [
      ["range1", "条件範囲①", "A2:A100"],
      ["criteria1", "条件①", "りんご"],
      ["range2", "条件範囲②", "B2:B100"],
      ["criteria2", "条件②", "東北"]
    ]
  },

  averageif: {
    title: "AVERAGEIFメーカー",
    description: "条件に一致するデータだけの平均を求めます。",
    example: "例：A列が「りんご」の行だけ、C列の平均売上を計算できます。",
    fields: [
      ["range", "条件を確認する範囲", "A2:A100"],
      ["criteria", "条件", "りんご"],
      ["average", "平均を求める範囲", "C2:C100"]
    ]
  },


  /* ---------- 基本計算 ---------- */

  sum: {
    title: "SUMメーカー",
    description: "指定したセル範囲の数値を合計します。",
    example: "例：A2からA100までの数値をすべて合計できます。",
    fields: [
      ["range", "合計する範囲", "A2:A100"]
    ]
  },

  average: {
    title: "AVERAGEメーカー",
    description: "指定したセル範囲の平均値を求めます。",
    example: "例：B2からB100までの平均値を計算できます。",
    fields: [
      ["range", "平均を求める範囲", "B2:B100"]
    ]
  },

  max: {
    title: "MAXメーカー",
    description: "指定したセル範囲から最大値を求めます。",
    example: "例：売上データの中から最も大きい売上額を取得できます。",
    fields: [
      ["range", "最大値を求める範囲", "C2:C100"]
    ]
  },

  min: {
    title: "MINメーカー",
    description: "指定したセル範囲から最小値を求めます。",
    example: "例：価格一覧の中から最も安い価格を取得できます。",
    fields: [
      ["range", "最小値を求める範囲", "C2:C100"]
    ]
  },


  /* ---------- 数値・丸め ---------- */

  round: {
    title: "ROUNDメーカー",
    description: "数値を指定した桁数で四捨五入します。",
    example: "例：123.456を小数第2位までにする場合は、桁数に2を指定します。",
    fields: [
      ["cell", "対象セル", "A2"],
      ["digits", "桁数", "2"]
    ]
  },

  roundup: {
    title: "ROUNDUPメーカー",
    description: "数値を指定した桁数で切り上げます。",
    example: "例：123.451を小数第2位まで切り上げる場合に使用できます。",
    fields: [
      ["cell", "対象セル", "A2"],
      ["digits", "桁数", "2"]
    ]
  },

  rounddown: {
    title: "ROUNDDOWNメーカー",
    description: "数値を指定した桁数で切り捨てます。",
    example: "例：123.459を小数第2位まで切り捨てる場合に使用できます。",
    fields: [
      ["cell", "対象セル", "A2"],
      ["digits", "桁数", "2"]
    ]
  },


  /* ---------- 文字列 ---------- */

  left: {
    title: "LEFTメーカー",
    description: "セルの左側から指定した文字数を取り出します。",
    example: "例：「ABC123」の左から3文字を取り出すと「ABC」になります。",
    fields: [
      ["cell", "対象セル", "A2"],
      ["number", "取り出す文字数", "3"]
    ]
  },

  right: {
    title: "RIGHTメーカー",
    description: "セルの右側から指定した文字数を取り出します。",
    example: "例：「ABC123」の右から3文字を取り出すと「123」になります。",
    fields: [
      ["cell", "対象セル", "A2"],
      ["number", "取り出す文字数", "3"]
    ]
  },

  mid: {
    title: "MIDメーカー",
    description: "指定した位置から指定した文字数を取り出します。",
    example: "例：「ABC123」の4文字目から3文字取り出すと「123」になります。",
    fields: [
      ["cell", "対象セル", "A2"],
      ["start", "開始位置", "4"],
      ["number", "取り出す文字数", "3"]
    ]
  },

  textjoin: {
    title: "TEXTJOINメーカー",
    description: "区切り文字を使って複数セルの文字を結合します。",
    example: "例：A2:C2を「・」で結合すると「東京・営業・佐藤」のようにできます。",
    fields: [
      ["delimiter", "区切り文字", "・"],
      ["range", "結合する範囲", "A2:C2"]
    ]
  },

  len: {
    title: "LENメーカー",
    description: "セルに入力されている文字数を数えます。",
    example: "例：A2に「Excel」と入力されている場合、結果は5になります。",
    fields: [
      ["cell", "文字数を数えるセル", "A2"]
    ]
  },

  trim: {
    title: "TRIMメーカー",
    description: "文字列に含まれる余分なスペースを削除します。",
    example: "例：コピーしたデータに余計なスペースが含まれている場合の整理に使えます。",
    fields: [
      ["cell", "対象セル", "A2"]
    ]
  },

  concat: {
    title: "CONCATメーカー",
    description: "複数のセルや範囲に入っている文字を結合します。",
    example: "例：A2:C2の文字を連続して1つの文字列にできます。",
    fields: [
      ["range", "結合するセル・範囲", "A2:C2"]
    ]
  },

  substitute: {
    title: "SUBSTITUTEメーカー",
    description: "セル内の指定した文字を別の文字に置き換えます。",
    example: "例：A2にある「株式会社」を「(株)」へ置き換えることができます。",
    fields: [
      ["cell", "対象セル", "A2"],
      ["old", "置き換える文字", "株式会社"],
      ["new", "新しい文字", "(株)"]
    ]
  },


  /* ---------- 日付 ---------- */

  edate: {
    title: "EDATEメーカー",
    description: "指定した日付から○か月後・前の日付を求めます。",
    example: "例：A2の日付から3か月後を求めます。3か月前なら「-3」と入力します。",
    fields: [
      ["cell", "日付が入っているセル", "A2"],
      ["months", "何か月後？", "3"]
    ]
  },

  eomonth: {
    title: "EOMONTHメーカー",
    description: "指定した日付を基準に月末日を求めます。",
    example: "例：A2と同じ月の月末なら0、翌月末なら1を指定します。",
    fields: [
      ["cell", "日付が入っているセル", "A2"],
      ["months", "何か月後の月末？", "0"]
    ]
  },

  workday: {
    title: "WORKDAYメーカー",
    description: "土日を除いて指定した営業日数後の日付を求めます。",
    example: "例：A2の日付から、土日を除いた5営業日後の日付を求められます。",
    fields: [
      ["cell", "開始日が入っているセル", "A2"],
      ["days", "営業日数", "5"]
    ]
  }

};


/* ========================================
   ツールを開く
======================================== */

function openTool(toolName) {

  const tool = tools[toolName];

  if (!tool) {
    alert("ツールの読み込みに失敗しました。");
    return;
  }

  currentTool = toolName;

  document
    .getElementById("tools")
    .classList.add("hidden");

  document
    .getElementById("about")
    .classList.add("hidden");

  document
    .getElementById("generatorSection")
    .classList.remove("hidden");

  document
    .getElementById("generatorTitle")
    .textContent = tool.title;

  document
    .getElementById("generatorDescription")
    .textContent = tool.description;

  document
    .getElementById("exampleText")
    .textContent = tool.example;

  buildForm(tool);

  document
    .getElementById("formulaResult")
    .textContent =
      "入力後「数式を作成」を押してください";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* ========================================
   入力フォーム作成
======================================== */

function buildForm(tool) {

  const area =
    document.getElementById("formArea");

  area.innerHTML = "";

  tool.fields.forEach((field, index) => {

    const [id, label, example] = field;

    const html = `
      <div class="form-group">

        <label for="field_${id}">
          ${escapeHtml(label)}
        </label>

        <input
          id="field_${id}"
          type="text"
          value="${escapeHtml(example)}"
          autocomplete="off"
        >

        <span class="form-help">
          入力例：${example === "" ? "空白" : escapeHtml(example)}
        </span>

      </div>
    `;

    area.insertAdjacentHTML(
      "beforeend",
      html
    );


    /* IF用の条件選択 */

    if (
      tool.operator &&
      id === "cell"
    ) {

      area.insertAdjacentHTML(
        "beforeend",
        createOperatorSelect(
          "operator",
          "条件"
        )
      );
    }


    /* AND / OR用 */

    if (
      tool.doubleOperator &&
      id === "cell1"
    ) {

      area.insertAdjacentHTML(
        "beforeend",
        createOperatorSelect(
          "operator1",
          "条件①の比較方法"
        )
      );
    }


    if (
      tool.doubleOperator &&
      id === "cell2"
    ) {

      area.insertAdjacentHTML(
        "beforeend",
        createOperatorSelect(
          "operator2",
          "条件②の比較方法"
        )
      );
    }

  });
}


/* ========================================
   比較条件セレクト
======================================== */

function createOperatorSelect(id, label) {

  return `
    <div class="form-group">

      <label for="field_${id}">
        ${label}
      </label>

      <select id="field_${id}">
        <option value=">=">以上（>=）</option>
        <option value=">">より大きい（>）</option>
        <option value="<=">以下（<=）</option>
        <option value="<">より小さい（<）</option>
        <option value="=">等しい（=）</option>
        <option value="<>">等しくない（<>）</option>
      </select>

    </div>
  `;
}


/* ========================================
   一覧に戻る
======================================== */

function closeTool() {

  document
    .getElementById("generatorSection")
    .classList.add("hidden");

  document
    .getElementById("tools")
    .classList.remove("hidden");

  document
    .getElementById("about")
    .classList.remove("hidden");

  document
    .getElementById("tools")
    .scrollIntoView({
      behavior: "smooth"
    });
}


/* ========================================
   入力値取得
======================================== */

function getValue(id) {

  const element =
    document.getElementById(
      `field_${id}`
    );

  if (!element) {
    return "";
  }

  return element.value.trim();
}


/* ========================================
   Excel文字列処理
======================================== */

function excelText(value) {

  const text =
    String(value).replace(
      /"/g,
      '""'
    );

  return `"${text}"`;
}


/* 数値ならそのまま、
   文字なら "文字" にする */

function conditionValue(value) {

  const text =
    String(value).trim();

  if (text === "") {
    return '""';
  }

  if (
    text !== "" &&
    !isNaN(Number(text))
  ) {
    return text;
  }

  return excelText(text);
}


/* ========================================
   入力確認
======================================== */

function hasEmptyRequiredField() {

  const area =
    document.getElementById("formArea");

  const inputs =
    area.querySelectorAll("input");

  for (const input of inputs) {

    /*
      空白を許可する項目
    */

    if (
      currentTool === "iferror" &&
      input.id === "field_error"
    ) {
      continue;
    }

    if (
      currentTool === "xlookup" &&
      input.id === "field_notfound"
    ) {
      continue;
    }

    if (
      input.value.trim() === ""
    ) {

      input.focus();

      alert(
        "未入力の項目があります。"
      );

      return true;
    }
  }

  return false;
}


/* ========================================
   数式生成
======================================== */

function generateFormula() {

  if (!currentTool) {
    return;
  }

  if (hasEmptyRequiredField()) {
    return;
  }

  let formula = "";


  switch (currentTool) {

    /* ---------- 条件 ---------- */

    case "if":

      formula =
        `=IF(${getValue("cell")}${getValue("operator")}${conditionValue(getValue("value"))},${excelText(getValue("true"))},${excelText(getValue("false"))})`;

      break;


    case "iferror":

      formula =
        `=IFERROR(${removeLeadingEqual(getValue("formula"))},${excelText(getValue("error"))})`;

      break;


    case "andif":

      formula =
        `=IF(AND(${getValue("cell1")}${getValue("operator1")}${conditionValue(getValue("value1"))},${getValue("cell2")}${getValue("operator2")}${conditionValue(getValue("value2"))}),${excelText(getValue("true"))},${excelText(getValue("false"))})`;

      break;


    case "orif":

      formula =
        `=IF(OR(${getValue("cell1")}${getValue("operator1")}${conditionValue(getValue("value1"))},${getValue("cell2")}${getValue("operator2")}${conditionValue(getValue("value2"))}),${excelText(getValue("true"))},${excelText(getValue("false"))})`;

      break;


    /* ---------- 検索 ---------- */

    case "vlookup":

      formula =
        `=IFERROR(VLOOKUP(${getValue("value")},${getValue("range")},${getValue("column")},FALSE),"")`;

      break;


    case "xlookup":

      formula =
        `=XLOOKUP(${getValue("value")},${getValue("search")},${getValue("return")},${excelText(getValue("notfound"))})`;

      break;


    case "indexmatch":

      formula =
        `=INDEX(${getValue("return")},MATCH(${getValue("value")},${getValue("search")},0))`;

      break;


    /* ---------- 条件付き集計 ---------- */

    case "sumif":

      formula =
        `=SUMIF(${getValue("range")},${conditionValue(getValue("criteria"))},${getValue("sum")})`;

      break;


    case "sumifs":

      formula =
        `=SUMIFS(${getValue("sum")},${getValue("range1")},${conditionValue(getValue("criteria1"))},${getValue("range2")},${conditionValue(getValue("criteria2"))})`;

      break;


    case "countif":

      formula =
        `=COUNTIF(${getValue("range")},${conditionValue(getValue("criteria"))})`;

      break;


    case "countifs":

      formula =
        `=COUNTIFS(${getValue("range1")},${conditionValue(getValue("criteria1"))},${getValue("range2")},${conditionValue(getValue("criteria2"))})`;

      break;


    case "averageif":

      formula =
        `=AVERAGEIF(${getValue("range")},${conditionValue(getValue("criteria"))},${getValue("average")})`;

      break;


    /* ---------- 基本計算 ---------- */

    case "sum":

      formula =
        `=SUM(${getValue("range")})`;

      break;


    case "average":

      formula =
        `=AVERAGE(${getValue("range")})`;

      break;


    case "max":

      formula =
        `=MAX(${getValue("range")})`;

      break;


    case "min":

      formula =
        `=MIN(${getValue("range")})`;

      break;


    /* ---------- 数値 ---------- */

    case "round":

      formula =
        `=ROUND(${getValue("cell")},${getValue("digits")})`;

      break;


    case "roundup":

      formula =
        `=ROUNDUP(${getValue("cell")},${getValue("digits")})`;

      break;


    case "rounddown":

      formula =
        `=ROUNDDOWN(${getValue("cell")},${getValue("digits")})`;

      break;


    /* ---------- 文字列 ---------- */

    case "left":

      formula =
        `=LEFT(${getValue("cell")},${getValue("number")})`;

      break;


    case "right":

      formula =
        `=RIGHT(${getValue("cell")},${getValue("number")})`;

      break;


    case "mid":

      formula =
        `=MID(${getValue("cell")},${getValue("start")},${getValue("number")})`;

      break;


    case "textjoin":

      formula =
        `=TEXTJOIN(${excelText(getValue("delimiter"))},TRUE,${getValue("range")})`;

      break;


    case "len":

      formula =
        `=LEN(${getValue("cell")})`;

      break;


    case "trim":

      formula =
        `=TRIM(${getValue("cell")})`;

      break;


    case "concat":

      formula =
        `=CONCAT(${getValue("range")})`;

      break;


    case "substitute":

      formula =
        `=SUBSTITUTE(${getValue("cell")},${excelText(getValue("old"))},${excelText(getValue("new"))})`;

      break;


    /* ---------- 日付 ---------- */

    case "edate":

      formula =
        `=EDATE(${getValue("cell")},${getValue("months")})`;

      break;


    case "eomonth":

      formula =
        `=EOMONTH(${getValue("cell")},${getValue("months")})`;

      break;


    case "workday":

      formula =
        `=WORKDAY(${getValue("cell")},${getValue("days")})`;

      break;


    default:

      formula =
        "数式を作成できませんでした。";
  }


  document
    .getElementById("formulaResult")
    .textContent = formula;
}


/* ========================================
   = を削除
======================================== */

function removeLeadingEqual(value) {

  const text =
    String(value).trim();

  if (text.startsWith("=")) {
    return text.slice(1);
  }

  return text;
}


/* ========================================
   数式コピー
======================================== */

async function copyFormula() {

  const result =
    document.getElementById(
      "formulaResult"
    );

  const text =
    result.textContent.trim();

  if (!text.startsWith("=")) {

    alert(
      "先に数式を作成してください。"
    );

    return;
  }


  try {

    await navigator.clipboard
      .writeText(text);

  } catch (error) {

    const textarea =
      document.createElement(
        "textarea"
      );

    textarea.value = text;

    textarea.style.position =
      "fixed";

    textarea.style.opacity =
      "0";

    document.body
      .appendChild(textarea);

    textarea.select();

    document.execCommand(
      "copy"
    );

    document.body
      .removeChild(textarea);
  }

  showToast();
}


/* ========================================
   コピー完了通知
======================================== */

function showToast() {

  const toast =
    document.getElementById(
      "toast"
    );

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove(
      "show"
    );

  }, 1800);
}


/* ========================================
   ツール検索
======================================== */

function filterTools() {

  const input =
    document.getElementById(
      "toolSearch"
    );

  const keyword =
    input.value
      .toLowerCase()
      .trim();

  const cards =
    document.querySelectorAll(
      ".tool-card"
    );

  let visibleCount = 0;


  cards.forEach(card => {

    const searchText =
      (
        card.dataset.search +
        " " +
        card.textContent
      )
      .toLowerCase();


    if (
      searchText.includes(keyword)
    ) {

      card.style.display = "";
      visibleCount++;

    } else {

      card.style.display = "none";
    }

  });


  /* 空になったカテゴリを非表示 */

  const categories =
    document.querySelectorAll(
      ".category"
    );

  categories.forEach(category => {

    const visibleCards =
      Array.from(
        category.querySelectorAll(
          ".tool-card"
        )
      )
      .filter(card =>
        card.style.display !== "none"
      );

    if (
      visibleCards.length === 0
    ) {

      category.style.display =
        "none";

    } else {

      category.style.display =
        "";
    }

  });


  const noResults =
    document.getElementById(
      "noResults"
    );


  if (visibleCount === 0) {

    noResults.classList.remove(
      "hidden"
    );

  } else {

    noResults.classList.add(
      "hidden"
    );
  }
}


/* ========================================
   HTMLエスケープ
======================================== */

function escapeHtml(value) {

  return String(value)

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&#039;");
}