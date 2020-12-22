### File history -- **DRAFT**

A full history of changes, permissions changes, and access events made through the Files API is available for every file and folder on registered <a href="#systems">Agave systems</a>. Two kinds of events are recorded in a file item's history, both of which represent mutations of the file item and/or its metadata. 

represents the provenance of a file or folder as observed by the Platform over time. 

Provenance is:
* Logging+relationships

Provenance is not:    
* Versioning
* Guaranteed reproducibility

Think of provenance as a bank statement, not a kit car.

#### What information is available  

Agave tracks every direct action it takes on a file or directory. As with all Agave resources, the recorded provenance is a subset of the events thrown by various file actions. 

Additionally, it will make note of any indirect action it observes about file or directory. Examples of direct action are transferring a directory from one system to another or renaming a file. Examples of indirect action are a user manually deleting a file from the command line. The table below contains a list of all the provenance actions recorded.

<pre><code>Insert data provenance table
</code></pre>

#### How accurate is this information  

Agave does not own the storage and execution systems you access through the REST APIs, so it cannot guarantee that it will be aware of everything that happens on that file system. Thus, Agave takes a best-effort approach to provenance allowing you to choose, through your own use of best practices, how thorough you want the provenance trail of your data to be.

#### Why is this useful?  

<ul>
<li>See who did what, when</li>
<li>Check data integrity</li>
<li>Answer origin questions</li>
<li>Get alerts and do forensics</li>
<li>Trace steps of experiment</li>
</ul>

### File history  

#### Listing history events  

```shell
curl -sk -H "Authorization: Bearer $ACCESS_TOKEN" https://$API_BASE_URL/files/$API_VERSION/hisotry/data.agaveplatform.org/$API_USERNAME/picksumipsum.txt
```


```plaintext
files-history -v -S data.agaveplatform.org $API_USERNAME/picksumipsum.txt
``` 


The response to this contains a summary listing all permissions on the

```javascript
[]
```

### Searching for events  

```shell
curl -sk -H "Authorization: Bearer $ACCESS_TOKEN" https://$API_BASE_URL/files/$API_VERSION/hisotry/data.agaveplatform.org/$API_USERNAME/picksumipsum.txt?agent=rjohnson
```


```plaintext
files-history -v -S data.agaveplatform.org -U rjohnson $API_USERNAME/picksumipsum.txt
``` 


The response to this contains a JSON array of every action performed on the file by the user rjohnson.

```javascript
[]
```