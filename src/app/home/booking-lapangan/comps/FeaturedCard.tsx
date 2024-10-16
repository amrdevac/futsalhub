import React from 'react';

type FeaturedCardProps = {
  image: string;
  title: string;
  location: string;
};

const FeaturedCard: React.FC<FeaturedCardProps> = ({ image, title, location }) => {
  return (
    <div className="card w-60 bg-base-100 shadow-md overflow-hidden">
      <figure>
        <img src={image} alt={title} className="w-full h-40 object-cover" />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base">{title}</h2>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
    </div>
  );
};

export default FeaturedCard;
