import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Mail, Lock, Users, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const mountRef = useRef(null);
  const navigate = useNavigate(); 
  
  // Civic-themed images with descriptions
  const images = [
    {
      title: "Report Road Issues",
      description: "Help fix potholes, broken streetlights, and traffic problems",
      gradient: "from-blue-600 to-purple-600",
      icon: <MapPin className="w-16 h-16 text-white/90" />
    },
    {
      title: "Community Voice",
      description: "Your concerns matter - make your neighborhood better",
      gradient: "from-green-600 to-teal-600", 
      icon: <Users className="w-16 h-16 text-white/90" />
    },
    {
      title: "Quick Solutions",
      description: "Fast reporting leads to faster civic problem resolution",
      gradient: "from-orange-600 to-red-600",
      icon: <AlertCircle className="w-16 h-16 text-white/90" />
    },
    {
      title: "Track Progress",
      description: "Monitor the status of your reported civic issues",
      gradient: "from-indigo-600 to-purple-600",
      icon: <CheckCircle className="w-16 h-16 text-white/90" />
    }
  ];

  // 3D Background Animation Setup - Same as Signup Page
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles - Same as Signup Page
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 50;

      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i] = 0.23; colors[i + 1] = 0.51; colors[i + 2] = 0.96; // Blue
      } else if (colorChoice < 0.66) {
        colors[i] = 0.54; colors[i + 1] = 0.36; colors[i + 2] = 0.96; // Purple
      } else {
        colors[i] = 0.02; colors[i + 1] = 0.71; colors[i + 2] = 0.82; // Cyan
      }
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 30;

    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate particles
      particles.rotation.y = elapsedTime * 0.1;
      particles.rotation.x = elapsedTime * 0.05;

      // Move camera
      camera.position.x = Math.sin(elapsedTime * 0.2) * 5;
      camera.position.y = Math.cos(elapsedTime * 0.15) * 3;
      camera.lookAt(0, 0, 0);

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
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      navigate('/Hhome');
    }, 1500);
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* 3D Background */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}
      />
      
      {/* Main Content */}
      <div className="relative z-10 h-full w-full bg-gradient-to-br from-slate-900/20 to-blue-900/30 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-4xl h-full max-h-[700px] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden flex border border-white/20">
          {/* Left Side - Login Form */}
          <div className="flex-1 flex items-center justify-center p-8 relative bg-white/90 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-blue-50/50"></div>
            <div className="w-full max-w-md relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg backdrop-blur-sm">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to CivicTech</h1>
              </div>

              {/* Login Form */}
              <div className="space-y-6">
                <div className="space-y-4">
                  {/* Email Field */}
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  onClick={handleSubmit}
                  //onClick={()=>navigate("/Hhome")}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg backdrop-blur-sm"
                >
                  
                  {isLoading ? 'Signing In...' : 'Log In'}
                </button>

                {/* Sign Up Link */}
                <div className="text-center">
                  <span className="text-gray-600">Don't have an account? </span>
                  <button onClick={() => navigate('/signup')} className="text-blue-600 hover:text-blue-800 font-medium">
                    Sign up here
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="mt-8 pt-6 border-t border-gray-200/50">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Report civic issues instantly
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Track resolution progress
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Collaborate with community
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image Carousel */}
          <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-blue-900/90 to-purple-900/90 backdrop-blur-sm rounded-r-3xl">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentImageIndex 
                    ? 'opacity-100 transform scale-100' 
                    : 'opacity-0 transform scale-105'
                }`}
              >
                <div className={`h-full bg-gradient-to-br ${image.gradient}/90 flex flex-col items-center justify-center p-12 text-white relative backdrop-blur-sm`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
                    <div className="absolute bottom-20 right-16 w-24 h-24 border border-white/20 rounded-full"></div>
                    <div className="absolute top-1/2 right-8 w-16 h-16 border border-white/20 rounded-full"></div>
                  </div>
                  
                  <div className="text-center z-10">
                    <div className="mb-8 animate-pulse">
                      {image.icon}
                    </div>
                    <h2 className="text-4xl font-bold mb-6 leading-tight">
                      {image.title}
                    </h2>
                    <p className="text-xl text-white/90 max-w-md leading-relaxed">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Carousel Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 backdrop-blur-sm ${
                    index === currentImageIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
              <div 
                className="h-full bg-white transition-all duration-4000 ease-linear"
                style={{ 
                  width: `${((currentImageIndex + 1) / images.length) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

