// caching dom element data by selecting them
const inputField = document.getElementById("searchInput");
const searchBtn = document.getElementById("search");
const dictionaryContainer = document.getElementById("dicContainer");

const fetchDicData = async () => {
    
    try {
        dictionaryContainer.innerHTML = "";
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputField.value.toLowerCase()}`;
        const res = await fetch(url);
        // if you get the data correctly checking by res.ok
        if(res.ok) {
            const data = await res.json();
            // console.log(data);
            displayData(data);
            
        } else {
            // dom output with different seach situations
            if(inputField.value === "") {
                dictionaryContainer.innerText = "You havent inserted word for searching";
                throw new Error("not found. error code: " + res.status);
            } else {
                dictionaryContainer.innerText = "No Valid Word Found According To Your Search";
                throw new Error("not found. error code: " + res.status);
            }
            
        }
        
    }
    catch(error) {
        // consoling the error
        console.log(error);
    }
}

// displaying data to the dom
const displayData = (data) => {
    const dicData = data[0];
    // console.log(dicData);
    const {word, sourceUrls, phonetics, meanings} = dicData;
    // console.log(word, sourceUrls, phonetics, meanings);

    if (phonetics.length === 0) phonetics.push({ text: "no phonetics available"});

    const whichPartsOfSpeech = [];
    const nounDescArr = [];
    const pronounDescArr = [];
    const verbDescArr = [];
    const adverbDescArr = [];
    const adjectiveDescArr = [];
    const prepositionDescArr = [];
    const conjunctionDescArr = [];
    const interjectionDescArr = [];

    meanings.forEach(obj => {
        if (obj["partOfSpeech"] === "noun" && obj["definitions"] !== null) {
            whichPartsOfSpeech.push(obj["partOfSpeech"]);
            obj["definitions"].forEach(obj => nounDescArr.push(obj["definition"]));
        } 
        if (obj["partOfSpeech"] === "verb" && obj["definitions"] !== null) {
            whichPartsOfSpeech.push(obj["partOfSpeech"]);
            obj["definitions"].forEach(obj => verbDescArr.push(obj["definition"]));
        }
        if (obj["partOfSpeech"] === "adjective" && obj["definitions"] !== null) {
            whichPartsOfSpeech.push(obj["partOfSpeech"]);
            obj["definitions"].forEach(obj => adjectiveDescArr.push(obj["definition"]));
        }
        if (obj["partOfSpeech"] === "preposition" && obj["definitions"] !== null) {
            whichPartsOfSpeech.push(obj["partOfSpeech"]);
            obj["definitions"].forEach(obj => prepositionDescArr.push(obj["definition"]));
        }
        if (obj["partOfSpeech"] === "conjunction" && obj["definitions"] !== null) {
            whichPartsOfSpeech.push(obj["partOfSpeech"]);
            obj["definitions"].forEach(obj => conjunctionDescArr.push(obj["definition"]));
        }
        if (obj["partOfSpeech"] === "interjection" && obj["definitions"] !== null) {
            whichPartsOfSpeech.push(obj["partOfSpeech"]);
            obj["definitions"].forEach(obj => interjectionDescArr.push(obj["definition"]));
        }
        if (obj["partOfSpeech"] === "pronoun" && obj["definitions"] !== null) {
            whichPartsOfSpeech.push(obj["partOfSpeech"]);
            obj["definitions"].forEach(obj => pronounDescArr.push(obj["definition"]));
        }
        if (obj["partOfSpeech"] === "adverb" && obj["definitions"] !== null) {
            whichPartsOfSpeech.push(obj["partOfSpeech"]);
            obj["definitions"].forEach(obj => adverbDescArr.push(obj["definition"]));
        }
        
    });


    const article = document.createElement("article");

    article.innerHTML = `
        <header>
            <h1>${word}</h1>
            <p>${phonetics[0]["text"] === undefined ? phonetics[1]["text"] : phonetics[0]["text"]}</p>
        </header>
        <h2 id="synonym">Synonym: ${meanings[0]["synonyms"][0] === undefined ? "not found" : meanings[0]["synonyms"][0]}</h2>
        <section id="info"></section>
        <footer><a target="_blank" href="${sourceUrls}">${sourceUrls}</a></footer>
        <button class="mt-3" id="btn" onclick="playAudio('${phonetics[0]['audio']}')">Play Audio</button>
    `;

    dictionaryContainer.appendChild(article);

    if(nounDescArr.length !== 0) {
        displayDictInfo("noun");
        nounDescArr.forEach(str => {
            const li = document.createElement("li");
            li.innerText = str;
            document.getElementById("nounContainer").appendChild(li);
        });
    }

    if(verbDescArr.length !== 0) {
        displayDictInfo("verb");
        verbDescArr.forEach(str => {
            const li = document.createElement("li");
            li.innerText = str;

            document.getElementById("verbContainer").appendChild(li);
        });
    }

    if (adjectiveDescArr.length !== 0) {
        displayDictInfo("adjective");
        adjectiveDescArr.forEach(str => {
            const li = document.createElement("li");
            li.innerText = str;

            document.getElementById("adjectiveContainer").appendChild(li);
        });
    }

    if (prepositionDescArr.length !== 0) {
        displayDictInfo("preposition");
        prepositionDescArr.forEach(str => {
            const li = document.createElement("li");
            li.innerText = str;

            document.getElementById("prepositionContainer").appendChild(li);
        });
    }

    if (conjunctionDescArr.length !== 0) {
        displayDictInfo("conjunction");
        conjunctionDescArr.forEach(str => {
            const li = document.createElement("li");
            li.innerText = str;

            document.getElementById("conjunctionContainer").appendChild(li);
        });
    }

    if (interjectionDescArr.length !== 0) {
        displayDictInfo("interjection");
        interjectionDescArr.forEach(str => {
            const li = document.createElement("li");
            li.innerText = str;

            document.getElementById("interjectionContainer").appendChild(li);
        });
    }

    if (pronounDescArr.length !== 0) {
        displayDictInfo("pronoun");
        pronounDescArr.forEach(str => {
            const li = document.createElement("li");
            li.innerText = str;

            document.getElementById("pronounContainer").appendChild(li);
        });
    }

    if (adverbDescArr.length !== 0) {
        displayDictInfo("pronoun");
        adverbDescArr.forEach(str => {
            const li = document.createElement("li");
            li.innerText = str;

            document.getElementById("adverbContainer").appendChild(li);
        });
    }


}

// dictionary info function from preventing the same code over and over again
const displayDictInfo = (id) => {
    const article = document.createElement("article");
    article.innerHTML = `
            <p class="mt-3 font-bold">${id}</p>
            <h2>Meaning</h2>
            <ul id="${id}Container" class="mb-3">
            </ul>
        `;
    document.getElementById("info").appendChild(article);
}

// for audio
const playAudio = (url) => {
    const beat = new Audio(url);
    beat.play();
}

// event handler to the seach word button
searchBtn.addEventListener("click", fetchDicData);