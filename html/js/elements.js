function loadNoteButton() {
    var element = $('#inputNoteIDShow');
    loadNoteToTarget('#distinctNote', element.val());
}

function deleteNoteButton(_id) {
    deleteNote(_id);
}

function loadAllNotes() {
    $('#allNotes').html("") ;
    loadAllNotesToTarget('#allNotes');
}

function createNoteButton() {
    var elementTitle = $('#inputNoteTitleCreate');
    var elementBody = $('#inputNoteBodyCreate');
    if (elementTitle.val().length == 0)
        return;

    if (elementBody.val().length == 0)
        return;

    saveNewNote(elementTitle.val(), elementBody.val());
}

function changeButton(_id) {
    $.ajax({
        url: baseUrl + '/notes/' + _id,
        method: 'GET',
        cache: false,
        timeout: 5000,
        success: function (data) {
            $('#sidenav-change').show();
            fillSideNav(data._id, data.title, data.text);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function fillSideNav(_id, title, text) {
    $('#sidenav-id').val(_id);
    $('#sidenav-title').val(title);
    $('#sidenav-text').val(text);
    $('#applyChangesButton')
        .attr("onclick", "applyChangesButton(\'" +
            _id +
            "\', \'" +
            title +
            "\', \'" +
            text +
            "\')");
}

function applyChangesButton() {
    var _id = $('#sidenav-id').val();
    var title = $('#sidenav-title').val();
    var text = $('#sidenav-text').val();
    overwriteNote(_id, title, text);
    $('#sidenav').hide();
    loadAllNotesToTarget('#allNotes');
}

function showSideNavNew(){
    $('#sidenav-new').show();
}
function closeSideNavNew(){
    $('#sidenav-new').hide();
}
function closeSideNavChange(){
    $('#sidenav-change').hide();
}