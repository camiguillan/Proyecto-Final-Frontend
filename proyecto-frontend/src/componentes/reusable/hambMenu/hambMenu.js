import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import "./hambMenu.scss";
import { useNavigate } from "react-router-dom";
import PerfilIcon from '../../../assets/icons/perfilIcon';
import AddIcon from '../../../assets/icons/addIcon';
import EditIcon from '../../../assets/icons/editIcon';
import UserInfo from '../userInfo/userInfo';


export default function HambMenu(props) {
  const nav = useNavigate();

  function handleCerrarSesion(){
    console.log("hola");
  }

  return (
      <Menu 
            burgerBarClassName='bm-burger-button'
            crossButtonClassName='bi bi-x-circle bm-cross'
            menuClassName="bm-menu"            
            right 
            burgerButtonClassName = "bm-burger-button"   
            pageWrapId={ props.pageWrapId }   
            overlayClassName={props.outerContainerId}  
            >
        <div   className=" menuNav" >
        <UserInfo></UserInfo>
          <div className='menuNavItem'  onClick={()=>  nav( "/")}>
          <h5> <PerfilIcon></PerfilIcon>  Editar Perfil</h5>
          </div>

          <div className='menuNavItem'  onClick={()=>  nav( "/user/agregarCampo")}>
            
            <h5> <AddIcon></AddIcon>  Agregar Campo</h5>
          </div>
          
          <div className='menuNavItem'  onClick={()=>  nav( "/user/editarCampo")}>
            <h5>    <EditIcon></EditIcon> Editar Campo</h5>
          </div>

      </div>
          <div  className='cerrar-sesion-container'>
          <button onClick={handleCerrarSesion} className='cerrar-sesion'>CERRAR SESION</button>
          </div>
      </Menu>
  )
}
