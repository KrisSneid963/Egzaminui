const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export async function fetchAds() {
    try {
        console.log("Fetching ads from:", `${API_URL}/ads`);
        const response = await fetch(`${API_URL}/ads`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Ads:", data);  
        return data;
    } catch (error) {
        console.error("Error fetching ads:", error);
        return [];
    }
}
