import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" {...props}>
      <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.98H7.9V12h2.6V9.8c0-2.56 1.53-3.97 3.87-3.97 1.12 0 2.3.2 2.3.2v2.5h-1.3c-1.28 0-1.68.8-1.68 1.62V12h2.86l-.46 2.89h-2.4v6.98A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.8 5.9a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  );
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.63 1.44 5.17L2 22l5.06-1.53a9.86 9.86 0 0 0 4.98 1.35h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.1h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3 .9.9-2.93-.2-.3a8.19 8.19 0 0 1-1.26-4.37c0-4.53 3.69-8.22 8.23-8.22 2.2 0 4.26.86 5.82 2.42a8.16 8.16 0 0 1 2.41 5.81c0 4.54-3.7 8.23-8.23 8.23zm4.5-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.12-.17.25-.65.81-.8.97-.15.17-.29.19-.55.06-.25-.12-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.42 1.02 2.58.12.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.28z" />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 md:px-16 py-12 mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-extrabold mb-3">
            <span className="text-green-500">PEP</span>
            <span className="text-white"> STORE</span>
          </h3>
          <p className="text-sm text-gray-400">
            Quality provisions, retail or wholesale, delivered straight to your
            home or business. Trusted quality, fair prices.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link to="/" className="hover:text-green-500">Home</Link></li>
            <li><Link to="/shop" className="hover:text-green-500">Shop</Link></li>
            <li><Link to="/wholesale" className="hover:text-green-500">Wholesale</Link></li>
            <li><Link to="/promotions" className="hover:text-green-500">Promotions</Link></li>
            <li><Link to="/customer-care" className="hover:text-green-500">Customer Care</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact Us</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Nsukka, Nigeria
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +234 9019131163
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@pepstore.com
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-green-500">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-green-500">
              <InstagramIcon />
            </a>
            <a href="#" aria-label="WhatsApp" className="hover:text-green-500">
              <WhatsAppIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} PEP STORE. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;