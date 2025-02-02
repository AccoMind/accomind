import React from 'react';

interface ForecastsStatsCardProps {
  title: string;
  subtitle: string;
  stats: Array<{
    label: string;
    description: string;
  }>;
}

const ForecastsStatsCard: React.FC<ForecastsStatsCardProps> = ({ title, subtitle, stats }) => {
  return (
    <div className="border border-gray-200 rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-500 mt-2 mb-4">{subtitle}</p>
      <ul className="space-y-4 text-sm text-gray-700">
        {stats.map((stat, index) => (
          <li key={index}>
            <strong className="font-medium">{stat.label}:</strong> {stat.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForecastsStatsCard;
