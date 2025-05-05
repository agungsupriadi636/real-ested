
// Utility Functions
// Buat utility untuk membantu pengolahan konten:

import { getCollection } from 'astro:content';

export async function getAllpost() {
    const posts = await getCollection('blog');
    return posts
        .sort((a, b) => b.data.publishDate - a.data.publishDate)
}

export async function getFeaturedPosts(limit = 1) {
    const posts = await getCollection('blog');
    return posts
    .sort((a, b) => b.data.publishDate - a.data.publishDate)
        .slice(0, limit);
}

export async function getPostsByCategory(category: string) {
    const posts = await getCollection('blog');
    return posts.filter(post => post.data.category === category);
}

export async function getRelatedPosts(currentSlug: string, tags: string[] = [], limit = 3) {
    const posts = await getCollection('blog');
    return posts
        .filter(post => post.slug !== currentSlug)
        .sort((a, b) => {
            const aScore = a.data.tags?.filter(tag => tags.includes(tag)).length || 0;
            const bScore = b.data.tags?.filter(tag => tags.includes(tag)).length || 0;
            return bScore - aScore;
        })
        .slice(0, limit);
}

export const pubDate = ( items ) =>{
    const options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    const value = items.toLocaleDateString("id-ID", options);

    return value;
}

/**
 * Mengambil semua kategori beserta jumlah postnya
 * @returns {Promise<{category: string, count: number}[]>}
 */
export async function getAllCategoriesWithCount(): Promise<{category: string, count: number}[]> {
  const posts = await getCollection('blog');
  const categoryMap = new Map<string, number>();
  
  posts.forEach(post => {
    const count = categoryMap.get(post.data.category) || 0;
    categoryMap.set(post.data.category, count + 1);
  });
  
  return Array.from(categoryMap.entries()).map(([category, count]) => ({
    category,
    count
  }));
}

/**
 * Mengambil related posts berdasarkan kategori
 * @param currentPostSlug - Slug post saat ini (untuk exclude)
 * @param category - Kategori yang dicari
 * @param limit - Jumlah maksimal post yang diambil (default: 3)
 */
export async function getRelatedPostsByCategory(
  currentPostSlug: string,
  category: string,
  limit: number = 3
): Promise<BlogPost[]> {
  const posts = await getAllpost();
  
  return posts
    .filter(post => 
      post.id !== currentPostSlug && 
      post.data.category === category
    )
    .sort((a, b) => b.data.publishDate - a.data.publishDate)
    .slice(0, limit);
}

/**
 * Mengambil post terbaru dari semua kategori
 * @param perCategory - Jumlah post per kategori (default: 2)
 */
export async function getLatestPostsFromAllCategories(
  perCategory: number = 2
): Promise<Record<string, BlogPost[]>> {
  const posts = await getCollection('blog');
  const categories = await getAllCategoriesWithCount();
  const result: Record<string, BlogPost[]> = {};
  
  for (const { category } of categories) {
    result[category] = posts
      .filter(post => post.data.category === category)
      .sort((a, b) => b.data.publishDate - a.data.publishDate)
      .slice(0, perCategory);
  }
  
  return result;
}