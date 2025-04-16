// Import the FAQ data from knowledge.js
import { faq } from '../data/knowledge';

/**
 * Fetch the FAQ data from knowledge.js
 * @returns The FAQ data array
 */
export function fetchKnowledge(): Array<{ question: string; answer: string; tags: string[]; references?: string[] }> {
    try {
        // Return the imported FAQ data
        return faq;
    } catch (error) {
        console.error("Error fetching knowledge data:", error);
        throw error;
    }
}
