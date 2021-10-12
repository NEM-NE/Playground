import { Stage, Sprite } from '@inlet/react-pixi';
import { Tilemap, useTilemapLoader } from 'react-pixi-tilemap';

import { useRef, useState, useCallback, useEffect } from 'react';
import io from "socket.io-client"; 


const tileMap = process.env.PUBLIC_URL + '/stages/map.tmx';
const tileMap2 = process.env.PUBLIC_URL + '/mapmaking/maps/custom/Gather Office 4/Gather Office 9.tmx';
const socket = io("http://localhost:3000/");

const id = prompt("아이디를 입력해주세요");

const isUp = (key) => key === 'ArrowUp' || key === 'w';
const isLeft = (key) => key === 'ArrowLeft' || key === 'a';
const isDown = (key) => key === 'ArrowDown' || key === 's';
const isRight = (key) => key === 'ArrowRight' || key === 'd';

const App = () => {
  const [x, setX] = useState(3);
  const [y, setY] = useState(5);
  const [users, setUsers] = useState([]);
  const map = useTilemapLoader(tileMap);
  const stageRef = useRef(false);
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() =>{
    console.log('request join');
    socket.emit('join', {x, y, id});
  }, []);

  useEffect(() => {
    socket.on('joinOtherUser', function(data) {
      console.log('Other user join!!');
      const userAry = users.slice();
      userAry.push(data);
      setUsers(userAry);
    });
  }, []);

  useEffect(() => {
    socket.on('move', function(data) {
      console.log('move!!');
      const userAry = users.slice();
      userAry[data.id] = data;
      setUsers(userAry);
    });
  }, [])

  const handleKeyDown = useCallback((e) => {
    e.preventDefault();
    if (isUp(e.key)) {
      setY(y - 1);
    }
    if (isLeft(e.key)) {
      setX(x - 1);
    }
    if (isDown(e.key)) {
      setY(y + 1);
    }
    if (isRight(e.key)) {
      setX(x + 1);
    }

    socket.emit('move', {x, y, id});
  }, [x, y]);

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
    <Stage width={width} height={height} ref={stageRef} renderOnComponentChange={true} >
      <Tilemap map={map} >
        <Sprite image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png" x={x * 30} y={y * 30} />
        {users.map(user => (
          <Sprite image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png" x={user.x * 30} y={user.y * 30} />
        ))}
        {(
          console.log(users),
          console.log(x, y)
          )}
      </Tilemap>
    </Stage>
    </div>
  ) 
};

export default App;
