function displayKanjiName(event) {
    event.preventDefault();
    const kanjiName = convertKatakanaNameToKanji(inputName.value);

    kanjiParagraph.textContent = kanjiName;

}

function convertKatakanaNameToKanji(katakanaName) {
    return [...katakanaName].map((katakana) => getRandomElement(data[katakana])).join('')
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
