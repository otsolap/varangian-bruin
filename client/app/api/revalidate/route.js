import { revalidatePath } from 'next/cache'
import config from '@/utils/config'
import { getStrapiURL } from "@/utils/api"

export const dynamic = 'auto' // https://www.reddit.com/r/nextjs/comments/14iu6td/revalidatepath_not_updating_generatestaticparams/

export async function POST(request) {
    const payload = await request.json()

    const requestHeaders = new Headers(request.headers)
    const revalidateWebhook= requestHeaders.get('x-strapi-revalidate-webhook')

    if (revalidateWebhook !== process.env.REVALIDATION_TOKEN) {
        return new Response(JSON.stringify({ message: 'Invalid token', now: Date.now(), revalidated: false }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    const { model, entry: { slug } } = payload
    let path

    switch (model) {
        case 'home':
            path = '/'
            break
        case 'page':
            path = `/${slug}`
            break
        case 'article-archive-page':
            path = '/blog'
            break
        case 'article':
            path = `/blog/${slug}`
            break
        case 'category':
            path = `/category/${slug}`
            break
        case 'service-archive-page':
            path = '/services'
            break
        case 'service':
            path = `/services/${slug}`
            break
        case 'service-type':
            path = `/service-type/${slug}`
            break
        case 'author':
        case 'blog-navigation':
            return await revalidatePaths(getAllArticles, `all articles due to model: ${model}`)
        case 'base-seo':
        case 'footer':
        case 'navigation':
            return revalidatePaths(getAllPages, `entire app due to model: ${model}`)
        case 'services-banner':
            return await revalidatePaths(getPagesWithServicesBanner, `all pages with services banner due to model: ${model}`)
        case 'subscribe-form':
            return revalidatePaths(getPagesWithSubscriptionForm, `all pages with subscription form due to model: ${model}`)
        default:
            return new Response(JSON.stringify({ revalidated: false, message: 'Invalid model for revalidation.' }), {
                headers: { 'Content-Type': 'application/json' }
            })
    }
    
    if (path) {
        console.log('path', path)
        try {
            await revalidatePath(path)
            console.log(`Successfully revalidated ${model} with slug: ${slug}`)
            return Response.json({ revalidated: true, path, now: Date.now(), })
        } catch (error) {
            console.error(`Failed to revalidate ${model} with slug: ${slug}`, error)
            return new Response(JSON.stringify({ revalidated: false, message: 'Revalidation failed.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            })
        }
    }

}

async function revalidatePaths(fetchPathsFunction, successMessage) {
    try {
        const paths = await fetchPathsFunction()
        for (const path of paths) {
            await revalidatePath(path)
        }
        console.log(`Successfully revalidated ${successMessage}`)
        return new Response(JSON.stringify({ revalidated: true, paths, now: Date.now() }), {
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        console.error("Error during revalidation:", error.message)
        return new Response(JSON.stringify({ revalidated: false, now: Date.now(), message: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}

async function getAllPages() {
    try {
        const routes = [];
        // Add static routes
        routes.push(...[
            '/', 
            '/blog', 
            '/category',
            '/services', 
            '/service-types/'
        ]);

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
        };

        const urls = [
            fetch(getStrapiURL(`/${config.endpoints.pages}`), { headers }),
            fetch(getStrapiURL(`/${config.endpoints.articles}`), { headers }),
            fetch(getStrapiURL(`/${config.endpoints.categories}`), { headers }),
            fetch(getStrapiURL(`/${config.endpoints.services}`), { headers }),
            fetch(getStrapiURL(`/${config.endpoints.serviceTypes}`), { headers }),
        ];

        const responses = await Promise.all(urls);
        const data = await Promise.all(responses.map(response => response.json()));
        const mergedData = [].concat(...data);
        
        // Add dynamic routes
        const types = [
            'page', 
            'article', 
            'category',
            'service',
            'service-type'
        ];
        mergedData.forEach((item, index) => {
            const type = types[index];
            const prefix = getRoutePrefix(type);
            routes.push(...item.data.map(item => `${prefix}${item.slug}`));
        });

        return routes;
    } catch (error) {
        console.error("Error during fetching pages:", error.message);
        return []; // Return an empty array in case of error
    }
}

async function getAllArticles() {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    };

    try {
        const response = await fetch(getStrapiURL(`/${config.endpoints.articles}`), { headers })
        const data = await response.json()
        const slugs = data.data.map(item => item.slug)

        return slugs.map(slug => `/blog/${slug}`)

    } catch (error) {
        console.error("Error during fetching articles:", error.message)
        return [] // Return an empty array in case of error
    }
}

async function getPagesWithSubscriptionForm() {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    };

    try {
        const response = await fetch(getStrapiURL(`/${config.revalidate.subscriptionForm}`), { headers })
        const data = await response.json()
        const slugs = data.data.map(item => item.slug)

        return slugs.map(slug => `/${slug}`)
    } catch (error) {
        console.error("Error during fetching pages:", error.message)
        return [] // Return an empty array in case of error
    }
}
    
async function getPagesWithServicesBanner() {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    };

    try {
        const response = await fetch(getStrapiURL(`/${config.revalidate.servicesBanner}`), { headers })
        const data = await response.json()
        const slugs = data.data.map(item => item.slug)

        return slugs.map(slug => `/${slug}`)

    } catch (error) {
        console.error("Error during fetching pages:", error.message)
        return [] // Return an empty array in case of error
    }
}
    
function getRoutePrefix(type) {
    switch (type) {
        case 'page':
            return '/'
        case 'article':
            return '/blog/'
        case 'category':
            return '/category/'
        case 'service':
            return '/services/'
        case 'service-type':
            return '/service-type/'
        default:
            return ''
    }
}