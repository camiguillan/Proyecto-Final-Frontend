/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './userinfo.scss';

export default function UserInfo() {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem('name')) || {};

  return (
    <div className="userInfo">

      <i className="bi bi-emoji-smile-fill" style={{ color: 'white', fontSize: '30px' }} />
      <h5>
        {user.name}

      </h5>
    </div>
  );
}
