import React from "react";

const LoadingState = () => {
  return (
    // <div
    //   className="relative max-w-128 mx-auto"
    //   style={{
    //     border: "1px solid red",

    //     //   minHeight: "calc(100vh - 70px)"
    //   }}
    // >
    //   <div className="after:absolute after:w-[60px] after:h-[60px] after:bottom-0 after:left-0 after:top-0 after:right-0 after:m-auto after:border-8 after:border-solid after:border-transparent after:rounded-full after:border-x-[#0064EB] after:border-t-[#0064EB]"></div>
    // </div>
    <div
      className="h-full flex items-center justify-center"
      //   style={{ border: "1px solid red" }}
    >
      <div
        className="inline-block h-14 w-14 animate-spin rounded-full border-8 border-solid border-blue border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingState;
