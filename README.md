# Agave Developer Docs
> Developer documentation for the [Agave Platform](https://agaveplatform.org).

This is the repository for the Agave Platform developer docs. The code is written in markdown utilizing the [tripit.github.io/slate](http://tripit.github.io/slate)
Middleman theme.

### Prerequisites

You're going to need:

 - **Linux or OS X** — Windows may work, but is unsupported.
 - **Docker** - To build, test, and run.

### Getting Set Up

The documentation is built and debugged in real time with Middleman. To set up a development environment, checkout 
the code, then run the image. Once running, you can edit the code and see the changes
in real time on your local system.

```shell
# Check out the documentation source
git clone https://github.com/agaveplatform/developer-docs.git
cd developer-docs

# Run the dev server, mounting in the source code
docker run -d -p 4567:4567 \
           --name agave-documentation \
           -v $(pwd):/usr/src/docs \
           agaveplatform/doc-builder:latest bundle exec middleman server
```

You can now see the docs at <http://localhost:4567>.

Now that Slate is all set up your machine, you'll probably want to learn more about [editing Slate markdown](https://github.com/tripit/slate/wiki/Markdown-Syntax), or [how to publish your docs](https://github.com/tripit/slate/wiki/Deploying-Slate).

Building and Deploying to Production
---------------------------------
**DANGER ZONE:** Do not deploy to the production server unless you were given specific instructions to do so and know what you are doing.

 1. `git checkout devel`
 2. `git pull origin devel`
 3. `./deploy.sh`

Need Help? Found a bug?
--------------------

Just [submit a issue](https://support.agaveplatform.org) to the Agave Help Desk if you need any help. And, of course, feel free to submit pull requests with bug fixes or changes.


Contributors
--------------------

Slate was built by [Robert Lord](https://lord.io) while at [TripIt](http://tripit.com).
This theme was adapted from the developer docs of [Fulcrum Tech Ops](https://github.com/lucidhq/developer-documentation).

Thanks to the following people who have submitted major pull requests:

- [@jfonner](https://github.com/johnfonner)
- [@deardooley](https://github.com/deardooley)

Also, thanks to [Sauce Labs](http://saucelabs.com) for helping sponsor the project.

Special Thanks
--------------------
- [Middleman](https://github.com/middleman/middleman)
- [jquery.tocify.js](https://github.com/gfranko/jquery.tocify.js)
- [middleman-syntax](https://github.com/middleman/middleman-syntax)
- [middleman-gh-pages](https://github.com/neo/middleman-gh-pages)
- [Font Awesome](http://fortawesome.github.io/Font-Awesome/)
