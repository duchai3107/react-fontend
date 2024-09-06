import Header from './components/layout/hearder';
import Footder from './components/layout/footder';
import './style/global.css';
import { Outlet } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import { Authcontext } from './components/context/auth.context';
import { F5APIinfo } from "./services/api.service";
const App = () => {

  const { setUser } = useContext(Authcontext)
  useEffect(() => {
    fecthF5();
  }, [])
  const fecthF5 = async () => {
    const res = await F5APIinfo();
    if (res.data) {
      setUser(res.data.user)
    }
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footder />
    </>
  )
}

export default App
