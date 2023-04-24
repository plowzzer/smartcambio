import React, { useEffect, useMemo, useState } from 'react';

import MoneyInput from './components/MoneyInput';
import DateSelect from './components/DateSelect';
import LineChart from './components/LineChart';

import './style.css';

export default function App() {
  const [inputFocus, setInputFocus] = useState(null);
  const [value1, setValue1] = useState(1);
  const [value2, setValue2] = useState(0);
  const [type1, setType1] = useState('USD');
  const [type2, setType2] = useState('BRL');
  const [daysOnGraph, setDaysOnGraph] = useState(7);
  const [exchangeValue, setExchangeValue] = useState(0);
  const [graphInformation, setGraphInformation] = useState({});

  const startAndEndParam = () => {
    const today = new Date();
    const lastweek = new Date();
    lastweek.setDate(lastweek.getDate() - daysOnGraph);

    return {
      end: `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`,
      start: `${lastweek.getFullYear()}-${(lastweek.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${lastweek.getDate().toString().padStart(2, '0')}`,
    };
  };

  const getTodayExchange = async () => {
    const response = await fetch(
      `https://api.frankfurter.app/latest?from=${type1}`
    );
    return await response.json();
  };

  const getGraphData = async () => {
    const response = await fetch(
      `https://api.frankfurter.app/${startAndEndParam().start}..${
        startAndEndParam().end
      }?from=${type1}&to=${type2}`
    );
    return await response.json();
  };

  useMemo(async () => {
    const data = await getTodayExchange();
    setExchangeValue(data.rates[type2]);
    setValue1(1);
    const v2 = Number(parseFloat(value1 * data.rates[type2]));
    if (value2 !== v2) setValue2(v2);
  }, [type1, type2, daysOnGraph]);

  useMemo(async () => {
    console.log(daysOnGraph)
    const graphData = await getGraphData();
    setGraphInformation(() => graphData);
  }, [daysOnGraph]);

  useEffect(() => {
    if (inputFocus === 'field1') {
      const v2 = Number(parseFloat(value1 * exchangeValue));
      if (value2 !== v2) setValue2(v2);
    }
    if (inputFocus === 'field2') {
      const v1 = Number(parseFloat(value2 * exchangeValue));
      if (value1 !== v1) setValue1(v1);
    }
  }, [value1, value2]);

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-10 tracking-wide text-green-400">💱 SMARTCÂMBIO</h1>
        <div className="flex flex-col  justify-center items-center gap-2 mb-8 lg:flex-row">
          <MoneyInput
            type={type1}
            setType={setType1}
            value={value1}
            setValue={setValue1}
            onFocus={() => setInputFocus('field1')}
          />
          {`<>`}
          <MoneyInput
            type={type2}
            setType={setType2}
            value={value2}
            setValue={setValue2}
            onFocus={() => setInputFocus('field2')}
          />
        </div>

        <DateSelect daysOnGraph={daysOnGraph} setDaysOnGraph={setDaysOnGraph} />

        <LineChart info={graphInformation} from={type1} to={type2} />
      </div>
    </div>
  );
}
