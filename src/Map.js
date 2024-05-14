import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import Legend from "./components/Legend";
// import Optionsfield from "./components/Optionsfield";
import "./Map.css";
import data from "./data.json";
import Blog, { BlogDescription } from "./components/Blog";

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJpeWFtMjAwMjE5OTUiLCJhIjoiY2x3NHFqeXk4MTRjYTJrbGMzbGpuZzhvYyJ9.coENWdeCBCqRTxmxtCqukw";

const Map = () => {
  const options = [
    {
      name: "GP Presence",
      description: "Countries where GP is Operational",
      property: "pop_est",
      stops: [
        [0, "#98FB98"],
        [1000, "#0000FF"],
      ],
    },
    {
      name: "GDP",
      description: "Estimate total GDP in millions of dollars",
      property: "gdp_md_est",
      stops: [
        [0, "#98FB98"],
        [1000, "#0000FF"],
      ],
    },
  ];
  const mapContainerRef = useRef(null);
  const activeRef = useRef(options[0]);
  const [active, setActive] = useState(options[0]);
  const [map, setMap] = useState(null);
  const [showBlog, setShowBlog] = useState(false);
  const [userInteracting, setUserInteracting] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [newLang, setNewLang] = useState(0);
  const [blogDescription, setBlogDescription] = useState("");

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [10.4515, 51.1657],
      zoom: 2,
      projection: "globe",
    });

    map.on("load", () => {
      map.setFog({
        color: "rgb(90, 188, 216)", // Lower atmosphere
        "high-color": "rgb(36, 92, 223)", // Upper atmosphere
        "horizon-blend": 0.02, // Atmosphere thickness (default 0.2 at low zooms)
        "space-color": "rgb(11, 11, 25)", // Background color
        "star-intensity": 0.9, // Background star brightness (default 0.35 at low zoooms )
      });

      map.addSource("countries", {
        type: "geojson",
        data,
      });

      map.setLayoutProperty("country-label", "text-field", [
        "format",
        ["get", "name_en"],
        { "font-scale": 1.2 },
        "\n",
        {},
        ["get", "name"],
        {
          "font-scale": 0.8,
          "text-font": [
            "literal",
            ["DIN Offc Pro Italic", "Arial Unicode MS Regular"],
          ],
        },
      ]);

      map.addLayer(
        {
          id: "country-fills",
          type: "fill",
          source: "countries",
        },
        "country-label"
      );

      map.setPaintProperty("country-fills", "fill-color", {
        property: active.property,
        stops: active.stops,
      });

      // Add country borders
      map.addLayer({
        id: "country-borders",
        type: "line",
        source: "countries",
        layout: {},
        paint: {
          "line-color": "#FFFFFF",
          "line-width": 1,
        },
      });

      // Add country hover layer
      map.addLayer({
        id: "country-fills-hover",
        type: "fill",
        source: "countries",
        layout: {},
        paint: {
          "fill-color": "#000000",
          "fill-opacity": 0.2,
        },
        filter: ["==", "name", ""],
      });

      // Add country hover effect
      map.on("mousemove", (e) => {
        console.log("mousemove");
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["country-fills"],
        });

        if (features.length) {
          map.getCanvas().style.cursor = "pointer";
          map.setFilter("country-fills-hover", [
            "==",
            "name",
            features[0].properties.name,
          ]);
        } else {
          map.setFilter("country-fills-hover", ["==", "name", ""]);
          map.getCanvas().style.cursor = "";
        }
      });

      map.on("mousedown", () => {
        console.log("mousedown");
        setUserInteracting(true);
      });

      map.on("mouseup", () => {
        console.log("mouseup");
        setUserInteracting(false);
      });

      // Add country un-hover effect
      map.on("mouseout", () => {
        console.log("mouseout");
        map.getCanvas().style.cursor = "auto";
        map.setFilter("country-fills-hover", ["==", "name", ""]);
      });

      map.on("click", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["country-fills"],
        });
        if (!features.length) return;
        const { properties } = features[0];
        // const { property, description } = activeRef.current;
        // alert(`(${properties.name}) ${properties[property]} ${description}`);
        setBlogTitle(`${properties.name}`);
        setBlogDescription(BlogDescription);
        setShowBlog(true);
      });

      setMap(map);
    });

    // Clean up on unmount
    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spinGlobe = () => {
    const secondsPerRevolution = 120;
    const maxSpinZoom = 8;
    const slowSpinZoom = 1;
    const zoom = map.getZoom();
    if (!userInteracting && zoom < maxSpinZoom) {
      let distancePerSecond = 360 / secondsPerRevolution;
      if (zoom > slowSpinZoom) {
        const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
        distancePerSecond *= zoomDif;
      }
      const center = map.getCenter();
      center.lng -= distancePerSecond;
      map.easeTo({ center, duration: 1000, easing: (n) => n });
      setTimeout(function () {
        setNewLang(center.lng);
      }, 1000);
    }
  };

  useEffect(() => {
    if (map && !userInteracting) {
      spinGlobe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, userInteracting, newLang]);

  useEffect(() => {
    paint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const paint = () => {
    if (map) {
      map.setPaintProperty("country-fills", "fill-color", {
        property: active.property,
        stops: active.stops,
      });
      activeRef.current = active;
    }
  };

  // const changeState = (i) => {
  //   setActive(options[i]);
  //   map.setPaintProperty("country-fills", "fill-color", {
  //     property: active.property,
  //     stops: active.stops,
  //   });
  // };

  const onBlogClose = () => {
    setBlogTitle("");
    setBlogDescription("");
    setShowBlog(false);
  };

  return (
    <div>
      <div ref={mapContainerRef} className="map-container" />
      <Legend active={active} stops={active.stops} />
      {showBlog && (
        <Blog
          title={blogTitle}
          description={blogDescription}
          onClose={onBlogClose}
        />
      )}
      {/* <Blog/> */}
      {/* <Optionsfield
        options={options}
        property={active.property}
        changeState={changeState}
      /> */}
    </div>
  );
};

export default Map;
