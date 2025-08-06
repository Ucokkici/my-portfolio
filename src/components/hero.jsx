import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Particles from "@tsparticles/react"; // ✅ versi baru
import { loadFull as tsparticlesAll } from "tsparticles";
import { useCallback } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const yElements = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Custom cursor variants
  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      scale: 1,
      mixBlendMode: "normal",
    },
    text: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      backgroundColor: "rgba(147, 197, 253, 0.8)",
      scale: 2,
      mixBlendMode: "difference",
    },
    button: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      backgroundColor: "rgba(59, 130, 246, 0.9)",
      scale: 1.5,
      mixBlendMode: "normal",
    },
  };

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");
  const buttonEnter = () => setCursorVariant("button");
  const buttonLeave = () => setCursorVariant("default");

  // 3D floating background elements
  const floatingElements = [
    {
      id: 1,
      x: "10%",
      y: "15%",
      size: 120,
      delay: 0,
      color: "bg-blue-400",
      depth: 0.2,
    },
    {
      id: 2,
      x: "85%",
      y: "25%",
      size: 80,
      delay: 0.5,
      color: "bg-purple-400",
      depth: 0.5,
    },
    {
      id: 3,
      x: "75%",
      y: "70%",
      size: 100,
      delay: 1,
      color: "bg-indigo-400",
      depth: 0.3,
    },
    {
      id: 4,
      x: "15%",
      y: "80%",
      size: 60,
      delay: 1.5,
      color: "bg-cyan-400",
      depth: 0.7,
    },
    {
      id: 5,
      x: "50%",
      y: "10%",
      size: 40,
      delay: 2,
      color: "bg-blue-300",
      depth: 0.4,
    },
    {
      id: 6,
      x: "90%",
      y: "60%",
      size: 70,
      delay: 2.5,
      color: "bg-purple-300",
      depth: 0.6,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const techStack = [
    { name: "React", color: "from-blue-400 to-blue-600" },
    { name: "TypeScript", color: "from-blue-500 to-indigo-600" },
    { name: "TailwindCSS", color: "from-cyan-400 to-cyan-600" },
    { name: "Framer Motion", color: "from-purple-400 to-purple-600" },
    { name: "Next.js", color: "from-gray-600 to-gray-800" },
    { name: "Node.js", color: "from-green-400 to-green-600" },
  ];

  // Particles configuration
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
        value: ["#93c5fd", "#c4b5fd", "#a5b4fc", "#67e8f9"],
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
        value: isMobile ? 30 : 80,
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

  return (
    <>
      {/* Custom cursor - hidden on mobile */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 hidden md:block border-2 border-white/30"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
      />
      <section
        ref={heroRef}
        className="hero min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-blue-200/60 to-blue-700/80 dark:from-blue-300/60 dark:to-blue-800/90"
        id="hero"
        style={{ perspective: "1000px" }}
      >
        {/* Particles background */}
        <div className="absolute inset-0 z-0">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
          />
        </div>

        {/* Animated gradient overlay with parallax */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20"
          style={{
            y: yBg,
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* 3D floating background elements with parallax */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className={`absolute rounded-full ${element.color} opacity-20 blur-sm`}
            style={{
              left: element.x,
              top: element.y,
              width: element.size,
              height: element.size,
              z: Math.round(element.depth * 10),
              y: yElements, // ⬅️ tambahkan di sini
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.1, 1],
              rotateY: [0, 180, 360],
              rotateX: [0, 10, 0],
            }}
            transition={{
              duration: 8 + element.delay,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* 3D Grid background */}
        <motion.div
          className="absolute inset-0 z-0 opacity-10"
          style={{ y: yBg }}
        >
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:40px_40px]" />
        </motion.div>

        {/* Main content */}
        <motion.div
          className="container mx-auto py-16 sm:py-20 z-10 max-w-7xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: yText }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Text content */}
            <motion.div
              className="lg:w-1/2 text-center lg:text-left w-full"
              variants={itemVariants}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Greeting */}
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-lg md:text-xl text-blue-300 font-medium">
                  👋 Hello, I'm
                </span>
              </motion.div>

              {/* Main title - responsive font size with 3D effect */}
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{
                  scale: 1.02,
                  textShadow: "0 0 20px rgba(147, 197, 253, 0.5)",
                  transform: "translateZ(20px)",
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Ahmad Akbar
                </span>
              </motion.h1>

              {/* Animated role descriptions - responsive font size */}
              <motion.div
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 font-light text-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2">
                  <motion.span
                    className="overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    Frontend \ Backend Developer
                  </motion.span>
                  <span className="text-blue-300 hidden sm:inline">|</span>
                  <motion.span
                    className="overflow-hidden text-blue-300"
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    transition={{ duration: 1, delay: 1.2 }}
                  >
                    UI/UX Enthusiast
                  </motion.span>
                </div>
              </motion.div>

              {/* Description - responsive padding and margin */}
              <motion.p
                className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                Passionate about creating beautiful, interactive, and
                user-friendly web experiences with modern technologies and
                creative animations.
              </motion.p>

              {/* Tech stack badges - responsive layout */}
              <motion.div
                className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech.name}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r ${tech.color} bg-opacity-20 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm border border-white/10 shadow-lg`}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                    whileHover={{
                      y: -5,
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                      transform: "translateZ(10px)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </motion.div>

              {/* Action buttons - responsive size and layout */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <motion.a
                  href="#projects"
                  onMouseEnter={buttonEnter}
                  onMouseLeave={buttonLeave}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transform: "translateZ(15px)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-2xl flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 hover:shadow-blue-500/25 text-sm sm:text-base"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <span>View My Work</span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                </motion.a>
                <motion.a
                  href="#contact"
                  onMouseEnter={buttonEnter}
                  onMouseLeave={buttonLeave}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transform: "translateZ(15px)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold flex items-center justify-center gap-2 sm:gap-3 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <span>Contact Me</span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-y-1 transition-transform"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </motion.svg>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Avatar/Image section - responsive size and positioning with 3D effect */}
            <motion.div
              className="lg:w-1/2 flex justify-center mt-8 lg:mt-0 w-full"
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="relative">
                {/* Glowing background with 3D effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 opacity-60 blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                    rotateY: [0, 180, 360],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                />

                {/* Main avatar container - responsive size with 3D effect */}
                <motion.div
                  className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-96 xl:h-96 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 p-2 shadow-2xl"
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                    rotateY: 10,
                    rotateX: 10,
                    transform: "translateZ(30px)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden border-4 border-white/20 backdrop-blur-sm">
                    <motion.div
                      className="w-full h-full flex items-center justify-center"
                      animate={{
                        rotate: [0, 5, -5, 0],
                        rotateY: [0, 10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Profile image */}
                      <img
                        src="/akbar.jpg"
                        alt="Foto Akbar"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>

                  {/* Orbiting elements - hidden on small screens with 3D effect */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg hidden sm:block"
                    animate={{
                      rotate: 360,
                      rotateY: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      transformOrigin: "0 120px",
                      transformStyle: "preserve-3d",
                    }}
                  />

                  <motion.div
                    className="absolute top-1/2 left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-purple-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg hidden sm:block"
                    animate={{
                      rotate: -360,
                      rotateY: -360,
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      transformOrigin: "0 -100px",
                      transformStyle: "preserve-3d",
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator - responsive positioning and size */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            className="group cursor-pointer"
            onClick={() => {
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{
              scale: 1.1,
              transform: "translateZ(10px)",
            }}
            whileTap={{ scale: 0.9 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="w-6 h-12 sm:w-8 sm:h-14 rounded-full border-2 border-white/50 flex justify-center p-1.5 sm:p-2 backdrop-blur-sm group-hover:border-white transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <p className="text-white/70 text-xs sm:text-sm mt-2 text-center group-hover:text-white transition-colors">
              Scroll Down
            </p>
          </motion.div>
        </motion.div>

        {/* Decorative corner elements - responsive size */}
        <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-br-full" />
        <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tl from-purple-400/20 to-transparent rounded-tl-full" />
      </section>
    </>
  );
}
