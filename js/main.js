const book_chap = {
  "創": 50,
  "出": 40,
  "利": 27,
  "民": 36,
  "申": 34,
  "書": 24,
  "士": 21,
  "得": 4,
  "撒上": 31,
  "撒下": 24,
  "王上": 22,
  "王下": 25,
  "代上": 29,
  "代下": 36,
  "拉": 10,
  "尼": 13,
  "斯": 10,
  "伯": 42,
  "詩": 150,
  "箴": 31,
  "傳": 12,
  "歌": 8,
  "賽": 66,
  "耶": 52,
  "哀": 5,
  "結": 48,
  "但": 12,
  "何": 14,
  "珥": 3,
  "摩": 9,
  "俄": 1,
  "拿": 4,
  "彌": 7,
  "鴻": 3,
  "哈": 3,
  "番": 3,
  "該": 2,
  "亞": 14,
  "瑪": 4,
  "太": 28,
  "可": 16,
  "路": 24,
  "約": 21,
  "徒": 28,
  "羅": 16,
  "林前": 16,
  "林後": 13,
  "加": 6,
  "弗": 6,
  "腓": 4,
  "西": 4,
  "帖前": 5,
  "帖後": 3,
  "提前": 6,
  "提後": 4,
  "多": 3,
  "門": 1,
  "來": 13,
  "雅": 5,
  "彼前": 5,
  "彼後": 3,
  "約壹": 5,
  "約二": 1,
  "約三": 1,
  "猶": 1,
  "啟": 22
}

const book_name = {
  "創": "創世記",
  "出": "出埃及記",
  "利": "利未記",
  "民": "民數記",
  "申": "申命記",
  "書": "約書亞記",
  "士": "士師記",
  "得": "路得記",
  "撒上": "撒母耳記上",
  "撒下": "撒母耳記下",
  "王上": "列王紀上",
  "王下": "列王紀下",
  "代上": "歷代志上",
  "代下": "歷代志下",
  "拉": "以斯拉記",
  "尼": "尼希米記",
  "斯": "以斯帖記",
  "伯": "約伯記",
  "詩": "詩篇",
  "箴": "箴言",
  "傳": "傳道書",
  "歌": "雅歌",
  "賽": "以賽亞書",
  "耶": "耶利米書",
  "哀": "耶利米哀歌",
  "結": "以西結書",
  "但": "但以理書",
  "何": "何西阿書",
  "珥": "約珥書",
  "摩": "阿摩司書",
  "俄": "俄巴底亞書",
  "拿": "約拿書",
  "彌": "彌迦書",
  "鴻": "那鴻書",
  "哈": "哈巴谷書",
  "番": "西番雅書",
  "該": "哈該書",
  "亞": "撒迦利亞書",
  "瑪": "瑪拉基書",
  "太": "馬太福音",
  "可": "馬可福音",
  "路": "路加福音",
  "約": "約翰福音",
  "徒": "使徒行傳",
  "羅": "羅馬書",
  "林前": "哥林多前書",
  "林後": "哥林多後書",
  "加": "加拉太書",
  "弗": "以弗所書",
  "腓": "腓立比書",
  "西": "歌羅西書",
  "帖前": "帖撒羅尼迦前書",
  "帖後": "帖撒羅尼迦後書",
  "提前": "提摩太前書",
  "提後": "提摩太後書",
  "多": "提多書",
  "門": "腓利門書",
  "來": "希伯來書",
  "雅": "雅各書",
  "彼前": "彼得前書",
  "彼後": "彼得後書",
  "約壹": "約翰壹書",
  "約貳": "約翰貳書",
  "約參": "約翰參書",
  "猶": "猶大書",
  "啟": "啟示錄"
};


var sel_book="創", sel_chap=1, sel_sec=1;
var bible_info;

// Create five buttons and add them to the container

for (const [key, value] of Object.entries(book_chap)) {
  var button = document.createElement('button');
  button.textContent = key;
  button.setAttribute("class", "btn btn-outline-success btn-sm mx-1 my-1");
  document.getElementById("book_section").appendChild(button);

  // Add a click event listener to each button using a closure
  (function(book) {
    button.addEventListener('click', function() {
      now_verse = "";
      disabled_view(true);

      update_info(abbr(book));
      sel_book=book;

      update_chap(book);
    });
  })(key);
}

var now_verse = "";
document.getElementById("sec_section").addEventListener("change", function() {
  verses = document.getElementById("sec_section").selectedOptions
  verses_num = [];
  texts = ""
  for (const num of verses){
    verses_num.push(parseInt(num.value));
    texts += num.innerHTML;
  }
  now_verse=texts;
  disabled_view(false);
  
  bible_info = abbr(sel_book)+" "+sel_chap+":"+formatArray(verses_num);
  update_info(bible_info);
  writeToClipboard(document.getElementById("bible_info").innerHTML+"\n"+texts);
});

function formatArray(arr) {
  let ranges = [];
  let start = arr[0];
  let end = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] == end + 1) {
      end = arr[i];
    } else {
      ranges.push(start == end ? start.toString() : start + "-" + end);
      start = arr[i];
      end = arr[i];
    }
  }
  
  ranges.push(start == end ? start.toString() : start + "-" + end);
  
  return ranges.join(", ");
}

function writeToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}


function abbr(book){
  if (document.getElementById("abbrChecked").checked){
    return book;
  }
  return book_name[book];
}

document.getElementById("abbrChecked").addEventListener("change", function() {
  let element = document.getElementById("bible_info").innerHTML;
  if (element != "Bible_COPY"){
    if (element.includes(" ")){
      bible_info = abbr(sel_book) + " " + element.split(' ').slice(1).join(' ');
      document.getElementById("bible_info").innerHTML = bible_info;
    } else {
      document.getElementById("bible_info").innerHTML = abbr(sel_book);
    }
  }
  if (now_verse != "") {
    writeToClipboard(document.getElementById("bible_info").innerHTML+"\n"+now_verse);
  }
});






function update_info(info){
  document.getElementById("bible_info").innerHTML = info;
}

function update_chap(book){
  let element = document.getElementById("chap_section");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (i=1; i<=book_chap[book]; i++) {
    var button = document.createElement('button');
    button.textContent = i;
    button.setAttribute("class", "btn btn-outline-secondary btn-sm mx-1 my-1");
    document.getElementById("chap_section").appendChild(button);

    // Add a click event listener to each button using a closure
    (function(book, chap) {
      button.addEventListener('click', function() {
        now_verse = ""
        disabled_view(true);
      
        let element = document.getElementById("sec_section");
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        update_info(abbr(book)+" "+chap);
        sel_chap=chap

        console.log(book);
        const url = 'https://bible.fhl.net/json/qb.php';
        const params = { chineses:book, chap: chap, strong: 0, gb: 0, };

        const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        const requestUrl = url + '?' + queryString;
        fetch(requestUrl)
          .then((response) => {
           
            console.log(response);
            
            return response.json(); 
          }).then((data) => {
            for (const sec of data.record){
              var verse = document.createElement('option');
              verse.setAttribute("value", sec["sec"]);
              document.getElementById("sec_section").appendChild(verse);
              verse.innerHTML = sec["sec"]+sec["bible_text"];
            }
          }).catch((err) => {
            console.log('錯誤:', err);
        });
      });
    })(book, i);
  }
}

// view

document.getElementById("view_button").addEventListener("click", function() {
  const url = 'view.html';
  const params = {text_title:bible_info, text_verse: now_verse};

  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  const requestUrl = url + '?' + queryString;
  window.open(requestUrl);
});

function disabled_view(d){
  document.getElementById("view_button").disabled = d;
}