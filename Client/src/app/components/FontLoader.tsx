"use client";

import { useEffect } from "react";

export default function FontLoader() {
  useEffect(() => {
    // Add preconnect links
    const preconnect1 = document.createElement("link");
    preconnect1.rel = "preconnect";
    preconnect1.href = "https://fonts.googleapis.com";
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement("link");
    preconnect2.rel = "preconnect";
    preconnect2.href = "https://fonts.gstatic.com";
    preconnect2.crossOrigin = "anonymous";
    document.head.appendChild(preconnect2);

    // Add font stylesheet
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      // Cleanup on unmount
      document.head.removeChild(preconnect1);
      document.head.removeChild(preconnect2);
      document.head.removeChild(link);
    };
  }, []);

  return null;
}
