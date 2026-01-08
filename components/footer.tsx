"use client"

export default function Footer() {
  const handleInterest = () => {
    window.location.href = "https://wa.me/27108803948"
  }

  return (
    <footer className="text-white py-16 px-6 md:px-12" style={{ backgroundColor: "#000000" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo */}
          <div className="flex items-start">
            <div
              className="rounded-full w-24 h-24 flex items-center justify-center font-bold text-sm text-center px-2"
              style={{ backgroundColor: "#ffcd00", color: "#000000" }}
            >
              suncoopng
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-lg mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li className="font-semibold">Save & secure</li>
              <li className="opacity-70">Small</li>
              <li className="opacity-70">Medium</li>
              <li className="opacity-70">Large</li>
              <li className="opacity-70">Large 3 phase</li>
              <li className="opacity-70">Extra large</li>
              <li className="opacity-70">Extra large 3 phase</li>
              <li className="opacity-70">2x Extra large</li>
              <li className="opacity-70">3x Extra large</li>
              <li className="opacity-70">4x Extra large</li>
              <li className="font-semibold pt-2">Save</li>
              <li className="opacity-70">Medium saver</li>
              <li className="opacity-70">Large saver</li>
              <li className="opacity-70">3x Extra large saver</li>
              <li className="opacity-70">4x Extra large saver</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-sm">New customer</p>
                <button
                  onClick={handleInterest}
                  className="text-sm hover:opacity-70 transition cursor-pointer bg-none border-none p-0"
                  style={{ color: "#ffcd00" }}
                >
                  I'm interested
                </button>
              </div>
              <div>
                <p className="font-semibold text-sm">Existing customer</p>
                <p className="text-sm">010 880 3948</p>
                <a
                  href="mailto:help@suncoopng.co.za"
                  className="text-sm hover:opacity-70 transition"
                  style={{ color: "#ffcd00" }}
                >
                  help@suncoopng.co.za
                </a>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:opacity-70 transition" style={{ color: "#ffcd00" }}>
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition" style={{ color: "#ffcd00" }}>
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition" style={{ color: "#ffcd00" }}>
                  Brand guide
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-70">© 2026 Suncoopng (Pty Ltd)</p>
          <div className="flex gap-6 text-sm opacity-70">
            <a href="#" className="hover:opacity-90 transition" style={{ color: "#ffcd00" }}>
              Terms of service
            </a>
            <a href="#" className="hover:opacity-90 transition" style={{ color: "#ffcd00" }}>
              Privacy policy
            </a>
            <a href="#" className="hover:opacity-90 transition" style={{ color: "#ffcd00" }}>
              Login
            </a>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-70 transition">
              📱
            </a>
            <a href="#" className="hover:opacity-70 transition">
              f
            </a>
            <a href="#" className="hover:opacity-70 transition">
              📷
            </a>
            <a href="#" className="hover:opacity-70 transition">
              ✉️
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
