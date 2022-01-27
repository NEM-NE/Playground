import EventEmitter from 'events';
import React, { useState, useEffect, useRef} from 'react';
import './App.css';

function App() {
  const [participantLength, setParticipantLength] = useState<number>(5);
  const socket = useRef<any>(new EventEmitter());

  useEffect(() => {
    socket.current.on('up', () => {
      setParticipantLength((oldParticipantLength) => oldParticipantLength + 1);
    });

    socket.current.on('down', () => {
      setParticipantLength((oldParticipantLength) => oldParticipantLength - 1);
    });
    console.log('hi')
  }, [socket]);

  const upParticipant = (e: React.MouseEvent) => {
    socket.current.emit('up');
  }

  const downParticipant = (e: React.MouseEvent) => {
    socket.current.emit('down');
  }

  return (
    <div className="App">
      <span>{participantLength} </span>
      <button onClick={upParticipant}> 업! </button>
      <button onClick={downParticipant}> 다운! </button>
    </div>
  );
}

export default App;
