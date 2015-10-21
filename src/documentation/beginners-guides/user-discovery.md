Nothing great is ever accomplished alone. In the course of conducting your research, you will want to share your systems, results, data, etc with other people if for no other reason than to verify that Agave works as advertised. You can use the Profiles service to lookup other users by name, username, or email address.

<h2>Finding others</h2>

To search for other users, make a GET request to the Profiles service with the search type and value in the URL query.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/profiles/$API_VERSION/?email=dooley
```
[/tab]
[tab title="CLI"]
```bash
profiles-list -v -E dooley
``` 
[/tab][/tabgroup]

The response to this call is a JSON array of users who email addresses match the search term <code>dooley</code> in some way.

[code lang=javascript]
[ 
  {
    &quot;username&quot; : &quot;tilefish2&quot;,
    &quot;email&quot; : &quot;dooley@adelphi.edu&quot;,
    &quot;firstName&quot; : &quot;james&quot;,
    &quot;lastName&quot; : &quot;dooley&quot;,
    &quot;position&quot; : &quot;null&quot;,
    &quot;institution&quot; : &quot;null&quot;,
    &quot;phone&quot; : null,
    &quot;fax&quot; : null,
    &quot;researchArea&quot; : null,
    &quot;department&quot; : null,
    &quot;city&quot; : null,
    &quot;state&quot; : null,
    &quot;country&quot; : null,
    &quot;gender&quot; : &quot;&quot;,
    &quot;_links&quot; : {
      &quot;self&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/profiles/v2/tilefish2&quot;
      },
      &quot;users&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/profiles/v2/tilefish2/users&quot;
      }
    }
  }, 
  {
    &quot;username&quot; : &quot;dooley&quot;,
    &quot;email&quot; : &quot;dooley@tacc.utexas.edu&quot;,
    &quot;firstName&quot; : &quot;Rion&quot;,
    &quot;lastName&quot; : &quot;Dooley&quot;,
    &quot;position&quot; : &quot;null&quot;,
    &quot;institution&quot; : &quot;University of Texas Austin&quot;,
    &quot;phone&quot; : null,
    &quot;fax&quot; : null,
    &quot;researchArea&quot; : null,
    &quot;department&quot; : null,
    &quot;city&quot; : null,
    &quot;state&quot; : null,
    &quot;country&quot; : null,
    &quot;gender&quot; : &quot;&quot;,
    &quot;_links&quot; : {
      &quot;self&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/profiles/v2/dooley&quot;
      },
      &quot;users&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/profiles/v2/dooley/users&quot;
      }
    }
  }, 
  {
    &quot;username&quot; : &quot;systest&quot;,
    &quot;email&quot; : &quot;dooley@iplantcollaborative.org&quot;,
    &quot;firstName&quot; : &quot;Systest&quot;,
    &quot;lastName&quot; : &quot;Account&quot;,
    &quot;position&quot; : &quot;null&quot;,
    &quot;institution&quot; : &quot;null&quot;,
    &quot;phone&quot; : null,
    &quot;fax&quot; : null,
    &quot;researchArea&quot; : null,
    &quot;department&quot; : null,
    &quot;city&quot; : null,
    &quot;state&quot; : null,
    &quot;country&quot; : null,
    &quot;gender&quot; : &quot;&quot;,
    &quot;_links&quot; : {
      &quot;self&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/profiles/v2/systest&quot;
      },
      &quot;users&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/profiles/v2/systest/users&quot;
      }
    }
  } 
]
[/code]

<h2>Finding yourself</h2>

You can also lookup your own profile using the special 'me' username.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/profiles/$API_VERSION/me
```
[/tab]
[tab title="CLI"]
```bash
profiles-list -v me
``` 
[/tab][/tabgroup]

The response to this call for our example user looks like this:

[code lang=javascript]
{
    &quot;username&quot; : &quot;systest&quot;,
    &quot;email&quot; : &quot;$API_USERNAME@iplantcollaborative.org&quot;,
    &quot;firstName&quot; : &quot;Systest&quot;,
    &quot;lastName&quot; : &quot;Account&quot;,
    &quot;position&quot; : &quot;null&quot;,
    &quot;institution&quot; : &quot;null&quot;,
    &quot;phone&quot; : null,
    &quot;fax&quot; : null,
    &quot;researchArea&quot; : null,
    &quot;department&quot; : null,
    &quot;city&quot; : null,
    &quot;state&quot; : null,
    &quot;country&quot; : null,
    &quot;gender&quot; : &quot;&quot;,
    &quot;_links&quot; : {
      &quot;self&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/profiles/v2/systest&quot;
      },
      &quot;users&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/profiles/v2/systest/users&quot;
      }
    }
}
[/code]