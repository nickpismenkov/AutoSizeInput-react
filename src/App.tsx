import React, { useRef } from 'react';
import { AutoSizeInput } from './components/AutoSizeInput';

function App() {
  const refOne = useRef<any>(null);
  const refTwo = useRef<any>(null);
  const refThree = useRef<any>(null);
  return (
    <>
      <div className="wrapper">
        <AutoSizeInput
          label={'Name of Meeting'}
          defaultValue={'Some Name'}
          r={refOne}
        />
      </div>
      <div className="wrapper">
        <AutoSizeInput label={'Location / Call'} r={refTwo} />
      </div>
      <div className="wrapper">
        <AutoSizeInput label={'Agenda'} r={refThree} />
      </div>
    </>
  );
}

export default App;
