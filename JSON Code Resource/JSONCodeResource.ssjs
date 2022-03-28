<script runat="server">
Platform.Load('Core', '1');

var token = Platform.Request.GetCookieValue('token');

if (token == 'thisShouldBeYourLongRandomString') {

    /* --- SETTINGS --- */
    var stack = 50;

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
        Write('No results found for: ' + q);
    } else if (results.length == 1) {
        url = getDataExtensionUrl(results[0], 'url');
        Platform.Response.Redirect(url);
    } else {
        for (de in results) {
            Write(getDataExtensionUrl(results[de]));
        }
    }

    function getDataExtensionUrl(result, type) {
        var objectId = result.ObjectID;
        var url = 'https://mc.s' + stack + '.marketingcloudapps.com/' + 
            'contactsmeta/admin.html#admin/data-extension/' + objectId;
        if (type == 'url') return url;
        var name = result.Name;
        return url + '\t' + name + '\n';
    }
}

</script>