import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-row w-full h-full justify-center">
      <div className="flex flex-row pt-[20%]">
        <Loader className="h-12 w-12 animate-spin justify-center" />
      </div>
    </div>
  );
};

export default Loading;
