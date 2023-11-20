function sendResponse(dataArr){
    let xx = false;
            $.ajax({
                type    : 'post',
                url     : '/main/xoaFile.php',
                data    : {'data' : dataArr},
                success : function(response){
                    // console.log(response);
                    if (response.trim()  == ""){
                        location.reload();
                    }else{
                        alert(response);
                        xx = false;
                    }
                },
                error   : function(errResponse){
                    xx = false;
                }
            });
            console.log(xx);
            return xx;
        }
