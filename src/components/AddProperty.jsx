import { useState } from "react";

export default function AddProperty() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    status: "AVAILABLE",
    image_url: "",
    location: "",
    beds: "",
    baths: "",
    rooms: "",
    totalSquareFeet: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/v1/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Property Added Successfully!");
      } else {
        alert("Failed to Add Property");
      }
    } catch (error) {
      console.error(error);
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
              onChange={handleChange}
              className="cool-input bg-white p-2 rounded shadow-lg border"
            />

            <input
              name="price"
              placeholder="Price"
              onChange={handleChange}
              className="cool-input  bg-white p-2 shadow-lg rounded border"
            />
          </div>

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="cool-input h-32 bg-white p-3 shadow-lg rounded-lg border w-full"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="image_url"
              placeholder="Image URL"
              onChange={handleChange}
              className="cool-input bg-white p-3 shadow-lg rounded-lg border w-full"
            />

            <input
              name="location"
              placeholder="Location"
              onChange={handleChange}
              className="cool-input bg-white p-3 shadow-lg rounded-lg border w-full"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <input
              name="beds"
              type="number"
              placeholder="Beds"
              onChange={handleChange}
              className="cool-input  bg-white p-2 shadow-lg rounded border"
            />

            <input
              name="baths"
              type="number"
              placeholder="Baths"
              onChange={handleChange}
              className="cool-input  bg-white p-2 shadow-lg rounded border"
            />

            <input
              name="rooms"
              type="number"
              placeholder="Rooms"
              onChange={handleChange}
              className="cool-input  bg-white p-2 shadow-lg rounded border"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="totalSquareFeet"
              type="number"
              placeholder="Square Feet"
              onChange={handleChange}
              className="cool-input  bg-white shadow-lg p-2 rounded border"
            />

            <select
              name="status"
              onChange={handleChange}
              className="cool-input border p-2 rounded"
            >
              <option value="AVAILABLE">Available</option>
              <option value="SOLD">Sold</option>
            </select>
          </div>

          <button className="w-full py-3 bg-cyan-600 hover:cursor-pointer text-white rounded-xl font-semibold shadow-lg hover:bg-cyan-700 transition-all text-lg">
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
}
