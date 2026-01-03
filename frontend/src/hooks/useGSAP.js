import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useGSAP = () => {
  const elementRef = useRef(null);

  const animateIn = (element, options = {}) => {
    const defaults = {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out'
    };

    return gsap.from(element, { ...defaults, ...options });
  };

  const animateOut = (element, options = {}) => {
    const defaults = {
      opacity: 0,
      y: -50,
      duration: 0.6,
      ease: 'power3.in'
    };

    return gsap.to(element, { ...defaults, ...options });
  };

  const fadeIn = (element, options = {}) => {
    return gsap.from(element, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      ...options
    });
  };

  const scaleIn = (element, options = {}) => {
    return gsap.from(element, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      ...options
    });
  };

  const slideIn = (element, direction = 'left', options = {}) => {
    const directionMap = {
      left: { x: -100 },
      right: { x: 100 },
      top: { y: -100 },
      bottom: { y: 100 }
    };

    return gsap.from(element, {
      ...directionMap[direction],
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      ...options
    });
  };

  const staggerIn = (elements, options = {}) => {
    return gsap.from(elements, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      ...options
    });
  };

  const parallax = (element, speed = 0.5) => {
    gsap.to(element, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  };

  const createScrollTrigger = (element, options = {}) => {
    return ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      ...options
    });
  };

  return {
    elementRef,
    animateIn,
    animateOut,
    fadeIn,
    scaleIn,
    slideIn,
    staggerIn,
    parallax,
    createScrollTrigger,
    gsap,
    ScrollTrigger
  };
};

export default useGSAP;