import { Link } from "react-router-dom";
import {
  HiOutlineOfficeBuilding,
  HiOutlineViewGrid,
  HiLocationMarker,
} from "react-icons/hi";
import { MdBed, MdBathtub } from "react-icons/md";

export default function PropertyCard({ property }) {
  return (
    <div className="font-poppins rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 overflow-hidden group">
      {/* IMAGE */}
      <div className="h-56 w-full overflow-hidden relative">
        <img
          src={property.image_url}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md
    ${property.status === "AVAILABLE" ? "bg-linear-to-r from-green-500 to-cyan-500" : ""}
    ${property.status === "SOLD" ? "bg-red-500" : ""}
    ${property.status === "PENDING" ? "bg-yellow-500" : ""}
    text-white
  `}
        >
          {property.status}
        </span>
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
              <HiOutlineOfficeBuilding className="" />
              <span>{property.rooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <MdBed className="" />
              <span>{property.beds}</span>
            </div>
            <div className="flex items-center gap-1">
              <MdBathtub className="" />
              <span>{property.baths}</span>
            </div>
            <div className="flex items-center gap-1">
              <HiOutlineViewGrid className="" />
              <span>{property.totalSquareFeet}sqft</span>
            </div>
          </div>
        </div>

        {/* PRICE & LOCATION */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold text-green-600">₦{property.price}</p>
          <p className="text-sm flex items-center text-gray-500 italic">
            <HiLocationMarker />
            {property.location}
          </p>
        </div>

        {/* BUTTON */}
        <Link
          to={`/properties/${property.id}`}
          className="block w-full text-center mt-5 py-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-cyan-500 transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
