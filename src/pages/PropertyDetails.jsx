import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { deleteProperty } from "../api/properties";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineOfficeBuilding,
  HiOutlineViewGrid,
  HiLocationMarker,
} from "react-icons/hi";
import { getPropertyById } from "../api/properties";
import { MdBed, MdBathtub } from "react-icons/md";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPropertyById(id);
        setProperty(data);
      } catch (err) {
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-gray-600 text-lg">Loading property...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-red-500 text-lg">Property not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 font-poppins py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* IMAGE */}
        <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
          <img
            src={property.image_url}
            alt={property.title}
            className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {property.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
              {property.description}
            </p>

            {/* PROPERTY INFO */}
            <div className="flex flex-wrap gap-4 mt-6 text-gray-700">
              <div className="flex items-center gap-2">
                <MdBed className="text-green-500" /> {property.beds} Beds
              </div>
              <div className="flex items-center gap-2">
                <MdBathtub className="text-red-500" /> {property.baths} Baths
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineOfficeBuilding className="text-cyan-500" />{" "}
                {property.rooms} Rooms
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineViewGrid className="text-yellow-500" />{" "}
                {property.totalSquareFeet} sqft
              </div>
              <div className="flex items-center gap-2">
                <HiLocationMarker className="text-blue-500" />{" "}
                {property.location}
              </div>
            </div>

            {/* PRICE & STATUS */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-3xl font-bold text-blue-600">
                ₦{property.price}
              </p>
              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold
                  ${
                    property.status === "AVAILABLE"
                      ? "bg-green-100 text-green-700"
                      : property.status === "SOLD"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >
                {property.status}
              </span>
            </div>
          </div>

          {/* DELETE BUTTON */}
          <button
            onClick={async () => {
              const confirmDelete = window.confirm(
                "Are you sure you want to delete this property?"
              );
              if (!confirmDelete) return;

              try {
                await deleteProperty(id);
                alert("Property deleted successfully!");
                navigate("/");
              } catch (err) {
                console.error("Error deleting:", err);
                alert("Failed to delete property.");
              }
            }}
            className="mt-4 bg-red-600 text-white py-3 px-6 rounded-xl font-semibold shadow-md hover:bg-red-700 transition-all duration-300"
          >
            Delete Property
          </button>
        </div>
      </div>
    </div>
  );
}
