import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import projects from "../constants/projects"; // Impor data dari file eksternal
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef(null);

  // Filter projects based on category
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 30,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Get unique categories
  const categories = [
    { key: "all", label: "All Projects", count: projects.length },
    {
      key: "web",
      label: "Web Apps",
      count: projects.filter((p) => p.category === "web").length,
    },
    {
      key: "mobile",
      label: "Mobile Apps",
      count: projects.filter((p) => p.category === "mobile").length,
    },
    {
      key: "ui/ux",
      label: "UI/UX Design",
      count: projects.filter((p) => p.category === "ui/ux").length,
    },
    {
      key: "game",
      label: "Games",
      count: projects.filter((p) => p.category === "game").length,
    },
  ];

  const techIcons = {
    React: "⚛️",
    "Vue.js": "💚",
    "Next.js": "▲",
    TypeScript: "🔷",
    JavaScript: "🟨",
    TailwindCSS: "🎨",
    "Node.js": "🟢",
    Firebase: "🔥",
    MongoDB: "🍃",
    Flutter: "💙",
    "React Native": "📱",
  };

  // Check scroll position
  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll functions
  const scrollLeftHandler = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  const scrollRightHandler = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  // Mouse/touch events for dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch events for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Initialize and update scroll position
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      checkScrollPosition();
      carousel.addEventListener("scroll", checkScrollPosition);
      return () => carousel.removeEventListener("scroll", checkScrollPosition);
    }
  }, [filteredProjects]);

  return (
    <section
      id="projects"
      className="min-h-screen relative overflow-hidden text-gray-800 dark:text-gray-200 py-16 sm:py-24 px-4 sm:px-6 transition-colors duration-300"
    >
      {/* Modern animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dynamic gradient background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(135deg, #4facfe 0%, #00f2fe 25%, #43e97b 50%, #38f9d7 75%, #4facfe 100%)",
              "linear-gradient(135deg, #38f9d7 0%, #4facfe 25%, #00f2fe 50%, #43e97b 75%, #38f9d7 100%)",
              "linear-gradient(135deg, #43e97b 0%, #38f9d7 25%, #4facfe 50%, #00f2fe 75%, #43e97b 100%)",
              "linear-gradient(135deg, #00f2fe 0%, #43e97b 25%, #38f9d7 50%, #4facfe 75%, #00f2fe 100%)",
              "linear-gradient(135deg, #4facfe 0%, #00f2fe 25%, #43e97b 50%, #38f9d7 75%, #4facfe 100%)",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        {/* Dark mode overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/90 dark:from-gray-900/90 dark:to-gray-900/95"></div>
        {/* Floating particles */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 dark:bg-white/5"
            style={{
              width: Math.random() * 12 + 2,
              height: Math.random() * 12 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
        {/* Geometric shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full border-4 border-blue-500/20 dark:border-blue-400/20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-lg border-4 border-teal-500/20 dark:border-teal-400/20"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-40 h-40 transform rotate-45 border-4 border-cyan-500/20 dark:border-cyan-400/20"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [45, 225, 405],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* Light beams */}
        <motion.div
          className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"
          animate={{
            x: ["-50%", "50%"],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-0 left-1/3 w-1 h-full bg-gradient-to-b from-transparent via-teal-500/30 to-transparent"
          animate={{
            x: ["-30%", "70%"],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 5,
          }}
        />
        <motion.div
          className="absolute top-0 left-2/3 w-1 h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"
          animate={{
            x: ["-70%", "30%"],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 10,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            My Projects
          </motion.h2>
          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 mx-auto rounded-full mb-4 sm:mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-lg sm:text-xl text-gray-100 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            viewport={{ once: true }}
          >
            A collection of projects that showcase my passion for creating
            innovative digital experiences and solving complex problems through
            code.
          </motion.p>
        </motion.div>

        {/* Filter Buttons - Mobile optimized */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 sm:mb-16 px-2"
          variants={filterVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.key}
              className={`group relative px-3 sm:px-6 py-1.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                filter === category.key
                  ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-2xl"
                  : "bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm text-gray-100 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-800/50 hover:text-blue-300 dark:hover:text-blue-300 shadow-lg border border-white/20 dark:border-gray-700/30"
              }`}
              onClick={() => setFilter(category.key)}
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                {category.label}
                <span className="ml-1 sm:ml-2 text-xs opacity-75 bg-white/20 dark:bg-black/20 rounded-full px-1.5 py-0.5">
                  ({category.count})
                </span>
              </span>
              {filter === category.key && (
                <motion.div
                  className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-teal-600"
                  layoutId="activeFilter"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Section - Horizontal Scrolling - Mobile optimized */}
        <div className="mb-16 sm:mb-20 relative">
          {/* Navigation arrows */}
          <motion.button
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg ${
              !canScrollLeft ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={scrollLeftHandler}
            disabled={!canScrollLeft}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FiChevronLeft className="text-xl" />
          </motion.button>

          <motion.button
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg ${
              !canScrollRight ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={scrollRightHandler}
            disabled={!canScrollRight}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FiChevronRight className="text-xl" />
          </motion.button>

          {/* Scrollable container */}
          <div
            ref={carouselRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide py-4 px-2"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
            style={{
              cursor: isDragging ? "grabbing" : "grab",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                className="flex-shrink-0 w-72 sm:w-80 md:w-96"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="group relative bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/20 dark:border-gray-700/30 h-full">
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold shadow-lg">
                      ⭐ Featured
                    </div>
                  )}

                  {/* Project Image */}
                  <div className="relative overflow-hidden h-40 sm:h-48 bg-gradient-to-br from-blue-100 to-teal-100 dark:from-gray-700 dark:to-gray-600">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                        <h3 className="text-base sm:text-lg font-bold mb-1">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-1">
                          {project.tags.slice(0, 2).map((tag, i) => (
                            <span
                              key={i}
                              className="flex items-center gap-1 text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full"
                            >
                              <span>{techIcons[tag] || "🔧"}</span>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-4 sm:p-5">
                    <div className="flex justify-between items-start mb-2 sm:mb-3">
                      <h3 className="text-base sm:text-lg font-bold text-gray-100 dark:text-gray-100">
                        {project.title}
                      </h3>
                      <span className="text-xs bg-gradient-to-r from-blue-100 to-teal-100 dark:from-gray-700 dark:to-gray-600 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full font-semibold">
                        {project.category.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-200 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1 mb-4 sm:mb-5">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1 text-xs bg-white/10 dark:bg-gray-700/50 text-gray-200 dark:text-gray-300 px-2 py-1 rounded-full font-medium"
                        >
                          <span>{techIcons[tag] || "🔧"}</span>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 sm:gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-200 dark:text-gray-300 hover:text-blue-300 dark:hover:text-blue-300 transition-colors font-medium text-xs sm:text-sm"
                      >
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="hidden sm:inline">GitHub</span>
                      </a>

                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-semibold shadow-lg text-xs sm:text-sm"
                      >
                        <span className="hidden sm:inline">Live Demo</span>
                        <span className="sm:hidden">Demo</span>
                        <svg
                          className="w-3 h-3 sm:w-3 sm:h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {filteredProjects.map((_, index) => (
              <motion.div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300/50 dark:bg-gray-600/50"
                animate={{
                  backgroundColor:
                    index === 0
                      ? "rgba(96, 165, 250, 0.8)"
                      : "rgba(209, 213, 219, 0.5)",
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>

        {/* View More Button - Mobile optimized */}
        <motion.div
          className="text-center mt-12 sm:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/Ucokkici"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-10 py-2.5 sm:py-4 border-2 border-transparent bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-2xl font-semibold text-sm sm:text-base shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm sm:text-base">View More on GitHub</span>
            <motion.svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ rotate: 45, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
