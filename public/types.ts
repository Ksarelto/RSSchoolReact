export interface Item {
  source: { id: string; name: string };
  title: string;
  author: string;
  description: string;
  urlToImage: string;
  url: string;
  publishedAt: string;
  content: string;
}

export interface Articles {
  status: string;
  totalResults: number;
  articles: Item[];
  message?: string;
}

export interface Search {
  text: string;
  radio: string;
  pageLimit: number;
  page: number;
}

export interface State {
  text: string;
  radio: string;
  pageLimit: number;
  page: number;
}

export interface StoreType {
  search: {
    searchState: {
      text: string;
      radio: string;
      pageLimit: number;
      page: number;
    };
    inputsState: {
        text: string;
        radio: string;
    };
    totalPages: number;
    loading: boolean;
};
APIItems: {
  items: never[];
  loading: boolean;
};
APIItem: {
  item: {} ,
  loading: boolean,
  redirect: boolean,
  allowRedirect: boolean,
};
}
