import React, { Component } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  FeatureGroup,
  Polygon,
  Polyline,
} from "react-leaflet";
import { getAllPoint, getAllPolygon, getAllLine } from "../api/index.js";

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: [-2.2625953010152324, 117.29003906249994],
      zoom: 6,
      pointData: [],
      lineData: [],
      polygonData: [],
    };
  }

  componentDidMount() {
    getAllPoint().then((res) => {
      this.setState({
        pointData: res.data.features,
      });
    });
    getAllLine().then((res) => {
      this.setState({
        lineData: res.data.features,
      });
    });
    getAllPolygon().then((res) => {
      this.setState({
        polygonData: res.data.features,
      });
    });
  }
  render() {
    const {
      currentLocation,
      zoom,
      pointData,
      lineData,
      polygonData,
    } = this.state;
    return (
      <MapContainer center={currentLocation} zoom={zoom}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap BlackAndWhite">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay checked name="Point">
            <FeatureGroup>
              {pointData &&
                pointData.map((point, i) => (
                  <Marker position={point.geometry.coordinates} key={i}>
                    <Popup>nama: {point.properties.nama_point}</Popup>
                  </Marker>
                ))}
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Line">
            <FeatureGroup pathOptions={{ color: "purple" }}>
              {lineData &&
                lineData.map((line, i) => (
                  <Polyline positions={line.geometry.coordinates} key={i}>
                    <Popup>
                      nama: {line.properties.nama_line} <br /> deskripsi:{" "}
                      {line.properties.deskripsi} <br /> panjang:{" "}
                      {line.properties.panjang_garis}
                    </Popup>
                  </Polyline>
                ))}
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Polygon">
            <FeatureGroup pathOptions={{ color: "red" }}>
              {polygonData &&
                polygonData.map((polygon, i) => (
                  <Polygon positions={polygon.geometry.coordinates} key={i}>
                    <Popup>
                      nama: {polygon.properties.nama_line} <br /> deskripsi:{" "}
                      {polygon.properties.deskripsi} <br /> luas:{" "}
                      {polygon.properties.luas_area}
                    </Popup>
                  </Polygon>
                ))}
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    );
  }
}
export default MapView;
