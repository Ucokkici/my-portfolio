import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import projects from "../constants/projects"; // Impor data dari file eksternal

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);

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

  return (
    <section
      id="projects"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 py-24 px-4 sm:px-8 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            My Projects
          </motion.h2>
          <motion.div
            className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
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

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          variants={filterVariants}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.key}
              className={`group relative px-8 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                filter === category.key
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl"
                  : "bg-white dark:bg-gray-800 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 shadow-lg border border-white/20 dark:border-gray-700"
              }`}
              onClick={() => setFilter(category.key)}
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">
                {category.label}
                <span className="ml-2 text-xs opacity-75">
                  ({category.count})
                </span>
              </span>
              {filter === category.key && (
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600"
                  layoutId="activeFilter"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-gray-700/50"
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 25px 50px -10px rgba(0, 0, 0, 0.15)",
                }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <motion.div
                    className="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    ⭐ Featured
                  </motion.div>
                )}

                {/* Project Image */}
                <div className="relative overflow-hidden h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <motion.h3
                        className="text-xl font-bold mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.div
                        className="flex flex-wrap gap-2"
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="flex items-center gap-1 text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full"
                          >
                            <span>{techIcons[tag] || "🔧"}</span>
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full font-semibold">
                      {project.category.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, i) => (
                      <motion.span
                        key={i}
                        className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-full font-medium hover:bg-blue-100 dark:hover:bg-gray-600 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span>{techIcons[tag] || "🔧"}</span>
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium group/btn"
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        className="w-5 h-5 group-hover/btn:rotate-12 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </motion.a>

                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl group/btn"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 30px -5px rgba(59, 130, 246, 0.4)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Live Demo
                      <svg
                        className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
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
                    </motion.a>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 -z-10"
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View More Button */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/Ucokkici"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-10 py-4 border-2 border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View More on GitHub</span>
            <motion.svg
              className="w-6 h-6"
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
            {/* Button background animation */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
              layoutId="buttonBackground"
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
