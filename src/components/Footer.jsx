import bg from "../assets/bg-img.svg";
import { HiHome } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-white font-poppins bg-[rgb(18,26,42)] py-12 px-6 md:px-12">
      {/* container */}
      <div className="flex flex-col lg:flex-row justify-between flex-wrap gap-16 max-w-[1200px] mx-auto mb-12 relative z-10">
        {/* left */}
        <div className="flex-1 min-w-[280px] lg:flex-[1.2]">
          <div className="pb-6 mb-6 border-b border-[#444]">
            <h2 className="mb-3 flex items-center gap-2 text-cyan-500 font-semibold text-2xl">
              <HiHome className="w-6 h-6" />
              Tartor's Properties
            </h2>
            <p className="text-[#bfbfbf] max-w-[280px] text-sm leading-6">
              One platform to manage every property effortlessly.
            </p>
          </div>

          <div className="flex gap-14 flex-wrap mt-6">
            {/* column 1 */}
            <div className="min-w-[150px]">
              <h3 className="mb-3 text-sm font-semibold uppercase">Support</h3>
              <ul>
                <li className="mb-2">
                  <a
                    className="text-[#bfbfbf] hover:text-white text-sm"
                    href="#"
                  >
                    About us
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="text-[#bfbfbf] hover:text-white text-sm"
                    href="#"
                  >
                    Help Center
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="text-[#bfbfbf] hover:text-white text-sm"
                    href="#"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#bfbfbf] hover:text-white text-sm"
                    href="#"
                  >
                    Feedback
                  </a>
                </li>
              </ul>
            </div>

            {/* column 2 */}
            <div className="min-w-[150px]">
              <h3 className="mb-3 text-sm font-semibold uppercase">Social</h3>
              <ul>
                <li className="mb-2">
                  <a
                    className="text-[#bfbfbf] hover:text-white text-sm"
                    href="#"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="text-[#bfbfbf] hover:text-white text-sm"
                    href="#"
                  >
                    Twitter
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="text-[#bfbfbf] hover:text-white text-sm"
                    href="#"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#bfbfbf] hover:text-white text-sm"
                    href="#"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex-1 min-w-[300px] lg:pl-10">
          <span className="block text-xs font-bold tracking-wide mb-2 text-gray-500">
            Contact
          </span>

          <h3 className="text-3xl md:text-4xl font-semibold leading-tight mb-6">
            Send us a message
          </h3>

          <form className="flex rounded-full overflow-hidden text-black bg-white max-w-[360px]">
            <input
              type="text"
              required
              placeholder="Message..."
              className="flex-1 px-4 py-3 text-sm outline-none"
            />
            <button
              type="submit"
              className="px-5 text-white bg-cyan-500 text-xl font-semibold hover:bg-cyan-600 transition-colors"
            >
              →
            </button>
          </form>
        </div>
      </div>

      {/* bottom */}
      <div className="border-t border-[#444] pt-5 mt-6 max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-4 text-[#bfbfbf] text-sm relative z-10">
        <p>© {new Date().getFullYear()} Tartor'sProperties</p>

        <div className="flex flex-wrap items-center gap-3">
          <a className="hover:text-white" href="#">
            Support
          </a>
          <a className="hover:text-white" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-white" href="#">
            Terms of Use
          </a>
          <a className="hover:text-white" href="#">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
