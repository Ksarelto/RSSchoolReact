import React from 'react';

export const TableHead = (): JSX.Element => {
  return (
    <div className="table__head">
      <span className="table__head-span table__head_author">Author</span>
      <span className="table__head-span table__head_tittle">Tittle</span>
      <span className="table__head-span table__head_description">Desription</span>
      <span className="table__head-span table__head_image">Image</span>
      <span className="table__head-span table__head_published">Published At</span>
      <span className="table__head-span table__head_content">Content</span>
    </div>
  );
};
