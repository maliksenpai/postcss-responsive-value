# postcss-responsive-value

PostCSS plugin to add responsive values for css. This project still in development, it's not ready for production.

## Purpose of this project

This project's purpose is use responsive value with effective way. You can write all your responsive values in 1 line. Sizes are referenced from bootstrap screen sizes.

## Example

   ### Before postcss
    
      a{ color: black | red | blue | green; font-size: 12px | 10px | 8px | 6px; } b { height: 500px | 400px | 300px | 200px; }

   ### After postcss (formatted)

       a {
         color: black;
         font-size: 12px;
       }
       b {
         height: 500px;
       }
       @media screen and (min-width: 992px)
       {
         a {
           color: red;
           font-size: 10px;
         }
         b {
           height: 400px;
         }
       } 
       @media screen and (min-width: 768px)
       {
         a {
           color: blue;
           font-size: 8px;
         }
         b {
           height: 300px;
         }
       } 
       @media screen and (min-width: 576px)
       {
         a {
           color: green;
           font-size: 6px;
         }
         b {
           height: 200px;
         }
       }
