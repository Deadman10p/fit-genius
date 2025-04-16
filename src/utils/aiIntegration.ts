import { fetchKnowledge } from './fetchData';

const knowledge = fetchKnowledge(); // Fetch the FAQ data
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const apiUrl = 'https://api.groq.com/openai/v1/chat/completions'; // Groq API endpoint
const apiKey = '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'; // Replace with your actual API key!

sendButton?.addEventListener('click', sendMessage);
userInput?.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userMessage = (userInput as HTMLInputElement)?.value.trim();
    if (userMessage) {
        displayMessage(userMessage, 'user');
        (userInput as HTMLInputElement).value = '';

        try {
            // Include knowledge.js data in the API request
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "meta-llama/llama-4-scout-17b-16e-instruct",
                    messages: [
                        { "role": "system", "content": "Use this data for context: " + JSON.stringify(knowledge) },
                        { "role": "user", "content": userMessage }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const aiMessage = data.choices[0].message.content;
            displayMessage(aiMessage, 'chatbot');

        } catch (error) {
            console.error("Error sending message to Groq:", error);
            displayMessage("Oops! Something went wrong with the AI.", 'chatbot');
        }
    }
}

function displayMessage(message: string, sender: string) {
    const messageElement = document.createElement('p');
    messageElement.classList.add(`${sender}-message`);
    messageElement.textContent = message;
    chatLog?.appendChild(messageElement);
    chatLog!.scrollTop = chatLog!.scrollHeight; // Scroll to the latest message
}
