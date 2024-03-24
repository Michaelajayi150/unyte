/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

function ExpandedCard({ handleSelect, name, image, desc, price, id }) {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center text-xs">
      <div
        className="bg-black top-0 bg-opacity-70 absolute w-full h-full"
        onClick={handleSelect}
      />
      <figure
        className="md:flex items-stretch max-md:pb-4 bg-gray-700 text-white dark:bg-white dark:text-black rounded text-xs text-start overflow-hidden sm:max-w-[300px] md:max-w-[450px] lg:max-w-[500px] relative z-10 mx-auto w-10/12"
        title={name}
      >
        <picture className="w-full">
          <img className="w-full h-full aspect-video" src={image} alt={name} />
        </picture>
        <figcaption className="p-4 sm:min-w-[250px] space-y-3 w-full">
          <h2 className="tough-text text-base truncate">{name}</h2>
          <p>{desc}</p>
          <p>{price}</p>
          <div className="pt-2">
            <Link
              to={`/product/compare?cid=${id}&tid=`}
              className="w-fit text-white px-4 pt-2 pb-3 cursor-pointer bg-green-600 rounded"
            >
              Compare Product
            </Link>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

export default ExpandedCard;
