## System roles  

Systems you register are private to you and you alone. You can, however, allow other users to utilize the system you define by granting them a role on the system. The available roles are given in the table below.

<%= partial "includes/tables/51" %>

### GUEST role  

Users granted the <code>GUEST</code> role are given readonly access to the system. This means that users with a <code>GUEST</code> role on an execution system cannot run jobs on that system. In the hierarchy of permission calculation, the <code>GUEST</code> role is at the bottom of the stack, so giving someone a <code>GUEST</code> role on a public system will not restrict their ability to manipulate their virtual home directory, but it will allow them to view data outside of their home directory. The exception to this is when you grant the <code>GUEST</code> role to the <code>world</code> user and make the system publicly available. In this situation, you have defined a readonly system and no user will be able to alter any data unless you give them explicit permission.

### USER role  

The <code>USER</code> role allows users to interact with data and run jobs (if the system is an execution system). Granting someone a <code>USER</code> role allows them to view all parts of the system and interact with it as if it were their own. They will not, however, be able to make any changes to the system definition, assign roles, or register new apps to run on it. They will essentially be using the shared system, "as is."

### PUBLISHER role  

The <code>PUBLISHER</code> role is identical to the <code>USER</code> role, however it only exists for execution systems. Users with the <code>PUBLISHER</code> role on an execution system are able to register apps to run on that system. The apps they register are their own and they can, in turn, share them with whoever they choose. However, in order for another user to run an app a <code>PUBLISHER</code> has registered, they must have at least a <code>USER</code> role on the execution system. This check ensures that sovereignty of the shared system stays with the owner.

### ADMIN role  

The <code>ADMIN</code> role gives the user full reign to change the system definition, assign roles, and register new apps to run on it. When calculating data permissions, users with and <code>ADMIN</code> role on the system always have <code>ALL</code> permissions over any data on that system. This is true even when the system is readonly.

The only exception to the power of the <code>ADMIN</code> user is when the system is published and publicly available. At that point, the administration of the system becomes the responsibility of the tenant admins and cannot change without their involvement. In practice, this is not a problem since any public systems tend to use special accounts on the underlying systems that are specifically allocated for shared use. If the system is ever removed from the public space, they will once again be able to administer its use.

### OWNER role  

The <code>OWNER</code> role is reserved for the user who originally registered the system and is functionally equivalent  Unlike every other system role, the <code>OWNER</code> role cannot be granted or revoked. Once a user creates a system, they own it for life. As with the <code>ADMIN</code> role, the system owner has total control over the system up to the point it is published as a public system. If the system is ever removed from the public space, they will once again be able to administer its use.

### Listing system roles  

<aside class="notice">If you have not yet set up a system of your own, now is a good time to grab a sandbox system to use while you follow along with the rest of this tutorial.</aside>

Performing a GET request on the <code>/systems/$API_VERSION/$SYSTEM_ID/roles</code> collection will return a JSON array of all the roles on the <code>$SYSTEM_ID</code> system.

```shell
curl -sk -H "Authorization: Bearer $ACCESS_TOKEN" https://$API_BASE_URL/systems/$API_VERSION/$SYSTEM_ID/roles
```


```cli
systems-roles-list -v $SYSTEM_ID
```


[/tabgroup]

The response below has a single role representing the owner of the system. By default, any systems you register will automatically assign you a persistent <code>OWNER</code> permission.

```javascript
[
  {
    "username" : "systest",
    "role" : "OWNER",
    "_links" : {
      "self" : {
        "href" : "https://public.agaveapi.co/systems/v2/systest-rodeo-docker/roles/systest"
      },
      "parent" : {
        "href" : "https://public.agaveapi.co/systems/v2/systest-rodeo-docker"
      },
      "profile" : {
        "href" : "https://public.agaveapi.co/profiles/v2/systest"
      }
    }
  }
]
```

Now let's look at the permissions for a public system.

```shell
curl -sk -H "Authorization: Bearer $ACCESS_TOKEN" https://$API_BASE_URL/systems/$API_VERSION/data.iplantcollaborative.org/roles
```


```cli
systems-roles-list -v data.iplantcollaborative.org
```


[/tabgroup]

Rather than returning a list of all API users, the response contains just your user role. In this case a <code>USER</code> permission. This same behavior occurs on any system on which you have a role other than <code>ADMIN</code>.

```javascript
[
  {
    "username" : "systest",
    "role" : "USER",
    "_links" : {
      "self" : {
        "href" : "https://public.agaveapi.co/systems/v2/data.iplantcollaborative.org/roles/systest"
      },
      "parent" : {
        "href" : "https://public.agaveapi.co/systems/v2/data.iplantcollaborative.org"
      },
      "profile" : {
        "href" : "https://public.agaveapi.co/profiles/v2/systest"
      }
    }
  }
]
```

### Creating system roles  

Adding a system role is done by sending a POST with the role and user information.

```shell
curl -sk -H "Authorization: Bearer $ACCESS_TOKEN" -XPOST 
    --data &#039;{"username":"rjohnson", "role":"USER"}&#039; 
    https://$API_BASE_URL/systems/$API_VERSION/systest-rodeo-docker/roles
```


```cli
systems-roles-addupdate -v -u rjohnson -r USER systest-rodeo-docker
```


[/tabgroup]

The response from the service will be a JSON object representing the role we just granted.

```javascript
{
    "username" : "rjohnson",
    "role" : "USER",
    "_links" : {
      "self" : {
        "href" : "https://public.agaveapi.co/systems/v2/systest-rodeo-docker/roles/rjohnson"
      },
      "parent" : {
        "href" : "https://public.agaveapi.co/systems/v2/systest-rodeo-docker"
      },
      "profile" : {
        "href" : "https://public.agaveapi.co/profiles/v2/rjohnson"
      }
    }
}
```

### Updating system roles  

Updating a system role is done identically to adding adding a role, you just specify a different role for the user. Any role you add will replace the previous one. Remember that you cannot remove, add to, or set the <code>OWNER</code> role.

```shell
curl -sk -H "Authorization: Bearer $ACCESS_TOKEN" -XPOST 
    --data &#039;{"username":"rjohnson", "role":"ADMIN"}&#039; 
    https://$API_BASE_URL/systems/$API_VERSION/systest-rodeo-docker/roles
```


```cli
systems-roles-addupdate -v -u rjohnson -r ADMIN systest-rodeo-docker
```


[/tabgroup]

The response from the service will be a JSON object representing the updated role.

```javascript
{
    "username" : "rjohnson",
    "role" : "ADMIN",
    "_links" : {
      "self" : {
        "href" : "https://public.agaveapi.co/systems/v2/systest-rodeo-docker/roles/rjohnson"
      },
      "parent" : {
        "href" : "https://public.agaveapi.co/systems/v2/systest-rodeo-docker"
      },
      "profile" : {
        "href" : "https://public.agaveapi.co/profiles/v2/rjohnson"
      }
    }
}
```

<aside class="notice">Attempting to edit user roles on a public system is not supported and will return a <span class="code">501 Not Implemented</span> response. Attempting to edit user roles on a system you do not have the <span class="code">ADMIN</span> role on will result in a <span class="code">403 Forbidden</span> response.</aside>

### Removing system roles  

Removing a system role can be done two ways. The first is by assigning the user a role of <code>NONE</code>.

```shell
curl -sk -H "Authorization: Bearer $ACCESS_TOKEN" -XPOST 
    --data &#039;{"username":"rjohnson", "role":"NONE"}&#039; 
    https://$API_BASE_URL/systems/$API_VERSION/systest-rodeo-docker/roles
```


```cli
systems-roles-addupdate -v -u rjohnson -r NONE systest-rodeo-docker
```


[/tabgroup]

The second is by performing a delete on actual URL of the user role

```shell
curl -sk -H "Authorization: Bearer $ACCESS_TOKEN" -X DELETE https://$API_BASE_URL/systems/$API_VERSION/systest-rodeo-docker/roles/rjohnson
```


```cli
systems-roles-delete -v -u rjohnson systest-rodeo-docker
```


[/tabgroup]

The response from the service in both cases will be an empty result object.

```javascript
{}
```

### Clearing system roles  

Occasionally you may want to remove all user roles from a system. To do this, perform a delete on the system roles collection.

```shell
```bash
curl -sk -H "Authorization: Bearer $ACCESS_TOKEN" -X DELETE https://$API_BASE_URL/systems/$API_VERSION/$SYSTEM_ID/roles
```


```cli
```bash
systems-roles-delete -v $SYSTEM_ID
```


[/tabgroup]

The response from the service in both cases will be an empty result object.

```javascript
{}
```