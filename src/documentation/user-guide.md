<h1>About the REST API</h1>

Through the Agave REST API your applications can retrieve and manage all aspects of your digital lab. The base address of the API varies from tenant to tenant, however, by logging in to the developer portal, all content will be customized for your account. The base structure of the API is <code>https://${API_HOST}/${resource}/${API_VERSION}</code>. Where <code>${resource}</code> represents a particular API endpoint. While your tenant may have one or more boutique APIs providing domain-specific services, all tenants have a common set of APIs <a title="Live Documentation" href="/live-docs/">endpoints</a>, each with their own unique path.

Several endpoints are open and you do not need any special permissions to access them. To access private data through the Agave API, such as user profiles, data, apps, jobs, an application must get the user’s permission to access the data. <a title="Authorization">Authorization</a> is via the Agave Auth service at <code>https://${API_HOST}/token</code>.

<h2>Conventions</h2>

Throughout the documentation you will regularly encounter the following variables. These represent user-specific values that should be replaced when attempting any of the calls using your account. Once you log into this site, these values will be replaced with values appropriate for you to use when copying and pasting the examples on your own.

[table id=4 /]

When describing the JSON objects passed back and forth with the APIs, Javascript dot notation will be used to refer to individual properties. For example, consider the following JSON object.

[code lang=javascript]
{
    &quot;active&quot;: true,
    &quot;created&quot;: &quot;2014-09-04T16:59:33.000-05:00&quot;,
    &quot;frequency&quot;: 60,
    &quot;id&quot;: &quot;0001409867973952-5056a550b8-0001-014&quot;,
    &quot;internalUsername&quot;: null,
    &quot;lastCheck&quot;: [
      {
        &quot;created&quot;: &quot;2014-10-02T13:03:25.000-05:00&quot;,
        &quot;id&quot;: &quot;0001412273000497-5056a550b8-0001-015&quot;,
        &quot;message&quot;: null,
        &quot;result&quot;: &quot;PASSED&quot;,
        &quot;type&quot;: &quot;STORAGE&quot;
      },
      {
        &quot;created&quot;: &quot;2014-10-02T13:03:25.000-05:00&quot;,
        &quot;id&quot;: &quot;0001411825368981-5056a550b8-0001-015&quot;,
        &quot;message&quot;: null,
        &quot;result&quot;: &quot;FAILED&quot;,
        &quot;type&quot;: &quot;LOGIN&quot;
      }
    ],
    &quot;lastSuccess&quot;: &quot;2014-10-02T11:03:13.000-05:00&quot;,
    &quot;lastUpdated&quot;: &quot;2014-10-02T13:03:25.000-05:00&quot;,
    &quot;nextUpdate&quot;: &quot;2014-10-02T14:03:15.000-05:00&quot;,
    &quot;owner&quot;: &quot;systest&quot;,
    &quot;target&quot;: &quot;demo.storage.example.com&quot;,
    &quot;updateSystemStatus&quot;: false,
    &quot;_links&quot;: {
        &quot;checks&quot;: {
            &quot;href&quot;: &quot;https://agave.iplantc.org/monitor/v2/0001409867973952-5056a550b8-0001-014/checks&quot;
        },
        &quot;notifications&quot;: {
            &quot;href&quot;: &quot;https://agave.iplantc.org/notifications/v2/?associatedUuid=0001409867973952-5056a550b8-0001-014&quot;
        },
        &quot;owner&quot;: {
            &quot;href&quot;: &quot;https://agave.iplantc.org/profiles/v2/systest&quot;
        },
        &quot;self&quot;: {
            &quot;href&quot;: &quot;https://agave.iplantc.org/monitor/v2/0001409867973952-5056a550b8-0001-014&quot;
        },
        &quot;system&quot;: {
            &quot;href&quot;: &quot;https://agave.iplantc.org/systems/v2/demo.storage.example.com&quot;
        }
    }
}
[/code]

<ul>
<li><code>active</code> refers to the top level <code>active</code> attribute in the response object.</li>
<li><code>lastCheck.[].result</code> generically refers to the result attribute contained within any of the objects contained in the <code>lastCheck</code> array.</li>
<li><code>lastCheck.[0].result</code> specifically refers to the result attribute contained within the first object in the <code>lastCheck</code> array.</li>
<li><code>_links.self.href</code> refers to the href attribute in the checks object within the _links object.</li>
</ul>

<h3>Versioning</h3>

The current major version of Agave is given in the URI immediately following the API resource name. For example, if the endpoint is <code>https://agave.iplantc.org/jobs/v2/</code>, the API version would be <code>v2</code>. The current major version of agave is v2.

<h3>Slugs</h3>

In certain situations, usually where file system paths and names are involved in some way, Agave will generate slugify object names to make them safe to use. Slugs will be created on the fly by applying the following rules
1. Lowercase the string
2. Replace spaces with a dash
3. Remove any special characters and punctuation that might require encoding in the URL. Allowed characters are alphanumeric characters, numbers, underscores, and periods.

<h3>Secure communication</h3>

Agave uses SSL to secure communication with the clients. If HTTPS is not specified in the request, the request will be redirected to a secure channel.

<h3>Rate limiting</h3>

To make the API fast for everybody, rate limits apply. Unsigned requests are processed at the lowest rate limit. Signed requests with a valid access token benefit from higher rate limits — this is true even if endpoint doesn’t require an access token to be passed in the call.

<h2>Requests</h2>

The Agave API is based on <a title="REST" href="http://en.wikipedia.org/wiki/Representational_state_transfer" target="_blank">REST</a> principles: data resources are accessed via standard HTTPS requests in UTF-8 format to an API endpoint. Where possible, the API strives to use appropriate HTTP verbs for each action:
[table id=3 /]

<h3>Standard query parameters</h3>

Several URL query parameters are common across all services. The following table lists them for reference:
[table id=77 /]

<h2>Responses</h2>

All data is received and returned as a JSON object. The <a title="Live Documentation" href="/live-docs/">Live Docs</a> provide a description of all the retrievable objects.

<h3>Response Details</h3>

Apart from the response code, all responses from Agave are in the form of a json object. The object takes the following form:
[table id=2 /]
Here, for example, is the response that occurs when trying to fetch information for system to which you do not have access:

[code lang=javascript]
{
    &quot;status&quot;: &quot;error&quot;,
    &quot;message&quot;: &quot;Permission denied. You do not have permission to view this system&quot;,
    &quot;version&quot;: &quot;2.2.0-r8228&quot;,
    &quot;result&quot;: {}
}
[/code]

<h3>Naked Responses</h3>

In situations where you do not care to parse the wrapper for the raw response data, you may request a "naked" response from the API by adding <code>naked=true</code> in to the request URL. This will return just the value of the <code>result</code> attribute in the response wrapper.

<h3>Formatting</h3>

By default, all responses are serialized JSON. To receive pre-formatted JSON, add <code>pretty=true</code> to any query string.

<h3>Pagination</h3>

All resource collections support a way of paging the dataset, taking an <code>offset</code> and <code>limit</code> as query parameters:

[code lang=bash]
$ curl -sk -H &quot;Authorization: Bearer ${API_KEY}&quot; &quot;https://${API_HOST}/jobs/${API_VERSION}/?offset=50&amp;limit=25&quot;
[/code]

Note that offset numbering is zero-based and that omitting the offset parameter will return the first X elements. Unless specified, all result sets are paginated in groups of 100. Check the documentation for the specific endpoint to see specific information.

<h3>Timestamps</h3>

Timestamps are returned in <a href="http://en.wikipedia.org/wiki/ISO_8601" target="_blank">ISO 8601</a> format as <a title="Offset to Coordinated Universal Time" href="http://en.wikipedia.org/wiki/Offset_to_Coordinated_Universal_Time" target="_blank">Coordinated Universal Time</a>(UTC) with zero offset: <code>YYYY-MM-DDTHH:MM:SSZ</code>. If the time is imprecise (for example, the date/time of an album release), an additional field will show the precision; see for example, <code>created</code> in an <a title="Job object" href="http://agaveapi.co/live-docs/#!/jobs/list_get_0" target="_blank">Job object</a>.

<h3>Status Codes</h3>

The API uses the following response status codes, as defined in the <a href="https://www.ietf.org/rfc/rfc2616.txt" target="_blank">RFC 2616</a>:
[table id=1 /]

<h3>CORS</h3>

Many modern applications choose to implement client-server communication exclusively in Javascript. For this reason, Agave provides <a href="http://en.wikipedia.org/wiki/Cross-origin_resource_sharing" title="CORS" target="_blank">cross-origin resource sharing (CORS)</a> support so AJAX requests from a web browser are not constrained by cross-origin requests and can safely make GET, PUT, POST, and DELETE requests to the API.

<h3>Hypermedia</h3>

Agave strives to be a fully descriptive hypermedia API. Given any endpoint, you should be able to walk the API through the links provided in the <code>_links</code> object in each resource representation. The following user metadata object contains two referenced objects. The first, <code>self</code> is common to all objects, and contains the URL of that object. The second, <code>owner</code> contains the URL to the profile of the user who created the object.

[code lang=javascript]
{
    &quot;associationIds&quot;: [],
    &quot;created&quot;: &quot;2013-11-16T11:25:38.900-06:00&quot;,
    &quot;internalUsername&quot;: null,
    &quot;lastUpdated&quot;: &quot;2013-11-16T11:25:38.900-06:00&quot;,
    &quot;name&quot;: &quot;color&quot;,
    &quot;owner&quot;: &quot;dooley&quot;,
    &quot;uuid&quot;: &quot;0001384622738900-5056a550b8-0001-012&quot;,
    &quot;value&quot;: &quot;red&quot;,
    &quot;_links&quot;: {
        &quot;self&quot;: {
            &quot;href&quot;: &quot;https://agave.iplantc.org/meta/v2/data/0001384622738900-5056a550b8-0001-012&quot;
        },
        &quot;owner&quot;: {
            &quot;href&quot;: &quot;https://agave.iplantc.org/profiles/v2/dooley&quot;
        }
    }
}
[/code]