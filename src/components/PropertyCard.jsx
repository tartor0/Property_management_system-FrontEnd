import { Link } from "react-router-dom";
import {
  HiOutlineOfficeBuilding,
  HiOutlineViewGrid,
  HiLocationMarker,
} from "react-icons/hi";
import { MdBed, MdBathtub } from "react-icons/md";

export default function PropertyCard({ property }) {
  // Get the first image from the imageUrls array, or use a placeholder
  const imageUrl = property.imageUrls && property.imageUrls.length > 0 
    ? property.imageUrls[0] 
    : "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <div className="font-poppins rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 overflow-hidden group">
      {/* IMAGE */}
      <div className="h-56 w-full overflow-hidden relative">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md text-white
            ${property.status === "Available" ? "bg-gradient-to-r from-green-500 to-cyan-500" : ""}
            ${property.status === "Sold" ? "bg-red-500" : ""}
            ${property.status === "Pending" ? "bg-yellow-500" : ""}
          `}
        >
          {property.status}
        </span>

        {/* Show image count badge if multiple images */}
        {property.imageUrls && property.imageUrls.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
            📷 {property.imageUrls.length}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6 bg-gray-800 dark:bg-gray-900 transition-colors">
        <h3 className="text-xl font-bold font-poppins-med text-gray-500 dark:text-white">
          {property.title}
        </h3>

        {/* PROPERTY INFO */}
        <div className="flex justify-between items-center mt-4 text-gray-500 dark:text-gray-300">
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <HiOutlineOfficeBuilding />
              <span>{property.rooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <MdBed />
              <span>{property.beds}</span>
            </div>
            <div className="flex items-center gap-1">
              <MdBathtub />
              <span>{property.baths}</span>
            </div>
            <div className="flex items-center gap-1">
              <HiOutlineViewGrid />
              <span>{property.totalSquareFeet} sqft</span>
            </div>
          </div>
        </div>

        {/* PRICE & LOCATION */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold text-green-600">₦{property.price}</p>
          <p className="text-sm flex items-center gap-1 text-gray-500 italic">
            <HiLocationMarker />
            {property.location}
          </p>
        </div>

        {/* BUTTON */}
        <Link
          to={`/properties/${property.id}`}
          className="block w-full text-center mt-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-cyan-500 transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}