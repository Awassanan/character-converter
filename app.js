function convertCharacters(inputString) {
    const engToThai = {
        '`': '-',
        '1': 'ๅ',
        '2': '/',
        '3': '_',
        '4': 'ภ',
        '5': 'ถ',
        '6': 'ุ',
        '7': 'ึ',
        '8': 'ค',
        '9': 'ต',
        '0': 'จ',
        '-': 'ข',
        '=': 'ช',
        '~': '%',
        '!': '+',
        '@': '๑',
        '#': '๒',
        '$': '๓',
        '%': '๔',
        '^': 'ู',
        '&': '฿',
        '*': '๕',
        '(': '๖',
        ')': '๗',
        '_': '๘',
        '+': '๙',
        'q': 'ๆ',
        'w': 'ไ',
        'e': 'ำ',
        'r': 'พ',
        't': 'ะ',
        'y': 'ั',
        'u': 'ี',
        'i': 'ร',
        'o': 'น',
        'p': 'ย',
        '[': 'บ',
        ']': 'ล',
        '\\': 'ฃ',
        '|': 'ฎ',
        'a': 'ฟ',
        's': 'ห',
        'd': 'ก',
        'f': 'ด',
        'g': 'เ',
        'h': '้',
        'j': '่',
        'k': 'า',
        'l': 'ส',
        ';': 'ว',
        "'": 'ง',
        "’": 'ง',
        ':': 'ฤ',
        '"': 'ฆ',
        'z': 'ผ',
        'x': 'ป',
        'c': 'แ',
        'v': 'อ',
        'b': 'ิ',
        'n': 'ื',
        'm': 'ท',
        ',': 'ม',
        '.': 'ใ',
        '/': 'ฝ',
        '<': '(',
        '>': ')',
        '?': 'ฉ',
        'Q': '๐',
        'W': '“',
        'E': 'ฎ',
        'R': 'ฑ',
        'T': 'ธ',
        'Y': 'ํ',
        'U': '๊',
        'I': 'ณ',
        'O': 'ฯ',
        'P': 'ญ',
        '{': 'ฐ',
        '}': ',',
        '|': 'ฅ',
        'A': 'ฤ',
        'S': 'ฆ',
        'D': 'ฏ',
        'F': 'โ',
        'G': 'ฌ',
        'H': '็',
        'J': '๋',
        'K': 'ษ',
        'L': 'ศ',
        ':': 'ซ',
        '"': '.',
        'Z': '(',
        'X': ')',
        'C': 'ฉ',
        'V': 'ฮ',
        'B': 'ฺ',
        'N': '์',
        'M': '?',
        '<': 'ฒ',
        '>': 'ฬ',
        '?': 'ฦ'
    };

    const thaiToEng = {};
    for (const key in engToThai) {
        const value = engToThai[key];
        thaiToEng[value] = key;
    }

    let convertedString = '';
    let currentWord = '';

    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i];

        // Check if the current character is a space or newline
        if (char === ' ' || char === '\n') {
            // Convert the current accumulated word
            if (currentWord.length > 0) {
                const currentLang = isThai(currentWord, engToThai) ? 'english' : 'thai';
                let convertedWord = '';
                if (currentLang === 'thai') {
                    convertedWord = convertWord(currentWord, thaiToEng);
                } else {
                    convertedWord = convertWord(currentWord, engToThai);
                }
                convertedString += convertedWord;
            }

            // Append the space or newline character to the converted string
            convertedString += char;

            // Reset the current word
            currentWord = '';
        } else {
            // Accumulate characters to form a word
            currentWord += char;
        }
    }

    // Convert the last accumulated word (if any)
    if (currentWord.length > 0) {
        const currentLang = isThai(currentWord, engToThai) ? 'english' : 'thai';
        let convertedWord = '';
        if (currentLang === 'thai') {
            convertedWord = convertWord(currentWord, thaiToEng);
        } else {
            convertedWord = convertWord(currentWord, engToThai);
        }
        convertedString += convertedWord;
    }

    return convertedString;
}

function isThai(word, dictionary) {
    // Check if all characters in the word belong to the Thai dictionary keys
    return word.split('').every(char => Object.keys(dictionary).includes(char));
}

function convertWord(word, dictionary) {
    let convertedWord = '';
    for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (dictionary[char]) {
            convertedWord += dictionary[char];
        } else {
            convertedWord += char; // Keep unchanged if not found in dictionary
        }
    }
    return convertedWord;
}

// Function to adjust textarea height based on content
function adjustTextareaHeight(textareaElement) {
    textareaElement.style.height = "auto"; // Reset height to auto
    textareaElement.style.height = (textareaElement.scrollHeight) + "px"; // Set height to scrollHeight
}

function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    mode = document.getElementById("mode")

    // Retrieve theme preference from local storage
    const currentTheme = localStorage.getItem('theme');

    // Apply stored theme preference or default to light mode
    if (!currentTheme) {
        if (mode.innerHTML === '<i class="bi bi-moon"></i>') {
            mode.innerHTML = '<i class="bi bi-sun"></i>'
            localStorage.setItem('theme', 'light');
        } else {
            mode.innerHTML = '<i class="bi bi-moon"></i>'
            localStorage.setItem('theme', 'dark');
        }
    } else {
        if (currentTheme === 'dark') {
            // element.classList.toggle('dark-mode');
            mode.innerHTML = '<i class="bi bi-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            // element.classList.toggle("dark-mode");
            mode.innerHTML = '<i class="bi bi-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
    }
}

function setInitialTheme() {
    var element = document.body;
    mode = document.getElementById("mode")
    // Retrieve theme preference from local storage
    const currentTheme = localStorage.getItem('theme');

    // Apply stored theme preference or default to light mode
    if (!currentTheme) {
        element.classList.toggle('dark-mode');
        mode.innerHTML = '<i class="bi bi-moon"></i>'
        localStorage.setItem('theme', 'dark');

    } else {
        if (currentTheme === 'dark') {
            element.classList.toggle('dark-mode');
            mode.innerHTML = '<i class="bi bi-moon"></i>';
        } else {
            element.classList.remove("dark-mode");
            mode.innerHTML = '<i class="bi bi-sun"></i>';
        }
    }
}

// Set initial theme when the document is fully loaded
document.addEventListener('DOMContentLoaded', setInitialTheme);

// Function to convert characters and display result
function convertAndDisplay() {
    const userInput = document.getElementById('input');
    const outputTextarea = document.getElementById('output');

    // Function to perform character conversion and update output textarea
    function updateOutput() {
        const convertedString = convertCharacters(userInput.value);
        outputTextarea.textContent = convertedString;
        
        // Adjust the height of input and output textareas based on content
        adjustTextareaHeight(userInput);
        adjustTextareaHeight(outputTextarea);
    }

    // Add event listeners for input and paste events
    userInput.addEventListener('input', updateOutput);
    userInput.addEventListener('paste', () => {
        // Use setTimeout to wait for pasted content to be inserted
        setTimeout(updateOutput, 0);
    });

    // Initial update when the page loads
    updateOutput();
}

// Add event listener to input textarea for real-time conversion and height adjustment
document.getElementById('input').addEventListener('input', convertAndDisplay);