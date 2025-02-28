import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AdsList = () => {
    const [ads, setAds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/api/ads") 
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched Ads:", data);
                setAds(data);
            })
            .catch((error) => console.error("Error fetching ads:", error));
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Latest Ads</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ads.length > 0 ? (
                    ads.map((ad) => <AdCard key={ad.id} ad={ad} navigate={navigate} />)
                ) : (
                    <p>No ads available</p>
                )}
            </div>
        </div>
    );
};

const AdCard = ({ ad, navigate }) => {
    const [imageError, setImageError] = useState(false);

    const handleView = () => {
        navigate(`/ads/${ad.id}`);
    };

    const getImageSrc = () => {
        if (imageError) {
            return "`http://localhost:8080/${ad.image_url}`"; 
        }
    };
       
   

    return (
        <div className="bg-white p-4 shadow-md rounded-lg">
            <img
                src={getImageSrc()}
                alt={ad.title}
                className="w-full h-40 object-cover rounded-md"
                onError={() => setImageError(true)}
            />
            <h3 className="text-lg font-semibold mt-2">{ad.title}</h3>
            <p className="text-gray-600">{ad.description}</p>
            <p className="text-green-600 font-bold">${ad.price}</p>
            <button 
                onClick={handleView} 
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600">
                View Details
            </button>
        </div>
    );
};

AdCard.propTypes = {
    ad: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image_url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
    navigate: PropTypes.func.isRequired,
};

export default AdsList;
