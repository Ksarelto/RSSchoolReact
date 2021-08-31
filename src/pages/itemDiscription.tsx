import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Redirect } from "react-router-dom";
import { Articles, Item } from "../../public/types";
const API = 'e60b5635d25644f9bd31ee59009be1ac';

export const ItemDiscription =() => {

  const [itemData, setItemData] = useState({} as Item);
  const [isLoaded, setLoaded] = useState(false);
  let history = useHistory();
  const { id } = useParams();

  const fetchAPI = async () => {
    const params = id.split('&&');
    const APIName = params[0];
    const APIPublished = params[1];
    setLoaded(false);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${APIName}&apiKey=${API}`,
      );
      const result: Promise<Articles> = response.json();
      const error = (await result).status;
      if (error === 'error') return;
      const { articles } = await result;
      const APIItemData = articles.find((el) => (el.publishedAt === APIPublished ))
      if(!APIItemData) {
        history.push('/notFound');
        return;
      };
      setItemData(APIItemData);
      setLoaded(true);
    } catch (err) {
      console.log(err);
    } 
  }
  useEffect(() => {
      fetchAPI();
      window.scrollTo(0,0);
  }, []);

  return (
    <div>
      {isLoaded ? 
      <div className="details">
        <p className="details__text"><span className="details__text-span">1. Author: </span>{itemData.author}</p>
        <p className="details__text"><span className="details__text-span">2. Title: </span>{itemData.title}</p>
        <p className="details__text"><span className="details__text-span">3. Description: </span>{itemData.description}</p>
        <p className="details__text"><span className="details__text-span">4. Content: </span>{itemData.content}</p>
        <p className="details__text"><span className="details__text-span">5. Article published at: </span>{itemData.publishedAt}</p>
        <p className="details__text"><span className="details__text-span">6. Url to source: </span>{itemData.url}</p>
        <div className="details__image-wrapper">
          <img className="details__image" src={itemData.urlToImage} alt="image"/>
        </div>
      </div> : 
      <div className="lds-ripple"><div></div><div></div></div>}
    </div>
  )
}
