import React from 'react';

const DateSelect = ({ daysOnGraph, setDaysOnGraph }) => {
  const normalClasses =
    'flex py-2 px-3 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-200';
  const checkedClasses =
    'flex py-2 px-3 bg-green-100 border border-green-500 rounded-lg cursor-pointer focus:outline-none hover:bg-green-200';

  return (
    <div className="flex justify-center gap-3 text-sm">
      <div>
        <label
          className={daysOnGraph === 7 ? checkedClasses : normalClasses}
          htmlFor="input7"
        >
          7 Dias
          <input
            className="hidden"
            type="radio"
            checked={daysOnGraph === 7}
            value={7}
            id="input7"
            onChange={(e) => setDaysOnGraph(Number(e.target.value))}
          />
        </label>
      </div>

      <div>
        <label
          className={daysOnGraph === 30 ? checkedClasses : normalClasses}
          htmlFor="input30"
        >
          30 Dias
          <input
            className="hidden"
            type="radio"
            checked={daysOnGraph === 30}
            value={30}
            id="input30"
            onChange={(e) => setDaysOnGraph(Number(e.target.value))}
          />
        </label>
      </div>

      <div>
        <label
          className={daysOnGraph === 60 ? checkedClasses : normalClasses}
          htmlFor="input60"
        >
          60 Dias
          <input
            className="hidden"
            type="radio"
            checked={daysOnGraph === 60}
            value={60}
            id="input60"
            onChange={(e) => setDaysOnGraph(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default DateSelect;
{
  /* <select
      value={daysOnGraph}
      onChange={(e) => setDaysOnGraph(Number(e.target.value))}
    >
      <option value={7}>7 dias</option>
      <option value={30}>30 dias</option>
      <option value={60}>60 dias</option>
    </select> */
}
