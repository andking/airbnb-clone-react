// import logo from './logo.svg';
import React, { Component } from 'react';
import Map, {Marker} from 'react-map-gl';
import './App.css';
import Flat from './components/flat';
// import Marker from './components/marker';
import 'mapbox-gl/dist/mapbox-gl.css';
import './components/marker.css'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5ka2luZyIsImEiOiJjbDB2bHZ2cjIwd2RkM3BvYWFsbjJqdG9vIn0.MxNTMNUhZnNvhm-sKJnHmw';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        flats: [],
        allFlats: [],
        selectedFlat: null,
        search: ""
      };
    }

    componentDidMount(){
        const url = "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json";
        fetch(url)
            .then(response => response.json())
            .then ((data) => {
                this.setState({
                    flats: data,
                    allFlats: data
                })
            })
    }

    selectFlat = (flat) =>{
        this.setState({
            selectedFlat: flat
        })
    }

    handleSearch = (event) =>{
        this.setState({
            search:event.target.value,
            flats:this.state.allFlats.filter((flat) => new RegExp(event.target.value, "i").exec(flat.name))
        })
    }

render(){
    // let center = {
    //     latitude: 48.8566,
    //     longitude: 2.3522
    //   };

    let classes = "marker";
    if(this.props.selected){
        classes += "selected";
    }
   return (
    <div className = "app">
        <div className = "main">
            <div className = "search">
            <input
                type="text"
                placeholder="Search..."
                value={this.state.search}
                onChange={this.handleSearch} />
            </div>
            <div className = "flats">
                {this.state.flats.map((flat) => {
                    return <Flat key={flat.name}
                    flat={flat}
                    selectFlat={this.selectFlat} />
                })}
            </div>
        </div>
            <div className = "map">
            <Map
                initialViewState={{
                    latitude: 48.8566,
                    longitude: 2.3522,
                    zoom:12
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={'pk.eyJ1IjoiYW5ka2luZyIsImEiOiJjbDB2bHZ2cjIwd2RkM3BvYWFsbjJqdG9vIn0.MxNTMNUhZnNvhm-sKJnHmw'}
                >
                {this.state.flats.map((flat) => {
                    return <Marker key={flat.name}
                                   latitude = {flat.lat}
                                   longitude = {flat.lng}
                                   text = {flat.price}
                                   selected = {flat === this.state.selectedFlat}>

                        <div className={classes}>{flat.price}</div>
                    </Marker>})}

                </Map>
            </div>
    </div>
  );
}
}
export default App;
