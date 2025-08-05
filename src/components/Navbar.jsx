import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Scrollspy from "react-scrollspy";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

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

      // Update active section based on scroll position
      const sections = ["hero", "about", "projects", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
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
      {/* Animated background elements */}
      <div className="fixed top-0 left-0 w-full h-20 z-40 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"
          animate={{
            opacity: isScrolled ? 0.7 : 0,
            y: isScrolled ? 0 : -20,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
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
              className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg"
              animate={{
                rotate: [0, 10, 0, -10, 0],
                boxShadow: [
                  "0 0 0 rgba(99, 102, 241, 0)",
                  "0 0 20px rgba(99, 102, 241, 0.5)",
                  "0 0 0 rgba(99, 102, 241, 0)",
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-white font-bold">D</span>
            </motion.div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 font-bold tracking-wide">
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
                    className={`relative py-2 px-1 text-gray-700 dark:text-gray-300 transition-colors ${
                      activeSection === link.id
                        ? "text-blue-600 dark:text-blue-400 font-medium"
                        : "hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.label}
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: "0%" }}
                      animate={{
                        width: activeSection === link.id ? "100%" : "0%",
                      }}
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
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors relative overflow-hidden"
              whileHover={{
                scale: 1.1,
                rotate: 15,
              }}
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: isDark ? 360 : 0 }}
              transition={{ duration: 0.5 }}
              aria-label="Toggle dark mode"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0"
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
              {isDark ? (
                <FiSun className="text-xl text-yellow-400 relative z-10" />
              ) : (
                <FiMoon className="text-xl text-indigo-600 relative z-10" />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors relative overflow-hidden"
              onClick={toggleMobileMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle mobile menu"
            >
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0"
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
              {mobileMenuOpen ? (
                <FiX className="text-xl relative z-10" />
              ) : (
                <FiMenu className="text-xl relative z-10" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden overflow-hidden ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-2 bg-white/95 dark:bg-black/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 shadow-lg">
            <Scrollspy
              items={["hero", "about", "projects", "contact"]}
              currentClassName="text-blue-600 dark:text-blue-400 font-medium"
              className="flex flex-col gap-2 py-4"
              offset={-100}
            >
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.id}
                  className="list-none"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: mobileMenuOpen ? 1 : 0,
                    x: mobileMenuOpen ? 0 : -20,
                  }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.a
                    href={`#${link.id}`}
                    className={`block py-3 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative overflow-hidden ${
                      activeSection === link.id
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                        : ""
                    }`}
                    whileHover={{
                      x: 10,
                      backgroundColor: isDark
                        ? "rgba(99, 102, 241, 0.1)"
                        : "rgba(99, 102, 241, 0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">{link.label}</span>
                  </motion.a>
                </motion.li>
              ))}
            </Scrollspy>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default Navbar;
