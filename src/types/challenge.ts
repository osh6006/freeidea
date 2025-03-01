import { IPagination } from './common';

export type ChallengeInfo = {
  challengeId: string;
  type: 'CONTEST';
  challengeNumber: number;
  title: string;
  bannerImageUrl: string | null;
  startedAt: string;
  finishedAt: string;
};

export type ChallengePortfolio = {
  portfolioId: string;
  userId: string;
  profileImageUrl: string;
  nickname: string;
  portfolioImageUrl: string;
  ranking: number;
  membershipLikes: number;
  likes: number;
  scraps: number;
  isMembershipLiked: boolean;
  isLiked: boolean;
  isScrapping: boolean;
  title: string;
  studioId: string;
};

export type ChallengePortfolioList = {
  list: ChallengePortfolio[];
} & IPagination;
