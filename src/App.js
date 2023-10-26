import './App.css';
import L, {  } from 'leaflet';
import "leaflet/dist/leaflet.css";
import React, { useRef, useState } from 'react';
import { LayersControl, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import jobdata from './tmp_data.json';
// customize popup rest line 26.
import { popupHead } from './popupstyle';
// custom header will be used as tag in line 31
// import DisplayTable from './Components/DisplayTable'
import import_Data from './tmp_data.json';
import { Table } from 'react-bootstrap';
import Lottie from 'lottie-react';
import animationdata from '../src/Components/assets/home_animation.json'
// import Search from 'antd/es/input/Search';
import {} from '@fortawesome/react-fontawesome'


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

  const search_div = ()=>{
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.getElementsByClassName('search-input');

    console.log(searchForm)
    console.log("hua dua lipa")
    searchForm.classList.toggle('active-search');
  }


  // for home animation npm i littie-react
  // https://www.youtube.com/watch?v=eBL4NQIXUhE

const mapRef = useRef(null);
const [search, setSearch] = useState('')
var [setttmp] = useState();
const [geojsonData] = useState(import_Data);
const [loc, setloc] =useState([50.3,-60.3]);

let tmp = (index) => () => {
    var tmplat = Object.values(setttmp[index].props.children[3].props);
    var tmplong = Object.values(setttmp[index].props.children[4].props);
    var getlat = Object.values(tmplat)[1];
    var getlong = Object.values(tmplong)[1];
    setloc([getlat,getlong])
    // console.log(loc)
  }

const fly = ()=>{
  // console.log(loc)
  mapRef.current.flyTo(loc,14);
}

  return (<>

    <div className='right_container'>
    <a href="https://www.google.ca">
      <div className='home'>
        <Lottie animationData={animationdata} style={{height:'100%'}}/>
      </div>
    </a>


    <div>
    <form action='' className='search-form'>
      <input type='text' placeholder='type to search' className='search-input'/>
        <div className='search-button'  onClick={search_div}>
          <i className='fa-solid'></i>
          <i className='fa-solid fa-magnifying-glass search-icon'></i>
          <i className='fa-solid fa-xmark search-close'></i>
        </div>
    </form>
    </div>

    {/* <div onChange={(e) => setSearch(e.target.value)} style={{ textAlign: 'center',border:'20px'} }>
        <input type="text" name="search" placeholder='Search .....' />
    </div> */}
    <br></br>
      <div className='container_table'>
        <Table style={{ width: '100%', cursor: 'pointer' }} id='table'>
          <thead>
            <tr style={{ position: 'sticky', top: '0px' }}>
              <th style={{ width: '20%' }}>Title</th>
              <th style={{ width: '15%' }}>Type</th>
              <th style={{ width: '10%' }}>Company</th>
            </tr>
          </thead>
          <tbody>
            {setttmp =
              geojsonData.features.filter((feature) => { return search.toLowerCase() === '' ? feature : feature.properties.title.toLowerCase().includes(search) || feature.properties.company.toLowerCase().includes(search); })
                .map((feature, index) => {
                  // trying to save lat long
                  return (
                    <tr key={index} id='table_row' onClick={tmp(index)}>
                      <td id='fly' onClick={fly}>{feature.properties.title}</td>
                      <td>{feature.properties.job_type}</td>
                      <td>{feature.properties.company}</td>
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
      <div style={{ fontSize: '30px', padding: '20px 20px', textAlign: 'center' }}>About
      </div>
    </div>

    <div className='left_container'>
      <MapContainer ref={mapRef} center={[43.0059455,-123.8925908]} zoom={2} style={{ height: "100vh", width: "100%" }}>
        <LayersControl position='bottomleft'>
          <BaseLayer name='OpenStreetMap'>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
          </BaseLayer>
          <BaseLayer name="NASA Gibs Blue Marble">
            <TileLayer url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg" attribution="&copy; NASA Blue Marble, image service by OpenGeo" maxNativeZoom={8} />
          </BaseLayer>
          <BaseLayer checked name="OSM-Dark">
            <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' className='map-tiles' />
          </BaseLayer>
        </LayersControl>
        {/* <HandleClickMap/> */}

        {jobdata.features.map((jlist, index) => (
          <Marker key={index} position={[jlist.properties.lat, jlist.properties.long]}>
            <Popup position={[jlist.properties.lat, jlist.properties.long]}>
              <div style={popupHead}>{jlist.properties.title}</div>
              <div>
                {/* <h2>{jlist.properties.title}</h2> */}
                <p>{"Type : " + jlist.properties.job_type}</p>
                <p>{"Company : " + jlist.properties.company}</p>
                <p>{"Posted : " + jlist.properties.date_posted}</p>
                <p>Apply <a href={jlist.properties.apply_link}>here</a></p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  </>)

  
};

export default App;
