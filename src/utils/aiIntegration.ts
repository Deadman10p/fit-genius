import { fetchKnowledge } from '../utils/fethData';

const knowledge = fetchKnowledge(); // Fetch the FAQ data
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const apiUrl = 'https://api.groq.com/openai/v1/chat/completions'; // Groq API endpoint
const apiKey = process.env.GROQ_API_KEY || ''; // Use environment variable for API key

if (!apiKey) {
    console.error('API key is missing. Please set the GROQ_API_KEY environment variable.');
}

sendButton?.addEventListener('click', sendMessage);
userInput?.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Updated sendMessage to correctly handle and display the content field from the API response
async function sendMessage() {
    const userMessage = (userInput as HTMLInputElement)?.value.trim();
    if (userMessage) {
        displayMessage(userMessage, 'user');
        (userInput as HTMLInputElement).value = '';

        try {
            // Validate user input
            if (userMessage.length > 500) {
                throw new Error('Message is too long. Please limit your input to 500 characters.');
            }

            // Check for network connectivity
            if (!navigator.onLine) {
                throw new Error('No internet connection. Please check your network and try again.');
            }

            // Include only relevant knowledge data in the API request
            const relevantKnowledge = knowledge.filter(item => userMessage.includes(item.question));

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "meta-llama/llama-4-scout-17b-16e-instruct",
                    messages: [
                        { "role": "system", "content": "Use this data for context: " + JSON.stringify(relevantKnowledge) },
                        { "role": "user", "content": userMessage }
                    ]
                })
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized access. Please check your API key.');
                } else if (response.status === 500) {
                    throw new Error('Server error. Please try again later.');
                } else {
                    throw new Error(`Unexpected error: ${response.status}`);
                }
            }

            const data = await response.json();
            const aiMessage = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process your request.";
            displayMessage(aiMessage, 'chatbot');

        } catch (error) {
            console.error("Error sending message to Groq:", error);
            displayMessage(error.message || "Oops! Something went wrong with the AI.", 'chatbot');
        }
    }
}

function displayMessage(message: string, sender: string) {
    const messageElement = document.createElement('p');
    messageElement.classList.add(`${sender}-message`);
    messageElement.textContent = message;
    chatLog?.appendChild(messageElement);
    chatLog?.scrollTo({ top: chatLog.scrollHeight, behavior: 'smooth' }); // Improved scrolling behavior
}
