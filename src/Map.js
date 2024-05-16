import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import Legend from "./components/Legend";
import "./Map.css";
import gpCountries from "./gp-countries.json";
import Blog from "./components/Blog";
import gpLogo from "../src/assets/g-p-logo.svg";
import Form from "./components/Form";
import Header from "./components/Header";
import { extractHexColors } from "./Utils";

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJpeWFtMjAwMjE5OTUiLCJhIjoiY2x3NHFqeXk4MTRjYTJrbGMzbGpuZzhvYyJ9.coENWdeCBCqRTxmxtCqukw";

const Map = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [userInteracting, setUserInteracting] = useState(false);
  const [newLang, setNewLang] = useState(0);
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
  const [mapCenter, setMapCenter] = useState([10.4515, 51.1657]);
  const [spinEnabled, setSpinEnabled] = useState(true);
  const [blogFetching, setBlogFetching] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const [typedMessage, setTypedMessage] = useState("");
  const [chatSubmitting, setChatSubmitting] = useState(false);
  const [chatOn, setChatOn] = useState(false);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    if (uiState === 0) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: mapCenter,
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
        center: mapCenter,
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
          setBlogData(null);
          setChatSubmitting(false);
          setTypedMessage("");
          setChatOn(false);
          makeBlogCall(properties.iso_a3, properties.name);
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

  const makeBlogCall = (isoCode, name) => {
    console.log("makeBlogCall: ", isoCode, requestId);
    setBlogFetching(true);

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
        country: isoCode,
        query: requestId,
      }),
    };

    fetch(
      "https://afosu85zl4.execute-api.us-west-2.amazonaws.com/getBlogData",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data: ", data);
        setBlogData({
          country: name,
          details: data,
        });
        setBlogFetching(false);
        setChatList([]);
      })
      .catch((error) => {
        setBlogFetching(false);
        console.log("error: ", error);
      });
  };

  const spinGlobe = () => {
    const secondsPerRevolution = 120;
    const maxSpinZoom = 8;
    const slowSpinZoom = 1;
    const zoom = map.getZoom();
    if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
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
    if (map && !userInteracting && spinEnabled) {
      spinGlobe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, userInteracting, newLang, spinEnabled]);

  const onBlogClose = () => {
    setUiState(0);
    setUserInteracting(false);
    setSpinEnabled(true);
    setBlogData(null);
    setChatSubmitting(false);
    setTypedMessage("");
    setChatOn(false);
    setChatList([]);
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

        const coordinates = data.countries[0].geometry.coordinates;
        if (coordinates.length === 1) {
          console.log("coordinates: length 1 ", coordinates);
          const center = coordinates[0][0];
          console.log("coordinates: center ", center);
          setMapCenter(center);
        } else {
          console.log("coordinates: length > 1 ", coordinates);
          const center = coordinates[0][0][0];
          console.log("coordinates: center ", center);
          setMapCenter(center);
        }
        setSubmitting(false);
        setUserInteracting(true);
        setSpinEnabled(false);
        setUiState(1);
      })
      .catch((error) => {
        setSubmitting(false);
        console.log("error: ", error);
      });
  };

  const submitChatQuery = () => {
    setChatSubmitting(true);

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
          value: typedMessage
        }),
      };

     fetch(
       "https://afosu85zl4.execute-api.us-west-2.amazonaws.com/chatNow",
       requestOptions
     )
       .then((response) => {
         return response.json();
       })
       .then((data) => {
         console.log("data: ", data);
           const updatedList = [
             ...chatList,
             {
               isAuthor: true,
               message: typedMessage,
             },
             {
               isAuthor: false,
               message: data.req
             },
           ];
           setChatList(updatedList);
           setTypedMessage("");
           setChatSubmitting(false);
       })
       .catch((error) => {
         setChatSubmitting(false);
         console.log("error: ", error);
       });


    // setTimeout(() => {
    //   const updatedList = [
    //     ...chatList,
    //     {
    //       isAuthor: true,
    //       message: typedMessage,
    //     },
    //   ];
    //   setChatList(updatedList);
    //   setTypedMessage("");
    //   setChatSubmitting(false);
    // }, 2000);
  };

  return (
    <div>
      <div>
        <div ref={mapContainerRef} className="map-container" />
      </div>
      <div>
        <Legend uiState={uiState} colorList={colorList} />
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
          blogFetching={blogFetching}
          blogData={blogData}
          typedMessage={typedMessage}
          setTypedMessage={(t) => setTypedMessage(t)}
          chatSubmitting={chatSubmitting}
          submitChatQuery={submitChatQuery}
          chatOn={chatOn}
          setChatOn={() => setChatOn(true)}
          chatList={chatList}
        />
      )}
    </div>
  );
};

export default Map;
