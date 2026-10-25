import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert, Menu, X, Cpu, Eye, ExternalLink, Activity } from 'lucide-react';
import { FloorGuardLogo } from '../branding/FloorGuardLogo';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isSecurityCenter = location.pathname === '/security';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '/#overview' },
    { label: 'Security Gap', href: '/#gap' },
    { label: 'How It Works', href: '/#workflow' },
    { label: 'Hardware', href: '/#hardware' },
    { label: 'Architecture', href: '/#architecture' },
    { label: 'Applications', href: '/#applications' },
    { label: 'Cost Est.', href: '/#cost' },
    { label: 'Team', href: '/#team' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg-primary/95 backdrop-blur-md border-b border-border shadow-xl shadow-black/20 py-2.5'
          : 'bg-bg-primary/80 backdrop-blur-sm border-b border-border/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="focus:outline-none focus:ring-2 focus:ring-cyan rounded-lg p-1">
            <FloorGuardLogo variant="full" size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {!isSecurityCenter ? (
              navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-text-secondary hover:text-cyan transition-colors tracking-wide"
                >
                  {link.label}
                </a>
              ))
            ) : (
              <Link
                to="/"
                className="text-sm font-medium text-text-secondary hover:text-cyan transition-colors tracking-wide flex items-center gap-1.5"
              >
                ← Back to Project Presentation
              </Link>
            )}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {isSecurityCenter ? (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-bg-card border border-cyan/30 rounded-lg text-xs font-mono text-cyan">
                <Activity className="w-3.5 h-3.5 animate-pulse text-cyan" />
                <span>MONITORING CONSOLE ACTIVE</span>
              </div>
            ) : (
              <Link to="/security">
                <Button variant="cyan" size="sm" icon={<ShieldAlert className="w-4 h-4" />}>
                  Open Security Center
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link to="/security" className="sm:hidden">
              <Button variant="cyan" size="sm">
                Security
              </Button>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-bg-elevated border border-border text-text-secondary hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-border/80 pb-3 flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                !isSecurityCenter ? 'bg-bg-elevated text-cyan' : 'text-text-secondary'
              }`}
            >
              Home Page
            </Link>

            <Link
              to="/security"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                isSecurityCenter ? 'bg-cyan/15 text-cyan border border-cyan/40' : 'text-text-secondary'
              }`}
            >
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Face Recognition Security Center
              </span>
              <span className="text-[10px] bg-cyan/20 px-2 py-0.5 rounded text-cyan font-mono">LIVE CV</span>
            </Link>

            <div className="border-t border-border/40 my-1 pt-1">
              <span className="text-[11px] font-mono uppercase text-text-muted px-3">Sections</span>
              <div className="grid grid-cols-2 gap-1 mt-1">
                {navLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-3 py-1.5 text-xs text-text-secondary hover:text-cyan hover:bg-bg-card rounded"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
