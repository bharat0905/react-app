import './App.css';
import L, { } from 'leaflet';
import "leaflet/dist/leaflet.css";
import React, { useRef, useState, useEffect } from 'react';
import { LayersControl, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import jobdata from './tmp_data.json';
import { Table } from 'react-bootstrap';
import Lottie from 'lottie-react';
import animationdata from '../src/Components/assets/home_animation.json'
// import Search from 'antd/es/input/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons';


// to add layer control 
const { BaseLayer } = LayersControl;
// to fix marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

function App() {

  const mapRef = useRef(null);
  var [setttmp] = useState();
  const [loc, setloc] = useState([50.3, -60.3]);

  let tmp = (index) => () => {
    var tmplat = Object.values(setttmp[index].props.children[3].props);
    var tmplong = Object.values(setttmp[index].props.children[4].props);
    var getlat = Object.values(tmplat)[1];
    var getlong = Object.values(tmplong)[1];
    setloc([getlat, getlong])
  }
  const fly = () => {
    // console.log(loc)
    mapRef.current.flyTo(loc, 14);
  }

  // expand-icon
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => { setExpanded(!expanded);};

  // custom popup
  useEffect(() => {
    // Simulate opening the popup after a delay
    setTimeout(() => {
      const popup = document.querySelector('.custom-popup');
      if (popup) {
        popup.classList.add('open');
      }
    }, 1000);
  }, []);




  return (<>
    <div className='container'>
      <div className='sticky-strip'>
        <div className='home'>
          <a href="https://bharat0905.github.io/resume/"><Lottie animationData={animationdata} /></a>
        </div>
      </div>

      <div className='right_container'>
        <div className='container_table'>
          <Table style={{ cursor: 'pointer' }} id='table'>
            <thead>
              <tr style={{ position: 'sticky', top: '0px' }}>
                <th>Title</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {setttmp =
                jobdata.features.map((feature, index) => {
                    return (
                      <tr key={index} id='table_row' onClick={tmp(index)}>
                        <td id='fly' onClick={fly}>{feature.properties.title}</td>
                        <td>{feature.properties.company}</td>
                        <td style={{ display: 'none' }}>{feature.properties.job_type}</td>
                        <td style={{ display: 'none' }}>{feature.properties.lat}</td>
                        <td style={{ display: 'none' }}>{feature.properties.long}</td>
                      </tr>
                    )
                  }
                  )
              }
            </tbody>
          </Table>
        </div>
        <div className='expand-icon' onClick={toggleExpand}>
          <FontAwesomeIcon icon={faInfo}/>
          {expanded && (<div className='expanded'><p>Above list is based on web scrapper that got the job list off google search engine. The script to fetch the list can be automated to run everyday but that's out of scope for this project. The current list was generated on Aug 2023.</p></div>)}
        </div>
        
      </div>

      <div className='left_container'>
        <MapContainer ref={mapRef} center={[51.2630909215123, -105.98819848532109]} zoom={4} zoomControl={false} style={{ height: "100vh", width: "100%" }}>
          <LayersControl position='bottomright'>
            <BaseLayer checked name='OpenStreetMap'>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
            </BaseLayer>
            <BaseLayer name="DarkMap">
              <TileLayer url="http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png" />
            </BaseLayer>
            <BaseLayer name="NASA Gibs Blue Marble">
              <TileLayer url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg" attribution="&copy; NASA Blue Marble, image service by OpenGeo" maxNativeZoom={8} />
            </BaseLayer>
            <BaseLayer name="OSM-Dark">
              <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' className='map-tiles' />
            </BaseLayer>
            <BaseLayer  name='Stadia Maps'>
              <TileLayer url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' maxZoom={20} minZoom={3} attribution='© Stadia Maps, © OpenMapTiles © OpenStreetMap contributors' />
            </BaseLayer>
          </LayersControl>
          {/* <HandleClickMap/> */}

          {jobdata.features.map((jlist, index) => (
            <Marker key={index} position={[jlist.properties.lat, jlist.properties.long]}>
              <Popup className='custom-popup'>
                <div className="popup-content">
                  <div className='popup-head'>{jlist.properties.title}</div>
                    <div>
                      <p>{"Type : " + jlist.properties.job_type}</p>
                      <p>{"Company : " + jlist.properties.company}</p>
                      <p>Apply <a href={jlist.properties.apply_link}>here</a></p>
                    </div>
                 </div> 
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  </>)


};

export default App;
