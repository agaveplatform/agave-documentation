require 'middleman-core/renderers/redcarpet'

module RedcarpetMods
  # Fix header
  def header(text, level)
    clean_id = text.downcase.gsub(/( +|\.+)/, '-').gsub(/[^a-zA-Z0-9\-_]/, '')
    "<h#{level} id='#{clean_id}'>#{text}</h#{level}>"
  end

  # Parse markdown in aside tags
  def block_html(raw_html)
  	if (md = raw_html.match(/\<(.+?)\>(.*)\<(\/.+?)\>/m))
	  	open_tag, content, close_tag = md.captures
	    if (open_tag["aside"] and close_tag["aside"])
	   	  @markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)
	      "<#{open_tag}>#{@markdown.render content}<#{close_tag}>"
	    else
	      raw_html
	    end
	end
  end
end

Middleman::Renderers::MiddlemanRedcarpetHTML.send :include, RedcarpetMods