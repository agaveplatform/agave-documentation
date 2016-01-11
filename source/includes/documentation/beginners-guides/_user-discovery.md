# User Discovery Tutorial

Nothing great is ever accomplished alone. In the course of conducting your research, you will want to share your systems, results, data, etc with other people if for no other reason than to verify that Agave works as advertised. You can use the Profiles service to lookup other users by name, username, or email address.

## Finding others  

```shell
curl -sk -H "Authorization: Bearer $ACCESS_TOKEN" https://public.tenants.agaveapi.co/profiles/v2/?email=dooley?naked=true
```

```plaintext
profiles-list -v -E dooley
``` 
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
        "href" : "https://public.tenants.agaveapi.co/profiles/v2/tilefish2"
      },
      "users" : {
        "href" : "https://public.tenants.agaveapi.co/profiles/v2/tilefish2/users"
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
        "href" : "https://public.tenants.agaveapi.co/profiles/v2/dooley"
      },
      "users" : {
        "href" : "https://public.tenants.agaveapi.co/profiles/v2/dooley/users"
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
        "href" : "https://public.tenants.agaveapi.co/profiles/v2/systest"
      },
      "users" : {
        "href" : "https://public.tenants.agaveapi.co/profiles/v2/systest/users"
      }
    }
  } 
]
```

To search for other users, make a GET request to the Profiles service with the search type and value in the URL query.

The response to this call is a JSON array of users who email addresses match the search term `dooley` in some way.
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>



## Finding yourself  

```shell
curl -sk -H "Authorization: Bearer $ACCESS_TOKEN" https://public.tenants.agaveapi.co/profiles/v2/me?naked=true
```

```plaintext
profiles-list -v me
``` 

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
        "href" : "https://public.tenants.agaveapi.co/profiles/v2/systest"
      },
      "users" : {
        "href" : "https://public.tenants.agaveapi.co/profiles/v2/systest/users"
      }
    }
}
```

You can also lookup your own profile using the special `me` username.
