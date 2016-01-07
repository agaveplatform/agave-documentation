# Search Guide

Search is a fundamental feature of the Agave Platform. Each of the core science APIs support a mature, URL-based query mechanism allowing you to search using a sql-inspired json syntax.

By default, search is enabled on each collection endpoint allowing you to trim the response down to the results you care about most. The list of available search terms is identical to the attributes included in the JSON returned when requesting the full resource description.

<aside class="info">To see a full listing of the JSON attributes for each resource in the core science APIs, please see the <a href="http://agaveapi.co/documentation/live-docs/" title="Live Documentation">Live Docs</a>.</aside>

## Search syntax

```shell
# Search by a single attribute
https://public.tenants.agaveapi.co/jobs/v2?name=somejob

# Remember to URL encode spaces in the search terms
https://public.tenants.agaveapi.co/jobs/v2?name=test+job 
```  
```cli
# Search by a single attribute
jobs-search name=somejob

# Remember to URL encode spaces in the search terms
jobs-search "name=test+job" 
``` 

To search for a specific attribute, you simply append a search expression into the URL query of your request. 

## Multiple search terms

```shell 
# Search by multiple attributes  
https://public.tenants.agaveapi.co/jobs/v2/?name=test+job&executionSystem=aws-demo&status=FAILED  
``` 

```cli 
# Search by multiple attributes 
jobs-search name=test+job executionSystem=aws-demo status=FAILED  
```

You can include as multiple search expressions to build a more restrictive query.

<aside class="warning">Don't forget to URL encode your search values.</aside>

## Case sensitivity

```shell 
# These queries will all give identical results 

https://public.tenants.agaveapi.co/jobs/v2/?archiveSystem.like=*HpsS*&executionSystem=AwS-DeMo&status=Failed

https://public.tenants.agaveapi.co/jobs/v2/?ARCHIVESYSTEM.LIKE=*HPSS*&EXECUTIONSYSTEM=AWS-DEMO&STATUS=FAILED
 
https://public.tenants.agaveapi.co/jobs/v2/?archivesystem.like=*hpss*&executionsystem=aws-demo&status=failed
```  

```cli 
# These queries will all give identical results 

jobs-search "archivesystem.like=*hpss*" executionsystem=aws-demo status=failed 

jobs-search "ARCHIVESYSTEM.LIKE=*HPSS*" EXECUTIONSYSTEM=AWS-DEMO STATUS=FAILED 

jobs-search "archivesystem.like=*hpss*" executionsystem=aws-demo status=failed 
``` 

Search attributes are case ***insensitive***, though responses from the API are camel cased. 




## Search operators

```shell 
# systems with cloud in their name  
https://public.tenants.agaveapi.co/systems/v2?name.like=*cloud*
  
# apps modified between October 1 and October 30 of this year  
https://public.tenants.agaveapi.co/apps/v2?lastModified.between=10/1,10/30
  
# jobs with status equal to PENDING or ARCHIVING  
https://public.tenants.agaveapi.co/jobs/v2?status.in=PENDING,ARCHIVING  
```  

```cli
# systems with cloud in their name  
systems-search "name.like=*cloud*"
  
# apps modified between October 1 and October 30 of this year  
apps-search "lastModified.between=10/1,10/30"
  
# jobs with status equal to PENDING or ARCHIVING  
jobs-search "status.in=PENDING,ARCHIVING" 
``` 
 
By default, all search expressions are evaluated for equality. In order to perform more complex queries, you may append a search operator to the attribute in your search expression.

The full list of search operators is given in the following table.
[table id=78 /]

## Nested objects and collections

```shell 
# systems using Amazon S3 as the storage protocol  
https://public.tenants.agaveapi.co/systems/v2?storage.protocol=S3 
  
# systems with a batch queue allowing more than 10 concurrent user jobs   
https://public.tenants.agaveapi.co/systems/v2?queues.maxUserJobs.gt=10 
 
# jobs whos app has hadoop in the name, ran on a system with 
# id aws-demo, and started any time during the last business week 
https://public.tenants.agaveapi.co/jobs/v2?appId.like=*hadoop*&executionSystem.eq=aws-demo&startTime.between=last+monday,last+friday   

# users who profile has a last name ending in ross and an email 
# address ending in texas.edu   
https://public.tenants.agaveapi.co/profiles/v2?lastname.like=*ross&email.like=*texas.edu   
 
# failed login checks on the a system with uuid matching 
# 0001409867973952-5056a550b8-0001-014 
https://public.tenants.agaveapi.co/monitors/v2/0001409867973952-5056a550b8-0001-014/checks?result.eq=FAILED&type=LOGIN    
```  

```cli
# systems using Amazon S3 as the storage protocol  
systems-search storage.protocol=S3
  
# systems with a batch queue allowing more than 10 concurrent user jobs  
systems-search queues.maxUserJobs.gt=10 

# jobs whos app has hadoop in the name, ran on a system with 
# id aws-demo, and started any time during the last business week
jobs-search "appId.like=*hadoop*" "executionSystem.eq=aws-demo" "startTime.between=last+monday,last+friday"  

# users who profile has a last name ending in ross and an email 
# address ending in texas.edu   
profiles-search "lastName.like=*ross" "email.like=*texas.edu" 

# failed login checks for a monitor with uuid matching 
# 0001409867973952-5056a550b8-0001-014
monitors-search id.eq=0001409867973952-5056a550b8-0001-014 checks.result.eq=FAILED type=LOGIN   

```  

JSON dot notation may be used to query the sub resources in a collection. 

<aside class="notice">Index position is not currently supported in the search syntax.</aside>  

## Date support

Dates returned from the Agave core science API are always formatted as ISO 8601 dates. When searching, however, a much more flexible date syntax is supported. The following table lists supported expressions by example.
[table id=78 /]