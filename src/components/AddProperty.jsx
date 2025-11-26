import { useState } from "react";
import { createProperty } from "../api/properties"; // Import your API function

export default function AddProperty() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    status: "Available",
    location: "",
    beds: "",
    baths: "",
    rooms: "",
    totalSquareFeet: "",
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Remove selected image
  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare FormData
      const formData = new FormData();

      // Add property data as JSON string
      const propertyData = {
        title: form.title,
        description: form.description,
        price: form.price,
        status: form.status,
        location: form.location,
        beds: parseInt(form.beds) || 0,
        baths: parseInt(form.baths) || 0,
        rooms: parseInt(form.rooms) || 0,
        totalSquareFeet: parseInt(form.totalSquareFeet) || 0,
      };

      formData.append("property", JSON.stringify(propertyData));

      // Add images
      images.forEach((image) => {
        formData.append("images", image);
      });

      // Send request
      const response = await fetch("http://localhost:8080/api/v1/properties", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert("Property Added Successfully!");
        console.log("Created property:", result);

        // Reset form
        setForm({
          title: "",
          description: "",
          price: "",
          status: "Available",
          location: "",
          beds: "",
          baths: "",
          rooms: "",
          totalSquareFeet: "",
        });
        setImages([]);
        setImagePreviews([]);
      } else {
        const error = await response.json();
        alert(`Failed to Add Property: ${error.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex justify-center items-center px-4 py-12 font-poppins">
      <div className="w-full max-w-3xl p-10 rounded-3xl shadow-xl bg-gray-200">
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-8">
          Add New Property
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="title"
              placeholder="Property Title"
              value={form.title}
              onChange={handleChange}
              required
              className="cool-input bg-white p-2 rounded shadow-lg border"
            />

            <input
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
              className="cool-input bg-white p-2 shadow-lg rounded border"
            />
          </div>

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="cool-input h-32 bg-white p-3 shadow-lg rounded-lg border w-full"
          />

          {/* IMAGE UPLOAD - THIS IS THE IMPORTANT PART! */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">
              Property Images
            </label>
            
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-cyan-50 file:text-cyan-700
                hover:file:bg-cyan-100 file:cursor-pointer"
            />

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
            className="cool-input bg-white p-3 shadow-lg rounded-lg border w-full"
          />

          <div className="grid md:grid-cols-3 gap-6">
            <input
              name="beds"
              type="number"
              placeholder="Beds"
              value={form.beds}
              onChange={handleChange}
              className="cool-input bg-white p-2 shadow-lg rounded border"
            />

            <input
              name="baths"
              type="number"
              placeholder="Baths"
              value={form.baths}
              onChange={handleChange}
              className="cool-input bg-white p-2 shadow-lg rounded border"
            />

            <input
              name="rooms"
              type="number"
              placeholder="Rooms"
              value={form.rooms}
              onChange={handleChange}
              className="cool-input bg-white p-2 shadow-lg rounded border"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="totalSquareFeet"
              type="number"
              placeholder="Square Feet"
              value={form.totalSquareFeet}
              onChange={handleChange}
              className="cool-input bg-white shadow-lg p-2 rounded border"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="cool-input border p-2 rounded"
            >
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-xl font-semibold shadow-lg transition-all text-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-cyan-600 hover:bg-cyan-700 hover:cursor-pointer"
            }`}
          >
            {loading ? "Adding Property..." : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
}