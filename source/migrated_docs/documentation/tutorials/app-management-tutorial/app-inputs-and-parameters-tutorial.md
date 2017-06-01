## Introduction  

In this section we take a detailed look at the <code>inputs</code> and <code>parameters</code> sections of your app descriptions. Each of these sections takes an array of JSON objects. Each JSON object represents either a data source that needs staging in prior to job execution or a primary value passed into your app as a parameter. In either case, the JSON object only requires an <code>id</code> by which to reference the object in a job request, and a <code>type</code> field indicating primary type if the object represents a parameter.

In practice, you will want to add some descriptive information, constraints, and runtime validation checks to reduce the amount of error users can run into when attempting to run your app. The full lists of app input and parameter attributes are provided in their respective sections below. However, before we dive deeper into the next section on app inputs, let's first get a big picture view of what we are doing when we define our app's input and parameters.

<img src="/images/2014/10/App-Job-Information-Flow-1.png" alt="Input and Parameter Information Flow" width="960" height="720" class="aligncenter size-full wp-image-1661" />

When a user submits a job request in step 1, they specify the inputs and parameters needed to run that job. Those attributes are defined in your app description. The Jobs service will use your app description to validate the values in the job request and either reject it with a descriptive error message as in step 2, or accept it as in step 4. Once the job request is accepted, the values provided for the inputs and parameters given in the job request are used to replace their corresponding template placeholder values in the wrapper script. For example, the job request assigned a value of <em>foo</em> for the input with id equal to <em>input1</em>. Before submitting the job request to the remote system, the Jobs service will replace all occurrences of <code>${input1}</code> in the app wrapper script with <em>foo</em>. The same will happen with <em>param1</em> and <em>param2</em>. All occurrences of <code>${param1}</code> will be replaced with <em>bar</em> and all occurrences of <code>${param2}</code> will be replaced with <em>2</em>, just as specified in the job request.

<aside class="notice">Notice that Agave will not handle variable quoting for you. It is up to you to handle any type casting, escaping, and quoting of template values necessary for your app's logic.</aside>

As we look at how to define inputs and parameters for your app, keep this big picture in mind. The purpose of inputs is to specify data that need to be staged prior to your job running and to tell your wrapper script about them. The purpose of parameters is to specify variables that need to be passed to your wrapper script. To do this, we only need a simple id by which to reference the values in a job request. The rest of what we will discuss in this tutorial is the mechanism that Agave provides for you to validate, describe, discover, and restrict application inputs and parameters to provider better user and developer experiences using your app.

## Inputs  

The <code>inputs</code> attribute of your app description contains a JSON array of input objects. An input represents one or more pieces of data that your app will use at runtime. That data can be a single file, a directory, or a response from a web service. It can reside on a system that Agave knows about, or at a publicly accessible URL. Regardless of where it lives and what it is, Agave will grab the data (recursively if need be) and copy it to your job's working directory just before execution.

<aside class="notice">In the Job management tutorial, we talk in detail about the job lifecycle. Here we simply point out that Agave will handle the staging of your app's <span class="code">deploymentPath</span> separately from the staging of your assets. Thus, as a best practice, it is preferable to include all of the assets your app needs to run in your <span class="code">deploymentPath</span> rather than defining them as inputs. This will allow Agave to make better caching decisions and reduce the overall throughput when running a job.</aside>

A minimal input object contains a single <code>inputs.[].id</code> attribute that uniquely identifies it within the context of your app. Any alphanumeric value under 64 characters can be an identifier, but it must be unique among all the inputs and parameters in that app.

```javascript
{
  "id": "input1"
}
```

Most of the time, such a minimal definition is not helpful. At the very least, you would want some descriptive information, a restriction on the cardinality, and potentially a default value. This can be achieved with the <code>details</code>, <code>semantics</code>, and <code>value</code> objects. The full list of input attributes is shown in the following table. We cover each attribute in the corresponding section below.

<%= partial "includes/tables/66" %>

### Input details section  

The <code>inputs.[].details</code> object contains information specifying how to describe an input in different contexts. The <code>description</code> and <code>label</code> values provide human readable information appropriate for a tool tip and form label respectively. Neither of these attributes are required, however they dramatically improve the readability of your app description if you include them.

Often times you will need to translate your input value into actual command line arguments. By default, Agave will replace all occurrences of your attribute <code>inputs.[].id</code> in your wrapper script with the value of that attribute in your job description. That means that you are responsible for inserting any command line flags or arguments into the wrapper script yourself. This is a pretty straightforward process, however in situations where an input is optional, the resulting command line could be broken if the user does not specify an input value in their job request. One way to work around this is to add a conditional check to the variable assignment and exclude the command line flag or argument if it does not have a value set. Another is to use the <code>inputs.[].details.argument</code> attribute.

The <code>inputs.[].details.argument</code> value describes the command line argument that corresponds to this input, and the <code>inputs.[].details.showArgument</code> attribute specifies whether the <code>inputs.[].details.argument</code> value should be injected into the wrapper template in front of the actual runtime value. The following table illustrates the result of these attributes in different scenarios.

<%= partial "includes/tables/68" %>

### Input semantics section  

The <code>inputs.[].semantics</code> object contains semantic information about the input. The <code>minCardinality</code> attribute specifies the minimum number of data sources that can be specified for the input. This attribute is used to validate the value(s) provided for the input in a job request. The <code>ontology</code> attribute specifies a JSON array of URLs pointing to the ontology definitions of this file type. (We recommend at least specifying an <a href="http://www.schemacentral.com/sc/xsd/s-datatypes.xsd.html" title="XSL Schema Simple Type" target="_blank">XSL Schema Simple Type</a>.) Finally, the <code>fileTypes</code> attribute contains a JSON array of file type strings as specified in the transforms service. (In most situations you will leave the fileTypes attribute null or specify <em>RAW-0</em> as the single file type in the array.)

### Input value section  

The <code>inputs.[].value</code> object contains the information needed to validate user-supplied input values in a job request. The <code>validator</code> attribute accepts a Perl regular expression which will be applied to the input value(s). Any submissions that do not match the <code>validator</code> expression will be rejected.

<aside class="notice">If <span class="code">inputs[].semantics.minCardinality</span> is greater than 1, multiple values will be accepted for input. These values may be provided in a semicolon delimited list or in a JSON array. The values may be relative paths to the user's default storage system, or URLs. Whatever value(s) the user provides, the validator will be applied independently to the entire value, not just the name.</aside>

The <code>default</code> attribute allows you to specify a default value for the input. This will be used in leu of a user-supplied value if the input is <code>required</code>, but not <code>visible</code>. All default values must match the <code>validator</code> expression, if provided.

The <code>required</code> attribute specifies whether the input must be specified during a job submission.

The <code>visible</code> attribute takes a boolean value specifying whether the input should be accepted as as a user-supplied value in a job requests. If false, the value will be ignored at job submission and the <code>default</code> value will be used instead. Whenever <code>visible</code> is set to false, <code>required</code> must be true.

The <code>order</code> attribute is used to specify the order in which inputs should be listed in the response from the API and in command-line generation. By default, <code>order</code> is set to zero. Thus, providing a value greater than zero is sufficient to force any single input to be listed last.

### Validating inputs  

The previous section covered different ways you can specify for Agave to validate and restrict the data inputs to your app. When a user submits an job request, the order in which they are applied is as follows.

<ol>
<li>visible</li>
<li>required</li>
<li>minCardinality</li>
<li>maxCardinality</li>
<li>validator</li>
</ol>

Once an input passes these tests, Agave will check that it exists and that the user has permission to access the data. Assuming everything passes, the input is accepted and scheduled for staging.

## Parameters  

The <code>parameters</code> attribute of your app description contains a JSON array of parameter objects. A parameter represents one or more arguments that your app will use at runtime. Those arguments can be more or less anything you want them to be. If, for some reason, your app handles data staging on its own and you do not want Agave to move the data on your behalf, but you do need a data reference passed in, you can define it as a parameter rather than an input.

A minimal parameter object contains a single <code>id</code> attribute that uniquely identifies it within the context of your app and a <code>value.type</code> attribute specifying the primary type of the parameter. Any alphanumeric value under 64 characters can be an identifier, but it must be unique among all the inputs and parameters in that app. The parameter type is restricted to a handful of primary types listed in the table below.

```javascript
{
  "id": "parameter1",
  "value": {
    "type": "string"
  }
}
```

In most situations you will want some descriptive information and validation of the user-supplied values for this parameter. As with your app inputs, app parameters have <code>details</code>, <code>semantics</code>, and <code>value</code> objects that allow you to do just that. The full list of parameter attributes is shown in the following table. We cover each attribute in the corresponding section below.

<%= partial "includes/tables/67" %>

### Parameter details section  

The <code>parameters.[].details</code> object contains information specifying how to describe a parameter in different contexts and is identical to the <code>inputs.[].details</code> object.

### Parameter semantics section  

The <code>parameters.[].semantics</code> object contains semantic information about the parameter. Unlike the <code>inputs.[].semantics</code> object, it only has a single attribute, <code>ontology</code>. The <code>ontology</code> attribute specifies a JSON array of URLs pointing to the ontology definitions of this parameter type. (We recommend at least specifying an <a href="http://www.schemacentral.com/sc/xsd/s-datatypes.xsd.html" title="XSL Schema Simple Type" target="_blank">XSL Schema Simple Type</a>.)

### Parameter value section  

The <code>parameters.[].value</code> object contains the information needed to validate user-supplied parameter values in a job request. The <code>type</code> attribute defines the primary type of this parameter's values. The available types are:

<ul>
<li><em>number</em>: any real number </li>
<li><em>string</em>: any json-escaped alphanumeric string. </li>
<li><em>bool</em>: true or false</li>
<li><em>flag</em>: true or false. Identical to boolean, but only the <code>argument</code> value will be inserted into the wrapper template.</li>
<li><em>enumeration</em>: a JSON array of strings values or JSON objects representing the acceptable values for this parameter. If an array of JSON objects is given, each object should have a single attribute with the key being a desired enumeration value, and the value being a human readable descriptive name for the enumerated value. The value of using objects vs strings is that object values provide a way to create more descriptive user interfaces by customizing both the content and value of a HTML select box's option elements. An example of both is given below.</li>
</ul>

```shell
[
  "red",
  "white",
  "green",
  "black"
]
```


[tab title="enumerated object array"]
```javascript
[
  { "red": "Deep Cherry Red" },
  { "white": "Bright White" },
  { "green": "Black Forest Green" },
  { "black": "Brilliant Black Crystal Pearl" }
]
```


[/tabgroup]

The <code>validator</code> attribute accepts a Perl regular expression which will be applied to the input value(s). Any submissions that do not match the <code>validator</code> expression will be rejected. This attribute is available both to parameters of type <em>number</em> and <em>string</em>. It is not available to <em>bool</em> or <em>flag</em> parameter types, or to <em>enumeration</em> parameters as they require the <code>enumValues</code> attribute instead.

The <code>default</code> attribute allows you to specify a default value for the parameter. This will be used in leu of a user-supplied value if the parameter is <code>required</code>, but not <code>visible</code>. All default values must match the appropriate <code>validator</code> if <code>type</code> is <em>number</em> or <em>string</em>, or be one of the values in the <code>enumValues</code> array if <code>type</code> is <em>enumeration</em>.

The <code>enumValues</code> attribute is a JSON array of alphanumeric values specifying the acceptable values for this input. This attribute only exists for <em>enumeration</em> parameter types.

The <code>required</code> attribute specifies whether the parameter must be specified during a job submission.

The <code>visible</code> attribute takes a boolean value specifying whether the parameter should be accepted as as a user-supplied value in a job requests. If false, the value will be ignored at job submission and the <code>default</code> value will be used instead. Whenever <code>visible</code> is set to false, <code>required</code> must be true.

The <code>order</code> attribute is used to specify the order in which parameters should be listed in the response from the API and in command-line generation. By default, <code>order</code> is set to 0. Thus, providing a value greater than zero is sufficient to force any single parameter to be listed last.

### Validating inputs  

The previous section covered different ways you can specify for Agave to validate and restrict the parameters to your app. When a user submits an job request, the order in which they are applied is as follows.

<ol>
<li>visible</li>
<li>required</li>
<li>type</li>
<li>validator / enumValues</li>
</ol>