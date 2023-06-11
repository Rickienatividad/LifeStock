import React from 'react';

const Map = () => (
  <div className="map-container">
    <iframe
      title="LifeStock"
      src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=739%20Pine%20St,%20Pelion,%20SC%2029123+(LifeStock)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      style={{border: "0", width: "100%", height: "600px", frameborder: "0", scrolling: "no", marginheight: "0", marginwidth: "0"}}
      loading="lazy"
    >
      <a href="https://www.maps.ie/distance-area-calculator.html">area maps</a>
    </iframe>
  </div>
);

export default Map;


