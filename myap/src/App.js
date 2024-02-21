import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";
import Header from "./Header";
import Series from "./Series";
import Generos from "./Generos";
import NovoGenero from "./NovoGenero";
import EditarGenero from "./EditarGenero";
import NovoSerie from "./NovaSerie";
import InfoSerie from './InfoSerie';

const Home = () => {
  return <h1>Home</h1>;
}

function App() {



  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generos" exact element={<Generos />} />
          <Route path="/generos/novo" exact element={<NovoGenero />} />
          <Route path="/generos/:id" exact element={<EditarGenero />} />
          <Route path="/series" exact element={<Series />} />
          <Route path="/series/novo" exact element={<NovoSerie />} />
          <Route path="/series/:id" exact element={<InfoSerie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
