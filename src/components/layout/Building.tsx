
import React from 'react';

const Building = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
      <path d="M9 22v-4h6v4"></path>
      <path d="M8 6h.01"></path>
      <path d="M16 6h.01"></path>
      <path d="M12 6h.01"></path>
      <path d="M8 10h.01"></path>
      <path d="M16 10h.01"></path>
      <path d="M12 10h.01"></path>
      <path d="M8 14h.01"></path>
      <path d="M16 14h.01"></path>
      <path d="M12 14h.01"></path>
    </svg>
  );
};

export default Building;
