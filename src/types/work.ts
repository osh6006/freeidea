import { workNewSchema } from '@/lib/zod/store/work-new-schema';
import { workOrderSchema } from '@/lib/zod/work-order-schema';
import { z } from 'zod';

export type WorkNewSchemaType = z.infer<typeof workNewSchema>;
export type WorkOrderSchemaType = z.infer<typeof workOrderSchema>;
export interface WorkNewRequestType
  extends Omit<WorkNewSchemaType, 'thumbnails' | 'workDays' | 'modifyCount'> {
  modifyCount: number;
  workDays: number;
  thumbnailImageIds: string[];
}

export type WorkOrderResult = {
  orderId: string;
  options: {
    optionName: string;
    optionPrice: number;
    optionQuantity: number;
  }[];
  additionalFee?: number;
  paymentMethod: string;
  easyPayProvider?: string;
  orderedAt: string;
  paidAmount?: number;
  product: {
    productId: string;
    thumbnailImageUrl: string;
    title: string;
    nickname: string;
    profileImageUrl: string;
  };
  remitterName?: string;
  bank?: string;
  accountNumber?: number;
  remitteeName?: string;
  expiredAt?: string;
};

export type WorkType = {
  productId: string;
  thumbnailImages: {
    fileId: string;
    fileUrl: string;
  }[];
  title: string;
  category: string;
  tags: string[];
  fileTypes: string[];
  modifyCount: number;
  useRange: string[];
  workDays: number;
  contents: string;
  optionGroups: {
    optionGroupId: string;
    optionGroupName: string;
    options: [
      {
        optionId: string;
        optionName: string;
        optionPrice: number;
      },
    ];
  }[];
};

export type WorkDetailType = {
  isSelling: boolean;
  author: {
    userId: string;
    nickname: string;
    introduction?: string;
    profileImageUrl?: string;
    isFollowing: boolean;
    studioId: string;
  };
  isScrapping: boolean;
  scraps: number;
} & WorkType;

export type WorkEditDataType = {
  productId: string;
  thumbnailImages: {
    fileId: string;
    fileUrl: string;
  }[];
  title: string;
  category: string;
  tags: string[];
  fileTypes: string[];
  modifyCount: number;
  useRange: string[];
  workDays: number;
  contents: string;
  optionGroups: {
    optionGroupName: string;
    options: {
      optionName: string;
      optionPrice: number;
    }[];
  }[];
};
