/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // GitHub Pages usually serves from a subdirectory if it's a project page.
    // But if it's vwychan.github.io (User Page), it serves from root.
    // The repo name is vwychan.github.io, so it is a User Page. 
    // No basePath needed.
};

export default nextConfig;
