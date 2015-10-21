This is the first of three app examples demonstrating how a real work code can be registered and used in Agave. The app is a Python code that takes a csv file and creates a graph of the data. We detail how to create a JSON description of the code we want to run, how to create the wrapper template that Agave uses to run the code, and how to test and run the app with Agave.

[notice]You can download the full source code for this example app and client application in the <a href="https://bitbucket.org/taccaci/agave-samples" title="Agave Samples">Agave Samples</a> repository in the <span class="code">apps/pyplot-demo/basic/pyplot-demo-basic-0.1.0</span> directory. If you would like to run this app in a live environment, you can register your own compute and storage systems, or use one of our developer sandbox environments.[/notice]

<h2>Basic app overview</h2>

The app we're going to be using in this example is a native Python app that creates plots and charts of CSV data. The app itself is loosely based on example programs from the matplotlib cookbook with a healthy dose of parameterization, exception handling, and logging added for usability. The app's help output is listed below.

[code lang=text]
python main.py -h
usage: pyplot-demo [-h] [--chart-type {bar,line}] [--x-label [XLABEL]]
                   [--show-x-label] [--y-label [YLABEL]] [--show-y-label]
                   [--show-legend] [--width WIDTH] [--height HEIGHT]
                   [--background-color BACKGROUND] [--output-location OUTDIR]
                   [--file-per-series] [--format {png,jpg,gif}] [-v]
                   infile

A program to plot the contents of a csv file.

positional arguments:
  infile                The dataset to plot.

optional arguments:
  -h, --help            show this help message and exit
  --chart-type {bar,line}
                        The type of chart to show.
  --x-label [XLABEL]    The x-axis label.
  --show-x-label        If specified, the x-axis label will be shown
  --y-label [YLABEL]    The y-axis label.
  --show-y-label        If specified, the y-axis label will be shown
  --show-legend         If specified, a legend will be generated for each
                        chart.
  --width WIDTH         The chart width.
  --height HEIGHT       The chart height.
  --background-color BACKGROUND
                        The css hex color of the chart background.
  --output-location OUTDIR
                        The output directory of the plotted dataset.
  --file-per-series     If specified, each chart will be saved in a separate
                        file.
  --format {png,jpg,gif}
                        The image format of the plotted dataset.
  -v, --verbose         Enable verbose output.
[/code]

While the app itself provides quite a few options, in this basic example, we will work under the assumption that end users don't need or use the majority of the options available from the pyplot code. The app we create will focus on two options: the kind of chart they want to create, <code>chart-type</code>, and the input file they want to plot, <code>infile</code>.

As you will see, these two options will allow us to build a basic app description and highlight the major concepts of app registration. In the intermediate and advanced examples we will build on this example by exposing more of the pyplot options and demonstrating how Agave can help you with data scheduling, parameter validation, and batch processing.

<h3>Runtime requirements</h3>

In order to run this app, the target execution system must have the following installed.

<ul>
<li>Python 2.7</li>
<li>Matplotlib</li>
</ul>

If you are following along on your local system, you will need to have these installed in order to run the wrapper script and invoke the pyplot Python code.

<h3>Creating the app JSON description</h3>

In order to register our example app, we need to create a JSON description of it so Agave knows where it should run and how to run it. The JSON for our basic app is below.

[code lang=javascript]
{
  &quot;name&quot;: &quot;demo-pyplot-demo-basic&quot;,
  &quot;parallelism&quot;: &quot;SERIAL&quot;,
  &quot;version&quot;: &quot;0.1.0&quot;,
  &quot;label&quot;: &quot;PyPlot Demo Basic&quot;,
  &quot;shortDescription&quot;: &quot;Basic demo plotting app&quot;,
  &quot;longDescription&quot;: &quot;Basic demo app to create a graph using Python&quot;,
  &quot;deploymentPath&quot;: &quot;apps/pyplot-demo-basic-0.1.0&quot;,
  &quot;deploymentSystem&quot;: &quot;demo.storage.example.com&quot;,
  &quot;executionSystem&quot;: &quot;demo.execute.example.com&quot;,
  &quot;executionType&quot;: &quot;CLI&quot;,
  &quot;templatePath&quot;: &quot;wrapper.sh&quot;,
  &quot;testPath&quot;: &quot;test/test.sh&quot;,
  &quot;tags&quot;: [
    &quot;demo&quot;,
    &quot;python&quot;,
    &quot;tutorial&quot;,
    &quot;plotting&quot;
  ],
  &quot;ontology&quot;: [],
  &quot;inputs&quot;: [{
    &quot;id&quot;: &quot;dataset&quot;,
    &quot;value&quot;: {
      &quot;default&quot;: &quot;agave://demo.storage.example.com/inputs/pyplot/dataset.csv&quot;,
      &quot;required&quot;: true 
    },
    &quot;details&quot;: {
      &quot;label&quot;: &quot;Dataset&quot;,
      &quot;description&quot;: &quot;The dataset to plot&quot;
    }
  }],
  &quot;parameters&quot;: [{
    &quot;id&quot;: &quot;chartType&quot;,
    &quot;value&quot;: {
      &quot;default&quot;: &quot;bar&quot;,
      &quot;type&quot;: &quot;enumeration&quot;,
      &quot;enum_values&quot;: [{
        &quot;bar&quot;: &quot;Bar Chart&quot;
      }, {
        &quot;line&quot;: &quot;Line Chart&quot;
      }],
      &quot;required&quot;: true
    },
    &quot;details&quot;: {
      &quot;label&quot;: &quot;Chart types&quot;,
      &quot;description&quot;: &quot;Select the chart type to generate for the dataset&quot;
    }
  }]
}
[/code]

It's easiest to think of the JSON description as having 3 basic components: metadata, inputs, and parameters. The metadata includes information about the app name and version,  where it should run, where the application assets (such as the pyplot code itself) are stored, etc. Inputs are the user-supplied input data that the app needs to run. In this example, pyplot will take a single input file as an input. We call the input file <code>dataset</code> for lack of a better term. We also specify that this is a required field any time someone runs our app. Finally, parameters are the user-supplied options passed to the pyplot app at runtime. We will talk more about how this is done when we create our wrapper template. For now we point out that we are defining a single input of type enumeration with possible values <em>bar</em> and <em>line</em>. Like our input, this parameter is required.

There are many, many other attributes and options that we could include in our app description. We will get to some of them in the intermediate and advanced examples. For a full description of all the app description attributes and options, see the <a href="http://agaveapi.co/documentation/tutorials/app-management-tutorial/app-inputs-and-parameters-tutorial/" title="App Inputs and Parameters Tutorial">App Inputs and Parameters Tutorial</a>.

<h3>Creating a wrapper script</h3>

Now that we have our app defined, we need to create a wrapper template that Agave can use to run our pyplot code. A wrapper template is a shell script that Agave calls to invoke your app. A simple wrapper template for our app is shown below.

[code lang=text]
WRAPPERDIR=$( cd &quot;$( dirname &quot;$0&quot; )&quot; &amp;&amp; pwd )

# The input file will be staged in for you as part of the job request.
# Here we just sanity check that it exists.
if [[ ! -e &quot;${dataset}&quot; ]]; then
    echo &quot;Input file &#039;${dataset}&#039; was not found in the job directory&quot; &gt;&amp;2
    exit 1
fi

# We will drop the output graphs into a standard place
outdir=&quot;$WRAPPERDIR/output&quot;
mkdir -p &quot;$outdir&quot;

# Now run the pyplot app with the injected chart type and directory as commandline options
python $WRAPPERDIR/lib/main.py -v --output-location=$outdir --chart-type=${chartType} ${dataset}
[/code]

You may notice that the wrapper template contains references to the <code>dataset</code> and <code>chartType</code> properties we defined in our app description. These are what we call <strong>template variables</strong>. Template variables are placeholders in the wrapper template that will be replaced with runtime values during job submission.

When a user runs this example app, they will specify a <code>dataset</code> and <code>chartType</code> in their job request. During job submission, Agave will stage the <code>dataset</code> to the execution system, demo.execute.example.com, and place it in the job's work directory. It will then copy the contents of the app's <code>deploymentPath</code>, apps/pyplot-demo-basic-0.1.0, from the <code>deploymentSystem</code>, demo.storage.example.com, to the job work directory on demo.execute.example.com and process the contents of the wrapper template, wrapper.sh, into an executable file.

During processing, Agave will replace all occurrences of <code>${dataset}</code> and <code>${chartType}</code> with the name of the input file that it staged to the job work directory (not the full path, just the file name) and the user-supplied <code>chartType</code> value. Depending on whether the execution system registered with Agave uses a batch scheduler, specifies a custom environment, or requires other custom environment variables set, Agave will prepend these values to the top of the file, resolve any other <a href="http://agaveapi.co/documentation/tutorials/app-management-tutorial/" title="App Management Tutorial">predefined template variables</a> in the wrapper, and save the file in the job work folder and executed.

<h3>Things you don't worry about</h3>

<h4>Data staging</h4>

Data will already be there before the app is run. If the data isn't available or the user didn't provide any, the job will fail before the wrapper template is processed.

<h4>Logging</h4>

Logging is handled for you by Agave. Both stderr and stdout will be captured for CLI apps. On batch systems, the job log files are saved in the job work directory. All will be present in the job work directory or archive directory when the job completes.

<h4>App installation</h4>

This is a bit of a moot point since pyplot is Python, but Agave handles the app staging for you by copying the <code>deploymentPath</code> from the <code>deploymentSystem</code> given in your app description to the job work folder on the <code>executionSystem</code>. As long as you can package up your app's assets into the <code>deploymentPath</code>, or ensure that they are already present on the system, you can run your app without dealing with pulling in dependencies, etc.

Of course, you still have the option of including a build or compilation in your wrapper script. For throughput reasons, however, that may not be the best approach. For another option with much better portability and performance, see the <a href="http://agaveapi.co/documentation/tutorials/app-management-tutorial/docker-app-containers-tutorial/" title="Docker App Containers Tutorial">Docker App Containers Tutorial</a>.

<h3>Testing the wrapper template</h3>

To test our wrapper template, we will create a new script in our test folder. The script will define the template variables Agave would replace in the wrapper template at runtime. One perk of the wrapper templates being shell scripts is we can simply define our inputs and parameters as environment variables and bash will do the replacement for us.

[code lang=text]
#!/bin/bash

DIR=$( cd &quot;$( dirname &quot;$0&quot; )&quot; &amp;&amp; pwd )

# set test variables
export dataset=&quot;$DIR/lib/testdata.csv&quot;
export chartType=&quot;bar&quot;

# call wrapper script as if the values had been injected by the API
sh -c ../wrapper.sh
[/code]

That's it. We can run the script and verify that the correct bar chart appears in the output directory.

<h3>Registering your app</h3>

Now that we have our wrapper script and app description, and we have tested it works, we will register it to Agave. Let's copy our wrapper script and test directory up to the <code>deploymentSystem</code> we specified in the app description and then send our app description to Agave.

[code lang=bash]
files-mkdir -N apps/pyplot-demo-basic-0.1.0 -S demo.storage.example.com 
files-upload -F wrapper.sh -S demo.storage.example.com apps/pyplot-demo-basic-0.1.0
files-upload -F test -S demo.storage.example.com apps/pyplot-demo-basic-0.1.0

apps-addupdate -F app.json
[/code]

That's it. Now we have our app ready to run with Agave.

<h3>Running your app</h3>

To run your app, we will post a JSON job request object to the jobs service. We can get an sample job description from the Agave CLI's <code>jobs-template</code> script.

[code lang=bash]
jobs-template -A demo-pyplot-demo-basic-0.1.0 &gt; submit.json
[/code]

That will produce JSON similar to the following in the <code>submit.json</code> file.

[code lang=javascript]
{
  &quot;name&quot;: &quot;demo-pyplot-demo-basic test-1415742730&quot;,
  &quot;appId&quot;: &quot;demo-pyplot-demo-basic-0.1.0&quot;,
  &quot;archive&quot;: false,
  &quot;inputs&quot;: {
    &quot;dataset&quot;: &quot;agave://demo.storage.example.com/apps/pyplot-demo-advanced-0.1.0/test/testdata.csv&quot;
  },
  &quot;parameters&quot;: {
    &quot;chartType&quot;: &quot;bar&quot;
  }
}
[/code]

We can now submit this JSON to the jobs service to run our pyplot on the execution system.

[code lang=bash]
jobs-submit -W -F submit.json
[/code]

When the job ends, you can use the <code>jobs-output</code> CLI script to retrieve the output. Here <code>$JOB_ID</code> is the id returned from the previous job submission.

<h3>Accessing job output</h3>

[code lang=bash]
jobs-output -P output/bar.png -D $JOB_ID
[/code]