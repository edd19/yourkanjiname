function displayKanjiName(event) {
    event.preventDefault();
    kanjiFrame.innerHTML = "";

    const kanjis = [...inputName.value].map((katakana) => getKanji(katakana));
    kanjis.forEach(kanji => appendKanjiRow(kanji, kanjiFrame))
}

function appendKanjiRow(kanji, kanjiFrame) {
    const katakanaColumn = document.createElement('div');
    katakanaColumn.classList.add("katakana");
    katakanaColumn.textContent = kanji.katakana;

    const kanjiColumn = document.createElement('div');
    kanjiColumn.classList.add('kanji');
    kanjiColumn.textContent = kanji.kanji

    const meaningColumn = document.createElement('div');
    meaningColumn.classList.add('meaning')
    meaningColumn.textContent = kanji.meaning

    kanjiFrame.append(katakanaColumn, kanjiColumn, meaningColumn);
}

function getKanji(katakana) {
    const randomKanji = getRandomElement(data[katakana])
    return {'katakana': katakana, 'kanji': randomKanji.literal, 'meaning': randomKanji.meaning}
}

function getRandomElement(arrayObject) {
    return arrayObject[Math.floor(Math.random() * arrayObject.length)];
}

function saveKanjiName() {
    const config = {
        logging: false
    }
    html2canvas(kanjiFrame, config).then(
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
const kanjiFrame = document.getElementById('kanjiFrame');
const btnSave = document.getElementById('btnSave');

form.addEventListener('submit', displayKanjiName);
btnSave.onclick = saveKanjiName
