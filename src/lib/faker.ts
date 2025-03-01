import { faker } from '@faker-js/faker/locale/ko';

export const generateRandomCardInfo = () => {
  return {
    author: faker.person.lastName() + faker.person.firstName(),
    price: faker.commerce.price(),
    title: faker.commerce.productName(),
    fileUrl: faker.image.urlPicsumPhotos(),
    avatarUrl: faker.image.avatarGitHub(),
    tags: [
      '#' + faker.music.genre(),
      '#' + faker.music.genre(),
      '#' + faker.music.genre(),
    ],
  };
};

export const generateRandomReviewCardInfo = () => {
  const date = new Date(faker.date.anytime());

  return {
    author: faker.person.lastName() + faker.person.firstName(),
    avatarUrl: faker.image.avatarGitHub(),
    fileUrl: faker.image.urlPicsumPhotos(),
    reviewContents:
      '하나둘셋넷다섯여섯일곱여덟아홉열하나둘셋넷다섯여섯일곱여덟아홉열하나둘셋넷다섯여섯일곱여덟',
    worktitle: faker.music.songName(),
    date: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDay()}`,
  };
};

export const generateRandomRequestCardInfo = () => {
  return {
    author: faker.person.lastName() + faker.person.firstName(),
    avatarUrl: faker.image.avatarGitHub(),
    requestContents: faker.commerce.productDescription(),
  };
};

export const generateRandomNotificationInfo = () => {
  return {
    username: faker.person.lastName() + faker.person.firstName(),
    content: faker.commerce.productDescription(),
    avatarUrl: faker.image.avatarGitHub(),
  };
};

export const generateRandomBannerArr = (num: number) => {
  return Array.from({ length: num }, () => faker.image.urlPicsumPhotos());
};

export const generateRandomRequestsCardInfo = () => {
  const createdDate = faker.date.anytime();
  const deadlineDate = new Date(
    createdDate.getTime() +
      faker.number.int({ min: 1, max: 7 }) * 24 * 60 * 60 * 1000
  );
  return {
    id: faker.number.int({
      max: 100,
      min: 1,
    }),
    author: faker.person.lastName() + faker.person.firstName(),
    category: faker.commerce.productName(),
    title: faker.commerce.productName(),
    views: faker.number.int({
      max: 999,
      min: 1,
    }),
    cost: faker.commerce.price(),
    createdDate: createdDate,
    deadlineDate: deadlineDate,
    usageScope: faker.music.genre(),
  };
};

export const generateRandomRequestsDetailCardInfo = () => {
  const createdDate = faker.date.anytime();
  const deadlineDate = new Date(
    createdDate.getTime() +
      faker.number.int({ min: 1, max: 7 }) * 24 * 60 * 60 * 1000
  );
  return {
    id: faker.number.int({
      max: 100,
      min: 1,
    }),
    author: faker.person.lastName() + faker.person.firstName(),
    avatarUrl: faker.image.avatarGitHub(),
    category: faker.commerce.productName(),
    purpose: faker.commerce.productName(),
    requestContents: faker.commerce.productDescription(),
    title: faker.commerce.productName(),
    views: faker.number.int({
      max: 999,
      min: 1,
    }),
    cost: faker.commerce.price(),
    createdDate: createdDate,
    deadlineDate: deadlineDate,
    usageScope: faker.music.genre(),
  };
};
