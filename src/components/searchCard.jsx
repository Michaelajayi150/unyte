import { useState } from "react";
import ExpandedCard from "./expandedCard";

/* eslint-disable react/prop-types */
function SearchCard({ name, image, desc, item, clickable }) {
  const [modal, setModal] = useState(false);

  const handleSelect = () => clickable && setModal((prev) => !prev);

  return (
    <>
      <figure
        className="space-y-3 bg-gray-700 text-white dark:bg-white dark:text-black pb-4 rounded text-xs text-start overflow-hidden cursor-pointer"
        onClick={handleSelect}
        title={name}
      >
        <img src={image} alt={name} />
        <figcaption className="px-4">
          <h2 className="tough-text text-base truncate">{name}</h2>
          <p className={clickable ? "line-clamp-3" : ""}>{desc}</p>
        </figcaption>
      </figure>
      {modal && clickable && (
        <ExpandedCard handleSelect={handleSelect} {...item} />
      )}
    </>
  );
}

export default SearchCard;
