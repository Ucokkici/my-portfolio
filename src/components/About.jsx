import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";

const About = () => {
  const [activeTab, setActiveTab] = useState("skills");
  const [darkMode, setDarkMode] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [skillFilter, setSkillFilter] = useState("all");
  const containerRef = useRef(null);

  // Initialize dark mode from localStorage and apply to document
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    // Save dark mode preference to localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    // Apply dark mode class to document element
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const skills = [
    {
      name: "React",
      level: 90,
      category: "frontend",
      description:
        "Building interactive UIs with hooks, context, and component architecture",
    },
    {
      name: "TailwindCSS",
      level: 95,
      category: "frontend",
      description: "Utility-first CSS framework for rapid UI development",
    },
    {
      name: "JavaScript",
      level: 85,
      category: "frontend",
      description: "ES6+, async programming, and modern JavaScript patterns",
    },
    {
      name: "Framer Motion",
      level: 80,
      category: "frontend",
      description: "Production-ready motion library for React animations",
    },
    {
      name: "UI/UX Design",
      level: 75,
      category: "design",
      description:
        "User-centered design principles and interactive prototyping",
    },
    {
      name: "HTML/CSS",
      level: 95,
      category: "frontend",
      description:
        "Semantic markup, responsive layouts, and modern CSS techniques",
    },
    {
      name: "Node.js",
      level: 70,
      category: "backend",
      description:
        "Server-side JavaScript runtime for building scalable applications",
    },
    {
      name: "Laravel",
      level: 75,
      category: "backend",
      description: "PHP framework for web application development",
    },
  ];

  const experiences = [
    {
      title: "Fullstack Developer (Personal Projects)",
      company: "Self-Initiated / Freelance Learning",
      period: "2023 - Present",
      description:
        "Mengembangkan aplikasi web dan mobile menggunakan Flutter, Laravel, dan React. Beberapa proyek meliputi aplikasi absensi, layanan laundry berbasis lokasi, dan dashboard admin. Fokus pada integrasi API, manajemen state, dan CORS handling.",
      icon: "💻",
    },
    {
      title: "Frontend Developer (React Portfolio & UI Projects)",
      company: "Self-Led",
      period: "2024 - Present",
      description:
        "Membangun website portofolio dengan animasi kompleks menggunakan React, TailwindCSS, dan Framer Motion. Menekankan pada performa UI, animasi interaktif, dan desain yang responsif.",
      icon: "🎨",
    },
    {
      title: "Flutter Developer (Web & Mobile)",
      company: "Personal Study & Practice",
      period: "2024",
      description:
        "Mengembangkan aplikasi Flutter Web dengan penyimpanan Hive, integrasi REST API Laravel, dan fitur seperti autentikasi, input geolokasi, upload gambar, dan filter data. Telah menerapkan arsitektur yang rapi dan manajemen state yang baik.",
      icon: "📱",
    },
    {
      title: "Database & Backend Builder (Laravel + SQL Server)",
      company: "Project-Based Learning",
      period: "2023",
      description:
        "Merancang struktur database relasional, membangun API RESTful di Laravel, serta menghubungkan frontend Flutter dengan backend menggunakan autentikasi Bearer Token dan validasi CORS yang tepat.",
      icon: "🗄️",
    },
  ];

  const education = [
    {
      title: "SMK Negeri 17 Jakarta",
      institution: "SMK Negeri 17 Jakarta",
      period: "2023 - 2026",
      description:
        "Jurusan Rekayasa Perangkat Lunak (RPL). Mempelajari pengembangan perangkat lunak berbasis web dan mobile, termasuk praktik langsung menggunakan Flutter, Laravel, React, serta pemodelan database SQL Server.",
      logo: "🏫",
    },
    {
      title: "Madrasah Tsanawiyah Negeri 35 Jakarta",
      institution: "MTsN 35 Jakarta",
      period: "2020 - 2023",
      description:
        "Pendidikan menengah pertama dengan kurikulum terpadu umum dan keagamaan. Aktif dalam kegiatan belajar yang mendukung logika, disiplin, dan kerja tim.",
      logo: "🕌",
    },
    {
      title: "SD Negeri 25 Pagi Palmerah",
      institution: "SDN 25 Pagi Palmerah",
      period: "2014 - 2020",
      description:
        "Pendidikan dasar formal dengan dasar keterampilan akademik umum dan pembentukan karakter.",
      logo: "🏫",
    },
  ];

  const hobbies = [
    { name: "Photography", icon: "📷" },
    { name: "Traveling", icon: "✈️" },
    { name: "Music", icon: "🎵" },
    { name: "Gaming", icon: "🎮" },
    { name: "Reading", icon: "📚" },
    { name: "Coding", icon: "💻" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: "G",
      url: "https://github.com/Ucokkici",
      color: "bg-gray-800",
    },
    {
      name: "LinkedIn",
      icon: "L",
      url: "https://linkedin.com/in/akbar-ahmad-54788b370",
      color: "bg-blue-700",
    },
    {
      name: "Tiktok",
      icon: "T",
      url: "https://www.tiktok.com/@bocahhitam0",
      color: "bg-black",
    },
    {
      name: "Instagram",
      icon: "I",
      url: "https://instagram.com/akbarsayangmamah",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
  ];

  const filteredSkills =
    skillFilter === "all"
      ? skills
      : skills.filter((skill) => skill.category === skillFilter);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const profileVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const contentVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <section
      id="about"
      className={`min-h-screen py-8 sm:py-16 px-4 sm:px-6 transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-b from-gray-900/80 to-gray-900/90 text-white"
          : "bg-white text-gray-800"
      }`}
      ref={containerRef}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: darkMode
              ? ["#111827", "#1f2937", "#111827"]
              : ["#dbeafe", "#e0e7ff", "#dbeafe"],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        />
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: darkMode
                ? `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`
                : `rgba(79, 70, 229, ${Math.random() * 0.1 + 0.05})`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Dark Mode Toggle */}
      <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 sm:p-3 rounded-full ${
            darkMode
              ? "bg-gray-700 text-yellow-300"
              : "bg-white text-gray-800 shadow-lg"
          }`}
        >
          {darkMode ? "☀️" : "🌙"}
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-16"
        >
          <motion.h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Me
            </span>
          </motion.h1>
          <motion.div
            className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Profile Section - Left */}
          <motion.div
            variants={profileVariants}
            initial="hidden"
            animate="visible"
            className="lg:w-2/5 w-full"
          >
            <motion.div
              className={`rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-lg ${
                darkMode ? "bg-gray-800/50" : "bg-white/70"
              } shadow-xl border ${
                darkMode ? "border-gray-700" : "border-white/50"
              }`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Profile Image */}
              <motion.div
                className="flex justify-center mb-8 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative group">
                  {/* Main Profile Picture */}
                  <motion.div
                    className="w-48 h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <img
                      src="/akbar.jpg"
                      alt="Ahmad Akbar"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Subtle Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-transparent"
                    animate={{
                      borderColor: ["#3b82f6", "#8b5cf6", "#ec4899", "#3b82f6"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      background:
                        "linear-gradient(360deg, transparent, transparent)",
                    }}
                  />

                  {/* Floating Dots Animation */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-blue-500 dark:bg-purple-500"
                      style={{
                        width: 6,
                        height: 6,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}

                  {/* Subtle Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 2,
                    }}
                    style={{
                      boxShadow: "0 0 20px 5px rgba(99, 102, 241, 0.5)",
                    }}
                  />
                </div>
              </motion.div>

              {/* Name & Title */}
              <motion.div className="text-center mb-4 sm:mb-6">
                <TypeAnimation
                  sequence={[
                    "Ahmad Akbar",
                    2000,
                    "Frontend Developer",
                    2000,
                    "UI/UX Enthusiast",
                    2000,
                    "Fullstack Developer",
                    2000,
                    "Ahmad Akbar",
                  ]}
                  wrapper="h2"
                  cursor={true}
                  repeat={Infinity}
                  className={`text-2xl sm:text-3xl font-bold mb-2 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                />
                <motion.p
                  className={`text-base sm:text-lg ${
                    darkMode ? "text-blue-300" : "text-blue-600"
                  }`}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Frontend Developer & UI/UX Enthusiast
                </motion.p>
              </motion.div>

              {/* Bio */}
              <motion.div
                className="mb-6 sm:mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p
                  className={`text-sm sm:text-base mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Seorang fullstack developer dengan fokus pada frontend
                  interaktif dan backend yang efisien. Terbiasa membangun
                  aplikasi kompleks menggunakan React, TailwindCSS, Framer
                  Motion, Flutter, dan Laravel.
                </p>
                <p
                  className={`text-sm sm:text-base ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Berpengalaman membangun berbagai aplikasi web dan mobile —
                  mulai dari sistem absensi, platform laundry on-demand, hingga
                  dashboard admin yang kompleks.
                </p>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex justify-center space-x-3 sm:space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${social.color}`}
                    whileHover={{
                      scale: 1.1,
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: "easeInOut",
                    }}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content Section - Right */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="lg:w-3/5 w-full"
          >
            <motion.div
              className={`rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-lg ${
                darkMode ? "bg-gray-800/50" : "bg-white/70"
              } shadow-xl border ${
                darkMode ? "border-gray-700" : "border-white/50"
              }`}
            >
              {/* Tabs */}
              <div className="flex overflow-x-auto pb-2 mb-6 sm:mb-8 border-b border-gray-300 dark:border-gray-600 hide-scrollbar">
                {[
                  { key: "skills", label: "Skills" },
                  { key: "experience", label: "Experience" },
                  { key: "education", label: "Education" },
                  { key: "hobbies", label: "Hobbies" },
                ].map((tab) => (
                  <motion.button
                    key={tab.key}
                    className={`px-3 sm:px-4 py-2 sm:py-3 font-medium relative flex-shrink-0 ${
                      activeTab === tab.key
                        ? darkMode
                          ? "text-blue-300"
                          : "text-blue-600"
                        : darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab(tab.key)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.label}
                    {activeTab === tab.key && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        layoutId="tabIndicator"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Skills Tab */}
                  {activeTab === "skills" && (
                    <div>
                      {/* Skill Filter */}
                      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                        {["all", "frontend", "backend", "design"].map(
                          (filter) => (
                            <motion.button
                              key={filter}
                              className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium capitalize ${
                                skillFilter === filter
                                  ? darkMode
                                    ? "bg-blue-600 text-white"
                                    : "bg-blue-500 text-white"
                                  : darkMode
                                  ? "bg-gray-700 text-gray-300"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                              onClick={() => setSkillFilter(filter)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {filter}
                            </motion.button>
                          )
                        )}
                      </div>
                      {/* Skills Grid */}
                      <motion.div
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {filteredSkills.map((skill, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`rounded-xl p-4 sm:p-6 cursor-pointer ${
                              darkMode ? "bg-gray-700/50" : "bg-white/50"
                            } border ${
                              darkMode ? "border-gray-600" : "border-gray-200"
                            } shadow-md`}
                            whileHover={{
                              y: -5,
                              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                              transition: { duration: 0.2 },
                            }}
                          >
                            <div className="flex justify-between items-center mb-3">
                              <h3
                                className={`text-base sm:text-lg font-bold ${
                                  darkMode ? "text-white" : "text-gray-800"
                                }`}
                              >
                                {skill.name}
                              </h3>
                              {/* Skill level indicator with stars */}
                              <div className="flex space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className={`text-sm ${
                                      i < Math.floor(skill.level / 20)
                                        ? "text-yellow-400"
                                        : darkMode
                                        ? "text-gray-600"
                                        : "text-gray-300"
                                    }`}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.1 + 0.2 }}
                                  >
                                    ★
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            {/* Skill icon and description */}
                            <div className="flex items-start space-x-4 my-4">
                              <div
                                className={`text-4xl ${
                                  darkMode ? "text-white" : "text-gray-800"
                                }`}
                              >
                                {skill.icon}
                              </div>
                              <div className="flex-1">
                                <p
                                  className={`text-xs sm:text-sm ${
                                    darkMode ? "text-gray-300" : "text-gray-600"
                                  }`}
                                >
                                  {skill.description}
                                </p>
                              </div>
                            </div>

                            {/* Skill tags */}
                            <div className="flex flex-wrap gap-1 mt-3">
                              {skill.tags?.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    darkMode
                                      ? "bg-gray-600 text-gray-200"
                                      : "bg-gray-200 text-gray-700"
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  )}

                  {/* Experience Tab */}
                  {activeTab === "experience" && (
                    <div className="relative">
                      {/* Timeline Line */}
                      <div
                        className={`absolute left-4 sm:left-5 top-0 bottom-0 w-0.5 ${
                          darkMode ? "bg-gray-600" : "bg-gray-300"
                        }`}
                      ></div>

                      <div className="space-y-6 sm:space-y-8">
                        {experiences.map((exp, index) => (
                          <motion.div
                            key={index}
                            className="relative pl-10 sm:pl-12"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                          >
                            {/* Timeline Dot */}
                            <div
                              className={`absolute left-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg sm:text-xl ${
                                darkMode ? "bg-gray-700" : "bg-white"
                              } shadow-md border-2 ${
                                darkMode ? "border-gray-600" : "border-gray-300"
                              }`}
                            >
                              {exp.icon}
                            </div>

                            <motion.div
                              className={`rounded-xl p-4 sm:p-6 ${
                                darkMode ? "bg-gray-700/50" : "bg-white/50"
                              } border ${
                                darkMode ? "border-gray-600" : "border-gray-200"
                              } shadow-md cursor-pointer`}
                              whileHover={{ y: -3 }}
                              onClick={() =>
                                setExpandedItem(
                                  expandedItem === index ? null : index
                                )
                              }
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3
                                    className={`text-base sm:text-lg font-bold ${
                                      darkMode ? "text-white" : "text-gray-800"
                                    }`}
                                  >
                                    {exp.title}
                                  </h3>
                                  <p
                                    className={`text-xs sm:text-sm font-medium ${
                                      darkMode
                                        ? "text-blue-300"
                                        : "text-blue-600"
                                    }`}
                                  >
                                    {exp.company}
                                  </p>
                                  <p
                                    className={`text-xs ${
                                      darkMode
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    {exp.period}
                                  </p>
                                </div>
                                <motion.div
                                  animate={{
                                    rotate: expandedItem === index ? 180 : 0,
                                  }}
                                  className={`text-lg ${
                                    darkMode ? "text-gray-400" : "text-gray-500"
                                  }`}
                                >
                                  {expandedItem === index ? "▲" : "▼"}
                                </motion.div>
                              </div>

                              <AnimatePresence>
                                {expandedItem === index && (
                                  <motion.p
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`mt-3 text-xs sm:text-sm ${
                                      darkMode
                                        ? "text-gray-300"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    {exp.description}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education Tab */}
                  {activeTab === "education" && (
                    <motion.div
                      className="space-y-4 sm:space-y-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {education.map((edu, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className={`rounded-xl p-4 sm:p-6 flex ${
                            darkMode ? "bg-gray-700/50" : "bg-white/50"
                          } border ${
                            darkMode ? "border-gray-600" : "border-gray-200"
                          } shadow-md`}
                          whileHover={{ y: -3 }}
                        >
                          <div className="text-3xl sm:text-4xl mr-4">
                            {edu.logo}
                          </div>
                          <div>
                            <h3
                              className={`text-base sm:text-lg font-bold ${
                                darkMode ? "text-white" : "text-gray-800"
                              }`}
                            >
                              {edu.title}
                            </h3>
                            <p
                              className={`text-xs sm:text-sm font-medium ${
                                darkMode ? "text-blue-300" : "text-blue-600"
                              }`}
                            >
                              {edu.institution}
                            </p>
                            <p
                              className={`text-xs ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {edu.period}
                            </p>
                            <p
                              className={`mt-2 text-xs sm:text-sm ${
                                darkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              {edu.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Hobbies Tab */}
                  {activeTab === "hobbies" && (
                    <motion.div
                      className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {hobbies.map((hobby, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className={`rounded-xl p-4 sm:p-6 text-center cursor-pointer ${
                            darkMode ? "bg-gray-700/50" : "bg-white/50"
                          } border ${
                            darkMode ? "border-gray-600" : "border-gray-200"
                          } shadow-md`}
                          whileHover={{
                            y: -10,
                            rotate: index % 2 === 0 ? 5 : -5,
                            transition: { duration: 0.2 },
                          }}
                          animate={{
                            y: [0, -5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.2,
                            ease: "easeInOut",
                          }}
                        >
                          <motion.div
                            className="text-3xl sm:text-4xl mb-3"
                            animate={{
                              rotate: [0, 10, 0],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              delay: index * 0.5,
                              ease: "easeInOut",
                            }}
                          >
                            {hobby.icon}
                          </motion.div>
                          <h3
                            className={`text-sm sm:text-base font-medium ${
                              darkMode ? "text-white" : "text-gray-800"
                            }`}
                          >
                            {hobby.name}
                          </h3>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* CTA Button */}
              <motion.div
                className="mt-8 sm:mt-10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <motion.a
                  href="#contact"
                  className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm sm:text-base font-medium rounded-full shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let's Work Together
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Custom scrollbar styles for mobile tabs */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default About;
