import {
  RecoilRoot
} from 'recoil';

import {CharacterCounter} from './components/characterCounter';

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>

  );
}

export default App;
