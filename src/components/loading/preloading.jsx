import { memo } from "react";
import "./style.scss";


const Preloading = () => {
  return (
    <div className="splash-screen w-full h-full">
 <div className="flex items-center justify-center h-screen">
  <h1 className="text-purple-900 text-6xl font-bold">InnoLink</h1>
</div>


      <span className="meta-logo absolute bottom-0 left-2/4">
        <div> Made by Smriti_</div>
      </span>
    </div>
  );
};

export default memo(Preloading);
