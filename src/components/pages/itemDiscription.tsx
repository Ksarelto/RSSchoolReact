import { FC, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import axios from '../../utils/api';
import { Articles, Item } from '../../../public/types';
import { API } from '../../utils/constants';

const ItemDiscription: FC = () => {
  const [itemData, setItemData] = useState({} as Item);
  const [isLoaded, setLoaded] = useState(false);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const fetchAPI = async () => {
    const params = id.split('&&');
    const APIName = params[0];
    const APIPublished = params[1];
    setLoaded(false);
    try {
      const response: AxiosResponse<Articles> = await axios.get('/everything', {
        params: { q: APIName, from: APIPublished, to: APIPublished, apiKey: API },
      });
      const result: Articles = response.data;
      const { articles } = result;
      const APIItemData = articles.find((el) => el.publishedAt === APIPublished);
      if (!APIItemData) {
        history.push('/notFound');
        return;
      }
      setItemData(APIItemData);
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAPI();
    window.scrollTo(0, 0);
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


export default ItemDiscription;
