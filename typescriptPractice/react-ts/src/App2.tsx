import Greetings from './Greetings';
import Counter from './Counter';
import MyForm from './MyForm';
// import Users from './Users';
import Users2 from './Users2';

function App() {
  const onClick = (name: string) => {
    console.log(`myname is ${name}`);
  };

  const onSubmit = (form: { title: string; description: string }) => {
    console.log(form);
  };
  return (
    <>
      <Greetings name="sungbin" onClick={onClick} />
      <Counter />
      <MyForm onSubmit={onSubmit} />
      <Users2 />
    </>
  );
}

export default App;
