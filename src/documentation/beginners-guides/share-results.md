Thus far we have done some work, obtained some results, and created some metadata. We have successfully conducted science in a closet. Rather than keep our discovery to ourself, let's use the PostIts service to share our metadata and results with a colleague.

A PostIt is a pre-authenticated, disposable URL, similar to a Bit.ly URL that you can share with others. You have control over the lifetime and number of times the URL can be redeemed and can expire it at any time. Let's create a PostIt for our "project" metadata that will expire after two requests.

[code lang=javascript]
{
  &quot;url&quot;: &quot;https://agave.iplantc.org/meta/v2/data/0001409792924730-5056a550b8-0001-012&quot;,
  &quot;maxUses&quot;: 2,
  &quot;method&quot;: &quot;GET&quot;
}
[/code]

<h2>Creating PostIts</h2>

To create a PostIt, send a POST request with the above JSON object to the PostIts service.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -F &quot;fileToUpload=@postit.json&quot; https://$API_BASE_URL/postits/$API_VERSION/
```
[/tab]
[tab title="CLI"]
```bash
postits-create -v -m 2 https://agave.iplantc.org/meta/v2/data/0001409792924730-5056a550b8-0001-012
```
[/tab][/tabgroup]

This will return a JSON object with a reference to the URL we are sharing and PostIt URL we can hand out to others. Notice that, in this example, the PostIt we created is valid for two uses. You can verify this limit with your browser if you're following along. Visit the URL, refresh your browser. That should max out the request limit. The next time you refresh your browser, you will get a permission denied error.

[code lang=javascript]
{
    &quot;authenticated&quot;: true,
    &quot;created&quot;: &quot;2014-09-03T20:31:30-05:00&quot;,
    &quot;creator&quot;: &quot;systest&quot;,
    &quot;expires&quot;: &quot;2014-10-03T20:31:30-05:00&quot;,
    &quot;internalUsername&quot;: null,
    &quot;method&quot;: &quot;GET&quot;,
    &quot;noauth&quot;: false,
    &quot;postit&quot;: &quot;a6804886706aec2cf5a9fb51cb52e016&quot;,
    &quot;remainingUses&quot;: 2,
    &quot;url&quot;: &quot;https://agave.iplantc.org/meta/v2/data/0001409792924730-5056a550b8-0001-012&quot;,
    &quot;_links&quot;: {
        &quot;profile&quot;: {
            &quot;href&quot;: &quot;https://agave.iplantc.org/profiles/v2/systest&quot;
        },
        &quot;self&quot;: {
            &quot;href&quot;: &quot;https://agave.iplantc.org/postits/v2/a6804886706aec2cf5a9fb51cb52e016&quot;
        }
    }
}
[/code]

Let's also create a PostIt of our output data that we can email to our colleague so they can download the file directly from our email message. The following JSON object will do the trick.

[code lang=javascript]
{
  &quot;url&quot;: &quot;https://agave.iplantc.org/files/v2/media/system/data.iplantcollaborative.org/systest/picksumipsum.txt&quot;,
  &quot;maxUses&quot;: 2,
  &quot;method&quot;: &quot;GET&quot;
}
[/code]

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -F &quot;fileToUpload=@output.json&quot; https://$API_BASE_URL/postits/$API_VERSION/
```
[/tab]
[tab title="CLI"]
```bash
postits-create -v -m 2 https://agave.iplantc.org/files/v2/media/system/data.iplantcollaborative.org/systest/picksumipsum.txt
```
[/tab][/tabgroup]

[code lang=javascript]
{
    &quot;authenticated&quot;: true,
    &quot;created&quot;: &quot;2014-09-03T20:36:27-05:00&quot;,
    &quot;creator&quot;: &quot;systest&quot;,
    &quot;expires&quot;: &quot;2014-10-03T20:36:27-05:00&quot;,
    &quot;internalUsername&quot;: null,
    &quot;method&quot;: &quot;GET&quot;,
    &quot;noauth&quot;: false,
    &quot;postit&quot;: &quot;14e86bb1a039a03a2463e6e0f0a4421f&quot;,
    &quot;remainingUses&quot;: 2,
    &quot;url&quot;: &quot;https://agave.iplantc.org/files/v2/media/system/data.iplantcollaborative.org/systest/picksumipsum.txt&quot;,
    &quot;_links&quot;: {
        &quot;profile&quot;: {
            &quot;href&quot;: &quot;https://agave.iplantc.org/profiles/v2/systest&quot;
        },
        &quot;self&quot;: {
            &quot;href&quot;: &quot;https://agave.iplantc.org/postits/v2/14e86bb1a039a03a2463e6e0f0a4421f&quot;
        }
    }
}
[/code]

<h2>Revoking PostIts</h2>

Now that you have created these URLs, you can share them freely with whoever you wish. If, at any time, you need to delete them before they expire, you can do so by issuing a DELETE on the URL.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X DELETE https://$API_BASE_URL/postits/$API_VERSION/14e86bb1a039a03a2463e6e0f0a4421f
```
[/tab]
[tab title="CLI"]
```bash
postits-delete -v https://agave.iplantc.org/postits/v2/14e86bb1a039a03a2463e6e0f0a4421f
```
[/tab][/tabgroup]