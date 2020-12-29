$(function ($) {

    /** Create Operations ======================
     *
     */
    var submitBtn = $('#add-student-btn'),
        sgtTableElement = $('#student-table'),
      firebaseRef = new Firebase("https://vaccinebot.firebaseio.com/apollorecords");


    /** Click handler to submit student information
     * Take values of the student-add-form
     */
    submitBtn.click(function () {
        var pid = $('#s-pid-input').val(),
            name = $('#s-name-input').val(),
            dob = $('#s-dob-input').val(),
            vaccine = $('#s-vaccine-input').val(),
            phone = $('#s-phone-input').val(),
            email = $('#s-email-input').val();

        /** Send the values to firebase
         * firebaseRef.push will append a new item to the user list
         */
        firebaseRef.push({
            pid: pid,
            name: name,
            dob: dob,
            vaccine: vaccine,
            phone: phone,
            email: email
        });
        clearInputs();
    });

    /** Read Operations ======================
     * Attach an asynchronous callback to read the data at our users firebaseReference on load
     * child_added will update the DOM everytime a new student is added to the data base
     */
    firebaseRef.on("child_added", function (studentSnapShot) {
        updateDOM(studentSnapShot);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    firebaseRef.on("child_changed", function (studentSnapShot) {
        updateDOM(studentSnapShot);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

       /** Update Operations ======================
     * Click handler to update student data and send to firebase
     * Get the unique id of any student
     */

     /** Edit button handler */
     sgtTableElement.on('click', '.edit-btn', function () {
         var student_id = $(this).data('id');
         var studentFirebaseRef = firebaseRef.child(student_id);

         studentFirebaseRef.once('value', function (snapshot) {
             $('#modal-edit-pid').val(snapshot.val().pid);
             $('#modal-edit-name').val(snapshot.val().name);
             $('#modal-edit-dob').val(snapshot.val().dob);
             $('#modal-edit-vaccine').val(snapshot.val().vaccine);
             $('#modal-edit-phone').val(snapshot.val().phone);
             $('#modal-edit-email').val(snapshot.val().email);

             $('#student-id').val(student_id);

             console.log("$('#student-id').val(student_id) : ", $('#student-id').val(student_id));

             $("#edit-modal").modal("show");
         });
     });

     /** Edit Student Function
      * studentFirebaseReference argument should be the unique url of the selected student
      */
     function studentEdit(studentFirebaseReference) {
         var newpid = $('#modal-edit-pid').val(),
         newname = $('#modal-edit-name').val(),
         newdob = $('#modal-edit-dob').val(),
         newvaccine = $('#modal-edit-vaccine').val(),
             newphone = $('#modal-edit-phone').val(),
             newemail = $('#modal-edit-email').val();
         studentFirebaseReference.update({
             pid: newpid,
             name: newname,
             dob: newdob,
             vaccine: newvaccine,
             phone: newphone,
             email: newemail
         });
     }

     /** Click handler for modal confirm button */
     $("#edit-modal").on('click', '#confirm-edit', function () {
         console.log("im here");
         console.log("('#edit-modal').find('#student-id').val() :", $('#edit-modal').find('#student-id').val());
         var studentFirebaseRef = firebaseRef.child($('#edit-modal').find('#student-id').val());
         /* edit form click handler */
         studentEdit(studentFirebaseRef);

         $("#edit-modal").modal('hide');
     })

     /** DELETE OPERATIONS ==================================
     *
     */

    /** Delete button handler */
    sgtTableElement.on('click', '.delete-btn', function () {
        var studentFirebaseRef = firebaseRef.child($(this).data('id'));
        console.log('this on delete-btn is: ' + $(this).data('id'));
        firebaseRef.on('child_removed', function (snapshot) {
            /** Remove the element from the DOM */
            console.log('snapshot.key is: ', snapshot.key());
            var rowId = snapshot.key();
            $('#' + rowId).remove();
        });
        // Delete the student with the correct firebase method
        studentFirebaseRef.remove();
    });

    /* Clear out inputs in the add-student-form      */
    function clearInputs() {
        $('#s-pid-input').val('');
        $('#s-name-input').val('');
        $('#s-dob-input').val('');
        $('#s-vaccine-input').val('');
        $('#s-phone-input').val('');
        $('#s-email-input').val('');
    }

    /** DOM CREATION ================================== */
    function updateDOM(studentSnapShot) {
        var studentObject = studentSnapShot.val();
        var studentObjectId = studentSnapShot.key();
        var studentRow = $("#" + studentObjectId);
        if (studentRow.length > 0) {
            //change current
            studentRow.find(".pid").text(studentObject.pid);
            studentRow.find(".name").text(studentObject.name);
            studentRow.find(".dob").text(studentObject.dob);
            studentRow.find(".vaccine").text(studentObject.vaccine);
            studentRow.find(".phone").text(studentObject.phone);
            studentRow.find(".email").text(studentObject.email);
        } else {
            //add new
            var spid = $('<td>', {
                    text: studentObject.pid,
                    class: "student-pid"
                }),
                sname = $('<td>', {
                    text: studentObject.name,
                    class: "student-name"
                }),
                sdob = $('<td>', {
                    text: studentObject.dob,
                    class: "student-dob"
                }),
                svaccine = $('<td>', {
                    text: studentObject.vaccine,
                    class: "student-vaccine"
                            }),
                sphone = $('<td>', {
                    text: studentObject.phone,
                    class: "student-phone"
                }),
                semail = $('<td>', {
                    text: studentObject.email,
                    class: "student-email"
                }),
            /* Each student gets a unique edit and delete button appended to its row */
                sEditBtn = $('<button>', {
                    class: "btn btn-info edit-btn",
                    'data-id': studentObjectId
                }),
                sEditBtnIcon = $('<span>', {
                    class: "glyphicon glyphicon-pencil"
                }),
                sDeleteBtn = $('<button>', {
                    class: "btn btn-danger delete-btn",
                    'data-id': studentObjectId
                }),
                sDeleteBtnIcon = $('<span>', {
                    class: "glyphicon glyphicon-remove"
                });

            var studentRow = $('<tr>', {
                id: studentObjectId
            });
            sEditBtn.append(sEditBtnIcon);
            sDeleteBtn.append(sDeleteBtnIcon);
            studentRow.append(spid, sname, sdob, svaccine, sphone, semail, sEditBtn, sDeleteBtn);
            sgtTableElement.append(studentRow);
        }
    }
});
