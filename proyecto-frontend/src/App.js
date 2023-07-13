import './App.css';
import { Route, Routes} from "react-router-dom";
import AgregarCampo from './componentes/agregarCampo/agregarCampo';
import EditarCampo from './componentes/editarCampo/editarCampo';
import Home from './componentes/home/home';
import IniciarSesion from './componentes/iniciarSesion/iniciarSesion';
import Registrarse from './componentes/registrarse/registrarse';
import Dashboards from './componentes/dashboards/dashboards';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/user/agregarCampo" element={<AgregarCampo/>}/> 
        <Route path="/user/editarCampo" element={<EditarCampo/>} /> 
        <Route path="/user/home" element={<Home/>} /> 
        <Route path="/iniciarSesion" element={<IniciarSesion/>} /> 
        <Route path="/registrarse" element={<Registrarse/>} /> 
        <Route path="/user/campo/dashboards" element={<Dashboards/>} /> 
      </Routes>
    
      
    </div>
  );
}

export default App;
