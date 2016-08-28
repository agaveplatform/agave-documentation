<h2>What is provenance</h2>

Provenance is:
* Log with relationships
* Not versioning
* Not assuring reproducibility
* Bank statement, not model car.

<h3>What information is available</h3>

Agave tracks every direct action it takes on a file or directory. Additionally, it will make note of any indirect action it observes about file or directory. Examples of direct action are transferring a directory from one system to another or renaming a file. Examples of indirect action are a user manually deleting a file from the command line. The table below contains a list of all the provenance actions recorded.

<pre><code>Insert data provenance table
</code></pre>

<h3>How accurate is this information</h3>

Agave does not own the storage and execution systems you access through the REST APIs, so it cannot guarantee that it will be aware of everything that happens on that file system. Thus, Agave takes a best-effort approach to provenance allowing you to choose, through your own use of best practices, how thorough you want the provenance trail of your data to be.

<h3>Why is this useful?</h3>

<ul>
<li>See who did what, when</li>
<li>Check data integrity</li>
<li>Answer origin questions</li>
<li>Get alerts and do forensics</li>
<li>Trace steps of experiment</li>
</ul>

<h2>Accessing data provenance information</h2>

<h3>Listing recent events</h3>

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/files/$API_VERSION/hisotry/data.iplantcollaborative.org/$API_USERNAME/picksumipsum.txt
```
[/tab]
[tab title="CLI"]
```bash
files-history -v -S data.iplantcollaborative.org $API_USERNAME/picksumipsum.txt
``` 
[/tab][/tabgroup]

The response to this contains a summary listing all permissions on the

[code lang=javascript]
[]
[/code]

<h3>Searching for events</h3>

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/files/$API_VERSION/hisotry/data.iplantcollaborative.org/$API_USERNAME/picksumipsum.txt?agent=rjohnson
```
[/tab]
[tab title="CLI"]
```bash
files-history -v -S data.iplantcollaborative.org -U rjohnson $API_USERNAME/picksumipsum.txt
``` 
[/tab][/tabgroup]

The response to this contains a JSON array of every action performed on the file by the user rjohnson.

[code lang=javascript]
[]
[/code]