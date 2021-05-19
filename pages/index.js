import Head from 'next/head'
import Image from 'next/image'
import React, {useEffect,useState} from 'react';
import Header from '../components/Header';
import Profile from '../components/Profile';
import Search from '../components/Search';
import List from '../components/List';



export default function Home() {

  const [spinner,setSpinner] = useState(true);
 

  return (
    <div>
        <div className="container">
          <Header/>
        </div>
        <div className="container">  
          <List/>
        </div>
    </div>
  )
}
