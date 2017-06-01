# Markdown
set :markdown_engine, :redcarpet
set :markdown,
    fenced_code_blocks: true,
    smartypants: true,
    disable_indented_code_blocks: true,
    prettify: true,
    tables: true,
    with_toc_data: true,
    no_intra_emphasis: true

# Assets
set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'
set :fonts_dir, 'fonts'

#proxy "/live-docs/index.html", "documentation/live-docs.html", :locals => { :apidoc => "/swagger/openapi.json" }, :ignore => true

# Activate the syntax highlighter
activate :syntax

activate :autoprefixer do |config|
  config.browsers = ['last 2 version', 'Firefox ESR']
  config.cascade  = false
  config.inline   = true
end

# Add livereload support for the server
#activate :livereload, host: '0.0.0.0', port: '35729', ignore: [/.idea\//]
#config[:file_watcher_ignore] += [
#    /.idea\//,
#    /build\//,
#    /source\/images\//,
#    /source\/migrated_docs\//
#    ]

# Github pages require relative links
activate :relative_assets
set :relative_links, true

# Ignore unused migrated docs
ignore "/migrated_docs/"
ignore "/live-docs/"

# JQuery cdn
set :jqcdn, false

# Build Configuration
configure :build do
  activate :minify_css
  activate :minify_javascript
  # activate :relative_assets
  # activate :asset_hash
  # activate :gzip
end
