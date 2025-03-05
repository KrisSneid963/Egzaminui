import { useEffect, useState } from "react";
import AdCard from "./AdCard";

const AdsPage = () => {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/ads")
            .then(response => response.json())
            .then(data => setAds(data))
            .catch(error => console.error("Error fetching ads:", error));
    }, []);

    return (
        <main className="container mx-auto p-6">
            <h2 className="text-xl font-bold mb-4">Latest Ads</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ads.length > 0 ? (
                    ads.map((ad) => <AdCard key={ad.id} ad={ad} />)
                ) : (
                    <p>No ads available</p>
                )}
            </div>
        </main>
    );
};

export default AdsPage;
