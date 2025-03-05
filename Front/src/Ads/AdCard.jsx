import PropTypes from "prop-types";

const AdCard = ({ ad }) => {
    const getImageSrc = () => {
        return ad.image_url && ad.image_url.startsWith("http")
            ? ad.image_url
            : "/default-image.jpg";  // Fallback if no image
    };

    return (
        <div className="bg-white p-4 shadow-md rounded-lg flex flex-col">
            <div className="w-full h-48 overflow-hidden rounded-md">
                <img 
                    src={getImageSrc()} 
                    alt={ad.title} 
                    className="w-full h-full object-cover"
                />
            </div>
            <h2 className="text-lg font-semibold mt-2">{ad.title}</h2>
            <p className="text-gray-600">{ad.description}</p>
            <p className="text-green-600 font-bold">${ad.price}</p>
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
};

export default AdCard;
