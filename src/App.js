import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Check, Code, Wrench, Terminal, Database } from 'lucide-react';

const skills = [
  { 
    category: "Testing", 
    items: ["Manual Testing", "API Testing", "GraphQL", "Mobile Testing", "Exploratory Testing", "Regression Testing", "Performance Testing", "UAT"]
  },
  { 
    category: "Tools", 
    items: ["Jira Xray", "Postman", "Cypress", "Git", "Browserstack", "Tera Term"]
  },
  { 
    category: "Technologies", 
    items: ["RTLS Systems", "AI/LLM Testing", "Windows Server", "Linux", "REST APIs", "Web Applications"]
  },
  { 
    category: "Scripting", 
    items: ["Python", "JavaScript", "MySQL"]
  }
];

const projects = [
  {
    title: "RTLS Product Testing",
    description: "Contributing to QA efforts for a Real-Time Location System (RTLS) product with complex hardware-software integration.",
    highlights: [
      "Testing of proprietary gateways and third-party tags",
      "End-to-end validation of KKM sensors integration",
      "Working with Jira Xray test management system"
    ],
    ongoing: true
  },
  {
    title: "HRMS Application Testing",
    description: "Multi-platform testing of Human Resource Management System across web and mobile interfaces.",
    highlights: [
      "Cross-platform testing (iOS/Android/Web)",
      "GraphQL API validation",
      "AI/LLM feature testing for accuracy and performance"
    ],
    ongoing: true
  },
  {
    title: "iGaming Platform QA",
    description: "Quality assurance for a major gambling platform and casino games.",
    highlights: [
      "End-to-end functional testing of casino platform",
      "Black box testing of slot machine games",
      "Python automation for data manipulation tasks"
    ],
    ongoing: false
  }
];

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/paul-wagner-resume.pdf';
    link.download = 'paul-wagner-resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div 
        className="fixed inset-0 bg-gray-900"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, rgba(17, 24, 39, 0) 50%)`,
          transition: 'all 0.3s ease'
        }}
      />

      <header className="relative bg-gray-800 shadow-lg border-b border-blue-500">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-100 hover:text-blue-400 transition-all duration-300">
              Paul Wagner
            </h1>
            <div className="flex gap-4">
              <a href="https://linkedin.com/in/silviuwagner" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-gray-200 transition-all duration-300">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:silviu.wagner@gmail.com" 
                className="text-gray-400 hover:text-gray-200 transition-all duration-300">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className={`relative max-w-6xl mx-auto px-4 py-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>

        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-100 mb-4">QA Engineer</h2>
          <p className="text-xl text-gray-400 mb-8">
            Technically adept QA Engineer with experience in manual testing, bug tracking, and API validation.
          </p>
          <div className="flex justify-center gap-4">
            <a href="mailto:silviu.wagner@gmail.com" className="fancy">
              Open for Contract Work
            </a>
            <button 
              onClick={handleDownloadResume}
              className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-800 hover:text-white transition-all duration-300"
            >
              Download Resume
            </button>
          </div>
          <p className="text-gray-400 mt-2 text-xs">Available for part-time or hourly engagements</p>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">Skills & Abilities</h3>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-blue-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {skills.map((skillSet) => (
                <div key={skillSet.category} className="hover:bg-gray-700 p-4 rounded-lg transition-all duration-300">
                  <h4 className="font-semibold text-gray-100 mb-2 flex items-center">
                    {skillSet.category === "Testing" && <Code className="w-5 h-5 text-blue-500 mr-2" />}
                    {skillSet.category === "Tools" && <Wrench className="w-5 h-5 text-blue-500 mr-2" />}
                    {skillSet.category === "Technologies" && <Database className="w-5 h-5 text-blue-500 mr-2" />}
                    {skillSet.category === "Scripting" && <Terminal className="w-5 h-5 text-blue-500 mr-2" />}
                    {skillSet.category}
                  </h4>
                  <ul className="space-y-1">
                    {skillSet.items.map((skill) => (
                      <li key={skill} className="text-gray-400 flex items-center">
                        <span className="w-2 h-0.5 bg-blue-500 mr-2"></span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">Featured Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.title} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-blue-500 hover:bg-gray-700 transition-all duration-300">
                <div className="flex items-center mb-3">
                  <h4 className="text-xl font-semibold text-gray-100">{project.title}</h4>
                  {project.ongoing && (
                    <div className="glowing-button ml-2">
                      <p className="ongoing">on going</p>
                    </div>
                  )}
                </div>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <ul className="space-y-2">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center text-gray-400">
                      <Check style={{ width: '16px', height: '16px' }} className="text-blue-500 mr-2" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">Web Projects</h3>
          <p className="text-gray-400 mb-6">
            I explore web development to sharpen my skills and enhance my QA expertise through real-world projects. I’ve created presentation websites and e-commerce platforms for small businesses. Below are some of my web projects:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a 
              href="https://augustin-machinery.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative block"
              onMouseEnter={() => setHoveredProject('augustin')}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <img src="/web-portfolio/augustin_top.jpg" alt="Augustin Machinery" className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" />
              {hoveredProject === 'augustin' && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 rounded-lg">
                  <div className="text-gray-100 text-left animate-text p-4 bg-gray-800 bg-opacity-90 rounded-lg">
                    <p className="mb-2">The website of Augustin Machinery is a presentation platform with e-commerce functionalities.</p>
                    <p className="mb-4">The site combines the company's presentation functionality with e-commerce capabilities, allowing customers to efficiently explore and find the right machinery for their needs.</p>
                    <h4 className="font-bold mb-2">Specifications</h4>
                    <ul className="list-disc list-inside mb-4">
                      <li>Presentation pages</li>
                      <li>Contact form</li>
                      <li>Product catalog</li>
                      <li>Versatile menu</li>
                    </ul>
                  </div>
                </div>
              )}
            </a>
            <a href="https://marmuse.ro/" target="_blank" rel="noopener noreferrer" className="block">
              <img src="/web-portfolio/marmuse_top.jpg" alt="Marmuse" className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" />
            </a>
            <a href="http://casapianului.ro/" target="_blank" rel="noopener noreferrer" className="block">
              <img src="/web-portfolio/casapianului_top.jpg" alt="Casa Pianului" className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" />
            </a>
            <a href="https://luna-residence.ro/" target="_blank" rel="noopener noreferrer" className="block">
              <img src="/web-portfolio/luna_top.jpg" alt="Luna Residence" className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" />
            </a>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">Get in Touch</h3>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-blue-500">
            <p className="text-gray-400 mb-6">
              Interested in discussing QA opportunities or collaboration? Feel free to reach out!
            </p>
            <div className="flex gap-4">
              <a href="mailto:silviu.wagner@gmail.com" className="flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300">
                <Mail className="w-5 h-5 mr-2" />
                silviu.wagner@gmail.com
              </a>
              <a href="https://linkedin.com/in/silviuwagner" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300">
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn Profile
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}