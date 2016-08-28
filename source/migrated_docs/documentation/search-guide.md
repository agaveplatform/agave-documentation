## Introduction  

Search is a fundamental feature of the Agave Platform. Each of the core science APIs support a mature, URL-based query mechanism allowing you to search using a sql-inspired json syntax.

### Search syntax  

By default, search is enabled on each collection endpoint allowing you to trim the response down to the results you care about most. The list of available search terms is identical to the attributes included in the JSON returned when requesting the full resource description.

<aside class="notice">To see a full listing of the JSON attributes for each resource in the core science APIs, please see the <a href="http://agaveapi.co/documentation/live-docs/" title="Live Documentation">Live Docs</a>.</aside>

To search for a specific attribute, you simply append a search expression into the URL query of your request. For example:

[code lang=text]
http://public.agaveapi.co/jobs/v2?name=test%20job  
```

You can include as multiple search expressions to build a more restrictive query.

[code lang=text]
http://public.agaveapi.co/jobs/v2?name=test%20job&amp;executionSystem=aws-demo&amp;status=FAILED  
```

[alert]**Note that the values in your search expression must be URL encoded.**[/alert]

### Search operators  

By default, all search expressions are evaluated for equality. In order to perform more complex queries, you may append a search operator to the attribute in your search expression. The following examples should help clarify:

[code] 
  
# systems with cloud in their name  
systems/v2?name.like=*cloud*
  
# apps modified between October 1 and October 30 of this year  
apps/v2?lastModified.between=10/1,10/30
  
# jobs with status equal to PENDING or ARCHIVING  
jobs/v2?id.status=PENDING,ARCHIVING
  
```

For resources with nested collections, you may use JSON dot notation to query the subresources in the collection.

[code]  
  
# systems using Amazon S3 as the storage protocol  
systems/v2?storage.protocol="S3"
  
# systems with a batch queue allowing more than 10 concurrent user jobs  
systems/v2?queues.maxUserJobs.gt=10 
  
```

As before you can include multiple search expressions to narrow your results.

[code]  
  
# jobs whos app has hadoop in the name, ran on a system with id aws-demo, and started
# any time during the last business week
jobs/v2?appId.like=*hadoop*&amp;executionSystem.eq=aws-demo&amp;startTime.between=last%20monday,last%20friday  

# users who profile has a last name ending in ross and an email address ending in texas.edu   
profiles/v2?lastname.like=*ross&amp;email.like=*texas.edu  

# failed login checks on the a system with uuid 0001409867973952-5056a550b8-0001-014
monitors/v2/0001409867973952-5056a550b8-0001-014/checks?result.eq=FAILED&amp;type=LOGIN  
  
```

The full list of search operators is given in the following table.
<%= partial "includes/tables/78" %>

### Date support  

Dates returned from the Agave core science API are always formatted as ISO 8601 dates. When searching, however, a much more flexible date syntax is supported. The following table lists supported expressions by example.
<%= partial "includes/tables/78" %>