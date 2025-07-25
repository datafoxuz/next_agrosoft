import { seo,pagination } from "@/data/interfaces";


export interface article {
    id: number;
    title: string;
    slug: string;
    image: string;
    created_at: string;
    is_published: boolean;
    is_featured: boolean;
    description: string;
}
export interface articleData {
  problems: article[];
  seo: seo;
  paginator: pagination;
}

export type ArticlesApiResponse = ApiResponse<articleData>;
