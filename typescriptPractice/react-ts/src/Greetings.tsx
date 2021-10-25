import React from 'react';

type GreetingsProps = {
  name: string;
  mark: string;
  optional?: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (name: string) => void;
};

function Greetings({
  name, mark, optional, onClick,
}: GreetingsProps) {
  const handleClick = () => onClick(name);
  return (
    <div>
      Hello,
      {' '}
      {name}
      {' '}
      {mark}
      {optional && <p>{optional}</p>}
      <div>
        <button type="button" onClick={handleClick}>Click Me</button>
      </div>
    </div>
  );
}

Greetings.defaultProps = {
  mark: '!',
};

export default Greetings;
