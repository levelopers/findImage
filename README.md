# find image url links in files

### default support file types

-  .html
-  .wxml
-  .css
-  .scss
-  .vue
-  .js
- .wxss

### instructions
---
#### **node.js**

open images in browser: 
> `node index.js open`

print link in command tool:  
> `node index.js`

#### **html**

run  `node server.js` open browser on  `http://localhost:8080/`

##### tips: 
- double click on image open in new tab
- add file type filter Regexp e.g. `.vue$` (default: `.(wxss|css|wxml|html|js|vue)$`)

