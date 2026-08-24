import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export interface LenisOptions {
  lerp?: number;
  duration?: number;
  easing?: (t: number) => number;
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
}

export interface LenisScrollEvent {
  scroll: number;
  limit: number;
  velocity: number;
  direction: number;
  progress: number;
}

export type LenisCallback = (e: LenisScrollEvent) => void;

export class LenisEngine {
  private lerpVal: number;
  private durationVal: number;
  private easingFn: (t: number) => number;
  private smoothWheel: boolean;
  private wheelMultiplier: number;

  public scroll: number = 0;
  public targetScroll: number = 0;
  public limit: number = 0;
  public velocity: number = 0;
  public direction: number = 0;
  public progress: number = 0;
  public isScrolling: boolean = false;
  public isStopped: boolean = false;

  private callbacks: Set<LenisCallback> = new Set();
  private rafId: number | null = null;
  private isDestroyed: boolean = false;

  constructor(options: LenisOptions = {}) {
    this.lerpVal = options.lerp ?? 0.1;
    this.durationVal = options.duration ?? 1.2;
    this.easingFn = options.easing ?? ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)));
    this.smoothWheel = options.smoothWheel ?? true;
    this.wheelMultiplier = options.wheelMultiplier ?? 1.0;

    this.scroll = window.scrollY || window.pageYOffset;
    this.targetScroll = this.scroll;

    this.init();
  }

  private init() {
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    window.addEventListener('wheel', this.onWheel, { passive: false });
    window.addEventListener('resize', this.onResize);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('scroll', this.onNativeScroll, { passive: true });

    this.startRaf();
  }

  public destroy() {
    this.isDestroyed = true;
    document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-scrolling', 'lenis-stopped');

    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('scroll', this.onNativeScroll);

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
  }

  public updateLimit() {
    this.limit = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );
  }

  private onResize = () => {
    this.updateLimit();
  };

  private onNativeScroll = () => {
    if (!this.isScrolling) {
      this.scroll = window.scrollY || window.pageYOffset;
      this.targetScroll = this.scroll;
    }
  };

  private onWheel = (e: WheelEvent) => {
    if (this.isStopped) return;

    // Check if event originated within a data-lenis-prevent element
    let target = e.target as HTMLElement | null;
    while (target && target !== document.body && target !== document.documentElement) {
      if (target.hasAttribute('data-lenis-prevent')) {
        return; // Allow native inner scrolling
      }
      target = target.parentElement;
    }

    if (!this.smoothWheel) return;

    e.preventDefault();

    let deltaY = e.deltaY;
    if (e.deltaMode === 1) deltaY *= 40; // Line mode
    if (e.deltaMode === 2) deltaY *= window.innerHeight; // Page mode

    deltaY *= this.wheelMultiplier;

    this.updateLimit();
    this.targetScroll = Math.max(0, Math.min(this.limit, this.targetScroll + deltaY));
  };

  private onKeyDown = (e: KeyboardEvent) => {
    if (this.isStopped) return;
    const active = document.activeElement as HTMLElement | null;
    if (
      active &&
      (active.tagName === 'INPUT' ||
        active.tagName === 'TEXTAREA' ||
        active.isContentEditable)
    ) {
      return;
    }

    let delta = 0;
    switch (e.key) {
      case 'ArrowDown':
        delta = 100;
        break;
      case 'ArrowUp':
        delta = -100;
        break;
      case 'PageDown':
        delta = window.innerHeight * 0.8;
        break;
      case 'PageUp':
        delta = -window.innerHeight * 0.8;
        break;
      case 'Space':
        delta = e.shiftKey ? -window.innerHeight * 0.8 : window.innerHeight * 0.8;
        break;
      case 'Home':
        this.scrollTo(0);
        return;
      case 'End':
        this.scrollTo(this.limit);
        return;
      default:
        return;
    }

    if (delta !== 0) {
      e.preventDefault();
      this.updateLimit();
      this.targetScroll = Math.max(0, Math.min(this.limit, this.targetScroll + delta));
    }
  };

  private startRaf() {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      if (this.isDestroyed) return;

      const deltaTime = Math.min(currentTime - lastTime, 32) / 1000;
      lastTime = currentTime;

      this.update(deltaTime);
      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  private update(_dt: number) {
    if (this.isStopped) return;

    this.updateLimit();
    const prevScroll = this.scroll;

    // Smooth Lerp Physics
    const diff = this.targetScroll - this.scroll;

    if (Math.abs(diff) < 0.2) {
      this.scroll = this.targetScroll;
      this.velocity = 0;
      if (this.isScrolling) {
        this.isScrolling = false;
        document.documentElement.classList.remove('lenis-scrolling');
      }
    } else {
      this.scroll += diff * this.lerpVal;
      this.velocity = this.scroll - prevScroll;
      this.direction = this.velocity > 0 ? 1 : this.velocity < 0 ? -1 : 0;

      if (!this.isScrolling) {
        this.isScrolling = true;
        document.documentElement.classList.add('lenis-scrolling');
      }
    }

    this.progress = this.limit > 0 ? Math.min(1, Math.max(0, this.scroll / this.limit)) : 0;

    if (Math.abs(this.velocity) > 0.01) {
      window.scrollTo(0, this.scroll);
      this.emit();
    }
  }

  public scrollTo(
    target: number | string | HTMLElement,
    options: { offset?: number; immediate?: boolean } = {}
  ) {
    this.updateLimit();
    let destination = 0;

    if (typeof target === 'number') {
      destination = target;
    } else if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) {
        destination = el.getBoundingClientRect().top + this.scroll;
      }
    } else if (target instanceof HTMLElement) {
      destination = target.getBoundingClientRect().top + this.scroll;
    }

    if (options.offset) {
      destination += options.offset;
    }

    destination = Math.max(0, Math.min(this.limit, destination));

    if (options.immediate) {
      this.scroll = destination;
      this.targetScroll = destination;
      window.scrollTo(0, destination);
      this.emit();
    } else {
      this.targetScroll = destination;
    }
  }

  public stop() {
    this.isStopped = true;
    document.documentElement.classList.add('lenis-stopped');
  }

  public start() {
    this.isStopped = false;
    document.documentElement.classList.remove('lenis-stopped');
  }

  public on(callback: LenisCallback): () => void {
    this.callbacks.add(callback);
    return () => {
      this.callbacks.delete(callback);
    };
  }

  private emit() {
    const eventData: LenisScrollEvent = {
      scroll: this.scroll,
      limit: this.limit,
      velocity: this.velocity,
      direction: this.direction,
      progress: this.progress,
    };
    this.callbacks.forEach((cb) => cb(eventData));
  }
}

const LenisContext = createContext<LenisEngine | null>(null);

export const LenisProvider: React.FC<{ children: React.ReactNode; options?: LenisOptions }> = ({
  children,
  options,
}) => {
  const [lenis, setLenis] = useState<LenisEngine | null>(null);
  const location = useLocation();
  const optionsRef = useRef(options);

  useEffect(() => {
    const instance = new LenisEngine(optionsRef.current);
    setLenis(instance);

    return () => {
      instance.destroy();
    };
  }, []);

  // Handle route change scroll top
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
};

export const useLenis = (callback?: LenisCallback) => {
  const lenis = useContext(LenisContext);

  useEffect(() => {
    if (!lenis || !callback) return;
    const unsubscribe = lenis.on(callback);
    return () => {
      unsubscribe();
    };
  }, [lenis, callback]);

  return lenis;
};
