
/**
 * Utility for making calls to the Perplexity AI API
 */

// Function to fetch answers from Perplexity
export const getPerplexityResponse = async (message: string, apiKey: string) => {
  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a friendly fitness assistant named FitBot. Respond in a conversational, helpful manner. Give specific, knowledgeable advice about fitness, nutrition, and wellness. Keep your responses concise but informative.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
        return_images: false,
        return_related_questions: true,
        search_domain_filter: ['fitness', 'nutrition', 'health'],
        frequency_penalty: 0.5,
        presence_penalty: 0.3
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching from Perplexity:', error);
    return null;
  }
};
