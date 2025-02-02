import React from 'react';

interface LogoCardProps {
  logoText: string;
}

const LogoCard: React.FC<LogoCardProps> = ({ logoText }) => {
  return (
    <div className="bg-purple-700 rounded-lg flex items-center justify-center p-6 w-32 h-32 sm:w-40 sm:h-40">
      <h1 className="text-white font-bold text-2xl">{logoText}</h1>
    </div>
  );
};

export default LogoCard;