import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

Chart.register(...registerables);

const Dashboard = () => {
  const { data: worldData, isLoading: worldLoading } = useQuery('worldData', () =>
    axios.get('https://disease.sh/v3/covid-19/all').then(res => res.data)
  );

  const { data: countriesData, isLoading: countriesLoading } = useQuery('countriesData', () =>
    axios.get('https://disease.sh/v3/covid-19/countries').then(res => res.data)
  );

  const { data: historicalData, isLoading: historicalLoading } = useQuery('historicalData', () =>
    axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all').then(res => res.data)
  );

  // Log the data to ensure it's correct
  console.log('World Data:', worldData);
  console.log('Countries Data:', countriesData);
  console.log('Historical Data:', historicalData);

  if (worldLoading || countriesLoading || historicalLoading) {
    return <div>Loading...</div>;
  }

  const lineChartData = {
    labels: Object.keys(historicalData.cases), // Dates
    datasets: [
      {
        label: 'Cases',
        data: Object.values(historicalData.cases), // Number of cases
        borderColor: 'rgb(75, 192, 192)', // Line color
        fill: false, // No fill below the line
      },
      {
        label: 'Deaths',
        data: Object.values(historicalData.deaths), // Number of deaths
        borderColor: 'rgb(255, 99, 132)', // Line color
        fill: false, // No fill below the line
      },
      {
        label: 'Recovered',
        data: Object.values(historicalData.recovered), // Number of recoveries
        borderColor: 'rgb(54, 162, 235)', // Line color
        fill: false, // No fill below the line
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center hover:text-green-400">Dashboard</h1>
      
      {/* Line chart displaying historical data */}
      <div className="mb-8">
        <Line data={lineChartData} />
      </div>
      
      {/* Map displaying markers for each country */}
      <MapContainer center={[20, 0]} zoom={2} className="h-96">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {countriesData.map((country: any) => (
          <Marker 
            key={country.countryInfo._id} 
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            <Popup>
              <div>
                <h2>{country.country}</h2>
                <p>Active: {country.active}</p>
                <p>Recovered: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Dashboard;
