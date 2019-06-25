Plotly.d3.csv('data/fil34.csv', function(err,rows) {

    function getAttributes(rows) {
        var attributes = [];
        for (var row in rows) {
            if (!attributes.includes(rows[row]['variable'])) {
                attributes.push(rows[row]['variable']);
            }
        }
        return attributes;
    }

    function unpack(rows, key) {
        return rows.map(function(row) {return row[key];});
    }

    function getY(rows) {
        return rows.map(function(row) {return 1;});
    }

    var distributions = {};
    var listAttributes = getAttributes(rows);
    var genders = ['H','F'];
    var fields = ['value_3','value_4'];
    var data = [];

    for (var attr in listAttributes) {
        //var data = [];
        for (var gender in genders) {
            for (var field in fields) {
                var tempdata = {
                    type:'violin',
                    hoverinfo:'none',
                    x:unpack(rows.filter(function(d) {return d.gender==genders[gender] && d.variable==listAttributes[attr];}),fields[field]),
                    y:getY(rows.filter(function(d) {return d.gender==genders[gender] && d.variable==listAttributes[attr];})),
                    legendgroup: 'Yes',
                    scalegroup: 'Yes',
                    box:{
                        visible: false
                    },
                    meanline:{
                        visible: true
                    },
                    orientation: 'h',
                    opacity: 0.6,
                    visible: data.length<4,
                };
                if (genders[gender]=='F') {
                    tempdata['line'] = {color:'pink'};
                    tempdata['side'] = 'negative';
                    if (fields[field]=='value_3') {
                        tempdata['line']['width'] = 2;
                        tempdata['name'] = 'What women think other women look for in men';
                    } else {
                        tempdata['line']['width'] = 1;
                        tempdata['line']['dash'] = 'dashdot';
                        tempdata['name'] = 'What women look for in men according to men';
                    }
                } else {
                    tempdata['line'] = {color:'blue'};
                    tempdata['side'] = 'positive';
                    if (fields[field]=='value_3') {
                        tempdata['line']['width'] = 2;
                        tempdata['name'] = 'What men think other men look for in women';
                    } else {
                        tempdata['line']['width'] = 1;
                        tempdata['line']['dash'] = 'dashdot';
                        tempdata['name'] = 'What men look for in women according to women';
                    }
                };
                data.push(tempdata);
            }
        }
        distributions[attr]=data;
    };

    var layout = {
        title : 'Machometre',
        autosize: true,
        height: 600,
        width: 1300,
        yaxis: {
            autorange: true,
            automargin: true
        },
        xaxis: {
            autorange: true,
            automargin: true
        },
        violingap: 0,
        violingroupgap: 0,
        violinmode: 'overlay',
        legend: {
            x: 0.5,
            y: 1,
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        updatemenus:[{
            y:1,
            yanchor: 'top',
            buttons: [{
                method: 'restyle',
                args: ['visible', [true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]],
                label: listAttributes[0]
            }, {
                method: 'restyle',
                args: ['visible', [false, false, false, false, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]],
                label: listAttributes[1]
            }, {
                method: 'restyle',
                args: ['visible', [false, false, false, false, false, false, false, false, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false]],
                label: listAttributes[2]
            }, {
                method: 'restyle',
                args: ['visible', [false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, false, false, false, false, false, false, false, false]],
                label: listAttributes[3]
            }, {
                method: 'restyle',
                args: ['visible', [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, false, false, false, false]],
                label: listAttributes[4]
            }, {
                method: 'restyle',
                args: ['visible', [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true]],
                label: listAttributes[5]
            }]
        }]
    }
    console.log(data);
    Plotly.plot('violin3',data,layout);
});
