function displayKanjiName(event) {
    event.preventDefault();

    kanjiParagraph.innerHTML = "";

    const kanjis = [...inputName.value].map((katakana) => getKanji(katakana));
    const rows = kanjis.map((kanji) => createKanjiRow(kanji))

    rows.forEach(row => kanjiParagraph.appendChild(row))
}

function createKanjiRow(kanji) {
    const katakanaColumn = document.createElement('td');
    katakanaColumn.textContent = kanji.katakana;

    const kanjiColumn = document.createElement('td');
    kanjiColumn.textContent = kanji.kanji

    const meaningColumn = document.createElement('td');
    meaningColumn.textContent = kanji.meaning

    const newRow = document.createElement('tr');
    newRow.append(katakanaColumn, kanjiColumn, meaningColumn)

    return newRow;
}

function convertKatakanaNameToKanji(katakanaName) {
    return [...katakanaName].map((katakana) => getRandomElement(data[katakana]).literal).join('')
}

function getKanji(katakana) {
    const randomKanji = getRandomElement(data[katakana])
    return {
        'katakana': katakana,
        'kanji': randomKanji.literal,
        'meaning': randomKanji.meaning
    }
}

function getRandomElement(arrayObject) {
    return arrayObject[Math.floor(Math.random() * arrayObject.length)];
}

function saveKanjiName() {
    const config = {
        logging: false
    }
    html2canvas(kanjiArea, config).then(
        canvas => {
            const link = document.createElement('a');
            link.download = 'name.png';
            link.href = canvas.toDataURL();
            link.click();
            link.remove();
        }
    )
}

const form = document.getElementById("form");
const inputName = document.getElementById("inputName");
const kanjiParagraph = document.getElementById('kanjiArea');
const kanjiArea = document.getElementsByClassName('kanjiParagraph')[0]
const btnSave = document.getElementById('btnSave');
form.addEventListener('submit', displayKanjiName);
btnSave.onclick = saveKanjiName
