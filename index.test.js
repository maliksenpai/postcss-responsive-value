const postcss = require("postcss");
const plugin = require("./");

async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });
  expect(result.css.replace(/\s/g, "")).toBe(output.replace(/\s/g, ""));
  expect(result.warnings().length).toBe(0);
}

test("full responsive", async () => {
  await run(
    "a{ color: black | red | blue | green; font-size: 12px | 10px | 8px | 6px; } b { height: 500px | 400px | 300px | 200px; }",
    `a{ color: black; font-size: 12px; } b { height: 500px; } @media screen and (min-width: 992px)
     {
     a{
       color: red;
       font-size: 10px;
     }
     b{
       height: 400px;
     }
    
     } @media screen and (min-width: 768px)
     {
     a{
       color: blue;
       font-size: 8px;
     }
     b{
       height: 300px;
     }
    
     } @media screen and (min-width: 576px)
     {
     a{
       color: green;
       font-size: 6px;
     }
     b{
       height: 200px;
     }
    
     }`,
    {}
  );
});

test("only big screen responsive", async () => {
  await run(
    "a{ color: black | red; font-size: 12px | 10px; } b { height: 500px | 400px; }",
    ` a{ color: black; font-size: 12px; } b { height: 500px; } @media screen and (min-width: 992px)
     {
     a{
       color: red;
       font-size: 10px;
     }
     b{
       height: 400px;
     }
    
     }`,
    {}
  );
});

test("big screen and medium screen responsive", async () => {
  await run(
    "a{ color: black | red | blue; font-size: 12px | 10px | 8px; } b { height: 500px | 400px | 300px; }",
    `a{ color: black; font-size: 12px; } b { height: 500px; } @media screen and (min-width: 992px)
     {
     a{
       color: red;
       font-size: 10px;
     }
     b{
       height: 400px;
     }
    
     } @media screen and (min-width: 768px)
     {
     a{
       color: blue;
       font-size: 8px;
     }
     b{
       height: 300px;
     }
    
     }`,
    {}
  );
});

test("big screen and small screen responsive", async () => {
  await run(
    "a{ color: black | red | | green; font-size: 12px | 10px | | 6px; } b { height: 500px | 400px | | 200px; }",
    `a{ color: black; font-size: 12px; } b { height: 500px; } @media screen and (min-width: 992px)
     {
     a{
       color: red;
       font-size: 10px;
     }
     b{
       height: 400px;
     }
    
     } @media screen and (min-width: 576px)
     {
     a{
       color: green;
       font-size: 6px;
     }
     b{
       height: 200px;
     }
    
     }`,
    {}
  );
});

test("full responsive with pseudo-class", async () => {
  await run(
    "a:hover{ color: black | red | blue | green; font-size: 12px | 10px | 8px | 6px; } b { height: 500px | 400px | 300px | 200px; }",
    `a:hover{ color: black; font-size: 12px; } b { height: 500px; } @media screen and (min-width: 992px)
     {
     a:hover{
       color: red;
       font-size: 10px;
     }
     b{
       height: 400px;
     }
    
     } @media screen and (min-width: 768px)
     {
     a:hover{
       color: blue;
       font-size: 8px;
     }
     b{
       height: 300px;
     }
    
     } @media screen and (min-width: 576px)
     {
     a:hover{
       color: green;
       font-size: 6px;
     }
     b{
       height: 200px;
     }
    
     }`,
    {}
  );
});

test("full responsive with nth-child", async () => {
  await run(
    "a:nth-child(1){ color: black | red | blue | green; font-size: 12px | 10px | 8px | 6px; } b { height: 500px | 400px | 300px | 200px; }",
    `a:nth-child(1){ color: black; font-size: 12px; } b { height: 500px; } @media screen and (min-width: 992px)
     {
     a:nth-child(1){
       color: red;
       font-size: 10px;
     }
     b{
       height: 400px;
     }
    
     } @media screen and (min-width: 768px)
     {
     a:nth-child(1){
       color: blue;
       font-size: 8px;
     }
     b{
       height: 300px;
     }
    
     } @media screen and (min-width: 576px)
     {
     a:nth-child(1){
       color: green;
       font-size: 6px;
     }
     b{
       height: 200px;
     }
    
     }`,
    {}
  );
});

test("full responsive with first-letter", async () => {
  await run(
    "a::first-letter{ color: black | red | blue | green; font-size: 12px | 10px | 8px | 6px; } b { height: 500px | 400px | 300px | 200px; }",
    `a::first-letter{ color: black; font-size: 12px; } b { height: 500px; } @media screen and (min-width: 992px)
     {
     a::first-letter{
       color: red;
       font-size: 10px;
     }
     b{
       height: 400px;
     }
    
     } @media screen and (min-width: 768px)
     {
     a::first-letter{
       color: blue;
       font-size: 8px;
     }
     b{
       height: 300px;
     }
    
     } @media screen and (min-width: 576px)
     {
     a::first-letter{
      color: green;
      font-size: 6px;
     }
     b{
       height: 200px;
     }
    
     }`,
    {}
  );
});
