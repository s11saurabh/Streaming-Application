// import React, { useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FiVideo, FiShield, FiZap, FiTrendingUp, FiUploadCloud, FiPlay } from 'react-icons/fi';
// import Navbar from '../components/Shared/Navbar';
// import Footer from '../components/Shared/Footer';
// import useAuth from '../hooks/useAuth';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import './Home.css';

// gsap.registerPlugin(ScrollTrigger);

// const Home = () => {
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const heroRef = useRef(null);
//   const featuresRef = useRef(null);

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/dashboard');
//     }
//   }, [isAuthenticated, navigate]);

//   useEffect(() => {
//     const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
//     tl.from('.hero-title', { 
//       y: 100, 
//       opacity: 0, 
//       duration: 1,
//       scale: 0.8
//     })
//     .from('.hero-subtitle', { 
//       y: 50, 
//       opacity: 0, 
//       duration: 0.8 
//     }, '-=0.5')
//     .from('.hero-actions .btn', { 
//       y: 30, 
//       opacity: 0, 
//       duration: 0.6,
//       stagger: 0.2
//     }, '-=0.3');

//     const features = gsap.utils.toArray('.feature-card');
//     const centerX = window.innerWidth / 2;
//     const centerY = window.innerHeight / 2;
//     const radius = 200;

//     features.forEach((feature, i) => {
//       const angle = (i / features.length) * Math.PI * 2;
//       const x = Math.cos(angle) * radius;
//       const y = Math.sin(angle) * radius;

//       gsap.set(feature, {
//         x: centerX + x,
//         y: centerY + y,
//       });

//       gsap.to(feature, {
//         rotation: 360,
//         duration: 20,
//         repeat: -1,
//         ease: 'none',
//         modifiers: {
//           rotation: (r) => {
//             const newAngle = (parseFloat(r) * Math.PI) / 180 + angle;
//             const newX = Math.cos(newAngle) * radius;
//             const newY = Math.sin(newAngle) * radius;
//             gsap.set(feature, { x: newX, y: newY });
//             return r;
//           }
//         }
//       });
//     });

//     gsap.to('.floating-shape', {
//       y: -30,
//       duration: 3,
//       repeat: -1,
//       yoyo: true,
//       ease: 'sine.inOut',
//     });

//   }, []);

//   const features = [
//     {
//       icon: <FiUploadCloud />,
//       title: 'Smart Video Upload',
//       description: 'Drag & drop interface with real-time progress tracking and instant processing.'
//     },
//     {
//       icon: <FiShield />,
//       title: 'AI Content Analysis',
//       description: 'Advanced sensitivity detection ensures safe, appropriate content automatically.'
//     },
//     {
//       icon: <FiZap />,
//       title: 'Lightning Streaming',
//       description: 'Adaptive quality streaming with HTTP range requests for instant playback.'
//     },
//     {
//       icon: <FiTrendingUp />,
//       title: 'Enterprise Ready',
//       description: 'Multi-tenant architecture with granular role-based access control.'
//     }
//   ];

//   return (
//     <div className="home-page">
//       <Navbar />
      
//       <section className="hero-section" ref={heroRef}>
//         <div className="hero-background">
//           <div className="floating-shape shape-1"></div>
//           <div className="floating-shape shape-2"></div>
//           <div className="floating-shape shape-3"></div>
//         </div>
        
//         <div className="container hero-content">
//           <h1 className="hero-title">
//             Professional Video Platform
//             <span className="gradient-text"> Redefined</span>
//           </h1>
//           <p className="hero-subtitle">
//             Upload, process, analyze, and stream your videos with cutting-edge technology and cinematic design.
//           </p>
//           <div className="hero-actions">
//             <Link to="/register" className="btn btn-primary btn-hero">
//               <FiPlay /> Get Started Free
//             </Link>
//             <Link to="/login" className="btn btn-outline btn-hero">
//               Sign In
//             </Link>
//           </div>
          
//           <div className="hero-demo">
//             <div className="demo-card">
//               <FiVideo className="demo-icon" />
//               <div className="demo-stats">
//                 <span className="demo-number">10K+</span>
//                 <span className="demo-label">Videos Processed</span>
//               </div>
//             </div>
//             <div className="demo-card">
//               <FiShield className="demo-icon" />
//               <div className="demo-stats">
//                 <span className="demo-number">99.9%</span>
//                 <span className="demo-label">Accuracy Rate</span>
//               </div>
//             </div>
//             <div className="demo-card">
//               <FiZap className="demo-icon" />
//               <div className="demo-stats">
//                 <span className="demo-number">2s</span>
//                 <span className="demo-label">Avg Processing</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>





//       <section className="features-section" ref={featuresRef}>
//   <div className="container">
//     <div className="section-header">
//       <h2 className="section-title">Powerful Features</h2>
//       <p className="section-subtitle">Everything you need to manage and stream your video content</p>
//     </div>
//     <div className="features-grid">
//       {features.map((feature, index) => (
//         <div key={index} className="feature-card">
//           <div className="feature-icon-wrapper">
//             <div className="feature-icon">
//               {feature.icon}
//             </div>
//           </div>
//           <h3 className="feature-title">{feature.title}</h3>
//           <p className="feature-description">{feature.description}</p>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>

//       <section className="cta-section">
//         <div className="container">
//           <div className="cta-content">
//             <h2 className="cta-title">Ready to Get Started?</h2>
//             <p className="cta-subtitle">Join thousands of users who trust our platform for their video needs</p>
//             <Link to="/register" className="btn btn-cta">
//               Create Your Account <FiPlay />
//             </Link>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Home;





















import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiVideo, FiShield, FiZap, FiTrendingUp, FiUploadCloud, FiPlay } from 'react-icons/fi';
import Navbar from '../components/Shared/Navbar';
import Footer from '../components/Shared/Footer';
import useAuth from '../hooks/useAuth';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const orbitWrapRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  // Hero animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(['.hero-title', '.hero-subtitle', '.hero-actions .btn'], { opacity: 1, clearProps: 'filter' });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-title', { y: 80, opacity: 0, duration: 0.9, scale: 0.95 })
        .from('.hero-subtitle', { y: 40, opacity: 0, duration: 0.7 }, '-=0.45')
        .from('.hero-actions .btn', { y: 20, opacity: 0, duration: 0.55, stagger: 0.18 }, '-=0.25')
        .from('.demo-card', { y: 18, opacity: 0, duration: 0.55, stagger: 0.12 }, '-=0.25');

      gsap.to('.floating-shape', {
        y: -30,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.fromTo(
        '.section-header',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
          },
        }
      );
    }, heroRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // ✅ Orbit rotation with MORE SPACE + readable cards
  useEffect(() => {
    const wrap = orbitWrapRef.current;
    if (!wrap) return;

    const cards = Array.from(wrap.querySelectorAll('.feature-card'));
    if (!cards.length) return;

    const state = {
      ang: cards.map((_, i) => (i / cards.length) * Math.PI * 2),
      spd: 0.008, // slower => readable
      r: 260,
      cx: 0,
      cy: 0,
      paused: false,
      cardW: 360,
      cardH: 260,
    };

    const isMobile = () => window.matchMedia('(max-width: 900px)').matches;

    const measure = () => {
      const b = wrap.getBoundingClientRect();
      state.cx = b.width / 2;
      state.cy = b.height / 2;

      const sample = cards[0]?.getBoundingClientRect();
      state.cardW = sample?.width || 360;
      state.cardH = sample?.height || 260;

      // ✅ Bigger radius so overlap never happens
      const minR = Math.max(
        (state.cardW * cards.length) / (2 * Math.PI) + 70, // based on circumference
        Math.max(state.cardW, state.cardH) * 1.0 + 90      // based on card size
      );

      const maxR = Math.min(b.width, b.height) * 0.48; // container based
      state.r = Math.max(minR, maxR);
    };

    const setupPositions = () => {
      if (isMobile()) {
        gsap.set(cards, { clearProps: 'position,left,top,x,y,xPercent,yPercent,scale,zIndex' });
        return;
      }
      measure();
      gsap.set(cards, {
        position: 'absolute',
        left: 0,
        top: 0,
        xPercent: -50,
        yPercent: -50,
        willChange: 'transform',
      });
    };

    setupPositions();

    const tick = () => {
      if (state.paused || isMobile()) return;

      for (let i = 0; i < cards.length; i++) {
        state.ang[i] += state.spd;

        const x = state.cx + Math.cos(state.ang[i]) * state.r;
        const y = state.cy + Math.sin(state.ang[i]) * state.r;

        // ✅ depth: front card slightly bigger + on top
        const depth = (y - (state.cy - state.r)) / (2 * state.r); // 0..1
        const sc = 0.92 + depth * 0.12; // 0.92..1.04
        const zi = Math.round(10 + depth * 90);

        gsap.set(cards[i], { x, y, scale: sc, zIndex: zi });
      }
    };

    const onEnter = () => (state.paused = true);
    const onLeave = () => (state.paused = false);

    wrap.addEventListener('mouseenter', onEnter);
    wrap.addEventListener('mouseleave', onLeave);

    const onResize = () => setupPositions();
    window.addEventListener('resize', onResize);

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', onResize);
      wrap.removeEventListener('mouseenter', onEnter);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const features = [
    {
      icon: <FiUploadCloud />,
      title: 'Smart Video Upload',
      description: 'Drag & drop interface with real-time progress tracking and instant processing.',
    },
    {
      icon: <FiShield />,
      title: 'AI Content Analysis',
      description: 'Advanced sensitivity detection ensures safe, appropriate content automatically.',
    },
    {
      icon: <FiZap />,
      title: 'Lightning Streaming',
      description: 'Adaptive quality streaming with HTTP range requests for instant playback.',
    },
    {
      icon: <FiTrendingUp />,
      title: 'Enterprise Ready',
      description: 'Multi-tenant architecture with granular role-based access control.',
    },
  ];

  return (
    <div className="home-page" ref={heroRef}>
      <Navbar />

      <section className="hero-section">
        <div className="hero-background">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>

        <div className="container hero-content">
          <h1 className="hero-title">
            Professional Video Platform
            <span className="gradient-text"> Redefined</span>
          </h1>

          <p className="hero-subtitle">
            Upload, process, analyze, and stream your videos with cutting-edge technology and cinematic design.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-hero">
              <FiPlay /> Get Started Free
            </Link>
            <Link to="/login" className="btn btn-outline btn-hero">
              Sign In
            </Link>
          </div>

          <div className="hero-demo">
            <div className="demo-card">
              <FiVideo className="demo-icon" />
              <div className="demo-stats">
                <span className="demo-number">10K+</span>
                <span className="demo-label">Videos Processed</span>
              </div>
            </div>

            <div className="demo-card">
              <FiShield className="demo-icon" />
              <div className="demo-stats">
                <span className="demo-number">99.9%</span>
                <span className="demo-label">Accuracy Rate</span>
              </div>
            </div>

            <div className="demo-card">
              <FiZap className="demo-icon" />
              <div className="demo-stats">
                <span className="demo-number">2s</span>
                <span className="demo-label">Avg Processing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section" ref={featuresRef}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle">Everything you need to manage and stream your video content</p>
          </div>

          <div className="features-orbit-wrap" ref={orbitWrapRef}>
            <div className="orbit-center-glow"></div>

            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">{feature.icon}</div>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>

          <p className="orbit-hint">Hover to pause • On mobile it switches to a normal layout</p>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">Join thousands of users who trust our platform for their video needs</p>
            <Link to="/register" className="btn btn-cta">
              Create Your Account <FiPlay />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
