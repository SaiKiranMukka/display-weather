import React from "react";
import { List } from "@material-ui/core";
import moment from 'moment';
import '../styles/styles.css';
import Icon from './icon';
export default function Forecast(props) {

  const { forecastData } = props;

  const results = forecastData.map((data, index) => {

    return (
      <div key={index} className="forecast">
        <div className="flex-forecast">
          <p>{moment(data.dt_txt).format("dddd")}</p>
        
          <p>
            {data.weather[0].description}
          </p>

          <p>
            {Math.round(data.main.temp)}&deg;C
            <Icon value={data.weather[0].icon}></Icon>
          </p>
          
        </div>
      </div>
    )
  })
  
  return(
    <div>
      <List aria-label="forecast data">{results}</List>
    </div>
  );
  
}