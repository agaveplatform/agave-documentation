### Response Customization

> Returns the user id, name, and email  

```html
/profiles/v2/?filter=id,name,email
```

> Returns the system name, status, app id, and the url to the archvied job output  

```html
/jobs/v2/?filter=name,status,appId,_links.archiveData.href
```

> Returns the system id, type, whether it is your default system, and the hostname in the storage config  
 
```html
/systems/v2/?filter=id,type,default,storage.host
```

In many situations, Agave may return back too much or too little information in the response to a query. For example, when searching jobs, the `inputs` and `parameters` fields are not included in the default summary response objects. You can customize the responses you receive from all the Science APIs using the `filter` query parameter. The `filter` query parameter takes a comma-delimited list of fields to return for each object in the response. Each field may be referenced using JSON notation similar to the search syntax (minus the `.[operation]` suffix. The examples to the right show sample requests and responses.
   
   