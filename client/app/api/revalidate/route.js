import { revalidatePath } from 'next/cache';

import config from '@/utils/config'
import { getStrapiURL } from "@/utils/index"

export const dynamic = 'auto' // https://www.reddit.com/r/nextjs/comments/14iu6td/revalidatepath_not_updating_generatestaticparams/

export async function POST(request) {
    const payload = await request.json()

    const requestHeaders = new Headers(request.headers)
    const revalidateWebhook= requestHeaders.get('x-strapi-revalidate-webhook')

    if(revalidateWebhook !== process.env.NEXT_REVALIDATION_TOKEN) {
        return Response.status(401).json({ message: 'Invalid token', now: Date.now(), revalidated: false, })  
    }

    const { model, entry: { slug } } = payload;
    let path;

    switch (model) {
        case 'home':
            path = '/';
            break;
        case 'page':
            path = `/${slug}`;
            break;
        case 'articlea-archive-page':
            path = '/blog';
            break;
        case 'article':
            path = `/blog/${slug}`;
            break;
        case 'category':
            path = `/category/${slug}`;
            break;
        case 'service-archive-page':
            path = '/services';
            break;
        case 'service':
            path = `/services/${slug}`;
            break;
        case 'service-type':
            path = `/service-type/${slug}`;
            break;
        case 'author':
        case 'blog-navigation':
        case 'newsletter-banner':
            await revalidatePaths(getAllArticles, `all articles due to model: ${model}`);
            break;
        case 'base-seo':
        case 'footer':
        case 'navigation':
            await revalidatePaths(getAllPages, `entire app due to model: ${model}`);
            break;
        case 'services-banner':
            await revalidatePaths(getPagesWithServicesBanner, `all pages with services banner due to model: ${model}`);
            break;
        case 'subscribe-form':
            await revalidatePaths(getPagesWithSubscriptionForm, `all pages with subscription form due to model: ${model}`);
            break;
        default:
            return Response.status(400).json({ revalidated: false, message: 'Invalid model for revalidation.' });
    }
    
    if (path) {
        try {
            await revalidatePath(path);
            console.log(`Successfully revalidated ${model} with slug: ${slug}`);
            return Response.json({ revalidated: true, path, now: Date.now(), });
        } catch (error) {
            console.error("Error during revalidation:", error.message);
            return Response.status(500).json({revalidated: false, now: Date.now(), message: error.message });
        }
    }
}

async function revalidatePaths(fetchPathsFunction, successMessage) {
    try {
        const paths = await fetchPathsFunction();
        for (const path of paths) {
            await revalidatePath(path);
        }
        console.log(`Successfully revalidated ${successMessage}`);
        return Response.json({ revalidated: true, paths, now: Date.now(), });
    } catch (error) {
        console.error("Error during revalidation:", error.message);
        return Response.status(500).json({ revalidated: false, now: Date.now(), message: error.message });
    }
}

async function getAllPages() {
    try {
        const responses = await Promise.all([
            fetch(getStrapiURL(`/${config.revalidate.PAGES_PATH}`)),
            fetch(getStrapiURL(`/${config.revalidate.ARTICLES_PATH}`)),
            fetch(getStrapiURL(`/${config.revalidate.SERVICES_PATH}`)),
        ]);

        const data = await Promise.all(responses.map(response => response.json()));

        const types = ['page', 'article', 'service'];

        const routes = data.flatMap((item, index) => {
            const slugs = item.data.map(item => item.attributes.slug);
            const type = types[index];
            const prefix = getRoutePrefix(type);
            return slugs.map(slug => {
                if (type === 'page' && slug === '/') {
                    return '/';
                }
                return `${prefix}/${slug}`;
            });
        });

        return routes;
    } catch (error) {
        console.error("Error during fetching pages:", error.message);
        return []; // Return an empty array in case of error
    }
}


async function getAllArticles() {
    try {
        const response = await fetch(getStrapiURL(`/${config.revalidate.ARTICLES_PATH}`));
        const data = await response.json();
        const slugs = data.data.map(item => item.attributes.slug);

        const routes = slugs.map(slug => `/blog/${slug}`);

        return routes;
    } catch (error) {
        console.error("Error during fetching articles:", error.message);
        return []; // Return an empty array in case of error
    }
}

async function getPagesWithSubscriptionForm() {
    try {
        const response = await fetch(getStrapiURL(`/${config.revalidate.SUBSCRIPTION_FORM_PATH}`));
        const data = await response.json();
    
        const routes = data.flatMap((item, index) => {
            const slugs = item.data.map(item => item.attributes.slug);
            return slugs.map(slug => {
                if (slug === '/') {
                    return '/';
                }
                return `/${slug}`;
            });
        });
    
        return routes;
    } catch (error) {
        console.error("Error during fetching pages:", error.message);
        return []; // Return an empty array in case of error
    }
    }
    
    
    
async function getPagesWithServicesBanner() {
    try {
        const response = await fetch(getStrapiURL(`${config.revalidate.SERVICES_BANNER_PATH}`));
        const data = await response.json();

        const routes = data.flatMap((item) => {
            const slugs = item.data.map(item => item.attributes.slug);
            return slugs.map(slug => {
                if (slug === '/') {
                    return '/';
                }
                return `/${slug}`;
            });
        });

        return routes;
    } catch (error) {
        console.error("Error during fetching pages:", error.message);
        return []; // Return an empty array in case of error
    }
}
    