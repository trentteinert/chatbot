// input options
// output options

const messages = {
  utterances: [
    ["how are you", "how is life", "how are things"],
    ["hi", "hey", "yo", "hello", "good morning", "good afternoon"],
    ["what are you doing", "what is going on", "what is up", "sup"],
    ["how old are you", "what is your age"],
    [
      "what are you",
      "who are you",
      "are you human",
      "are you bot",
      "are you human or bot",
    ],
    ["who created you", "who made you"],

    [
      "your name please",
      "your name",
      "may i know your name",
      "what is your name",
      "what call yourself",
    ],
    ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
    ["bad", "bored", "tired"],
    ["help me", "tell me story", "tell me joke"],
    ["ah", "yes", "ok", "okay", "nice"],
    ["bye", "good bye", "goodbye", "see you later"],
    ["what should i eat today"],
    ["what", "why", "how", "where", "when"],
    ["no", "not sure", "maybe", "no thanks"],
    [""],
    ["haha", "ha", "lol", "hehe", "funny", "joke"],
  ],
  answers: [
    [
      "Can't complain, how are you?",
      "Pretty well, how are you?",
      "Terrible, how are you?",
    ],
    ["Hello!", "Hi!", "Hola", "yo"],
    [
      "Chillin",
      "About to go to sleep",
      "take a guess",
      "nothing at all, dont both me.",
    ],
    ["I am 23 years young"],
    ["Me es bot", "I am a cheeky bot. What are you?"],
    ["I was made by trent."],
    ["name = undefined", "I don't have a name"],
    ["Good! im glad.", "Glad to hear it"],
    ["Why?", "Why? You shouldn't!", "What's wrong?"],
    ["What about?", "On what?", "About what?"],
    ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
    ["Bye", "Goodbye", "Later"],
    ["Pizza", "Burger", "Wings"],
    ["Great question", "Hmm... I don't Know"],
    ["That's ok", "What do you want to talk about?"],
    [">:("],
    ["Haha!", "Good one!", "not funny..."],
  ],
  alternatives: ["Go on...", "What do you mean?"],
};

//looks for enter
const inputField = document.getElementById("input");
inputField.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    let input = inputField.value;
    inputField.value = "";
    output(input);
  }
});

//compares the arrays inside messages obj.
function compare(utterancesArray, answersArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < utterancesArray.length; x++) {
    for (let y = 0; y < utterancesArray[x].length; y++) {
      if (utterancesArray[x][y] === string) {
        let replies = answersArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break;
      }
    }
    if (replyFound) {
      break;
    }
  }
  return reply;
}

//DOM manipulations
function addChatEntry(input, product) {
  const messagesContainer = document.getElementById("messages");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);

  messagesContainer.scrollTop =
    messagesContainer.scrollHeight - messagesContainer.clientHeight;

  setTimeout(() => {
    botText.innerText = `${product}`;
  }, 2000);
}

//takes input and decides what output
function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  text = text
    .replace(/ a /g, " ")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  if (compare(messages.utterances, messages.answers, text)) {
    // Search for exact match in triggers
    product = compare(messages.utterances, messages.answers, text);
  } else {
    product =
      messages.alternatives[
        Math.floor(Math.random() * messages.alternatives.length)
      ];
  }
  // tells the following func what to change in DOM and runs.
  addChatEntry(input, product);
}
