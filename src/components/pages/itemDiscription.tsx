import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { APIAsyncItemFunction } from "../../utils/api";
import { loadingItem, redirectToNotFoundPage, setAllowRedirect } from '../../reducers/APIItemSlice';
import { RootState } from '../../store/configureStore';

const ItemDiscription: FC = () => {

  const itemData = useSelector((state: RootState) => state.APIItem);
  const dispatch = useDispatch();
  let history = useHistory();
  const { id } = useParams<{id: string}>();

  const fetchAPI = async () => {
    const params = id.split('&&');
    const APIName = params[0];
    const APIPublished = params[1];
    dispatch(loadingItem(false))
    dispatch(APIAsyncItemFunction(APIName, APIPublished))
  }

  useEffect(() => {
    if(itemData.allowRedirect){
      dispatch(redirectToNotFoundPage(false))
      fetchAPI();
    }
    if(itemData.redirect && !itemData.allowRedirect){
      dispatch(setAllowRedirect(true));
      history.push('/notFound');
    }
    window.scrollTo(0,0);
  }, [itemData.redirect]);

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
