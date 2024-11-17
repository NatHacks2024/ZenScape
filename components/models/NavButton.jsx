import React from 'react'
import { Music, Activity , HeartPulse, Wind,LoaderPinwheel} from "lucide-react"; // Import only the required icons


export const getIcon = (icon) => {
  switch (icon) {
    case "music":
      return <Music className="w-full h-auto" strokeWidth={1.5} />;
    //case "activity":
    //  return <Activity className="w-full h-auto" strokeWidth={1.5} />;
    //case "heart-pulse":
    //  return <HeartPulse className="w-full h-auto" strokeWidth={1.5} />;
    //case "wind":
    //  return <Wind className="w-full h-auto" strokeWidth={1.5} />;
    //case "loader-pinwheel":
    //  return <LoaderPinwheel className="w-full h-auto" strokeWidth={1.5} />;
    default:
      return null;
  }
};

export default getIcon;