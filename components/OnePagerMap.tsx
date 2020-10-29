import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/core';
import mapboxgl from 'mapbox-gl';

import { OnePagerData } from '../model/model';
import { ContentCard } from './ContentCard';
import styles from './OnePagerMap.module.css';

// Use the mapbox navigation API to convert an address string into a lat, lng pair.
const latLonFromAddress = (address: string) => {
  const api = 'https://api.mapbox.com/geocoding/v5/';
  const endpoint = 'mapbox.places/';
  const key = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const searchString = encodeURI(address);
  return fetch(`${api}${endpoint}${searchString}.json?access_token=${key}`)
    .then(res => res.json())
    .then(json => {
      // The API returns a couple of results, ordered most -> least relevant.
      // We only need one.
      const location = json.features[0];
      return ({
        lat: location.center[1],
        lon: location.center[0],
      });
    });
};

type OnePagerMapProps = {
  onePagerData: OnePagerData;
  isLoading: boolean;
};

export const OnePagerMap = ({
  onePagerData,
  isLoading,
}: OnePagerMapProps) => {

  const [lat, setLat]: [number, any] = useState(40.7644)
  const [lon, setLon]: [number, any] = useState(-73.9235)

  useEffect(() => {
    latLonFromAddress(onePagerData.address)
      .then(({lat, lon}: {lat: number, lon: number}) => {
        setLat(lat);
        setLon(lon);
      });
  }, []);

  return (
    <ContentCard title='Location' isLoading={isLoading}>
      <Map lat={lat} lon={lon} />
    </ContentCard>
  )
};

const Map = ({ lat, lon }: { lat: number, lon: number }) => {
  const mapDiv = useRef(null);
  const [map, setMap]: [mapboxgl.Map, any] = useState(null);
  const [marker, setMarker]: [mapboxgl.Marker, any] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: mapDiv.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: 8.0,
    });

    // We don't want the user to interact with the map, only view it.
    map.scrollZoom.disable();
    map.dragPan.disable();
    map.dragRotate.disable();

    // Don't add to state until it is loaded.
    map.on('load', () => {
      setMap(map)
    });
  }, [])

  useEffect(() => {
    if (map) {
      map.jumpTo({
        center: [lon, lat],
        zoom: 8.0,
      });
      if (marker) marker.remove();
      const newMarker = new mapboxgl.Marker({color: 'red'}).setLngLat([lon, lat]).addTo(map);
      setMarker(newMarker);
    }
  }, [lon, lat, map])

  return (
    <Box>
      <div id='mapbox-containter' className={styles['mapbox-container']}>
        <div ref={el => (mapDiv.current = el)} id='mapbox' className={styles['mapboxgl-map']}/>
      </div>
    </Box>
  )
}