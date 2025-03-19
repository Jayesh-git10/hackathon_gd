'use client';

import { useEffect, useState } from 'react';

export default function PageLoading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen after page fully loads
    if (document.readyState === 'complete') {
      setTimeout(() => setIsLoading(false), 800);
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => setIsLoading(false), 800);
      });
    }

    return () => {
      window.removeEventListener('load', () => {
        setIsLoading(false);
      });
    };
  }, []);

  return (
    <div className={`page-loading-overlay ${!isLoading ? 'hidden' : ''}`}>
      <div className="page-loading-spinner-container">
        <div className="page-loading-spinner"></div>
        <div className="page-loading-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary">
            <path d="M9.75 8.75C9.75 9.44036 9.19036 10 8.5 10C7.80964 10 7.25 9.44036 7.25 8.75C7.25 8.05964 7.80964 7.5 8.5 7.5C9.19036 7.5 9.75 8.05964 9.75 8.75Z" />
            <path d="M9.75 15.25C9.75 15.9404 9.19036 16.5 8.5 16.5C7.80964 16.5 7.25 15.9404 7.25 15.25C7.25 14.5596 7.80964 14 8.5 14C9.19036 14 9.75 14.5596 9.75 15.25Z" />
            <path d="M16.75 8.75C16.75 9.44036 16.1904 10 15.5 10C14.8096 10 14.25 9.44036 14.25 8.75C14.25 8.05964 14.8096 7.5 15.5 7.5C16.1904 7.5 16.75 8.05964 16.75 8.75Z" />
            <path d="M16.75 15.25C16.75 15.9404 16.1904 16.5 15.5 16.5C14.8096 16.5 14.25 15.9404 14.25 15.25C14.25 14.5596 14.8096 14 15.5 14C16.1904 14 16.75 14.5596 16.75 15.25Z" />
            <path d="M2.25 12C2.25 11.5858 2.58579 11.25 3 11.25H7C7.41421 11.25 7.75 11.5858 7.75 12C7.75 12.4142 7.41421 12.75 7 12.75H3C2.58579 12.75 2.25 12.4142 2.25 12Z" />
            <path d="M16.25 12C16.25 11.5858 16.5858 11.25 17 11.25H21C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75H17C16.5858 12.75 16.25 12.4142 16.25 12Z" />
            <path d="M10 12C10 11.4477 10.4477 11 11 11H13C13.5523 11 14 11.4477 14 12C14 12.5523 13.5523 13 13 13H11C10.4477 13 10 12.5523 10 12Z" />
          </svg>
          <div className="page-loading-icon-shine"></div>
        </div>
      </div>
      <div className="page-loading-logo">
        Athlete <span>Diet</span> Planner
      </div>
      <div className="page-loading-text">Loading...</div>
    </div>
  );
} 