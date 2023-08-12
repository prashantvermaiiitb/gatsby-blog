/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}
/**
 * for accessing the files that we have created in the pages folder
 */
const { createFilePath } = require(`gatsby-source-filesystem`);
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    /**
     * While creating the node for the files we want to attach a new field called slug 
     * this slug is a link that browser can use to navigate to the new page.
     * This data will be passed in to our application by gatsby.
     */
    const slug = createFilePath({ node, getNode });
    /**
     * Attaching the slug node to the gatsby data.
     * slug points to new file path that we made.
     * these are the name of the files as they are used by gatsby for routing
     * /ice-cream/
     */
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
}

const path = require('path');
/**
 * next we are creating the pages here 
 */
exports.createPages = ({ graphql, actions }) => {
  /**
   * these are the actions that are given by the gatsby server during build step
   */
  const { createPage } = actions;
  /**
   * reason for (``) with node js we are not having ES6 backtick features
   */
  return graphql(`
  {
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
}
`).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      /**
       * this will take the data out of the graphql
       * on each of the result this will iterate
       * manually create a page using new blog post template
       */
      createPage({
        /**
         * path will tell what path this page will lead that i am building 
         */
        path: node.fields.slug,
        /**
         * pass in the component that it will use to populate final blogpost
         * this is expecting a relative path so we have to build this using path variable.
         */
        component: path.resolve(`./src/templates/blog-post.js`),
        /**
         * now we have to pass the actual slug value because that's needed in the blog-port 
         * graphql query we will be using context object
         */
        context: {
          /**
           * 
           */
          slug: node.fields.slug
        }
      });
    })
  });
}