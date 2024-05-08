import React, { useEffect, useState } from "react";
import { Hero } from "../../Components/Hero/Hero";
import { GenderCard } from "../../Components/GenderCard/GenderCard";
import { Footer } from "../../Components/Footer/Footer";
import women from "../../assets/pictures/women.png";
import men from "../../assets/pictures/men.png";
import axios from 'axios';
import { useParams } from "react-router-dom";

export const Page = () => {
  const { alias } = useParams();
  const [state, setState] = useState(false);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios({
      url: `/api/shop/pages/item?alias=${alias}`,
      method: "GET",
    }).then((data) => {
      setState(false);
      setContent(data.content);
      setName(data.name);
    }).catch((error) => {
      setState(true);
      console.log(error);
    });
  }, [alias]);



  return (
    <div>
      <Hero />
      <div className="gender-cards flex-row center-flex">
        <GenderCard image={women} text={"WOMEN"}></GenderCard>
        <GenderCard image={men} text={"MEN"}></GenderCard>
      </div>
      {!state ? (
        <div>404</div>
      ) : (
        <>
          <h1>{ name }</h1>
          <div>{ content }</div>
        </>
      )}
      <hr />
      <Footer />
    </div>
  );
};
