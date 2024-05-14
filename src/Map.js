import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import Legend from "./components/Legend";
// import Optionsfield from "./components/Optionsfield";
import "./Map.css";
import data from "./data.json";
import Blog from "./components/Blog";
import gpLogo from "../src/assets/g-p-logo.svg";
import Form from "./components/Form";

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
  const [role, setRole] = useState("");
  const [years, setYears] = useState("");
  const [budget, setBudget] = useState("");
  const [tech, setTech] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [10.4515, 51.1657],
      zoom: 1.5,
      projection: "globe",
    });

    map.on("load", () => {
      map.setFog({
        color: "rgb(90, 188, 216)", // Lower atmosphere
        "high-color": "rgb(36, 92, 223)", // Upper atmosphere
        "horizon-blend": 0.009, // Atmosphere thickness (default 0.2 at low zooms)
        "space-color": "#f9f9f9", // Background color
        "star-intensity": 1, // Background star brightness (default 0.35 at low zoooms )
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
        // const features = map.queryRenderedFeatures(e.point, {
        //   layers: ["country-fills"],
        // });
        // if (!features.length) return;
        // const { properties } = features[0];
        // // const { property, description } = activeRef.current;
        // // alert(`(${properties.name}) ${properties[property]} ${description}`);
        // setBlogTitle(`${properties.name}`);
        // setBlogDescription(BlogDescription);
        // setShowBlog(true);
        // setUserInteracting(true);
      });

      setMap(map);
      hideTradeMark();
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
      map.easeTo({ center, duration: 800, easing: (n) => n });
      setTimeout(function () {
        setNewLang(center.lng);
      }, 800);
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
    setUserInteracting(false);
  };

  const hideTradeMark = () => {
    const elements = document.querySelectorAll(
      ".mapboxgl-ctrl.mapboxgl-ctrl-attrib"
    );
    elements.forEach((element) => {
      element.style.display = "none";
    });

    const logos = document.querySelectorAll(".mapboxgl-ctrl-bottom-left");
    logos.forEach((element) => {
      element.style.display = "none";
    });
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(function () {
      setSubmitting(false);
    }, 3000);
  };

  return (
    <div>
      <div>
        <div ref={mapContainerRef} className="map-container" />
      </div>
      <div>
        <Legend active={active} stops={active.stops} />
      </div>

      <div
        class="absolute top"
        style={{
          height: "36px",
          width: "100%",
          backgroundColor: "#3333FF",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: 13, color: "#FFFFFF" }}>
          The best gets better! Don’t miss the latest updates to our G-P
          Meridian Core and Prime EOR packages. Learn more
        </span>
      </div>

      <div
        class="absolute top border-black/5"
        style={{
          marginTop: "36px",
          backgroundColor: "#f9f9f9",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img
          src={gpLogo}
          alt="logo"
          style={{
            width: "80px",
            height: "35px",
            cursor: "pointer",
            marginLeft: "12px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />
        <span
          class="text-grey-5 ml24"
          style={{ fontSize: 15, fontWeight: 400 }}
        >
          Spartans
        </span>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginRight: "12px",
          }}
        >
          <span
            class="text-grey-5 ml24"
            style={{ fontSize: 13, fontWeight: 400 }}
          >
            +1(888)-855-5328
          </span>
          <span
            class="text-grey-5 ml24"
            style={{ fontSize: 13, fontWeight: 400 }}
          >
            Contact Us
          </span>
          <span
            class="text-grey-5 ml24"
            style={{ fontSize: 13, fontWeight: 400 }}
          >
            Sign In
          </span>
        </div>
      </div>

      {showBlog && (
        <Blog
          title={blogTitle}
          description={blogDescription}
          onClose={onBlogClose}
        />
      )}
      <Form
        role={role}
        setRole={(t) => setRole(t)}
        years={years}
        setYears={(t) => setYears(t)}
        budget={budget}
        setBudget={(t) => setBudget(t)}
        tech={tech}
        setTech={(t) => setTech(t)}
        submitting={submitting}
        handleSubmit={handleSubmit}
      />
      {/* <Optionsfield
        options={options}
        property={active.property}
        changeState={changeState}
      /> */}
    </div>
  );
};

export default Map;
