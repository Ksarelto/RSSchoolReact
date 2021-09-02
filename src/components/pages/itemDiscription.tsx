import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { APIAsyncItemFunction } from '../../utils/api';
import { loadingItem, redirectToNotFoundPage, setAllowRedirect } from '../../reducers/APIItemSlice';
import { RootState } from '../../store/configureStore';
import Spinner from '../shared/spinner';

const ItemDiscription: FC = () => {
  const search = useSelector((state: RootState) => state.search);
  const itemData = useSelector((state: RootState) => state.APIItem);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (itemData.allowRedirect) {
      const params = id.split('&&');
      const APIPublished = params[1];
      dispatch(redirectToNotFoundPage(false));
      dispatch(loadingItem(false));
      dispatch(APIAsyncItemFunction(search.searchState, APIPublished));
    }
    if (itemData.redirect && !itemData.allowRedirect) {
      dispatch(setAllowRedirect(true));
      history.push('/notFound');
    }
    window.scrollTo(0, 0);
  }, [itemData.redirect]);

  return (
    <div>
      {itemData.loading ? (
        <div className="details">
          <p role="paragraph" className="details__text">
            <span className="details__text-span">1. Author: </span>
            {itemData.item.author}
          </p>
          <p role="paragraph" className="details__text">
            <span className="details__text-span">2. Title: </span>
            {itemData.item.title}
          </p>
          <p role="paragraph" className="details__text">
            <span className="details__text-span">3. Description: </span>
            {itemData.item.description}
          </p>
          <p role="paragraph" className="details__text">
            <span className="details__text-span">4. Content: </span>
            {itemData.item.content}
          </p>
          <p role="paragraph" className="details__text">
            <span className="details__text-span">5. Article published at: </span>
            {itemData.item.publishedAt}
          </p>
          <p role="paragraph" className="details__text">
            <span className="details__text-span">6. Url to source: </span>
            {itemData.item.url}
          </p>
          <div className="details__image-wrapper">
            <img className="details__image" src={itemData.item.urlToImage} alt="image" />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ItemDiscription;
