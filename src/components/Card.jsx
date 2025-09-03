import { useState, useEffect } from 'react';

const Card = ({title,description}) => {
  const [randomColor, setRandomColor] = useState('');

  function generateRandomColor() {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    return color;
  }

 
  useEffect(() => {
    setRandomColor(generateRandomColor());
  }, []);

  return (
    <div
  className="bg-gradient-to-b from-[#1E1E1E] to-[#2a2a2a] mx-1 p-6 rounded-xl shadow-lg relative transform hover:scale-[1.015] transition-all duration-300 fadeUp"
  style={{ boxShadow: `6px 0px 400px -75px ${randomColor}` }}
>
  <div
    className="w-4 h-4 rounded-full absolute -top-2 left-4 shadow-md"
    style={{ backgroundColor: randomColor }}
  ></div>

  <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
    {title}
  </h3>
  <p className="text-gray-300 text-sm leading-relaxed break-words font-light">
    {description}
  </p>
</div>

  );
};

export default Card;
