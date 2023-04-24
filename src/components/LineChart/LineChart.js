import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
  },
};

const LineChart = ({ info, from, to }) => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    setLabels([]);
    setValues([]);
    if (Object.keys(info).length !== 0 && Object.keys(info).length !== 0) {
      for (const [key, value] of Object.entries(info.rates)) {
        setLabels((old) => [...old, key]);
        setValues((old) => [...old, value[to]]);
      }
    }
  }, [info]);

  return (
    <Line
      data={{
        labels: labels,
        datasets: [
          {
            label: `${from} para ${to}`,
            data: values,
            borderColor: '#27ae60',
            backgroundColor: '#2ecc71',
          },
        ],
      }}
      options={options}
    />
  );
};

export default LineChart;
