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
        <main className="container mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Latest Ads</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {ads.length > 0 ? (
                    ads.map((ad) => <AdCard key={ad.id} ad={ad} />)
                ) : (
                    <p className="text-center text-gray-500 col-span-full">No ads available</p>
                )}
            </div>
        </main>
    );
};

export default AdsPage;
