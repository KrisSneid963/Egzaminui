import React, { useEffect, useState } from "react";
import { fetchAds } from "../helpers/api";  
import AdCard from "./AdCard";

const AdsPage = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    async function loadAds() {
      const adsData = await fetchAds();
      setAds(adsData);
    }
    loadAds();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Latest Ads</h1>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        padding: "20px"
      }}>
        {ads.length > 0 ? (
          ads.map(ad => <AdCard key={ad.id} ad={ad} />) 
        ) : (
          <p style={{ textAlign: "center" }}>No ads available</p>
        )}
      </div>
    </div>
  );
};

export default AdsPage;
