import { FiCode, FiCpu, FiGlobe, FiAperture, FiDatabase, FiUsers, FiMonitor, FiSettings } from "react-icons/fi";
import { motion } from "framer-motion";

const features = [
  { icon: <FiCode />, title: "Real-Time Preview", desc: "See live changes as you write HTML, CSS, and JavaScript." },
  { icon: <FiCpu />, title: "AI Code Assistance", desc: "Smart suggestions to enhance your coding experience." },
  { icon: <FiGlobe />, title: "Multi-Project Support", desc: "Create and manage multiple coding projects with ease." },
  { icon: <FiAperture />, title: "Customizable Layout", desc: "Personalize your workspace with flexible layout options." },
  { icon: <FiDatabase />, title: "Cloud Storage", desc: "Securely store your projects and access them from anywhere." },
  { icon: <FiUsers />, title: "Collaboration Tools", desc: "Work together in real time with teammates and friends." },
  { icon: <FiMonitor />, title: "Device Compatibility", desc: "Optimized for desktop and mobile development." },
  { icon: <FiSettings />, title: "Theme & Code Settings", desc: "Tailor the coding environment to your preferences." }
];

const Features = () => {
  return (
    <section className="features px-6 py-20 bg-base-100 text-base-content">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-center mb-12"
        >
          Key Features
        </motion.h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 bg-base-200 rounded-lg shadow-md flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-gray-400 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
