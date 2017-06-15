(function () {

    $(document).on("pagebeforecreate", function () {
        printheader();
    });

    $(document).ready(function () {
        $("#WallForm").validate({
            messages: {
                txtShout: "please shout"
            },
            focusInvalid: false,
            submitHandler: function () {
                return false;
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.parent().parent().after());
            },
        });

        $("#btnShout").bind("click", function () {
            writeWall();
        });
    });


    function writeWall() {
        if ($("#WallForm").valid()) {

            var url = serverURL() + "/savenewwallpost.php";

            var JSONObject = {
                "userid": localStorage.getItem("userid"),
                "shout": $("#txtShout").val()
            };

            $.ajax({
                url: url,
                type: 'GET',
                data: JSONObject,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function (arr) {
                    _writeWallResult(arr);
                },
                error: function () {
                    validationMsg();
                }
            });
        }
    }

    function _writeWallResult(arr) {
        if (arr[0].result === 1) {
            $("#txtShout").val("");
            validationMsgs("Shouted", "Information", "OK");
        }
        else {
            validationMsgs("Shout failed", "Error", "Try Again");
        }
    } 
})();