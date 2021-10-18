import './App.css';

import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';

import DeskController from './components/pages/DeskController/DeskController.js';

const { BrowserRouter, Route, Switch } = require('react-router-dom');

function Content() {
  return (
    <Switch>
      <Route path="/" component={DeskController} />
    </Switch>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Content />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
