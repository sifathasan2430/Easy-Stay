"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const team = [
  {
    name: "Md. Azijul Hakim",
    role: "Team Lead and MERN Stack Developer",
    img: "https://i.postimg.cc/JhTmsMDs/Profile-Picture.png",
    linkedin: "https://linkedin.com/in/azijulhakimbd",
    twitter: "https://twitter.com/azijulhakimbd",
    github: "https://github.com/azijulhakimbd",
  },
  {
    name: "Naimur Rahman Dujoy",
    role: "MERN Stack Developer",
    img: "https://i.postimg.cc/yY6wLQfV/cto.jpg",
    linkedin: "https://linkedin.com/in/sarahahmed",
    twitter: "https://twitter.com/sarah_tech",
    github: "https://github.com/sarahahmed",
  },
  {
    name: "Sifat Hasan",
    role: "MERN Stack Developer",
    img: "https://i.postimg.cc/6QXn9N8k/designer.jpg",
    linkedin: "https://linkedin.com/in/davidlee",
    twitter: "https://twitter.com/davidlee",
    github: "https://github.com/davidlee",
  },
];

export default function OurTeam() {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-16 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-10">
          Meet Our Team
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-[#efefef] hover:shadow-2xl dark:bg-gray-600 p-6 rounded-2xl shadow-md flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-28 rounded-full object-cover mb-4 shadow-lg"
              />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {member.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-300 mb-3">
                {member.role}
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {member.linkedin && (
                  <motion.a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
                  >
                    <FaLinkedin size={20} />
                  </motion.a>
                )}
                {member.twitter && (
                  <motion.a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    className="text-sky-500 hover:text-sky-700 dark:hover:text-sky-300"
                  >
                    <FaTwitter size={20} />
                  </motion.a>
                )}
                {member.github && (
                  <motion.a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    <FaGithub size={20} />
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
