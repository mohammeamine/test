export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  commentCount: number;
  isPinned: boolean;
}

export interface ForumComment {
  id: string;
  postId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  createdAt: string;
  updatedAt: string;
  parentId?: string; // For nested comments
  upvotes: number;
  downvotes: number;
  isEdited: boolean;
}

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  postCount: number;
  isRestricted: boolean; // If true, only certain roles can post
  allowedRoles?: string[]; // Roles that can post if restricted
}

export type VoteType = 'upvote' | 'downvote' | 'none'; 