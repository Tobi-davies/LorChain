// import React from 'react'
import { ImGithub } from "react-icons/im";

const Header = () => {
  return (
    <div className="bg-blue pt-3 pb-3">
      <div className="max-w-128 mx-auto text-2xl flex items-center gap-5">
        <ImGithub color="#fff" fontSize={30} />
        <input
          type="text"
          className="w-[400px] bg-white rounded-md outline-none border-none pl-3 pt-1.5 pb-1.5 text-sm"
        />
      </div>
    </div>
  );
};

export default Header;
