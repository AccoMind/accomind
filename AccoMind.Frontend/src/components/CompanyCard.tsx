import React from 'react';
import LogoCard from '../components/LogoCard';

interface LogoCardProps {
  logoText: string;
}

const CompanyCard: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-6">
      {/* Logo Section */}
      <LogoCard logoText="Abans" />

      {/* Company Info Section */}
      <div className="flex-1">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">ABANS ELECTRICALS PLC</h1>
          <p className="text-sm text-gray-500">Electricals and Engineering . Since 2010</p>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-6">
          Abans PLC is a leading Sri Lankan conglomerate, renowned for its diverse portfolio of businesses spanning across retail, distribution,
          manufacturing, and services. With a strong presence in the electronics, home appliances, furniture, and consumer goods sectors, Abans
          PLC is committed to delivering high-quality products and innovative solutions to its customers.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {/* Stock Price */}
          <div className="bg-purple-100 text-center rounded-lg p-4">
            <p className="text-lg font-bold text-gray-900">156</p>
            <p className="text-xs text-purple-600">+15.03% 📈</p>
            <p className="text-sm text-gray-500">Current Stock Price</p>
          </div>

          {/* Return on Investment */}
          <div className="bg-blue-100 text-center rounded-lg p-4">
            <p className="text-lg font-bold text-gray-900">3.6</p>
            <p className="text-xs text-red-600">-0.03% 📉</p>
            <p className="text-sm text-gray-500">Return on Investment</p>
          </div>

          {/* Active Users */}
          <div className="bg-blue-100 text-center rounded-lg p-4">
            <p className="text-lg font-bold text-gray-900">2,318</p>
            <p className="text-xs text-green-600">+6.08% 📈</p>
            <p className="text-sm text-gray-500">Active Users</p>
          </div>

          {/* Views */}
          <div className="bg-blue-100 text-center rounded-lg p-4">
            <p className="text-lg font-bold text-gray-900">7,265</p>
            <p className="text-xs text-green-600">+11.01% 📈</p>
            <p className="text-sm text-gray-500">Views</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
