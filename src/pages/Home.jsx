import { useEffect, useState } from "react";
import { getAllProperties } from "../api/properties";
import PropertyCard from "../components/PropertyCard";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL"); // "ALL", "AVAILABLE", "SOLD"

  useEffect(() => {
    const fetchProps = async () => {
      try {
        const data = await getAllProperties();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProps();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  useEffect(() => {
    if (statusFilter === "ALL") {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(
        properties.filter((p) => p.status === statusFilter)
      );
    }
  }, [statusFilter, properties]);

  return (
    <div className="w-full min-h-screen bg-gray-700">
      {/* HERO SECTION */}
      <section className="bg-gray-700 pt-20 text-center font-poppins pb-24 px-6 md:px-16 lg:px-32">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <h1
            className="text-4xl md:text-7xl font-bold font-poppins-med text-gray-900 leading-tight"
            data-aos="fade-up"
          >
            Discover Your Next
            <span className="text-cyan-500" data-aos="fade-up">
              {" "}
              Perfect Property
            </span>
          </h1>

          <p
            className="mt-4 text-lg text-gray-400"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Browse through available properties and find the one that suits your
            needs.
          </p>

          {/* STATUS FILTER */}
          <div
            className="mt-8 flex justify-center items-center max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-10 py-3 rounded-xl shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg"
            >
              <option value="ALL">All Properties</option>
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
            </select>
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section
        className="px-6 md:px-10 bg-gray-700 lg:px-15 lg:py-10 mb-5"
        id="properties"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-poppins-med font-semibold text-white">
            Our Best Properties
          </h2>
          <a
            href="/add-property"
            className="md:inline-block font-poppins text-white bg-green-500 px-5 py-2 rounded-xl hover:scale-105 transition-transform"
          >
            Add Property
          </a>
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-center text-gray-500">Loading properties...</p>
        ) : filteredProperties.length === 0 ? (
          <p className="text-center text-gray-400">
            No properties found for this status.
          </p>
        ) : (
          <div className="grid gap-6 gap-y-15 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </section>

      {/* ABOUT US SECTION */}
      <section
        className="w-full bg-gray-700 py-20 px-6 md:px-12 lg:px-20 pb-30"
        id="about"
      >
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-poppins-med font-bold text-white">
            About Tartor’s Properties
          </h2>
          <p className="mt-4 font-poppins text-gray-400 text-lg max-w-3xl mx-auto">
            At Tartor’s Properties, we are dedicated to making real estate
            simple, transparent, and accessible for everyone. Whether you’re
            buying, renting, or investing, we provide top-tier service built on
            trust, efficiency, and professionalism.
          </p>
        </div>

        <div
          className="grid grid-cols-1 font-poppins sm:grid-cols-2 lg:grid-cols-3 gap-8"
          data-aos="fade-up"
        >
          <div className=" bg-gray-600 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-white mb-2">
              Trusted Property Management
            </h3>
            <p className="text-gray-400 font-poppins">
              We ensure your properties are handled with care, transparency, and
              continuous updates.
            </p>
          </div>

          <div className=" bg-gray-600 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-white mb-2">
              Fast & Reliable Listings
            </h3>
            <p className="text-gray-400">
              Explore premium homes, apartments, and rentals with up-to-date
              availability.
            </p>
          </div>

          <div className=" bg-gray-600 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-white mb-2">
              Professional Support
            </h3>
            <p className="text-gray-400">
              Our team provides expert guidance throughout your real-estate
              journey.
            </p>
          </div>

          <div className=" bg-gray-600 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-white mb-2">
              Modern Digital Experience
            </h3>
            <p className="text-gray-400">
              A fully digital platform built for quick search, booking, and
              property management.
            </p>
          </div>

          <div className=" bg-gray-600 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-white mb-2">
              Verified Properties Only
            </h3>
            <p className="text-gray-400">
              Every property listed on this platform is verified for quality and
              safety.
            </p>
          </div>

          <div className=" bg-gray-600 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-white mb-2">
              A Brand You Can Trust
            </h3>
            <p className="text-gray-400">
              Built with honesty and excellence — Tartor’s Properties puts
              customers first.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
