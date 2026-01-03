import { useEffect } from 'react';
import gsap from 'gsap';

const use3DTransitions = () => {
  const create3DCard = (element, options = {}) => {
    const card = element;
    
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power2.out'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  };

  const depth3DEffect = (element, depth = 50) => {
    gsap.set(element, {
      transformStyle: 'preserve-3d',
      perspective: 1000
    });

    return gsap.to(element, {
      z: depth,
      duration: 0.6,
      ease: 'power2.out',
      paused: true
    });
  };

  const rotateOnScroll = (element, rotationAmount = 360) => {
    gsap.to(element, {
      rotateY: rotationAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  };

  const colorTransitionOnScroll = (element, fromColor, toColor) => {
    gsap.to(element, {
      backgroundColor: toColor,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top center',
        end: 'bottom center',
        scrub: true
      }
    });
  };

  const perspectiveShift = (element, options = {}) => {
    const defaults = {
      rotateX: 15,
      rotateY: 15,
      z: 50,
      duration: 1,
      ease: 'power3.out'
    };

    gsap.set(element, {
      transformStyle: 'preserve-3d',
      perspective: 1000
    });

    return gsap.from(element, { ...defaults, ...options });
  };

  const layeredDepth = (elements, baseDepth = 0, increment = 30) => {
    elements.forEach((element, index) => {
      gsap.set(element, {
        z: baseDepth + (index * increment),
        transformStyle: 'preserve-3d'
      });
    });
  };

  const morphingGradient = (element, colors = []) => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    colors.forEach((color, index) => {
      if (index < colors.length - 1) {
        timeline.to(element, {
          background: `linear-gradient(135deg, ${color}, ${colors[index + 1]})`,
          duration: 1
        });
      }
    });

    return timeline;
  };

  return {
    create3DCard,
    depth3DEffect,
    rotateOnScroll,
    colorTransitionOnScroll,
    perspectiveShift,
    layeredDepth,
    morphingGradient
  };
};

export default use3DTransitions;