import './App.css';
import CardComponent from './components/Card_Component'

function App() {
  return (
    <div className="App">
      <div className='Wrapper'>
        <CardComponent />  {/* Use PascalCase for the component */}
      </div>
    </div>
  );
}

export default App;
