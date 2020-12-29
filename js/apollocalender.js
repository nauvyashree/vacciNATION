var rootRef = firebase.database().ref('apollorecords/');
rootRef.once('value', function(snapshot){
        if(snapshot.exists()){
            var content = '';
            snapshot.forEach(function(data){
                var val = data.val();
                content +='<tr>';
                content += '<td>' + val.dob + '</td>';
                content += '<td>' + val.email + '</td>';
                content += '<td>' + val.name + '</td>';
                content += '<td>' + val.phone + '</td>';
                content += '<td>' + val.pid + '</td>';
                content += '<td>' + val.vaccine + '</td>';
                content += '</tr>';
            });
            console.log(content);
            $('#table_body').append(content);
        }
    });
console.log("hi");
