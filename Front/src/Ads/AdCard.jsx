import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AdCard = ({ ad }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // if user is logged in

    const handleBooking = () => {
        if (!token) {
            alert("Please log in to book this ad.");
            navigate("/login");
            return;
        }

        fetch("http://localhost:8080/api/ads/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                adId: ad.id,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error || "Booking failed");
            }
            alert(`Ad "${ad.title}" has been booked successfully!`);
            navigate("/my-bookings"); // Redirect user to their bookings
        })
        .catch(error => {
            console.error("Booking failed:", error);
            alert(`Booking failed: ${error.message}`);
        });
    };

    return (
        <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200 transition-transform duration-300 hover:scale-105">
            <img 
                src={ad.image_url} 
                alt={ad.title} 
                className="w-full h-52 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-4 text-gray-900">{ad.title}</h2>
            <p className="text-gray-600 mt-2">{ad.description}</p>
            <p className="text-green-600 font-bold text-lg mt-3">€{ad.price}</p>

            {token ? (
                <button 
                    onClick={handleBooking} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-3 hover:bg-blue-600 transition-colors">
                    Book Now
                </button>
            ) : (
                <button 
                    onClick={() => navigate("/login")}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md mt-3 hover:bg-gray-600 transition-colors">
                    Login or Register to Book this Item
                </button>
            )}
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
