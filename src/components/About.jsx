import { motion } from "framer-motion";
import { useState } from "react";

const About = () => {
  const [activeTab, setActiveTab] = useState("skills");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const skills = [
    {
      name: "React",
      level: 90,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89c-1.03 0-1.87-.84-1.87-1.89s.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95z" />
        </svg>
      ),
    },
    {
      name: "TailwindCSS",
      level: 95,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
      ),
    },
    {
      name: "JavaScript",
      level: 85,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.08 10.2,18.08C9.62,18.08 9.38,17.68 9.11,17.21L7.73,18.04M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z" />
        </svg>
      ),
    },
    {
      name: "Framer Motion",
      level: 80,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 2v7h6V2H4zm6 7l6-7v7H10zM4 9v6l6-6H4zm6 6v7h6l-6-7z" />
        </svg>
      ),
    },
    {
      name: "UI/UX Design",
      level: 75,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
        </svg>
      ),
    },
    {
      name: "HTML/CSS",
      level: 95,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,17.56L16.07,16.43L16.62,10.33H9.38L9.2,8.3H16.8L17,6.31H7L7.56,12.32H14.45L14.22,14.9L12,15.5L9.78,14.9L9.64,13.24H7.64L7.93,16.43L12,17.56M4.07,3H19.93L18.5,19.2L12,21L5.5,19.2L4.07,3Z" />
        </svg>
      ),
    },
  ];

  const experiences = [
    {
      title: "Fullstack Developer (Personal Projects)",
      company: "Self-Initiated / Freelance Learning",
      period: "2023 - Present",
      description:
        "Mengembangkan aplikasi web dan mobile menggunakan Flutter, Laravel, dan React. Beberapa proyek meliputi aplikasi absensi, layanan laundry berbasis lokasi, dan dashboard admin. Fokus pada integrasi API, manajemen state, dan CORS handling.",
    },
    {
      title: "Frontend Developer (React Portfolio & UI Projects)",
      company: "Self-Led",
      period: "2024 - Present",
      description:
        "Membangun website portofolio dengan animasi kompleks menggunakan React, TailwindCSS, dan Framer Motion. Menekankan pada performa UI, animasi interaktif, dan desain yang responsif.",
    },
    {
      title: "Flutter Developer (Web & Mobile)",
      company: "Personal Study & Practice",
      period: "2024",
      description:
        "Mengembangkan aplikasi Flutter Web dengan penyimpanan Hive, integrasi REST API Laravel, dan fitur seperti autentikasi, input geolokasi, upload gambar, dan filter data. Telah menerapkan arsitektur yang rapi dan manajemen state yang baik.",
    },
    {
      title: "Database & Backend Builder (Laravel + SQL Server)",
      company: "Project-Based Learning",
      period: "2023",
      description:
        "Merancang struktur database relasional, membangun API RESTful di Laravel, serta menghubungkan frontend Flutter dengan backend menggunakan autentikasi Bearer Token dan validasi CORS yang tepat.",
    },
  ];

  const education = [
    {
      title: "SMK Negeri 17 Jakarta",
      institution: "SMK Negeri 17 Jakarta",
      period: "2023 - 2026",
      description:
        "Jurusan Rekayasa Perangkat Lunak (RPL). Mempelajari pengembangan perangkat lunak berbasis web dan mobile, termasuk praktik langsung menggunakan Flutter, Laravel, React, serta pemodelan database SQL Server.",
    },
    {
      title: "Madrasah Tsanawiyah Negeri 35 Jakarta",
      institution: "MTsN 35 Jakarta",
      period: "2020 - 2023",
      description:
        "Pendidikan menengah pertama dengan kurikulum terpadu umum dan keagamaan.  Aktif dalam kegiatan belajar yang mendukung logika, disiplin, dan kerja tim.",
    },
    {
      title: "SD Negeri 25 Pagi Palmerah",
      institution: "SDN 25 Pagi Palmerah",
      period: "2014 - 2020",
      description:
        "Pendidikan dasar formal dengan dasar keterampilan akademik umum dan pembentukan karakter.",
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

  return (
    <section
      id="about"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 py-20 px-4 sm:px-8 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <motion.div
            className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            transition={{ delay: 0.5, duration: 1 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Fullstack developer dengan semangat tinggi pada UI/UX, menggabungkan
            arsitektur backend yang efisien dengan tampilan antarmuka yang halus
            dan interaktif.
          </motion.p>
        </motion.div>

        <div className="flex flex-col xl:flex-row gap-12">
          {/* Profile Section */}
          <motion.div
            className="xl:w-2/5"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 h-full border border-white/20 dark:border-gray-700/50"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Profile Image */}
              <motion.div
                className="relative w-56 h-56 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 mx-auto mb-8 overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-2 rounded-full bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-8xl">👨‍💻</div>
                </div>
              </motion.div>

              <motion.h3
                className="text-3xl font-bold text-center mb-3 text-gray-800 dark:text-gray-100"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                Ahmad Akbar
              </motion.h3>

              <motion.p
                className="text-lg text-blue-600 dark:text-blue-400 font-semibold text-center mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Frontend Developer & UI/UX Enthusiast
              </motion.p>

              <motion.p
                className="text-gray-600 dark:text-gray-300 text-center mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                Seorang fullstack developer dengan fokus pada frontend
                interaktif dan backend yang efisien. Terbiasa membangun aplikasi
                kompleks menggunakan React, TailwindCSS, Framer Motion, Flutter,
                dan Laravel. Antusias dalam menciptakan UI/UX modern, performa
                tinggi, serta integrasi API yang mulus.
              </motion.p>

              <motion.p
                className="text-gray-600 dark:text-gray-300 text-center mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                Berpengalaman membangun berbagai aplikasi web dan mobile — mulai
                dari sistem absensi, platform laundry on-demand, hingga
                dashboard admin yang kompleks. Fokus utama saya adalah pada
                arsitektur bersih, performa tinggi, dan pengalaman pengguna yang
                intuitif.
              </motion.p>

              {/* Social Links */}
              <motion.div
                className="flex justify-center space-x-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
              >
                {[
                  {
                    name: "GitHub",
                    symbol: "G",
                    url: "https://github.com/Ucokkici",
                    color:
                      "from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800",
                  },
                  {
                    name: "LinkedIn",
                    symbol: "L",
                    url: "https://linkedin.com/in/akbar-ahmad-54788b370",
                    color:
                      "from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700",
                  },
                  {
                    name: "Tiktok",
                    symbol: "T",
                    url: "https://www.tiktok.com/@bocahhitam0",
                    color:
                      "from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500",
                  },
                  {
                    name: "Instagram",
                    symbol: "I",
                    url: "https://instagram.com/akbarsayangmamah",
                    color:
                      "from-pink-500 to-rose-600 dark:from-pink-400 dark:to-rose-500",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                    whileHover={{
                      scale: 1.1,
                      y: -2,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    title={social.name}
                  >
                    {social.symbol}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            className="xl:w-3/5"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 h-full border border-white/20 dark:border-gray-700/50">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-10">
                {[
                  { key: "skills", label: "Skills & Expertise" },
                  { key: "experience", label: "Experience" },
                  { key: "education", label: "Education" },
                  { key: "hobbies", label: "Hobbies" },
                ].map((tab) => (
                  <motion.button
                    key={tab.key}
                    className={`px-6 py-4 font-semibold relative text-lg ${
                      activeTab === tab.key
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                    onClick={() => setActiveTab(tab.key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="min-h-96"
              >
                {activeTab === "skills" && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                  >
                    {skills.map((skill, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="text-blue-600 dark:text-blue-400">
                              {skill.icon}
                            </div>
                            <span className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              duration: 1.2,
                              delay: 0.1 * index,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "experience" && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative"
                  >
                    {/* Timeline Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                    <div className="space-y-12">
                      {experiences.map((exp, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="relative pl-12"
                        >
                          {/* Timeline Dot */}
                          <motion.div
                            className="absolute w-4 h-4 bg-white dark:bg-gray-800 border-4 border-blue-500 rounded-full -left-2 top-2 shadow-lg"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 * index, duration: 0.3 }}
                          />
                          <motion.div
                            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
                            whileHover={{ y: -2 }}
                          >
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                              {exp.title}
                            </h3>
                            <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">
                              {exp.company}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 font-medium">
                              {exp.period}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {exp.description}
                            </p>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "education" && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                  >
                    {education.map((edu, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow"
                        whileHover={{ y: -2 }}
                      >
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                          {edu.title}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-2">
                          {edu.institution}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 font-medium mb-4">
                          {edu.period}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {edu.description}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "hobbies" && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 sm:grid-cols-3 gap-6"
                  >
                    {hobbies.map((hobby, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-center cursor-pointer border border-gray-100 dark:border-gray-700"
                        whileHover={{
                          y: -8,
                          scale: 1.02,
                          backgroundColor: "dark" ? "#1f2937" : "#EEF2FF",
                          boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-5xl mb-4">{hobby.icon}</div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                          {hobby.name}
                        </h3>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                className="mt-16 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.a
                  href="#contact"
                  className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold rounded-2xl text-lg shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 15px 35px -5px rgba(79, 70, 229, 0.4)",
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Let's Work Together</span>
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
