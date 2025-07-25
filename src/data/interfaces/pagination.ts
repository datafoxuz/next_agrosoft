export interface pagination {
  current_page: number;
  per_page: number;
  has_more: boolean;
  items_count: number,
  total_count: number,
  pages_count: number;
}
