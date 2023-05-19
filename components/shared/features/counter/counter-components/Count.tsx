import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/components/hooks';
import { selectCount } from '../counterSlice';

type Props = {};

const Count = (props: Props) => {
  const count = useAppSelector(selectCount);
  const [prevCount, setPrevCount] = useState(count);

  useEffect(() => {
    setPrevCount(count);
  }, [count]);

  return (
    <span
      id="count-span"
      className={`mx-4 text-6xl ${
        count > prevCount ? 'text-green-500' : count < prevCount ? 'text-red-500' : 'text-black'
      }`}
    >
      {count}
    </span>
  );
};

export default Count;
