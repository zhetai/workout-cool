"use client";

import { event } from "./fb-pixel";

export const FacebookPixelTest = () => {
  const handleClick = () => {
    event("test");
  };

  return (
    <button className="h w-full bg-gray-600" onClick={handleClick}>
      test
    </button>
  );
};
