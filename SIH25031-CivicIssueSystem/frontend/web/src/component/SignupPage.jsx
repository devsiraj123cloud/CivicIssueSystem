import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Users } from 'lucide-react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const mountRef = useRef(null);
  const navigate = useNavigate();

  // 3D Background Animation Setup
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      navigate('/Hhome');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-screen relative overflow-hidden">
      {/* 3D Background */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}
      />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen w-full bg-gradient-to-br from-slate-900/20 to-purple-900/30 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-4xl  max-h-[700px] bg-white/95  backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Welcome Message */}
            <div className="lg:w-2/5 bg-gradient-to-br from-blue-600 to-purple-700 p-12 text-white relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="mb-8">
                  <Users className="w-16 h-16 mb-6 opacity-90" />
                  <h2 className="text-4xl font-bold mb-4">Join CivicTech</h2>
                  <p className="text-xl opacity-90 leading-relaxed">
                    Be part of the solution. Help make your community better by reporting issues and tracking their resolution.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-white/80 rounded-full mr-4"></div>
                    <span>Report civic issues instantly</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-white/80 rounded-full mr-4"></div>
                    <span>Track resolution progress</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-white/80 rounded-full mr-4"></div>
                    <span>Connect with your community</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-white/80 rounded-full mr-4"></div>
                    <span>Make a real difference</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-32 h-32 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-16 right-20 w-20 h-20 border border-white/20 rounded-full"></div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="lg:w-3/5 p-12 bg-white/90 backdrop-blur-sm">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                  <p className="text-gray-600">Fill in your details to get started</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/90"
                          placeholder="First name"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/90"
                          placeholder="Last name"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/90"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/90"
                        placeholder="Enter your phone"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/90"
                          placeholder="Create password"
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

                  {/* Terms checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                      required
                    />
                    <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                      I agree to the <span className="text-purple-600 font-medium">Terms of Service</span> and <span className="text-purple-600 font-medium">Privacy Policy</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </button>

                  {/* Login Link */}
                  <div className="text-center">
                    <span className="text-gray-600">Already have an account? </span>
                    <button 
                      type="button"
                      onClick={() => navigate('/')} 
                      className="text-purple-600 hover:text-purple-800 font-medium"
                    >
                      Sign in here
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;