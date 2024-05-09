import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    window.dataLayer.push({
      event: "pageview",
      page: currentPath,
    });
  }, [location]);
};

export default usePageTracking;
