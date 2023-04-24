import React from 'react';

const MoneyInput = ({ value, setValue, type, setType, ...rest }) => {
  const [displayValue, setDisplayValue] = React.useState(() => value);

  const currencySymbol = (type) => {
    if (type === 'BRL') return 'R$';
    if (type === 'USD') return '$';
    if (type === 'GBP') return '£';
    if (type === 'JPY') return '¥';
    if (type === 'EUR') return 'Є';
  };

  const formatMoney = (value) => {
    const number = Number(value);
    if (isNaN(number)) return '';

    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currency: type,
    }).format(number / 100);
  };

  React.useEffect(() => {
    setDisplayValue(formatMoney(value * 100));
  }, [value]);

  const handleTypeSelect = (e) => {
    setType(e.target.value);
  };

  const handleInputChange = (e) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = formatMoney(onlyNumbers);
    setValue(onlyNumbers / 100);
    setDisplayValue(formattedValue);
  };

  const prefix = React.useMemo(() => {
    return currencySymbol(type);
  }, [type]);

  return (
    <div className="rounded-md border flex items-stretch">
      <span className='p-2 text-gray-600 text-sm flex items-center'>{prefix}</span>
      <input
        className='p-2 text-xl focus:outline-none '
        type="text"
        onChange={handleInputChange}
        value={displayValue}
        {...rest}
      />
      <select value={type} onChange={handleTypeSelect} className="bg-gray-200 h-max px-3">
        <option value="BRL">🇧🇷 BRL</option>
        <option value="USD">🇺🇸 USD</option>
        <option value="GBP">🇬🇧 GBP</option>
        <option value="JPY">🇯🇵 JPY</option>
        <option value="EUR">🇪🇺 EUR</option>
      </select>
    </div>
  );
};

export default MoneyInput;
