import React from "react";

interface emptyStateProps {
  caption: string;
  Icon: any;
}

const EmptyState = ({ caption, Icon }: emptyStateProps) => {
  return (
    <div
      className="h-full flex items-center justify-center"
      style={{
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <div className="flex flex-col items-center w-48 text-center">
        <Icon className="text-primaryText text-6xl" />
        <p className="text-primaryText mt-2">{caption}</p>
      </div>
    </div>
  );
};

export default EmptyState;
