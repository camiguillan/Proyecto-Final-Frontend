import React from 'react';
import HambIcon from '../../../assets/icons/hambIcon';
import { slide as Menu } from 'react-burger-menu';
import "./hambMenu.scss";
import { useNavigate } from "react-router-dom";
import PerfilIcon from '../../../assets/icons/perfilIcon';
import AddIcon from '../../../assets/icons/addIcon';
import EditIcon from '../../../assets/icons/editIcon';
import UserInfo from '../userInfo/userInfo';


export default function HambMenu(props) {
  const nav = useNavigate();

  return (
      <Menu customBurgerIcon={<HambIcon />}
            width={"auto"}
            className={"hamburgerPosition"}
            right >
        <div className='menuNav'>
        <UserInfo></UserInfo>
          <div className='menuNavItem'  onClick={()=>  nav( "/")}>
            <PerfilIcon></PerfilIcon>  <h5>Editar Perfil</h5>
          </div>

          <div className='menuNavItem'  onClick={()=>  nav( "/user/agregarCampo")}>
            <AddIcon></AddIcon>
            <h5>Agregar Campo</h5>
          </div>
          
          <div className='menuNavItem'  onClick={()=>  nav( "/user/editarCampo")}>
            <EditIcon></EditIcon>
            <h5>Editar Campo</h5>
          </div>
      </div>

      </Menu>
  )
}
