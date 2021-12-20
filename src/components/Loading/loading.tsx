import React, { FC } from "react";
import "./loading.style.scss";

const Loading: FC = () => {
   return (
      <div className="loading">
         <div className="dot-falling"></div>
      </div>
   );
};

export default Loading;
