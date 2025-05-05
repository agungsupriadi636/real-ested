// src/pages/api/search.json.ts
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const get: APIRoute = async ({ request }) => {
    try {
        const query = new URL(request.url).searchParams.get('query') || '';
        const allPosts = await getCollection('blog');

        // Filter posts based on search query
        const results = allPosts.filter(post => {
            const searchContent = `${post.data.title} ${post.data.excerpt} ${post.data.category} ${post.data.tags?.join(' ') || ''}`.toLowerCase();
            return searchContent.includes(query.toLowerCase());
        });

        // Format results for response
        const formattedResults = results.map(post => ({
            title: post.data.title,
            url: `/blog/${post.id}`,
            excerpt: post.data.excerpt,
            category: post.data.category,
            date: post.data.publishDate.toISOString(),
        }));

        return new Response(JSON.stringify({
            success: true,
            results: formattedResults,
            count: results.length
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: 'Internal server error'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};