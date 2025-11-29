"use client"

import { motion } from "framer-motion"
import TextPressure from "./TextPressure"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Brain } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Simulations", href: "/simulations" },
      { name: "Admin Portal", href: "/admin-portal" },
      { name: "Features", href: "#features" },
    ],
    resources: [
      { name: "Documentation", href: "#docs" },
      { name: "Research Papers", href: "#research" },
      { name: "Case Studies", href: "#cases" },
      { name: "API Reference", href: "#api" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Contact", href: "#contact" },
      { name: "Careers", href: "#careers" },
      { name: "Privacy Policy", href: "#privacy" },
    ],
    support: [
      { name: "Help Center", href: "#help" },
      { name: "Community", href: "#community" },
      { name: "Status", href: "#status" },
      { name: "Feedback", href: "#feedback" },
    ],
  }

  return (
    <footer className="relative bg-gradient-to-b from-[#03142d] via-[#062a4f] to-[#03142d] border-t border-white/10 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-blue-600/20" />
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "radial-gradient(circle, rgba(86,207,225,0.15) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Text Pressure Section */}
        <div className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div style={{ position: "relative", height: "200px" }}>
              <TextPressure
                text="GRANIA AI"
                flex={true}
                alpha={true}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#56cfe1"
                strokeColor="#2f80ed"
                minFontSize={48}
                scale={true}
              />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-cyan-100/80 mt-8 max-w-3xl mx-auto text-lg"
            >
              AI-Driven Severity Detection for Myasthenia Gravis in Elderly Patients
              <br />
              <span className="text-cyan-300 font-semibold">
                Empowering caregivers with intelligent neuroinformatics insights
              </span>
            </motion.p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Brain className="w-8 h-8 text-cyan-400" />
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Grania AI
                  </h3>
                </div>
                <p className="text-sm text-cyan-100/70">
                  Advanced neuromuscular disorder detection and monitoring powered by neuroinformatics.
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: Github, href: "#" },
                    { icon: Linkedin, href: "#" },
                    { icon: Twitter, href: "#" },
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.href}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-cyan-400/10 hover:bg-cyan-400/20 flex items-center justify-center transition-colors border border-cyan-400/20"
                    >
                      <social.icon className="w-5 h-5 text-cyan-400" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h4 className="font-semibold text-white mb-4 capitalize">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link, linkIdx) => (
                    <motion.li
                      key={linkIdx}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href={link.href}
                        className="text-sm text-cyan-100/70 hover:text-cyan-300 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-white/10 pt-8 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Mail, text: "contact@graniaai.health", href: "mailto:contact@graniaai.health" },
                { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
                { icon: MapPin, text: "Medical Innovation Hub, Silicon Valley", href: "#" },
              ].map((contact, idx) => (
                <motion.a
                  key={idx}
                  href={contact.href}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                >
                  <contact.icon className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-cyan-100/80">{contact.text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Target Audience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 rounded-xl p-6 mb-8 border border-cyan-400/20"
          >
            <h4 className="font-semibold text-white mb-4 text-center">Serving Healthcare Professionals</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "Neurology Clinics & Geriatric Care Centers",
                "Neuromuscular Disorders Researchers",
                "Physiotherapy & Rehabilitation Centers",
              ].map((audience, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center p-4 rounded-lg bg-white/5 border border-white/10"
                >
                  <p className="text-sm text-cyan-100/80">{audience}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-sm text-cyan-100/70">
              © {currentYear} Grania AI. All rights reserved. | Problem Statement ID: 1404
            </p>
            <div className="flex gap-6">
              <Link href="#terms" className="text-sm text-cyan-100/70 hover:text-cyan-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="#privacy" className="text-sm text-cyan-100/70 hover:text-cyan-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#cookies" className="text-sm text-cyan-100/70 hover:text-cyan-300 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
