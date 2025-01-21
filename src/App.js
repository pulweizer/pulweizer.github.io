import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Check, Code, Wrench, Terminal, Database } from 'lucide-react';
import { trackPageView } from './analytics';

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
  const [clickedProject, setClickedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
  
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    trackPageView(window.location.pathname + window.location.search);
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/paul-wagner-resume.pdf';
    link.download = 'paul-wagner-resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleMouseEnter = (project) => {
    if (!isMobile) {
      setHoveredProject(project);
    }
  };
  
  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredProject(null);
    }
  };
  
  const handleClick = (project, url) => {
    if (isMobile) {
      if (clickedProject === project) {
        window.open(url, '_blank');
      } else {
        setClickedProject(project);
      }
    } else {
      window.open(url, '_blank');
    }
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
                  <div className="inline-flex items-center justify-center px-1 py-0.5 ml-2 bg-green-500/60 text-gray-100 rounded-sm shadow-sm animate-subtle-pulse ring-1 ring-green-400/30">
                    <p className="text-[11px] uppercase tracking-tight font-medium" style={{textShadow: '0 0 8px rgba(0,0,0,0.2)'}}>on going</p>
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
            I explore web development to sharpen my skills and enhance my QA expertise through real-world projects. I've created presentation websites and e-commerce platforms for small businesses. Below are some of my web projects:
          </p>
          <div className="my-6 p-6 bg-gradient-to-r from-gray-900 to-black border border-gray-700 rounded-lg text-gray-100 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <h3 className="text-3xl font-extrabold mb-4">Featured Web App Project</h3>
            <h2 className="text-2xl font-bold inline-flex items-center gap-2 justify-center mb-2">
              <span role="img" aria-label="gamepad">🎮</span> Thrift Games
              <div className="relative inline-flex items-center justify-center px-2 py-0.5 ml-2 bg-yellow-500/80 text-gray-900 rounded-sm shadow-sm">
                <p className="text-xs uppercase">wip</p>
              </div>
            </h2>
            <p className="mb-4">
              A modern web application for <span className="brush-highlight">finding</span> the best deals on <span className="brush-highlight">used video games</span> across online marketplaces.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="py-4">
                <h4 className="font-bold mb-2">🚀 Features</h4>
                <ul className="list-disc list-inside mb-4 line-list">
                  <li>Real-time game search across eBay listings</li>
                  <li>Detailed game information from RAWG API</li>
                  <li>Price averages and <span className="line-through">market analytics</span></li>
                  <li>Mobile-responsive design</li>
                  <li>Gaming-inspired UI/UX elements</li>
                  <li>Platform-specific <span className="line-through">filters</span> and sorting</li>
                </ul>
              </div>
              <div className="py-4">
                <h4 className="font-bold mb-2">💻 Tech Stack</h4>
                <ul className="list-disc list-inside mb-4 line-list">
                  <li>Frontend: Next.js 14, React, TypeScript</li>
                  <li>Styling: Tailwind CSS</li>
                  <li>APIs: RAWG, eBay</li>
                  <li>Deployment: Vercel</li>
                </ul>
              </div>
            </div>
            <a
              href="https://thrift.games"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 rounded-md border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group"
            >
              <span className="text-sm font-medium">Live Website:</span>
              <span className="text-blue-400 font-mono text-sm">thrift.games</span>
              <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <a 
              href="https://augustin-machinery.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative block"
              onMouseEnter={() => handleMouseEnter('augustin')}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => {
                e.preventDefault();
                handleClick('augustin', 'https://augustin-machinery.com/');
              }}
            >
              <img 
                src="/web-portfolio/augustin_top.jpg" 
                alt="Augustin Machinery" 
                className={`w-full h-auto rounded-lg shadow-lg transition-all duration-300 ${hoveredProject === 'augustin' || clickedProject === 'augustin' ? 'blur-darken' : ''}`} 
              />
              {(hoveredProject === 'augustin' || clickedProject === 'augustin') && (
                <div className="absolute inset-0 flex items-center justify-center p-4 rounded-lg">
                  <div className="text-gray-100 text-left animate-text p-4">
                    <p className="mb-2">Augustin Machinery is a presentation platform with e-commerce functionalities.</p>
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