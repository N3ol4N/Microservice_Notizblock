var protocol = 'http';
var serverAddress = 'localhost';
var port = '3000';
var baseUrl = protocol + '://' + serverAddress + ':' + port;

function loadAllNotesToTarget(target) {
    //loads the notes as table into the given target element
    if (target == undefined) {
        target = document.body;
    } else {
        if (target.length == 0) {
            target = document.body;
        }
    }
    $.ajax({
        url: baseUrl + '/notes/all',
        type: 'GET',
        cache: false,
        timeout: 5000,
        success: function (data) {
            var element = target;
            var html =
                '<table class="table table-bordered">' +
                '<thead class="thead-dark">' +
                '<th align="right">#</th>' +
                '<th>_id</th>' +
                '<th>title</th>' +
                '<th>text</th>' +
                '<th>change</th>' +
                '<th>delete</th>' +
                '</thead>';

            //text, title, _id
            $.each(data, function (key, value) {
                //console.log(data[key]._id); // logs names of attributes. Last one is "".
                html += '<tr>';
                html += '<td align="right">' + key + '</td>';
                html += '<td>' + data[key]._id + '</td>';
                html += '<td>' + data[key].title + '</td>';
                html += '<td>' + data[key].text + '</td>';
                html += '<td><button class="btn btn-outline-info" onclick="changeButton(\'' + data[key]._id + '\')">change</button</td>';
                html += '<td><button class="btn btn-outline-danger" onclick="deleteNote(\'' + data[key]._id + '\')">delete</button</td>';
                html += '</tr>';
            });
            html += '</table>';

            $(element).html("");
            $(element).append(html);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function loadNote(_id) {
    //loads the note identified by _id
    $.ajax({
        url: baseUrl + '/notes/' + id,
        method: 'GET',
        cache: false,
        timeout: 5000,
        context: target,
        success: function (data) {
            /* Code goes here */
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function saveNewNote(title, text) {
    //saves the given title and body into the database as a new note
    $.ajax({
        url: baseUrl + '/notes/',
        method: 'POST',
        data: {
            title: title,
            body: text
        },
        cache: false,
        timeout: 5000,
        success: function (data) {
            $('#inputNoteTitleCreate').val("");
            $('#inputNoteBodyCreate').val("");
            $('#sidenav-new').hide();
            alert('Data saved!');
            loadAllNotes();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function overwriteNote(id, title, text) {
    //overwrites the note identified by the given id with the given body
    var body = {
        title: title,
        body: text
    };
    $.ajax({
        url: baseUrl + '/notes/' + id,
        method: 'PUT',
        data: {
            title: title,
            body: text
        },
        cache: false,
        timeout: 5000,
        success: function (data) {
            alert('Note changed!');
            loadAllNotes();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function deleteNote(id) {
    //deletes the note identified by the given id
    $.ajax({
        url: baseUrl + '/notes/' + id,
        method: 'DELETE',
        cache: false,
        timeout: 5000,
        success: function (data) {
            alert(data);
            loadAllNotes();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function openChangePrompt() {

}