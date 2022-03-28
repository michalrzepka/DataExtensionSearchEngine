<script runat="server">
Platform.Load('Core', '1');

var cookie = Platform.Request.GetCookieValue('token');

if (cookie == 'thisShouldBeYourLongRandomString') {

    /* --- SETTINGS --- */
    var stack = 50;

    var output = '';
    var url = '';

    var q = Platform.Request.GetQueryStringParameter('q') || '';
    var query = q.replace(/\s/g, '%');    

    var results = DataExtension.Retrieve({
        LeftOperand: {
            Property: 'Name',
            SimpleOperator: 'like',
            Value: query
        },
        LogicalOperator: 'OR',
        RightOperand: {
            Property: 'CustomerKey',
            SimpleOperator: 'equals',
            Value: query
        }
    });

    if (!results.length) {
        output = 'No results found for: ' + q;
    } else if (results.length == 1) {
        url = getDataExtensionUrl(results[0], 'url');
        Platform.Response.Redirect(url);
    } else {
        for (var i in results) {
            output += getDataExtensionUrl(results[i], 'a');
        }
    }

    function getDataExtensionUrl(result, type) {
        var objectId = result.ObjectID;
        var url = 'https://mc.s' + stack + '.marketingcloudapps.com/' + 
            'contactsmeta/admin.html#admin/data-extension/' + objectId;
        if (type == 'url') return url;
        var name = result.Name;
        return '<p><a href="' + url + '">' + name + '</a></p>';
    }

</script>

    <!DOCTYPE html>
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <style>
        body {
            color: #000;
            font-family: Arial;
            font-size: 16px;
            margin: 0 auto;
            width: 80%;
        }
    </style>
    </head>
    <body>
        <h1><ctrl:var name=q /></h1>
        <ctrl:var name=output />
    </body>
    </html>

<script runat="server">
}

</script>