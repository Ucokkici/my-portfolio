import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="pt-16">
        {" "}
        {/* Tambahkan padding-top untuk menghindari konten tertutup Navbar */}
        {/* Hero section di luar container agar full width */}
        <Hero />
        {/* About section di luar container agar menyatu dengan background */}
        <About />
        {/* Section lainnya tetap dalam container */}
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
