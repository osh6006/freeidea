import { sortDict } from '@/constants/dictionary';
import API_CODE from '@/constants/error-code';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { objectToQueryString } from '@/lib/utils';
import { IAPIResponse } from '@/types/common';
import { IQnaBasicParams, IQnaWithPage } from '@/types/qna';
import {
  ISearchAutoComplete,
  ISearchParameter,
  TSearchAuthorResponse,
  TSearchProductResponse,
  TSearchQnaResponse,
  TSearchRequestResponse,
} from '@/types/search';

export async function getSearchAll(keyword: string) {
  const [products, requests, authors, qnas] = await Promise.all([
    api
      .get(`/user/search/product?keyword=${keyword}&limit=10`)
      .then((res) => res.json()) as Promise<TSearchProductResponse>,
    api
      .get(`/user/search/inquiry?keyword=${keyword}&limit=10`)
      .then((res) => res.json()) as Promise<TSearchRequestResponse>,
    api
      .get(`/user/search/author?keyword=${keyword}&limit=10`)
      .then((res) => res.json()) as Promise<TSearchAuthorResponse>,
    api
      .get(`/user/search/qna?keyword=${keyword}&limit=10`)
      .then((res) => res.json()) as Promise<TSearchQnaResponse>,
  ]);

  const productTitles: ISearchAutoComplete[] = products.data.list.map((el) => ({
    id: el.productId,
    title: el.title,
    type: 'product',
  }));

  const requestTitles: ISearchAutoComplete[] = requests.data.list.map((el) => ({
    id: el.inquiryId,
    title: el.title,
    type: 'request',
  }));

  const authorNicknames: ISearchAutoComplete[] = authors.data.list.map(
    (el) => ({
      id: el.studioId,
      title: el.nickname,
      type: 'author',
    })
  );

  const searchQnas: ISearchAutoComplete[] = qnas.data.list.map((el) => ({
    id: el.qnaId,
    title: el.title,
    type: 'qna',
  }));

  const combinedResults: ISearchAutoComplete[] = [
    ...productTitles,
    ...requestTitles,
    ...authorNicknames,
    ...searchQnas,
  ];

  return shuffleArray([...combinedResults]).slice(0, 10) || [];
}

export async function getSearchProduct({
  page = 1,
  limit = 10,
  keyword,
  ...params
}: ISearchParameter) {
  const queryParams = objectToQueryString({
    page,
    limit,
    keyword,
    ...params,
  });

  const products: TSearchProductResponse = await api
    .get(`/user/search/product?${queryParams}`)
    .then((res) => res.json());

  return products.data;
}

export async function getFeedSearchProduct({
  page = 1,
  limit = 10,
  keyword,
  ...params
}: ISearchParameter) {
  const queryParams = objectToQueryString({
    page,
    limit,
    keyword,
    ...params,
  });

  const products: TSearchProductResponse = await api
    .get(`/user/search/product/studio?${queryParams}`)
    .then((res) => res.json());

  return products.data;
}

export async function getSearchRequest({
  page = 1,
  limit = 10,
  keyword,
  ...params
}: ISearchParameter) {
  const queryParams = objectToQueryString({
    page,
    limit,
    keyword,
    ...params,
  });

  const requests: TSearchRequestResponse = await api
    .get(`/user/search/inquiry?${queryParams}`)
    .then((res) => res.json());

  return requests.data;
}

export async function getSearchAuthor({
  page = 1,
  limit = 12,
  keyword,
  sort = sortDict.data.latest.en,
  category,
  useRange,
}: ISearchParameter) {
  const queryParams = objectToQueryString({
    page,
    limit,
    keyword,
    sort,
    category,
    useRange,
  });

  const { data, code, message }: TSearchAuthorResponse = await api
    .get(`/user/search/author?${queryParams}`)
    .then((res) => res.json());

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

function shuffleArray(array: ISearchAutoComplete[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function getSearchQnaList(
  params: IQnaBasicParams & { keyword: string }
) {
  const res = await api.get(`/user/search/qna?${objectToQueryString(params)}`);
  const { data, code, message }: IAPIResponse<IQnaWithPage> = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}
