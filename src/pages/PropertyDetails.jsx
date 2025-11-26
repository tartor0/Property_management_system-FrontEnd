import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { deleteProperty, getPropertyById } from "../api/properties";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineOfficeBuilding,
  HiOutlineViewGrid,
  HiLocationMarker,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { MdBed, MdBathtub } from "react-icons/md";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleDelete = async () => {
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
  };

  const nextImage = () => {
    if (property.imageUrls && property.imageUrls.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === property.imageUrls.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property.imageUrls && property.imageUrls.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.imageUrls.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading property...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-2xl font-bold mb-4">Property not found</p>
          <Link 
            to="/" 
            className="text-cyan-600 hover:underline"
          >
            ← Back to properties
          </Link>
        </div>
      </div>
    );
  }

  // Get images or use placeholder
  const images = property.imageUrls && property.imageUrls.length > 0 
    ? property.imageUrls 
    : ["https://via.placeholder.com/800x600?text=No+Image"];

  const currentImage = images[currentImageIndex];

  return (
    <div className="max-w-7xl mx-auto px-5 font-poppins py-10">
      {/* Back Button */}
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6 font-semibold"
      >
        <HiChevronLeft className="text-xl" />
        Back to Properties
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        {/* IMAGE CAROUSEL */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 group">
            <img
              src={currentImage}
              alt={`${property.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-96 object-cover"
            />

            {/* Navigation Arrows (only show if multiple images) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
                >
                  <HiChevronLeft className="text-2xl" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
                >
                  <HiChevronRight className="text-2xl" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}

            {/* Status Badge */}
            <span
              className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-semibold shadow-lg text-white
                ${property.status === "Available" ? "bg-gradient-to-r from-green-500 to-cyan-500" : ""}
                ${property.status === "Sold" ? "bg-red-500" : ""}
                ${property.status === "Pending" ? "bg-yellow-500" : ""}
              `}
            >
              {property.status}
            </span>
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? "border-cyan-600 shadow-lg scale-105"
                      : "border-gray-300 hover:border-cyan-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {property.title}
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
              {property.description || "No description available."}
            </p>

            {/* PROPERTY INFO */}
            <div className="grid grid-cols-2 gap-4 mt-6 text-gray-700">
              <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
                <MdBed className="text-cyan-600 text-xl" /> 
                <span className="font-semibold">{property.beds} Beds</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
                <MdBathtub className="text-cyan-600 text-xl" /> 
                <span className="font-semibold">{property.baths} Baths</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
                <HiOutlineOfficeBuilding className="text-cyan-600 text-xl" />
                <span className="font-semibold">{property.rooms} Rooms</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
                <HiOutlineViewGrid className="text-cyan-600 text-xl" />
                <span className="font-semibold">{property.totalSquareFeet} sqft</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mt-4 text-gray-700 bg-blue-50 p-4 rounded-lg">
              <HiLocationMarker className="text-blue-600 text-2xl" />
              <span className="font-semibold text-lg">{property.location}</span>
            </div>

            {/* PRICE */}
            <div className="mt-6">
              <p className="text-4xl font-bold text-green-600">
                ₦{parseInt(property.price).toLocaleString()}
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mt-8">
            <Link
              to={`/edit-property/${id}`}
              className="flex-1 text-center bg-cyan-600 text-white py-3 px-6 rounded-xl font-semibold shadow-md hover:bg-cyan-700 transition-all duration-300"
            >
              Edit Property
            </Link>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white py-3 px-6 rounded-xl font-semibold shadow-md hover:bg-red-700 transition-all duration-300"
            >
              Delete Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}