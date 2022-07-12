let editor;

window.onload = function() {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/rust");
}

function executeCode() {
    var code = editor.getSession().getValue();
    if (code.trim() == '') {
        alert("Enter Rust Code");
        return;
    }

    $.ajax({
        url: "judge",
        method: "POST",
        data: {
            code: editor.getSession().getValue(),
            questionNum: 0
        },

        success: function(response) {
            response = response.replace(/(?:\r\n|\r|\n)/gi, '<br />');
            $(".output").html(response);
        }
    })
}