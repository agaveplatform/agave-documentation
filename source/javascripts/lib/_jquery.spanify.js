/*
 * @author: AmbyrShae Jarrell
 * @date: 3/28/16
 * Created per request that HTML not be in any markdown files.
 * This script collects all <h1> - <h3> found in the body and
 * searches for HTTP request tags. If any present, add a span 
 * around it in order to style each tag. This makes the site easier
 * to read and prettier in general.
 */
$(gatherHeaders);
/*
 * Collect header selectors, h1 - h3 in body.
 * Examine each header's content to find HTTP request
 * tags.
 */
function gatherHeaders(){

	var headers, headerContent, self;
	// header selectors
	headers = $('h1, h2, h3');
	// Iterate through each header selector.
	headers.each(function(){
		self = $(this);
	  	headerContent = self.html();
	  	// will change the html of the selected header
	  	self.html(addSpan(headerContent));
	});
}
/*
 * Add a span around HTTP request tags
 * in order to apply styling.
 */
function addSpan(headerContent){
	return headerContent
		.replace(/GET/, '<span class="get">GET</span>')
		.replace(/PUT/, '<span class="put">PUT</span>')
		.replace(/POST/, '<span class="post">POST</span>')
		.replace(/DELETE/, '<span class="delete">DELETE</span>');
}