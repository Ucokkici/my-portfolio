import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Scrollspy from "react-scrollspy";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setIsDark(JSON.parse(savedDarkMode));
    } else {
      // Default to system preference if no saved preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
    }
  }, []);

  // Apply dark mode class and save preference
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("darkMode", JSON.stringify(isDark));
  }, [isDark]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const navLinks = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-black/90 backdrop-blur-sm shadow-md py-2"
            : "bg-transparent py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="text-xl font-bold flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              DevPortfolio
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Scrollspy
              items={["hero", "about", "projects", "contact"]}
              currentClassName="text-blue-600 dark:text-blue-400 font-medium"
              className="flex gap-8"
              offset={-100}
            >
              {navLinks.map((link) => (
                <li key={link.id} className="list-none">
                  <motion.a
                    href={`#${link.id}`}
                    className="relative py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.label}
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </li>
              ))}
            </Scrollspy>
          </div>

          {/* Dark Mode Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              whileHover={{
                scale: 1.1,
                rotate: 15,
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
              }}
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: isDark ? 360 : 0 }}
              transition={{ duration: 0.5 }}
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <FiSun className="text-xl text-yellow-400" />
              ) : (
                <FiMoon className="text-xl text-indigo-600" />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              onClick={toggleMobileMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <FiX className="text-xl" />
              ) : (
                <FiMenu className="text-xl" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden overflow-hidden ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
          initial={{ height: 0 }}
          animate={{ height: mobileMenuOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-2 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
            <Scrollspy
              items={["hero", "about", "projects", "contact"]}
              currentClassName="text-blue-600 dark:text-blue-400 font-medium"
              className="flex flex-col gap-3 py-4"
              offset={-100}
            >
              {navLinks.map((link) => (
                <li key={link.id} className="list-none">
                  <motion.a
                    href={`#${link.id}`}
                    className="block py-2 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </Scrollspy>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default Navbar;
