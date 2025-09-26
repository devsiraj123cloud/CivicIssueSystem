import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import civiclogo from "../assets/civic.png";
import { 
  Construction, 
  Lightbulb, 
  Trash2, 
  TreePine, 
  Menu, 
  X, 
  ArrowUp,
  MapPin,
  Clock,
  TrendingUp,
  Shield,
  User,
  UserPlus
} from 'lucide-react';
import * as THREE from 'three';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const mountRef = useRef(null);
  const navigate = useNavigate();

  const sections = [
    {
      id: 'infrastructure',
      title: 'Infrastructure Issues',
      description: 'Report and track road repairs, bridge maintenance, and construction problems',
      icon: <Construction className="w-8 h-8" />,
      gradient: 'from-blue-600 to-cyan-600',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      stats: { reports: 1247, resolved: 892, pending: 355 }
    },
    {
      id: 'utilities',
      title: 'Street Lighting & Utilities',
      description: 'Fix broken streetlights, power outages, and utility service disruptions',
      icon: <Lightbulb className="w-8 h-8" />,
      gradient: 'from-yellow-200 to-orange-600',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&h=600&fit=crop',
      stats: { reports: 856, resolved: 645, pending: 211 }
    },
    {
      id: 'waste',
      title: 'Waste Management',
      description: 'Report overflowing bins, missed collections, and illegal dumping',
      icon: <Trash2 className="w-8 h-8" />,
      gradient: 'from-green-600 to-emerald-600',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop',
      stats: { reports: 673, resolved: 521, pending: 152 }
    },
    {
      id: 'environment',
      title: 'Manholes & Drainage Problems',
      description: 'Report accident risk and urban flooding issues in your area',
      icon: <TreePine className="w-8 h-8" />,
      gradient: 'from-emerald-600 to-teal-600',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      stats: { reports: 429, resolved: 368, pending: 61 }
    }
  ];

  // 3D Background Effect
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create dynamic wave geometry
    const geometry = new THREE.PlaneGeometry(50, 50, 50, 50);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x3b82f6, 
      transparent: true, 
      opacity: 0.1,
      wireframe: true 
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 3;
    scene.add(mesh);

    camera.position.set(0, 10, 20);
    camera.lookAt(0, 0, 0);

    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Animate wave
      const positions = geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const wave = Math.sin(x * 0.2 + elapsedTime) * Math.sin(y * 0.2 + elapsedTime) * 2;
        positions.setZ(i, wave);
      }
      positions.needsUpdate = true;

      mesh.rotation.z = elapsedTime * 0.1;
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      setShowScrollTop(scrollPosition > windowHeight);
      
      const sectionHeight = windowHeight;
      const currentSection = Math.floor(scrollPosition / sectionHeight);
      setActiveSection(Math.min(currentSection, sections.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (index) => {
    const targetY = index === 0 ? 0 : window.innerHeight + (index - 1) * window.innerHeight;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Fixed 3D Background */}
      <div 
        ref={mountRef} 
        className="fixed inset-0 z-0"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}
      />

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-indigo-900/20 backdrop-blur-xl border-b border-white/20 shadow-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo Section */}
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <img src={civiclogo} alt="" className='w-6 h-6 text-white'/>
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    CivicTech
                  </div>
                  <div className="text-xs text-blue-200/80 -mt-1">Dashboard</div>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(index)}
                    className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      activeSection === index 
                        ? 'text-white bg-white/20 shadow-lg' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {section.title}
                    {activeSection === index && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Right Section - Login & Mobile Menu */}
              <div className="flex items-center space-x-4">
                {/* Login Button */}
                <button
                  onClick={() => navigate('/LoginPage')}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </button>

                {/* Signup Button */}
                <button
                  onClick={() => navigate('/signup')}
                  className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="lg:hidden mt-4 pb-4 border-t border-white/20">
                <div className="space-y-1 mt-4">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(index)}
                      className={`block w-full text-left py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                        activeSection === index 
                          ? 'text-white bg-white/20' 
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                  <hr className="border-white/20 my-4" />
                  <div className="px-4">
                    <div className="text-white/60 text-sm mb-2">Account Actions</div>
                    <button 
                      onClick={() => navigate('/LoginPage')}
                      className="w-full text-left py-2 px-4 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors mb-2"
                    >
                      🔐 Login
                    </button>
                    <button 
                      onClick={() => navigate('/signup')}
                      className="w-full text-left py-2 px-4 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      📝 Sign Up
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CivicTech
              <span className="text-sm text-blue-300 block mt-2">🚀 Now with Auto-Deployments</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-3xl mx-auto">
              Empowering communities through technology. Report, track, and resolve civic issues together.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[200px]">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="w-6 h-6 mr-2 text-blue-400" />
                  <span className="text-2xl font-bold">3,205</span>
                </div>
                <div className="text-white/70">Total Reports</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[200px]">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 mr-2 text-green-400" />
                  <span className="text-2xl font-bold">2,426</span>
                </div>
                <div className="text-white/70">Resolved Issues</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[200px]">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 mr-2 text-purple-400" />
                  <span className="text-2xl font-bold">76%</span>
                </div>
                <div className="text-white/70">Resolution Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      {sections.map((section, index) => (
        <SectionComponent key={section.id} section={section} index={index} />
      ))}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-110"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

// Individual Section Component
const SectionComponent = ({ section, index }) => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2, rootMargin: '-20%' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  return (
    <section
      ref={sectionRef}
      className={`relative z-10 min-h-screen flex items-center transition-all duration-1000 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
          {/* Content Side */}
          <div className={`flex-1 text-white transform transition-all duration-800 delay-200 ${
            isInView ? 'translate-x-0 opacity-100' : `${index % 2 === 0 ? '-translate-x-24' : 'translate-x-24'} opacity-0`
          }`}>
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${section.gradient} rounded-2xl mb-6`}>
              {section.icon}
            </div>
            
            <h2 className="text-5xl font-bold mb-6">{section.title}</h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              {section.description}
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{section.stats.reports}</div>
                <div className="text-white/70">Total Reports</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{section.stats.resolved}</div>
                <div className="text-white/70">Resolved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{section.stats.pending}</div>
                <div className="text-white/70">Pending</div>
              </div>
            </div>
            
            <button className={`bg-gradient-to-r ${section.gradient} text-white px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg`}>
              Report Issue
            </button>
          </div>
          
          {/* Image Side */}
          <div className={`flex-1 relative transform transition-all duration-800 delay-400 ${
            isInView ? 'translate-x-0 opacity-100' : `${index % 2 === 0 ? 'translate-x-24' : '-translate-x-24'} opacity-0`
          }`}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={section.image} 
                alt={section.title}
                className="w-full h-96 object-cover transform hover:scale-110 transition-transform duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${section.gradient}/20 to-transparent`}></div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:scale-105 transition-transform duration-300">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {Math.round((section.stats.resolved / section.stats.reports) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Resolution Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;