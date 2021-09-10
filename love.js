// const _ = require(`lodash`)
// const Promise = require(`bluebird`)
// const path = require(`path`)
// const slash = require(`slash`)

// exports.createPages = ({ graphql, actions }) => {
//     const { createPage, createRedirect } = actions
//     createRedirect({ fromPath:'/',toPath:'/home',redirectInBrowser:true,isPermanent:true })
//     return new Promise((resolve, reject) => {
//       graphql(
//         `
//        query WpPages {
//           allWpPage {
//             edges {
//               node {
//                 id
//                 slug
//                 status
//                 template
//                 title
//                 content
//                 template
//               }
//             }
//           }
//         }
//         `
//       )
//       .then(result => {
//         if(result.errors){
//           console.log(result.errors)
//           reject(result.errors)
//         }
//         // create pages
//         const pageTemplate = path.resolve("./src/templates/page.js")
//         const portfolioUnderContentTemplate = path.resolve("./src/templates/portfolioUnderContent.js")
//         _.each(result.data.allWpPage.edges, edge => {
//           createPage({
//             path:`/${edge.node.slug}/`,
//             component: slash(edge.node.template ==='portfolio_under_content.php' ?portfolioUnderContentTemplate : pageTemplate),
//             context:edge.node,
//           })
//       .then(()=>{
//         graphql(`
//         query WpPosts {
//           # Query all WordPress blog posts sorted by date
//           allWpPost(sort: { fields: [date], order: DESC }) {
//             edges {
//               previous {
//                 id
//               }
    
//               # note: this is a GraphQL alias. It renames "node" to "post" for this query
//               # We're doing this because this "node" is a post! It makes our code more readable further down the line.
//               post: node {
//                 id
//                 uri
//               }
    
//               next {
//                 id
//               }
//             }
//           }
//         }
      
//         `).then(result =>{
//           if(result.errors){
//             console.log(result.errors)
//             reject(result.errors)
//           }
//           const postTemplate = path.resolve('./src/templates/post.js')
//           _.each(result.data.allWordpressPage.edges, edge =>{
//             createPage({
//               path:`/post/${edge.node.slug}/`,
//               component: slash(postTemplate),
//               context:edge.node,
//             })
//           })
//           resolve()
//         })
//       })
//       // end posts
//       // portfolio
//       .then(()=> {
//         graphql(
//           `
//           {
//             allWordpressWpPortfolio {
//               edges {
//                 node {
//                   id
//                   title
//                   slug
//                   excerpt
//                   content
//                   featured_media {
//                     source_url
//                   }
//                   acf {
//                     portfolio_url
//                   }
//                 }
//               }
//             }
//           }
//           `
//         )
//         .then(result => {
//           if(result.errors){
//             console.log(result.errors)
//             reject(result.errors)
//           }
//           const portfolioTemplate = path.resolve('./src/templates/portfolio.js')
//           _.each(result.data.allWordpressWpPorfolio.edges, edge =>{
//             createPage({
//               path:`/portfolio/${edge.node.slug}/`,
//               component: slash(portfolioTemplate),
//               context: edge.node,
//             })
//           })
//           resolve()
//         })
//       })
//     })
//   }