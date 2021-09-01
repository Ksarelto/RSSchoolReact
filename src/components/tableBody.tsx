import { FC } from 'react';
import { Item } from '../../public/types';

interface TableBodyProps {
  item: Item;
}
const TableBody: FC<TableBodyProps> = ({ item }): JSX.Element => {
  return (
    <div className="table__body">
      <span className="table__body-span table__body-author">{item.author}</span>
      <span className="table__body-span table__body-tittle">{item.title}</span>
      <span className="table__body-span table__body-description">{item.description}</span>
      <div className="table__body-span table__body-image-wrapper">
        <img className="table__body-image" src={item.urlToImage} alt="image" />
      </div>
      <span className="table__body-span table__body-published">{item.publishedAt}</span>
      <span className="table__body-span table__body-content">{item.content}</span>
    </div>
  );
};

export default TableBody;
