# Agasallo

This is a simple Html editor to create your examples or test code.
You can create your Bins and share content (Check public switch and check on menu list the link).

Also on Editor you can compile `Ejs`, `Scss`, `Markdown` and ´TypeScript´ with Javascript block.

### Examples

*Convert Ejs to Html:* 
```Javascript
const data = {
  title: 'Example title',
  content: 'Amazing content goes here.'
};

const tpl = `
  <h1><%= title %></h1>
  <p><%= content %></p>
`;

let url = "/api/convert/to/ejs";
let options = {
  method: "POST",
  body: JSON.stringify({template:tpl,data:data}),
  headers: {
    "content-type":"application/json"
  }
}

fetch(url,options)
  .then(r => r.json())
  .then(r => document.body.innerHTML = r.data)
```

*Convert Scss to Css:* 
```Javascript
const data = `
$color: #f55;
body{
  color: $color;
}
`;

let url = "/api/convert/to/scss";
let options = {
  method: "POST",
  body: JSON.stringify({css_code: data}),
  headers: {
    "content-type":"application/json"
  }
}

fetch(url,options)
  .then(r => r.json())
  .then(r => document.body.innerHTML = r.data)
```


*Convert Markdown to Html:* 
```Javascript
const data = `
# hola mundo
`;

let url = "/api/convert/to/md";
let options = {
  method: "POST",
  body: JSON.stringify({html_code: data}),
  headers: {
    "content-type":"application/json"
  }
}

fetch(url,options)
  .then(r => r.json())
  .then(r => document.body.innerHTML = r.data)
```


*Convert TypeScript to Javascript:* 
```Javascript
const data = `
let hola: string = "hola";
console.log(hola)
`;

let url = "/api/convert/to/ts";
let options = {
  method: "POST",
  body: JSON.stringify({js_code: data}),
  headers: {
    "content-type":"application/json"
  }
}

fetch(url,options)
  .then(r => r.json())
  .then(r => document.body.innerHTML = r.data)
```