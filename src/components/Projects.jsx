import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import Particles from "@tsparticles/react"; // ✅ versi baru
import { loadFull as tsparticlesAll } from "tsparticles";

import { TypeAnimation } from "react-type-animation";
import projects from "../constants/projects";
import {
  FiChevronLeft,
  FiChevronRight,
  FiGithub,
  FiExternalLink,
} from "react-icons/fi";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
      },
    }),
    hover: {
      y: -10,
      scale: 1.03,
      transition: { duration: 0.3 },
    },
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

  // Toggle card expansion
  const toggleCardExpansion = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Particles initialization
  const particlesInit = useCallback(async (engine) => {
    await tsparticlesAll.loadFull(engine);
  }, []);

  const particlesOptions = {
    fullScreen: false,
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ["#4facfe", "#00f2fe", "#43e97b", "#38f9d7"],
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 60,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Initialize and update scroll position
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      checkScrollPosition();
      carousel.addEventListener("scroll", checkScrollPosition);
      return () => carousel.removeEventListener("scroll", checkScrollPosition);
    }
  }, [filteredProjects]);

  // Infinite scroll effect
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      if (carousel.scrollLeft === 0) {
        // Scroll to end
        carousel.scrollLeft = carousel.scrollWidth - carousel.clientWidth;
      } else if (
        carousel.scrollLeft + carousel.clientWidth >=
        carousel.scrollWidth - 1
      ) {
        // Scroll to beginning
        carousel.scrollLeft = 0;
      }
    };

    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="projects"
      className="min-h-screen relative overflow-hidden text-gray-800 dark:text-gray-200 py-16 sm:py-24 px-4 sm:px-6 transition-colors duration-300"
    >
      {/* Particles Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Particles
          id="tsparticles"
          init={particlesInit}
          className="absolute inset-0 z-0"
          options={particlesOptions}
        />
        {/* Dark mode overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-white dark:from-gray-900/80 dark:to-gray-900/90"></div>
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
          <motion.div
            className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed h-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TypeAnimation
              sequence={[
                "A collection of projects that showcase my passion for creating innovative digital experiences.",
                2000,
                "Solving complex problems through code and design.",
                2000,
                "Building applications that make a difference.",
                2000,
              ]}
              wrapper="p"
              cursor={true}
              repeat={Infinity}
              deletionSpeed={50}
              speed={70}
            />
          </motion.div>
        </motion.div>

        {/* Filter Buttons */}
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
                  : "bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm text-gray-800 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-800/50 hover:text-blue-700 dark:hover:text-blue-300 shadow-lg border border-white/30 dark:border-gray-700/30"
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

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-300">Loading projects...</p>
            </div>
          </div>
        ) : (
          /* Projects Section */
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
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={`${project.id}-${index}`}
                    className="flex-shrink-0 w-72 sm:w-80 md:w-96"
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                    exit={{ opacity: 0, y: 20 }}
                    layout
                  >
                    <motion.div
                      className={`group relative bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/20 dark:border-gray-700/30 h-full ${
                        expandedCard === project.id ? "h-auto" : ""
                      }`}
                      whileHover={{ y: -10 }}
                      onClick={() => toggleCardExpansion(project.id)}
                    >
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
                            <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100">
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
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                            {project.title}
                          </h3>
                          <span className="text-xs bg-gradient-to-r from-blue-100 to-teal-100 dark:from-gray-700 dark:to-gray-600 text-blue-900 dark:text-blue-200 px-2 py-1 rounded-full font-semibold">
                            {project.category.toUpperCase()}
                          </span>
                        </div>

                        <AnimatePresence>
                          {expandedCard === project.id ? (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">
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
                            </motion.div>
                          ) : (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-xs sm:text-sm text-gray-800 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed line-clamp-2"
                            >
                              {project.description}
                            </motion.p>
                          )}
                        </AnimatePresence>

                        {/* Action Buttons */}
                        <div className="flex gap-2 sm:gap-3">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 transition-colors font-medium text-xs sm:text-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiGithub className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">GitHub</span>
                          </a>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-semibold shadow-lg text-xs sm:text-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="hidden sm:inline">Live Demo</span>
                            <span className="sm:hidden">Demo</span>
                            <FiExternalLink className="w-3 h-3 sm:w-3 sm:h-3" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
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
        )}

        {/* View More Button */}
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
