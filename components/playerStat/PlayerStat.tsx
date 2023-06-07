import React from 'react';

type statProps = {
  label: string;
  value: string | number;
};


function PlayerStat({ label, value }: statProps) {
  return (
    <div className="rounded-lg border-solid border-slate-900 p-4 bg-gray-200 text-center w-25 m-5">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-md mt-2">{label}</div>
    </div>
  );
};

export default PlayerStat;
