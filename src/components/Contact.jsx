import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <FiGithub className="text-xl" />,
      url: "https://github.com/Ucokkici",
    },
    {
      name: "LinkedIn",
      icon: <FiLinkedin className="text-xl" />,
      url: "https://linkedin.com/in/akbar-ahmad-54788b370",
    },
    {
      name: "Tiktok",
      icon: <FiTwitter className="text-xl" />,
      url: "https://www.tiktok.com/@bocahhitam0",
    },
    {
      name: "Instagram",
      icon: <FiInstagram className="text-xl" />,
      url: "https://instagram.com/akbarsayangmamah",
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 py-20 px-4 sm:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>

          <motion.div
            className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Have a project in mind or want to discuss potential opportunities?
            Feel free to reach out to me using the contact form below or through
            my contact information.
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 h-full"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

              {/* Success Message */}
              {submitSuccess && (
                <motion.div
                  className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg flex items-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <FiCheckCircle className="mr-2" />
                  Thank you for your message! I'll get back to you soon.
                </motion.div>
              )}

              {/* Error Message */}
              {submitError && (
                <motion.div
                  className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg flex items-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <FiAlertCircle className="mr-2" />
                  Something went wrong. Please try again later.
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Name Input */}
                  <motion.div variants={itemVariants} className="mb-6">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                    >
                      Name
                    </label>
                    <motion.div
                      className="relative"
                      animate={{
                        boxShadow:
                          focusedField === "name"
                            ? "0 0 0 3px rgba(59, 130, 246, 0.3)"
                            : "none",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus("name")}
                        onBlur={handleBlur}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none bg-white dark:bg-gray-700"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Email Input */}
                  <motion.div variants={itemVariants} className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                    >
                      Email
                    </label>
                    <motion.div
                      className="relative"
                      animate={{
                        boxShadow:
                          focusedField === "email"
                            ? "0 0 0 3px rgba(59, 130, 246, 0.3)"
                            : "none",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus("email")}
                        onBlur={handleBlur}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none bg-white dark:bg-gray-700"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Message Textarea */}
                  <motion.div variants={itemVariants} className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                    >
                      Message
                    </label>
                    <motion.div
                      className="relative"
                      animate={{
                        boxShadow:
                          focusedField === "message"
                            ? "0 0 0 3px rgba(59, 130, 246, 0.3)"
                            : "none",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus("message")}
                        onBlur={handleBlur}
                        required
                        rows="5"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none bg-white dark:bg-gray-700 resize-none"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      ></motion.textarea>
                    </motion.div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={itemVariants}>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg flex items-center justify-center"
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <FiSend className="ml-2" />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 h-full"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Email */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <FiMail className="mr-3 text-blue-500" />
                    Email
                  </h4>
                  <motion.a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=akbar15kece@gmail.com"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    akbar15kece@gmail.com
                  </motion.a>
                </motion.div>

                {/* Phone */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <FiPhone className="mr-3 text-blue-500" />
                    Phone
                  </h4>
                  <motion.a
                    href="tel:+6285173350163"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    +6285173350163
                  </motion.a>
                </motion.div>

                {/* Location */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <FiMapPin className="mr-3 text-blue-500" />
                    Location
                  </h4>
                  <motion.p
                    className="text-gray-600 dark:text-gray-300"
                    whileHover={{ x: 5 }}
                  >
                    Indonesia, DKI Jakarta, Jakarta Barat
                  </motion.p>
                </motion.div>

                {/* Social Media */}
                <motion.div variants={itemVariants}>
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-3 h-5 w-5 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Connect With Me
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300"
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, 15, -15, 0],
                        }}
                        whileTap={{ scale: 0.9 }}
                        title={social.name}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
