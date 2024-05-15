import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import Legend from "./components/Legend";
// import Optionsfield from "./components/Optionsfield";
import "./Map.css";
import data from "./data.json";
import selectedCountries from "./selected-countries.json";
import gpCountries from "./gp-countries.json";
import resulted_Countries from "./resulted-countries.json";
import resulted_Paint from "./resulted-paint.json";
import Blog from "./components/Blog";
import gpLogo from "../src/assets/g-p-logo.svg";
import Form from "./components/Form";
import Header from "./components/Header";
import axios from "axios";
import { extractHexColors } from "./Utils";

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
  const [uiState, setUiState] = useState(0);
  const [message, setMessage] = useState("");
  const [resultedPaint, setResultedPaint] = useState({});
  const [resultedCountries, setResultedCountries] = useState([]);
  const [requestId, setRequestId] = useState("");
  const [colorList, setColorList] = useState([]);

  // useEffect(() => {
  //   const map = new mapboxgl.Map({
  //     container: mapContainerRef.current,
  //     style: "mapbox://styles/mapbox/streets-v11",
  //     center: [10.4515, 51.1657],
  //     zoom: 1.5,
  //     projection: "globe",
  //   });

  //   map.on("load", () => {
  //     map.setFog({
  //       color: "rgb(90, 188, 216)", // Lower atmosphere
  //       "high-color": "rgb(36, 92, 223)", // Upper atmosphere
  //       "horizon-blend": 0.009, // Atmosphere thickness (default 0.2 at low zooms)
  //       "space-color": "#f9f9f9", // Background color
  //       "star-intensity": 1, // Background star brightness (default 0.35 at low zoooms )
  //     });

  //     // map.addSource("countries", {
  //     //   type: "geojson",
  //     //   data,
  //     // });

  //     // add country boundaries
  //     map.addSource("countries", {
  //       type: "vector",
  //       url: "mapbox://mapbox.country-boundaries-v1", // Example vector tileset URL
  //     });

  //     map.addLayer({
  //       id: "country-boundaries",
  //       type: "line",
  //       source: "countries",
  //       "source-layer": "country_boundaries",
  //       paint: {
  //         "line-color": "#FFFFFF",
  //         "line-width": 1,
  //       },
  //     });

  //     map.addSource("gp-countries", {
  //       type: "geojson",
  //       data: {
  //         type: "FeatureCollection",
  //         features: gpCountries,
  //       },
  //     });
  //     map.addLayer({
  //       id: "gp-countries-fill",
  //       type: "fill",
  //       source: "gp-countries",
  //       paint: {
  //         "fill-color": "#0000FF",
  //         "fill-opacity": 1,
  //       },
  //     });

  //     // map.addSource("selected-countries", {
  //     //   type: "geojson",
  //     //   data: {
  //     //     type: "FeatureCollection",
  //     //     features: selectedCountries,
  //     //   },
  //     // });

  //     // map.addLayer({
  //     //   id: "selected-countries-fill",
  //     //   type: "fill",
  //     //   source: "selected-countries",
  //     //   paint: {
  //     //     "fill-color": "#0000FF",
  //     //     "fill-opacity": 1,
  //     //   },
  //     // });

  //     // map.addSource("resulted-countries", {
  //     //   type: "geojson",
  //     //   data: {
  //     //     type: "FeatureCollection",
  //     //     features: resultedCountries,
  //     //   },
  //     // });

  //     // const paints = {
  //     //   "fill-color": [
  //     //     "match",
  //     //     ["get", "name"],
  //     //     "Iran",
  //     //     "#32CD32",
  //     //     "Iraq",
  //     //     "#0000FF",
  //     //     "#98FB98",
  //     //   ],
  //     //   "fill-opacity": 1,
  //     // };

  //     // map.addLayer({
  //     //   id: "selected-countries-fill",
  //     //   type: "fill",
  //     //   source: "resulted-countries",
  //     //   paint: paints,
  //     // });

  //     // fill color to selected countries
  //     // map.addLayer({
  //     //   id: "countries-layer",
  //     //   type: "fill",
  //     //   source: {
  //     //     type: "vector",
  //     //     url: "mapbox://mapbox.country-boundaries-v1",
  //     //   },
  //     //   "source-layer": "country_boundaries",
  //     //   paint: {
  //     //     "fill-color": [
  //     //       "match",
  //     //       ["get", "iso_3166_1_alpha_3"],
  //     //       "USA",
  //     //       "#32CD32",
  //     //       "GBR",
  //     //       "#f9f9f9",
  //     //       "FRA",
  //     //       "#0000FF",
  //     //       /* Add more country ISO codes and colors here */
  //     //       /* Default color if no match */
  //     //       "#98FB98",
  //     //     ],
  //     //   },
  //     // });

  //     // map.addSource("countries", {
  //     //   type: "geojson",
  //     //   data,
  //     // });

  //     // map.setLayoutProperty("country-label", "text-field", [
  //     //   "format",
  //     //   ["get", "name_en"],
  //     //   { "font-scale": 1.2 },
  //     //   "\n",
  //     //   {},
  //     //   ["get", "name"],
  //     //   {
  //     //     "font-scale": 0.8,
  //     //     "text-font": [
  //     //       "literal",
  //     //       ["DIN Offc Pro Italic", "Arial Unicode MS Regular"],
  //     //     ],
  //     //   },
  //     // ]);

  //     // map.addLayer(
  //     //   {
  //     //     id: "country-fills",
  //     //     type: "fill",
  //     //     source: "countries",
  //     //   },
  //     //   "country-label"
  //     // );

  //     // map.setPaintProperty("country-fills", "fill-color", {
  //     //   property: active.property,
  //     //   stops: active.stops,
  //     // });

  //     // Add country borders
  //     // map.addLayer({
  //     //   id: "country-borders",
  //     //   type: "line",
  //     //   source: "countries",
  //     //   layout: {},
  //     //   paint: {
  //     //     "line-color": "#FFFFFF",
  //     //     "line-width": 1,
  //     //   },
  //     // });

  //     // Add country hover layer
  //     // map.addLayer({
  //     //   id: "country-fills-hover",
  //     //   type: "fill",
  //     //   source: "countries",
  //     //   layout: {},
  //     //   paint: {
  //     //     "fill-color": "#000000",
  //     //     "fill-opacity": 0.2,
  //     //   },
  //     //   filter: ["==", "name", ""],
  //     // });

  //     // Add country hover effect
  //     // map.on("mousemove", (e) => {
  //     //   console.log("mousemove");
  //     //   const features = map.queryRenderedFeatures(e.point, {
  //     //     layers: ["country-fills"],
  //     //   });
  //     //   if (features.length) {
  //     //     map.getCanvas().style.cursor = "pointer";
  //     //     map.setFilter("country-fills-hover", [
  //     //       "==",
  //     //       "name",
  //     //       features[0].properties.name,
  //     //     ]);
  //     //   } else {
  //     //     map.setFilter("country-fills-hover", ["==", "name", ""]);
  //     //     map.getCanvas().style.cursor = "";
  //     //   }
  //     // });

  //     map.on("mousedown", () => {
  //       console.log("mousedown");
  //       setUserInteracting(true);
  //     });

  //     map.on("mouseup", () => {
  //       console.log("mouseup");
  //       setUserInteracting(false);
  //     });

  //     // Add country un-hover effect
  //     // map.on("mouseout", () => {
  //     //   console.log("mouseout");
  //     //   map.getCanvas().style.cursor = "auto";
  //     //   map.setFilter("country-fills-hover", ["==", "name", ""]);
  //     // });

  //     map.on("click", (e) => {
  //       const features = map.queryRenderedFeatures(e.point, {
  //         layers: ["selected-countries-fill"],
  //       });
  //       if (!features.length) return;
  //       const { properties } = features[0];
  //       console.log("property click: ", properties);
  //       // const { property, description } = activeRef.current;
  //       // alert(`(${properties.name}) ${properties[property]} ${description}`);
  //       // setBlogTitle(`${properties.name}`);
  //       // setBlogDescription(BlogDescription);
  //       // setShowBlog(true);
  //       // setUserInteracting(true);
  //     });

  //     setMap(map);
  //     hideTradeMark();
  //     // setLandingPage();
  //   });

  //   // Clean up on unmount
  //   return () => map.remove();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (uiState === 0) {
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
          type: "vector",
          url: "mapbox://mapbox.country-boundaries-v1", // Example vector tileset URL
        });

        map.addLayer({
          id: "country-boundaries",
          type: "line",
          source: "countries",
          "source-layer": "country_boundaries",
          paint: {
            "line-color": "#FFFFFF",
            "line-width": 1,
          },
        });

        map.addSource("gp-countries", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: gpCountries,
          },
        });
        map.addLayer({
          id: "gp-countries-fill",
          type: "fill",
          source: "gp-countries",
          paint: {
            "fill-color": "#0000FF",
            "fill-opacity": 1,
          },
        });

        map.on("mousedown", () => {
          console.log("mousedown");
          setUserInteracting(true);
        });

        map.on("mouseup", () => {
          console.log("mouseup");
          setUserInteracting(false);
        });

        setMap(map);
        hideTradeMark();
      });

      return () => {
        if (map) {
          map.remove();
        }
      };
    } else if (uiState === 1) {
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
          type: "vector",
          url: "mapbox://mapbox.country-boundaries-v1", // Example vector tileset URL
        });

        map.addLayer({
          id: "country-boundaries",
          type: "line",
          source: "countries",
          "source-layer": "country_boundaries",
          paint: {
            "line-color": "#FFFFFF",
            "line-width": 1,
          },
        });

        map.addSource("resulted-countries", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: resultedCountries,
          },
        });

        map.addLayer({
          id: "selected-countries-fill",
          type: "fill",
          source: "resulted-countries",
          paint: resultedPaint,
        });

        map.on("mousedown", () => {
          console.log("mousedown");
          setUserInteracting(true);
        });

        map.on("mouseup", () => {
          console.log("mouseup");
          setUserInteracting(false);
        });

        map.on("click", (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["selected-countries-fill"],
          });
          if (!features.length) return;
          const { properties } = features[0];
          console.log("property click: ", properties);
          setUserInteracting(true);
          // const { property, description } = activeRef.current;
          // alert(`(${properties.name}) ${properties[property]} ${description}`);
          // setBlogTitle(`${properties.name}`);
          // setBlogDescription(BlogDescription);
          // setShowBlog(true);
          // setUserInteracting(true);
        });

        setMap(map);
        hideTradeMark();
      });

      return () => {
        if (map) {
          map.remove();
        }
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiState]);

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

  const onBlogClose = () => {
    setUiState(0);
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
    makeSubmitAPI();
    // setTimeout(function () {
    //   setSubmitting(false);
    //   setUiState(1);
    // }, 3000);
  };

  const makeSubmitAPI = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers":
          "X-Forwarded-For, Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token, gpwstoken",
      },
      body: JSON.stringify({
        role: role,
        technology: tech,
        budget: budget,
        experience: years,
      }),
    };

    fetch(
      "https://afosu85zl4.execute-api.us-west-2.amazonaws.com/searchCountryInfo",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data: ", data);
        setResultedCountries(data.countries);
        setResultedPaint(data.colorFilter);
        setMessage(data.message);
        setRequestId(data.requestId);
        const colorStr = JSON.stringify(data.colorFilter);
        let colorLst = extractHexColors(colorStr);
        colorLst.pop();
        setColorList(colorLst);
        setSubmitting(false);
        setUiState(1);
      })
      .catch((error) => {
        setSubmitting(false);
        console.log("error: ", error);
      });
  };

  return (
    <div>
      <div>
        <div ref={mapContainerRef} className="map-container" />
      </div>
      <div>
        <Legend
          uiState={uiState}
          colorList={colorList}
        />
      </div>

      <Header gpLogo={gpLogo} />

      {uiState === 0 && (
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
      )}

      {uiState === 1 && (
        <Blog
          role={role}
          tech={tech}
          budget={budget}
          years={years}
          responseMessage={message}
          onClose={onBlogClose}
        />
      )}
    </div>
  );
};

export default Map;
