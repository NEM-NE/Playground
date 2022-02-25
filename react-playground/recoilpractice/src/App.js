import {
  RecoilRoot
} from 'recoil';

import {CharacterCounter} from './components/characterCounter';
import {ToDoList} from './components/toDoList';

function App() {
  return (
    <RecoilRoot>
      <ToDoList />
    </RecoilRoot>

  );
}

export default App;
