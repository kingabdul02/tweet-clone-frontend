import React from 'react'

interface HeroModel {
    title: string;
    subtitle: string;
  }

export const Hero: React.FC<HeroModel> = ({title, subtitle}) => {
    return (
        <div className="bg-gray-800 text-white py-20 px-4">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-lg">{subtitle}</p>
        </div>
    );
}
