let editor;
let stdIn;

window.onload = function() {
	editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/rust");
    	
    stdIn = ace.edit("stdIn");    
}

function executeCode() {	
	var code = editor.getSession().getValue();
	if (code.trim() == '') {
		alert("Enter Rust Code");		
		return;
	}
	
    $.ajax({
        url: "compile",
        method: "POST",
        data: {
            stdIn: stdIn.getSession().getValue(),
            code: editor.getSession().getValue()
        },

        success: function(response) {        	
        	response = response.replace(/(?:\r\n|\r|\n)/gi, '<br />');        	  	            
            $(".output").html(response);
        }
    })
}