function toggleTheme() {
    var body = document.body;
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
}

const paragraphs = [
    "c is a powerful programming language widely used for software development it allows for both high-level and low-level programming it supports procedural object-oriented and functional programming paradigms it's known for its efficiency and flexibility in handling system level and application level tasks its syntax can be complex yet it offers great control over hardware resources c is integral in building operating systems games browsers and various applications it continues to evolve with new features enhancing its capabilities and usability many programmers value its performance and versatility in creating diverse software solutions",
    "html is a markup language used to create and structure content on the web it provides the building blocks for web pages defining elements that display text images links and more it uses tags to designate different elements and their functionalities html is the backbone of the internet allowing for the creation of visually appealing and interactive web pages it works hand in hand with other technologies like css and javascript to enhance the presentation and functionality of web content html continues to evolve with new specifications and standards ensuring compatibility across different browsers and devices it remains a fundamental language for web development empowering creators to design engaging online experiences.",
    "assembly language is a low-level programming language it uses mnemonic codes to represent machine instructions it directly communicates with the computer's hardware it's complex and specific to different processor architectures assembly language provides a way to control hardware resources at a granular level it lacks portability but offers precise control over a system's operations assembly language is used in system programming embedded systems and device drivers it requires an understanding of computer architecture and provides insight into how computers execute instructions despite its complexity, it remains a foundational language in understanding computer internals and optimizing code for performance.",
    "mental health is an important aspect of overall well-being it encompasses emotional psychological and social well-being it affects how people think feel and act it also influences how individuals handle stress relate to others and make choices mental health is crucial at every stage of life from childhood and adolescence through adulthood untreated mental health issues can have severe consequences impacting daily life relationships and even physical health factors such as genetics environment and life experiences can contribute to mental health concerns seeking help and support when needed is vital for managing and improving mental health awareness and destigmatization are essential to encourage open conversations and access to resources for better mental health overall prioritizing mental health is fundamental for a fulfilling and balanced life.",
    "hello i hope youre doing well today im excited to share some ideas about the new website im working on its going to be a platform for speed testing typing its a simple concept but i believe it can be really useful for people to check and improve their typing skills whether its for work school or just personal development ill keep you updated on the progress and hopefully soon youll be able to try it out yourself take care",
    "once upon a time there was a flock of sheep grazing in the field they followed the lead of the old sheep who was their guide they went from pasture to pasture searching for greener grass one fine day they met a wolf who introduced himself as a friendly creature that is planned to be at peace with them sheep trustingly listened to him the wolf lured them saying let us all walk together i will show you the way to the greener pastures as soon as the wolf got them to a dark forest he unveiled his true intentions and attacked the flock the sheep in panic realized their mistake never to follow strangers again lesson learned about trust and deception the sheep went back to their grazing more wary of who they chose to follow.",
    "nature is beautiful its serene landscapes and vibrant colors always inspire me to take a moment and appreciate the world around us the sky changes its hues throughout the day from the soft pastels of sunrise to the fiery shades of sunset birds chirp in the morning as the sun rises painting the sky in hues of orange and pink flowers bloom in spring adding a splash of color to the lush greenery of the outdoors the sound of rain tapping against the window is soothing and calming it's a reminder of nature's rhythm and its ability to rejuvenate the earth trees sway gently in the wind dancing to an invisible melody animals roam freely in their habitats each with its unique charm and grace the ocean waves crashing against the shore create a mesmerizing symphony of sound and movement nature truly is a source of wonder and inspiration.",
    "technology has transformed our lives in remarkable ways it's incredible to witness how information technology has evolved over time from the advent of the internet connecting us globally to the emergence of artificial intelligence reshaping industries technology's impact on communication is profound emails and messaging apps have made instant communication possible regardless of distance the rise of social media has redefined how we connect and share information cloud computing has revolutionized data storage and accessibility making information available at our fingertips cybersecurity has become paramount in safeguarding sensitive data against threats the world of programming languages and software development continues to expand enabling innovative solutions and automation the evolution of hardware from bulky computers to sleek and powerful devices is astounding and the internet of things is integrating technology into our daily lives making our homes and cities smarter technology's influence on our world is vast and continues to shape our future.",
];

const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const tryAgainBtn = document.querySelector(".content button")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".cpm span")

let timer;
let maxTime = 120;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        console.log(char);
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);