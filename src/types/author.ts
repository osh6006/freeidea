export interface IAuthor {
  studioId: string;
  titleImageUrl: string;
  profileImageUrl: string;
  nickname: string;
  followers: number;
  introduction: string;
  isFollowing: boolean;
  portfolio: { portfolioId: string; portfolioImageUrl: string }[];
  userId: string;
}
