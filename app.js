const getQuotesBtn = document.getElementById("get-quotes-btn");

const inputSlider = document.getElementById("myRange");
const outputValue = document.getElementById("current-value");

const outputQuotes = document.getElementById("output-quotes");

inputSlider.oninput = function() {
    outputValue.innerHTML = `Value: ${this.value}`;
}

function getRandomNr(max) {
    return Math.floor(Math.random() * max) + 1;
}

let quoteUrl = "https://type.fit/api/quotes";

function getQuote() {
    const ønsketAntall = inputSlider.value;

    let newQuotes = [];
    let newQuotesAuthor = [];

    fetch(quoteUrl)
    .then((res) => res.json())
    .then((data) => {
        for(let i = 0; i < ønsketAntall; i++) {
            let ranNr = getRandomNr(data.length);
            
            if(newQuotes.includes(data[ranNr].text)) {
                return i -= 1;
            } else {
                newQuotes.push(data[ranNr].text);
                newQuotesAuthor.push(data[ranNr].author);
            }
        }
        
        outputQuotes.innerHTML = "";
    
        for(let i = 0; i < newQuotes.length; i++) {
            outputQuotes.innerHTML += `<li class="quote-li">${i + 1}. ${newQuotes[i]}</li>`;
        }
    })
}

getQuotesBtn.addEventListener("click", getQuote);