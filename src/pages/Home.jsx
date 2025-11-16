import { useEffect, useState } from "react";
import { getAllProperties } from "../api/properties";
import PropertyCard from "../components/PropertyCard";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProps = async () => {
      try {
        const data = await getAllProperties();
        setProperties(data.slice(0, 6));
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

          {/* Search */}
          <div
            className="mt-8 flex justify-center items-center gap-3 max-w-xl"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <input
              type="text"
              placeholder="Search properties..."
              className="flex-1 px-4 py-3 rounded-xl border placeholder:text-white border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button className="px-6 py-3 bg-cyan-500 text-white rounded-xl hover:bg-blue-700 transition">
              Search
            </button>
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
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-gray-500">Loading properties...</p>
        ) : (
          <div
            className="grid gap-6 gap-y-15 grid-row-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full"
            data-aos="fade-up"
          >
            {properties.map((item) => (
              <PropertyCard key={item.id} property={item} />
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
          <div className="border-2 border-cyan-500 bg-gray-600 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-white mb-2">
              Trusted Property Management
            </h3>
            <p className="text-gray-400 font-poppins">
              We ensure your properties are handled with care, transparency, and
              continuous updates.
            </p>
          </div>

          <div className=" border-2 border-cyan-500 bg-gray-600 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-white mb-2">
              Fast & Reliable Listings
            </h3>
            <p className="text-gray-400">
              Explore premium homes, apartments, and rentals with up-to-date
              availability.
            </p>
          </div>

          <div className="border-2 border-cyan-500 bg-gray-600 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-white mb-2">
              Professional Support
            </h3>
            <p className="text-gray-400">
              Our team provides expert guidance throughout your real-estate
              journey.
            </p>
          </div>

          <div className="border-2 border-cyan-500 bg-gray-600 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-white mb-2">
              Modern Digital Experience
            </h3>
            <p className="text-gray-400">
              A fully digital platform built for quick search, booking, and
              property management.
            </p>
          </div>

          <div className="border-2 border-cyan-500 bg-gray-600 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-white mb-2">
              Verified Properties Only
            </h3>
            <p className="text-gray-400">
              Every property listed on this platform is verified for quality and
              safety.
            </p>
          </div>

          <div className="border-2 border-cyan-500 bg-gray-600 shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
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
