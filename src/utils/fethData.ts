// Import the knowledge data from the knowledge.js file
import knowledge from '../data/knowledge';

/**
 * Fetch stored knowledge data
 * @returns The knowledge data from knowledge.js
 */
export function fetchStoredData(): any {
    try {
        // Return the imported knowledge data
        return knowledge;
    } catch (error) {
        console.error("Error fetching stored data:", error);
        throw error;
    }
}
