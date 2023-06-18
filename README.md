# kairichardson.com

Hello! This is the source code for my website. I hope you enjoy your stay.

## Building, deploying and hosting

The build command (from package.json) is simply:

```
npm run build
```

You can run `npm run build` locally to generate the static files. That will result in a `build` folder you can upload anywhere a static site can be hosted.

Use `npm run preview` _after_ a build to preview the built site locally.


## Adding new posts

Adding new posts is as simple as dropping a new `.md` file into `src/lib/posts`. New posts will automatically show up on the site, be added to the posts API, and any category pages.

A few demo Markdown posts are included, and highlight some of the features of this starter. These demo posts can be updated or removed, but it may be best to use one as a starting point, just for the frontmatter properties.

If you want to use other frontmatter properties in the template (or just modify the layout), make changes in `src/routes/blog/[post]/+page.svelte`.

⚠️ **Note: posts should have a `date` and an `excerpt` defined in the fronmatter.** They're sorted by `date`, and use `excerpt` in page meta tags (for SEO, social sharing, etc.) There are also other frontmatter properties used to enhance the site experience, like the `coverWidth` and `coverHeight`, which are used in the template to reserve space for the image, minimizing cumulative layout shift.

The starter will still work without `date` properties in your posts, but the sorting won't be right. Similarly, you can have posts without an `excerpt`, but your SEO/social previews will be sub-optimal.

Also: while there's no link to it by default, `/blog/category` exists as an archive of all your post categories.

### Pagination

Pagination automatically kicks in once you have more posts than the `postsPerPage` option in `src/lib/config.js`. This means you won't see the pagination right away unless you either change `postsPerPage` to a very low number, or add several more Markdown files to the `src/lib/posts` folder.

**Note:** both the normal `/blog` feed _and_ the category feeds at `/category/[category]` are automatically paginated.

## LICENSE
**MIT**

Originally based off of https://github.com/josh-collinsworth/sveltekit-blog-starter with lots of modifications.
