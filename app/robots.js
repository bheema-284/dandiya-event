export const runtime = 'edge';
export const fetchCache = 'force-no-store';
export default function robots() {
    return {
        rules: {
            userAgent: '*',
            disallow: '/'
        }
    };
}