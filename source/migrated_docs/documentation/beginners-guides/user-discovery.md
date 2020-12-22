Nothing great is ever accomplished alone. In the course of conducting your research, you will want to share your systems, results, data, etc with other people if for no other reason than to verify that Agave works as advertised. You can use the Profiles service to lookup other users by name, username, or email address.

## Finding others  

To search for other users, make a GET request to the Profiles service with the search type and value in the URL query.

```shell
curl -sk -H "Authorization: Bearer $ACCESS_TOKEN" https://$API_BASE_URL/profiles/$API_VERSION/?email=dooley
```


```plaintext
profiles-list -v -E dooley
``` 


The response to this call is a JSON array of users who email addresses match the search term <code>dooley</code> in some way.

```javascript
[ 
  {
    "username" : "tilefish2",
    "email" : "dooley@adelphi.edu",
    "firstName" : "james",
    "lastName" : "dooley",
    "position" : "null",
    "institution" : "null",
    "phone" : null,
    "fax" : null,
    "researchArea" : null,
    "department" : null,
    "city" : null,
    "state" : null,
    "country" : null,
    "gender" : "",
    "_links" : {
      "self" : {
        "href" : "https://sandbox.agaveplatform.org/profiles/v2/tilefish2"
      },
      "users" : {
        "href" : "https://sandbox.agaveplatform.org/profiles/v2/tilefish2/users"
      }
    }
  }, 
  {
    "username" : "dooley",
    "email" : "dooley@tacc.utexas.edu",
    "firstName" : "Rion",
    "lastName" : "Dooley",
    "position" : "null",
    "institution" : "University of Texas Austin",
    "phone" : null,
    "fax" : null,
    "researchArea" : null,
    "department" : null,
    "city" : null,
    "state" : null,
    "country" : null,
    "gender" : "",
    "_links" : {
      "self" : {
        "href" : "https://sandbox.agaveplatform.org/profiles/v2/dooley"
      },
      "users" : {
        "href" : "https://sandbox.agaveplatform.org/profiles/v2/dooley/users"
      }
    }
  }, 
  {
    "username" : "systest",
    "email" : "dooley@iplantcollaborative.org",
    "firstName" : "Systest",
    "lastName" : "Account",
    "position" : "null",
    "institution" : "null",
    "phone" : null,
    "fax" : null,
    "researchArea" : null,
    "department" : null,
    "city" : null,
    "state" : null,
    "country" : null,
    "gender" : "",
    "_links" : {
      "self" : {
        "href" : "https://sandbox.agaveplatform.org/profiles/v2/systest"
      },
      "users" : {
        "href" : "https://sandbox.agaveplatform.org/profiles/v2/systest/users"
      }
    }
  } 
]
```

## Finding yourself  

You can also lookup your own profile using the special 'me' username.

```shell
curl -sk -H "Authorization: Bearer $ACCESS_TOKEN" https://$API_BASE_URL/profiles/$API_VERSION/me
```


```plaintext
profiles-list -v me
``` 


The response to this call for our example user looks like this:

```javascript
{
    "username" : "systest",
    "email" : "$API_USERNAME@iplantcollaborative.org",
    "firstName" : "Systest",
    "lastName" : "Account",
    "position" : "null",
    "institution" : "null",
    "phone" : null,
    "fax" : null,
    "researchArea" : null,
    "department" : null,
    "city" : null,
    "state" : null,
    "country" : null,
    "gender" : "",
    "_links" : {
      "self" : {
        "href" : "https://sandbox.agaveplatform.org/profiles/v2/systest"
      },
      "users" : {
        "href" : "https://sandbox.agaveplatform.org/profiles/v2/systest/users"
      }
    }
}
```