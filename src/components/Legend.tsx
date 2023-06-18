import React from 'react';

interface LegendItem {
  label: string;
  color: string;
}

const legendItems: LegendItem[] = [
  { label: 'Food', color: '#1676B7' },
  { label: 'Travel', color: '#7F7F7F' },
  { label: 'Merchandise', color: '#9564BF' },
  { label: 'Transportations', color: '#8D564A' },
  { label: 'Other', color: '#BCBF00' },
  { label: 'Entertainment', color: '#34A221' },
  { label: 'Pharmacy', color: '#E474C3' },
  { label: 'Bills', color: '#F97F00' },
  { label: 'Groceries', color: '#D8241F' },
];

const Legend: React.FC = () => {
  return (
    <ul className='list-disc list-inside ml-4 mt-8'>
      {legendItems.map((item, index) => (
        <li key={index} className={`flex items-center space-x-2 mb-2`}>
          <div
            className={`w-4 h-4 rounded-full`}
            style={{ backgroundColor: item.color }}
          ></div>
          <span className='text-slate-300'>{item.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default Legend;
