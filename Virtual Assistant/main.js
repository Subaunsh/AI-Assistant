// ================== ELEMENTS ==================
const btn = document.querySelector("#btn");
const output = document.querySelector("#outputBox");

// History Elements
const historyBtn = document.getElementById("historyBtn");
const historyPanel = document.getElementById("historyPanel");
const closeHistory = document.getElementById("closeHistory");

// ================== RESPONSE HANDLER ==================
function respond(userMessage, responseText) {
    const finalText = "Nova: " + responseText;

    output.innerText = finalText;
    speak(responseText);

    saveToHistory(userMessage, finalText);
}

// ================== HISTORY ==================
function saveToHistory(question, answer) {
    let history = JSON.parse(localStorage.getItem("chatHistory")) || [];

    history.push({ question, answer });

    // Limit history to 50 items
    if (history.length > 50) {
        history.shift();
    }

    localStorage.setItem("chatHistory", JSON.stringify(history));
}

function loadHistory() {
    const historyContent = document.getElementById("historyContent");
    let history = JSON.parse(localStorage.getItem("chatHistory")) || [];

    historyContent.innerHTML = "";

    if (history.length === 0) {
        historyContent.innerHTML = "<p>No history yet...</p>";
        return;
    }

    history.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("history-item");

        div.innerHTML = `
            <strong>You:</strong> ${item.question}<br>
            <strong>Nova:</strong> ${item.answer}
        `;

        historyContent.appendChild(div);
    });
}

function clearHistory() {
    localStorage.removeItem("chatHistory");
    loadHistory();
}

// ================== HISTORY PANEL ==================
historyBtn.addEventListener("click", () => {
    historyPanel.classList.add("active");
    loadHistory();
});

closeHistory.addEventListener("click", () => {
    historyPanel.classList.remove("active");
});

// ================== TEXT TO SPEECH ==================
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);

    function setVoice() {
        const voices = speechSynthesis.getVoices();

        const femaleVoice = voices.find(voice =>
            voice.name.toLowerCase().includes("female") ||
            voice.name.toLowerCase().includes("zira") ||
            voice.name.toLowerCase().includes("samantha") ||
            voice.name.toLowerCase().includes("google")
        );

        if (femaleVoice) utterance.voice = femaleVoice;

        utterance.rate = 1.1;
        utterance.pitch = 1.5;
        utterance.lang = "en-IN";

        speechSynthesis.speak(utterance);
    }

    if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.onvoiceschanged = setVoice;
    } else {
        setVoice();
    }
}

// ================== WISH ==================
function wishMe() {
    const hours = new Date().getHours();

    if (hours < 12) {
        speak("Good Morning Sir. How may I help you today?");
    } else if (hours < 16) {
        speak("Good Afternoon Sir. How may I help you today?");
    } else {
        speak("Good Evening Sir. How may I help you today?");
    }
}

// ================== SPEECH RECOGNITION ==================
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Use Chrome browser for speech recognition");
}

const recognition = new SpeechRecognition();
recognition.lang = "en-IN";

btn.addEventListener("click", () => {
    recognition.start();
    output.innerText = "Listening...";
});

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    output.innerText = "You: " + transcript;
    takeCommand(transcript.toLowerCase());
};

// ================== COMMAND HANDLER ==================
function takeCommand(message) {
    // ================== NORMAL COMMANDS ==================


    if (message.includes("how are you")) {
        const response = "Nova: I am fine sir, thank you for asking. How can I assist you today?";
        output.innerText = response;
        respond(message, "I am fine sir, thank you for asking. How can I assist you today?");
        
    }

    else if (message.includes("who are you") || message.includes("what is your name")) {
        const response = "Nova: I am Nova, your personal assistant, created by Parth Shinde.";
        output.innerText = response;
        respond(message, "I am Nova, your personal assistant, created by Parth Shinde.");
    }
    else if (message.includes("who created you")) {
        const response = "Nova: I am created by the students of universal collage of engineering. studing in second year. i have been created as their mini project.";
        output.innerText = response;
        respond(message, "I am created by the students of universal collage of engineering. studing in second year. i have been created as their mini project.");
    }
















    // ===== TIME & DATE =====
    else if (message.includes("time")) {
        const time = new Date().toLocaleTimeString();
        respond(message, time);
        output.innerText = "Nova: " + time;
    }

    else if (message.includes("date")) {
        const date = new Date().toDateString();
        respond(message, date);
        output.innerText = "Nova: " + date;
    }

    else if (message.includes("weather") || message.includes("temperature")) {
        respond(message, "Temperature is around 34°C. Weather is sunny. the wind is flowing at the speed of 8 kilometer per hour form north to west.");
        output.innerText = "Nova: Temperature is around 34°C. Weather is sunny. the wind is flowing at the speed of 8 kilometer per hour form north to west.";
    }















    // ===== OPEN WEBSITES =====
    // Apps Commands 
    else if (
        message.includes("open youtube") || 
        message.includes("open my youtube account") ||
        message.includes("open my youtube profile")
    ) { 
        output.innerText = "Nova: Connecting you to YouTube… sit back and relax.";
        respond(message, "Connecting you to YouTube… sit back and relax."); 
        window.open("https://www.youtube.com", "_blank"); 
    } 
    else if (
        message.includes("open instagram") || 
        message.includes("open my instagram account") ||
        message.includes("open my instagram profile")
    ) {
        output.innerText = "Nova: Redirecting you to Instagram… let’s explore!"; 
        respond(message, "Redirecting you to Instagram… let’s explore!");
        window.open("https://www.instagram.com", "_blank"); 
    } 
    else if (message.includes("open facebook")) {
        output.innerText = "Nova: Taking you to Facebook… let’s see what’s happening!"; 
        respond(message, "Taking you to Facebook… let’s see what’s happening!"); 
        window.open("https://www.facebook.com", "_blank"); 
    } 
    else if (message.includes("open google")) { 
        output.innerText = "Nova: Taking you to Google… let’s find what you need!";
        respond(message, "Taking you to Google… let’s find what you need!");
        window.open("https://www.google.com", "_blank"); 
    } 
    else if (message.includes("open whatsapp")) { 
        output.innerText = "Nova: Redirecting you to WhatsApp… stay connected!";
        respond(message, "Taking you to WhatsApp… stay connected!");
        window.open("https://web.whatsapp.com", "_blank"); 
    } 
    else if (
        message.includes("open linkedin") || 
        message.includes("open my linkedin account") ||
        message.includes("open my linkedin profile")
    ) { 
        output.innerText = "Nova: Redirecting you to LinkedIn… let’s grow your network!";
        respond(message, "Taking you to Linkedin stay connected!");
        window.open("https://linkedin.com", "_blank"); 
    } 
    else if (
        message.includes("open github") || 
        message.includes("open my github account") ||
        message.includes("open my github profile")
    ) { 
        output.innerText = "Nova: Connecting you to GitHub… let’s build something amazing!"; 
        respond(message, "Connecting you to GitHub… let’s build something amazing!");
        window.open("https://github.com", "_blank"); 
    } 
    else if (message.includes("open bing")) { 
        output.innerText = "Nova: Taking you to Bing… let’s explore the web!";
        respond(message, "Taking you to Bing… let’s explore the web!");
        window.open("https://www.bing.com", "_blank"); 
    } 
    else if (message.includes("open duckduckgo")) {
        output.innerText = "Nova: Taking you to DuckDuckGo… search privately and safely!"; 
        respond(message, "Taking you to DuckDuckGo… search privately and safely!"); 
        window.open("https://duckduckgo.com", "_blank"); 
    } 
    else if (
        message.includes("open netflix") || 
        message.includes("open my netflix account") ||
        message.includes("open my netflix profile")
    ) { 
        output.innerText = "Nova: Taking you to Netflix… enjoy your show!"; 
        respond(message, "Taking you to Netflix… enjoy your show!");
        window.open("https://www.netflix.com", "_blank"); 
    } 
    else if (
        message.includes("open spotify") || 
        message.includes("open my spotify account") ||
        message.includes("open my spotify profile")
    ) { 
        output.innerText = "Nova: Connecting you to Spotify… let the music play!";
        respond(message, "Connecting you to Spotify… let the music play!");
        window.open("https://spotify.com", "_blank"); 
    } 
    else if (message.includes("open chatgpt")) { 
        output.innerText = "Nova: Redirecting you to ChatGPT… let’s explore ideas together!";
        respond(message, "Redirecting you to ChatGPT… let’s explore ideas together!");
        window.open("https://chat.openai.com", "_blank"); 
    }
















        // Opening inbuilt Apps 
    else if (message.includes("open calculator")) {

        let responseText = "Nova: Opening Calculator… ready for your calculations!";

        output.innerText = responseText;
        respond(message, "Opening Calculator… ready for your calculations!");

        window.open("ms-calculator:");
    } 
    else if (message.includes("open settings")) {

        let responseText = "Nova: Opening Settings… adjust your preferences!";

        output.innerText = responseText;
        respond(message, "Opening Settings… adjust your preferences!");

        window.open("ms-settings:");
    }

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        // Opening Shopping Apps 
    else if (message.includes("amazon")) {

        let query = message
            .replace("search on amazon about", "")
            .replace("on amazon", "")
            .replace("amazon", "")
            .trim();

        if (query.length > 0) {

            let responseText = `Nova: Taking you to Amazon… exploring ${query}!`;

            output.innerText = responseText;
            respond(message, `Taking you to Amazon… exploring ${query}`);

            window.open(`https://www.amazon.in/s?k=${query}`, "_blank");

        } else {

            let responseText = "Nova: Taking you to Amazon… happy shopping!";

            output.innerText = responseText;
            respond(message, "Taking you to Amazon… happy shopping!");

            window.open("https://www.amazon.in", "_blank");
        }
    } 

    else if (message.includes("flipkart")) {
 
        let query = message
            .replace("search on flipkart about", "")
            .replace("on flipkart", "")
            .replace("flipkart", "")
            .trim();

        if (query.length > 0) {

            let responseText = `Nova: Taking you to Flipkart… exploring ${query}!`;

            output.innerText = responseText;
            respond(message, `Taking you to Flipkart… exploring ${query}`);

            window.open(`https://www.flipkart.com/search?q=${query}`, "_blank");

        } else {

            let responseText = "Nova: Taking you to Flipkart… happy shopping!";

            output.innerText = responseText;
            respond(message, "Taking you to Flipkart… happy shopping!");

            window.open("https://www.flipkart.com", "_blank");
        }
    }





    // Opening Food Delivery Apps 
    else if (message.includes("zomato")) {

        let query = message
            .replace("search on zomato about", "")
            .replace("on zomato", "")
            .replace("zomato", "")
            .trim();

        if (query.length > 0) {

            let responseText = `Nova: Taking you to Zomato… exploring ${query}!`;

            output.innerText = responseText;
            respond(message, `Taking you to Zomato… exploring ${query}`);

            window.open(`https://www.zomato.in/s?k=${query}`, "_blank");

        } else {

            let responseText = "Nova: Taking you to Zomato… happy shopping!";

            output.innerText = responseText;
            respond(message, "Taking you to Zomato… happy shopping!");

            window.open("https://www.zomato.in", "_blank");
        }
    } 

    else if (message.includes("swiggy")) {

        let query = message
            .replace("search on swiggy about", "") 
            .replace("on swiggy", "")
            .replace("swiggy", "")
            .trim();

        if (query.length > 0) {

            let responseText = `Nova: Taking you to swiggy… exploring ${query}!`;

            output.innerText = responseText;
            respond(message, `Taking you to swiggy… exploring ${query}`);

            window.open(`https://www.swiggy.com/search?q=${query}`, "_blank");

        } else {

            let responseText = "Nova: Taking you to swiggy… happy shopping!";

            output.innerText = responseText;
            respond(message, "Taking you to swiggy… happy shopping!");

            window.open("https://www.swiggy.com", "_blank");
        }
    }















        // Info about anything 
    else if (
        message.includes("who is") ||
        message.includes("tell me about") ||
        message.includes("give me information about") ||
        message.includes("inform me about") ||
        message.includes("search about") ||
        message.includes("i want to know") ||
        message.includes("who is") ||
        message.includes("where did") ||
        message.includes("when did") ||
        message.includes("when and where") ||
        message.includes("where and when")
    ) {

        let query = message
            .replace("who is", "")
            .replace("tell me about", "")
            .replace("give me information about", "")
            .replace("inform me about", "")
            .replace("search about", "")
            .replace("i want to know", "")
            .replace("who is", "")
            .replace("where did", "")
            .replace("when did", "")
            .replace("when and where", "")
            .replace("where and when", "")
            .trim();           

        if (query.length > 0) {

            let responseText = `Nova: Accessing information about ${query}...`;

            output.innerText = responseText;
            respond(message, `Accessing information about ${query}...`);

            window.open(`https://www.google.com/search?q=${query}`, "_blank");

            // Optional: Call custom function (if you defined it)
            if (typeof getPersonInfo === "function") {
                getPersonInfo(query);
            }

        } else {
            output.innerText = "Nova: I did not understand";
            respond(message, "I did not understand");
        }
    }





        // YouTube Search Feature
    else if (
        message.includes("search on youtube") ||
        message.includes("on youtube") ||
        message.includes("youtube") 
    ) {

        let query = message
            .replace("search on youtube", "")
            .replace("on youtube", "")
            .replace("youtube", "")
            .trim();

        if (query.length > 0) {

            let responseText = `Nova: Searching ${query} on YouTube...`;

            output.innerText = responseText;
            respond(message, `Searching ${query} on YouTube`);

            window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");

        } else {

            let responseText = "Nova: Opening YouTube...";

            output.innerText = responseText;
            respond(message, "Opening YouTube");

            window.open("https://www.youtube.com", "_blank");
        }
    }   





        // Open ChatGPT and search directly
    else if (
        message.includes("search on chat g p t") ||
        message.includes("ask chat g p t ") ||
        message.includes("chat g p t")
    ) {

        let query = message
            .replace("search on chat g p t", "")
            .replace("ask chat g p t", "")
            .replace("chat g p t", "")
            .trim();

        if (query.length > 0) {

            let responseText = `Nova: Searching about ${query} on ChatGPT...`;

            output.innerText = responseText;
            respond(message, `Searching ${query} on ChatGPT`);

            // Open ChatGPT with query
            window.open(`https://chat.openai.com/?q=${encodeURIComponent(query)}`, "_blank");

        } else {

            let responseText = "Nova: Opening ChatGPT for you...";

            output.innerText = responseText;
            respond(message, "Opening ChatGPT for you");

            window.open("https://chat.openai.com", "_blank");
        }
    }





        // ✉️ Email Writing Feature 
    else if (message.includes("leave") || message.includes("personal")) {

        let responseText = "Nova: Sure, I am writing an email for you...";
        output.innerText = responseText;
        respond(message, "Sure, I am writing an email for you");

        let emailText = `Subject: Request for Leave

    Dear Sir/Madam,
    I hope you are doing well. I would like to request leave due to personal reasons. Kindly grant me leave for the required days.

    Thank you for your understanding.

    Sincerely,
    [Your Name]`;

        // Show email in output box
        setTimeout(() => {
            output.innerText = emailText;
            respond(message, "Your email is ready. You can edit or copy it.");
        }, 1500);
    } 

    else if (message.includes("sick")) {

        let responseText = "Nova: Sure, I am writing an email for you...";
        output.innerText = responseText;
        respond(message, "Sure, I am writing an email for you");

        let emailText = `Subject: Request for Sick Leave

    Dear Sir/Madam,
    I hope you are doing well. I am writing to inform you that I am not feeling well and would like to request sick leave for today. I will make sure to resume my work as soon as I recover.

    Kindly grant me leave for the mentioned day.

    Thank you for your understanding.

    Sincerely,
    [Your Name]`;

        // Show email in output box
        setTimeout(() => {
            output.innerText = emailText;
            respond(message, "Your email is ready. You can edit or copy it.");
        }, 1500);
    }





        // ===== EXIT =====
        else if (message.includes("bye")) {
            respond(message, "Goodbye sir");
            output.innerText = "Nova: Goodbye sir";
        }

        // ===== DEFAULT =====
        else {
            respond(message, "Sorry, I did not understand"); 
            output.innerText = "Nova: Sorry, I did not understand";
        }
}

// ================== LOAD ==================
window.addEventListener("load", () => {
    wishMe();
    loadHistory();
});