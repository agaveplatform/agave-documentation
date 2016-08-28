[requestbin/]

<h2>Introduction</h2>

Under the covers, the Agave API is an event-driven distributed system implemented on top of a reliable, cloud-based messaging system. This means that every action either observed or taken by Agave is tied to an event. The changing of a job from one status to another is an event. The granting of permissions on a file is an event. Editing a piece of metadata is an event, and to be sure, the moment you created an account with Agave was an event. You get the idea.

<h2>Events</h2>

Having such a fine-grain event system is helpful for the same reason that having a fine-grain permission model is helpful: it affords you the highest degree of flexibility and control possible to achieve the behavior you desire. With Agave's event system, you have the ability to alert your users (or yourself) the instant something occurs. You can be proactive rather than reactive, and you can begin orchestrating your complex tasks in a loosely coupled, asynchronous way.

<h2>Notifications</h2>

As consumers of Agave, you have the ability to subscribe to events occurring on any resource to which you have access. By that we mean, for example, you could subscribe to events on your job and a job that someone shared with you, but you could not subscribe to events on a job submitted by someone else who has not shared the job with you. Basically, if you can see a resource, you can subscribe to its events.

The Notifications service is the primary mechanism by which you create and manage your event subscriptions. A typical use case is a user subscribing for an email alert when her job completes. The JSON object below represents a request for such a notification.

[code lang=javascript]
{
  &quot;associatedUuid&quot;: &quot;0001409758089943-5056a550b8-0001-002&quot;,
  &quot;event&quot;: &quot;OVERWRITTEN&quot;,
  &quot;persistent&quot;: true,
  &quot;url&quot;: &quot;nryan@rangers.mlb.com&quot;
}
[/code]

The <code>associatedUuid</code> value is the UUID of her job. Here, we given the UUID of the <code>picsumipsum.txt</code> file we uploaded in the <a href="http://agaveapi.co/documentation/tutorials/data-management-tutorial/" title="Data Management Tutorial">Data Management</a> tutorial. The <code>event</code> value is the name of the event to which she wants to be notified. This example is asking for an email to be sent whenever the file is overwritten. She could have just as easily specified a status of DELETED or RENAME to be notified when the file was deleted or renamed.

The <code>persistent</code> value specifies whether the notification should fire more than once. By default, all event subscriptions are transient. This is because the events themselves are transient. An event occurs, then it is over. There are, however, many situations where events could occur over and over again. Permission events, changes to metadata and data, application registrations on a system, job submissions to a system or queue, etc., all are transient events that can potentially occur many, many times. In these cases it is either not possible or highly undesirable to constantly resubscribe for the same event. The persistent attribute tells the notification service to keep a subscription alive until it is explicitly deleted.

[notice]In certain situations you may wish to subscribe to multiple events. You are free to add as many subscriptions as you wish, however in the event that you want to subscribe to all possible events for a given resource, use the wildcard value, `*`, as the event. This tells the Notifications service that you wanted to be notified of every event for that resource.[/notice]

The following table shows a list of all Agave's resource-level grouped by resource.

[tabgroup]
[tab title="Apps"][table id=47 /][/tab]
[tab title="Files"][table id=46 /][/tab]
[tab title="Internal Users"][table id=45 /][/tab]
[tab title="Jobs"][table id=44 /][/tab]
[tab title="Metadata"][table id=43 /][/tab]
[tab title="Schema"][table id=42 /][/tab]
[tab title="PostIts"][table id=41 /][/tab]
[tab title="Profiles"][table id=40 /][/tab]
[tab title="Systems"][table id=39 /][/tab]
[tab title="Transfers"][table id=38 /][/tab]
[tab title="Monitors"][table id=37 /][/tab]
[/tabgroup]

Continuing to work through the example, the <code>url</code> value specifies where the notification should be sent. In this example, our example user specified that she would like to be notified via email. Agave supports both email and webhook notifications. If you are unfamiliar with webhooks, take a moment to glance at the <a href="http://webhooks.org" target="_blank">webhooks.org</a> page for a brief overview. If you are a <a href="http://en.wikipedia.org/wiki/Design_Patterns_(book)" title="Gang of Four" target="_blank">Gang of Four</a> disciple, webhooks are a mechanism for implementing the <a href="http://en.wikipedia.org/wiki/Observer%5Fpattern" title="Observer Pattern" target="_blank">Observer Pattern</a>. Webhooks are widely used across the web and chances are that something you're using right now is leveraging them.

In the context of Agave, a webhook is a URL to which Agave will send a POST request when that event occurs. A webhook can be any web accessible URL. While you cannot customize the POST content that Agave sends (it's unique to the event), you can take advantage of the many template variables that Agave provides to customize the URL at run time. The following table show the webhook template variables available for each resource.

[tabgroup]
[tab title="Apps"][table id=36 /][/tab]
[tab title="Files"][table id=35 /][/tab]
[tab title="Internal Users"][table id=34 /][/tab]
[tab title="Jobs"][table id=33 /][/tab]
[tab title="Metadata"][table id=32 /][/tab]
[tab title="Schema"][table id=31 /][/tab]
[tab title="PostIts"][table id=30 /][/tab]
[tab title="Profiles"][table id=29 /][/tab]
[tab title="Systems"][table id=28 /][/tab]
[tab title="Transfers"][table id=27 /][/tab]
[tab title="Monitors"][table id=26 /][/tab]
[/tabgroup]

The value of webhook template variables is that they allow you to build custom callbacks using the values of the resource variable at run time. Several commonly used webhooks are shown below.

<ul>
<li><strong>Receive a callback when a new user is created that includes the new user's information</strong></li>
</ul>

[code lang=bash]
https://example.com/sendWelcome.php?username=${USERNAME}&amp;email=${EMAIL}&amp;firstName=${FIRST_NAME}&amp;lastName=${LAST_NAME}&amp;src=agaveapi.co&amp;nonce=1234567
[/code]

<ul>
<li><strong>Receive self-describing job status updates</strong></li>
</ul>

[code lang=bash]
http://example.com/job/${JOB_ID}?status=${STATUS}&amp;lastUpdated=${LAST_UPDATED}
[/code]

<ul>
<li><strong>Get notified on all jobs going into and out of queues</strong></li>
</ul>

[code lang=bash]
http://example.com/system/${EXECUTION_SYSTEM}/queue/${QUEUE}?action=add 
http://example.com/system/${EXECUTION_SYSTEM}/queue/${QUEUE}?action=subtract
[/code]

<ul>
<li><strong>Rerun an analysis when a files finishes staging</strong></li>
</ul>

[code lang=bash]
https://$AGAVE_BASE_URL/jobs/$API_VERSION/a32487q98wasdfa9-09090b0b-007?action=resubmit
[/code]

<ul>
<li><strong>Use plus mailing to route job notifications to different folders</strong></li>
</ul>

[code lang=bash]
nryan+${EXECUTION_SYSTEM}+${JOB_ID}@gmail.com
[/code]

<h3>Creating event notifications</h3>

Subscribing to an event is done by posting a form or JSON object to the Notifications service. An example of doing this using curl as well as the CLI is given below.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -XPOST  
    --data &#039;{ &quot;associatedUuid&quot;: &quot;0001409758089943-5056a550b8-0001-002&quot;, &quot;event&quot;: &quot;OVERWRITTEN&quot;, &quot;url&quot;: &quot;$REQUEST_BIN?path=${PATH}&amp;system=${SYSTEM}&amp;event=${EVENT}&quot; }&#039;  
    https://$API_BASE_URL/notifications/$API_VERSION?pretty=true
```
[/tab][tab title="CLI"]
```bash
notifications-addupdate -V -F notification.json
```
[/tab][tab title="Raw JSON"]
```bash

```[/tab][/tabgroup]

Which will result in output similar to this

[code lang=javascript]
{
    &quot;id&quot;:&quot;0002032313456-b0b0b0-007&quot;,
    &quot;owner&quot;:&quot;nryan&quot;,
    &quot;url&quot;:&quot;nryan@rangers.texas.mlb.com&quot;,
    &quot;associatedUuid&quot;:&quot;0001384707924634-b0b0b0bb0b-0001-013&quot;,
    &quot;event&quot;:&quot;nryan@rangers.texas.mlb.com&quot;,
    &quot;responseCode&quot;:200,
    &quot;attempts&quot;:0,
    &quot;lastSent&quot;:null,
    &quot;success&quot;:false,
    &quot;persistent&quot;:false,
    &quot;created&quot;:&quot;2013-11-17T17:39:30.000-06:00&quot;,
    &quot;_links&quot;:{
        &quot;self&quot;:{
            &quot;href&quot;: &quot;https://$API_BASE_URL/notifications/$API_VERSION/0001384707924634-b0b0b0bb0b-0001-013&quot;
        },
        &quot;schema&quot;:{
            &quot;href&quot;: &quot;https://$API_BASE_URL/jobs/$API_VERSION/0001381610343558-b0b0b0bb0b-0001-007&quot;
        }
    }
}
[/code]

<h3>Updating a notification</h3>

Updating a subscription is done identically to creation except that the form or JSON is POSTed to the existing subscription URL. An example of doing this using curl as well as the CLI is given below.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -XPOST  
    -F &quot;fileToUpload=&quot;notification.json&quot;  
    https://$API_BASE_URL/notifications/$API_VERSION/0989079870809-b0b0b0-012?pretty=true
```
[/tab]
[tab title="CLI"]
```bash
notifications-addupdate -V -F notification.json 0989079870809-b0b0b0-012
```
[/tab][tab title="Raw JSON"]
```bash
{
    &quot;associatedUuid&quot;: &quot;0002032313456-b0b0b0-007&quot;
    &quot;event&quot;: &quot;FINISHED&quot;,
    &quot;url&quot;: &quot;nryan@rangers.texas.mlb.com&quot;
}
```
[/tab][/tabgroup]

Which will result in output similar to this

[code lang=javascript]
[
  {
     &quot;id&quot;:&quot;0002032313456-b0b0b0-007&quot;,
     &quot;owner&quot;:&quot;nryan&quot;,
     &quot;url&quot;:&quot;nryan@rangers.texas.mlb.com&quot;,
     &quot;associatedUuid&quot;:&quot;0001384707924634-b0b0b0bb0b-0001-013&quot;,
     &quot;event&quot;:&quot;nryan@rangers.texas.mlb.com&quot;,
     &quot;responseCode&quot;:200,
     &quot;attempts&quot;:0,
     &quot;lastSent&quot;:null,
     &quot;success&quot;:false,
     &quot;persistent&quot;:false,
     &quot;created&quot;:&quot;2013-11-17T17:39:30.000-06:00&quot;,
     &quot;_links&quot;:{
        &quot;self&quot;:{
           &quot;href&quot;:&quot;https://$API_BASE_URL/notifications/$API_VERSION/0001384707924634-b0b0b0bb0b-0001-013&quot;
        },
        &quot;schema&quot;:{
           &quot;href&quot;:&quot;https://$API_BASE_URL/jobs/$API_VERSION/0001381610343558-b0b0b0bb0b-0001-007&quot;
        }
     }
  },
  {
     &quot;id&quot;:&quot;0002032313456-b0b0b0-007&quot;,
     &quot;owner&quot;:&quot;nryan&quot;,
     &quot;url&quot;:&quot;rjohnson@rangers.texas.mlb.com&quot;,
     &quot;associatedUuid&quot;:&quot;0001384707924891-b0b0b0bb0b-0001-013&quot;,
     &quot;event&quot;:&quot;nryan@rangers.texas.mlb.com&quot;,
     &quot;responseCode&quot;:200,
     &quot;attempts&quot;:0,
     &quot;lastSent&quot;:null,
     &quot;success&quot;:false,
     &quot;persistent&quot;:false,
     &quot;created&quot;:&quot;2013-11-17T17:39:30.000-06:00&quot;,
     &quot;_links&quot;:{
        &quot;self&quot;:{
           &quot;href&quot;:&quot;https://$API_BASE_URL/notifications/$API_VERSION/0001384707924891-b0b0b0bb0b-0001-013&quot;
        },
        &quot;schema&quot;:{
           &quot;href&quot;:&quot;https://$API_BASE_URL/jobs/$API_VERSION/0001381610343558-b0b0b0bb0b-0001-007&quot;
        }
     }
  },
  {
     &quot;id&quot;:&quot;0002032313456-b0b0b0-007&quot;,
     &quot;owner&quot;:&quot;nryan&quot;,
     &quot;url&quot;:&quot;nryan@rangers.texas.mlb.com&quot;,
     &quot;associatedUuid&quot;:&quot;0001384707925001-b0b0b0bb0b-0001-013&quot;,
     &quot;event&quot;:&quot;http://rangers.mlb.com/alerts?job_id=${JOB_ID}&amp;status=${STATUS}&quot;,
     &quot;responseCode&quot;:200,
     &quot;attempts&quot;:0,
     &quot;lastSent&quot;:null,
     &quot;success&quot;:false,
     &quot;persistent&quot;:false,
     &quot;created&quot;:&quot;2013-11-17T17:39:30.000-06:00&quot;,
     &quot;_links&quot;:{
        &quot;self&quot;:{
           &quot;href&quot;:&quot;https://$API_BASE_URL/notifications/$API_VERSION/0001384707925001-b0b0b0bb0b-0001-013&quot;
        },
        &quot;schema&quot;:{
           &quot;href&quot;:&quot;https://$API_BASE_URL/jobs/$API_VERSION/0001381610343558-b0b0b0bb0b-0001-007&quot;
        }
     }
  }
]
[/code]

<h3>Listing all notifications</h3>

You can get a list of your current notification subscriptions by performing a GET operation on the base /notifications collection. Adding the UUID of a notification will return just that notification. You can also query for all notifications assigned to a specific UUID by adding <code>associatedUuid=$uuid</code>. An example of querying all notifications using curl as well as the CLI is given below.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot;  
    https://$API_BASE_URL/notifications/$API_VERSION/0989079870809-b0b0b0-012?pretty=true
```
[/tab]
[tab title="CLI"]
```bash
notifications-list -V
```
[/tab][/tabgroup]

Which will result in output similar to this

[code lang=javascript]
[
  {
     &quot;id&quot;:&quot;0002032313456-b0b0b0-007&quot;,
     &quot;owner&quot;:&quot;nryan&quot;,
     &quot;url&quot;:&quot;nryan@rangers.texas.mlb.com&quot;,
     &quot;associatedUuid&quot;:&quot;0001384707924634-b0b0b0bb0b-0001-013&quot;,
     &quot;event&quot;:&quot;nryan@rangers.texas.mlb.com&quot;,
     &quot;responseCode&quot;:200,
     &quot;attempts&quot;:0,
     &quot;lastSent&quot;:null,
     &quot;success&quot;:false,
     &quot;persistent&quot;:false,
     &quot;created&quot;:&quot;2013-11-17T17:39:30.000-06:00&quot;,
     &quot;_links&quot;:{
        &quot;self&quot;:{
           &quot;href&quot;:&quot;https://$API_BASE_URL/notifications/$API_VERSION/0001384707924634-b0b0b0bb0b-0001-013&quot;
        },
        &quot;schema&quot;:{
           &quot;href&quot;:&quot;https://$API_BASE_URL/jobs/$API_VERSION/0001381610343558-b0b0b0bb0b-0001-007&quot;
        }
     }
  },
  {
     &quot;id&quot;:&quot;0002032313456-b0b0b0-007&quot;,
     &quot;owner&quot;:&quot;nryan&quot;,
     &quot;url&quot;:&quot;rjohnson@rangers.texas.mlb.com&quot;,
     &quot;associatedUuid&quot;:&quot;0001384707924891-b0b0b0bb0b-0001-013&quot;,
     &quot;event&quot;:&quot;nryan@rangers.texas.mlb.com&quot;,
     &quot;responseCode&quot;:200,
     &quot;attempts&quot;:0,
     &quot;lastSent&quot;:null,
     &quot;success&quot;:false,
     &quot;persistent&quot;:false,
     &quot;created&quot;:&quot;2013-11-17T17:39:30.000-06:00&quot;,
     &quot;_links&quot;:{
        &quot;self&quot;:{
           &quot;href&quot;:&quot;https://$API_BASE_URL/notifications/$API_VERSION/0001384707924891-b0b0b0bb0b-0001-013&quot;
        },
        &quot;schema&quot;:{
           &quot;href&quot;:&quot;https://$API_BASE_URL/jobs/$API_VERSION/0001381610343558-b0b0b0bb0b-0001-007&quot;
        }
     }
  },
  {
     &quot;id&quot;:&quot;0002032313456-b0b0b0-007&quot;,
     &quot;owner&quot;:&quot;nryan&quot;,
     &quot;url&quot;:&quot;nryan@rangers.texas.mlb.com&quot;,
     &quot;associatedUuid&quot;:&quot;0001384707925001-b0b0b0bb0b-0001-013&quot;,
     &quot;event&quot;:&quot;http://rangers.mlb.com/alerts?job_id=${JOB_ID}&amp;status=${STATUS}&quot;,
     &quot;responseCode&quot;:200,
     &quot;attempts&quot;:0,
     &quot;lastSent&quot;:null,
     &quot;success&quot;:false,
     &quot;persistent&quot;:false,
     &quot;created&quot;:&quot;2013-11-17T17:39:30.000-06:00&quot;,
     &quot;_links&quot;:{
        &quot;self&quot;:{
           &quot;href&quot;:&quot;https://$API_BASE_URL/notifications/$API_VERSION/0001384707925001-b0b0b0bb0b-0001-013&quot;
        },
        &quot;schema&quot;:{
           &quot;href&quot;:&quot;https://$API_BASE_URL/jobs/$API_VERSION/0001381610343558-b0b0b0bb0b-0001-007&quot;
        }
     }
  }
]
[/code]

<h3>Unsubscribing from notifications</h3>

To unsubscribe from an event, perform a DELETE on the notification URL. Once deleted, you can not restore a subscription. You can, however create a new one. Keep in mind that if you do this, the UUID of the new notification will be different that that of the deleted one. An example of deleting a notification using curl as well as the CLI is given below.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X DELETE https://$API_BASE_URL/notifications/$API_VERSION/0989079870809-b0b0b0-012?pretty=true
```
[/tab]
[tab title="CLI"]
```bash
notifications-delete -V
```
[/tab][/tabgroup]

Which will result in an empty result response.