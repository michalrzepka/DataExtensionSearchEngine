# Data Extension Search Engine

Custom Data Extension Search Engine for Salesforce Marketing Cloud.

Read more https://sfmr.dev/ideas/sfmc/tools/data-extension-search-engine.

Token cookie:

``` javascript
document.cookie = 'token=thisShouldBeYourLongRandomString; max-age = 3600; SameSite = Strict; Secure'
```

Bookmarklet:

``` javascript
javascript:(function()%7Bdocument.cookie%20%3D%20'token%3DthisShouldBeYourLongRandomString%3B%20max-age%20%3D%203600%3B%20SameSite%20%3D%20Strict%3B%20Secure'%3Blocation.reload()%7D)()
```