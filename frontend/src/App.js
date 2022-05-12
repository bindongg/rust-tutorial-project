import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'

function App() {
    let a = 10;
    let b = 20;
    let list = [1,2,3];
  return (
    <div className="App">
        <h2>{a===10 ? b===20 ? 'is 20' : 'not 20' : 'no'}</h2>
        <h2>{list.map((n)=><h3>{n}</h3>)}</h2>
    </div> //대충 문법 연습
  );
}

export default App;
