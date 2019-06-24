Plotly.d3.csv("data/file1.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
  }

var data = [{
  type: 'violin',
  hoverinfo:'none',
  x: unpack(rows.filter(function (d){return d.gender == 'F' }), 'variable'),
  y: unpack(rows.filter(function (d){return d.gender == 'F' }), 'value'),
  legendgroup: 'Yes',
  scalegroup: 'Yes',
  name: 'Femme',
  side: 'negative',
  box: {
    visible: false
  },
  line: {
    color: 'pink',
    width: 2
  },
  meanline: {
    visible: true
  }
}, {
  type: 'violin',
  hoverinfo:'none',
  x: unpack(rows.filter(function (d){return d.gender == 'H' }), 'variable'),
  y: unpack(rows.filter(function (d){return d.gender == 'H' }), 'value'),
  legendgroup: 'No',
  scalegroup: 'No',
  name: 'Homme',
  side: 'positive',
  box: {
    visible: false
  },
  line: {
    color: 'blue',
    width: 2
  },
  meanline: {
    visible: true
  }
}]

var layout = {
  title: "What people are looking for in the opposite sex",
  height : 450,
  width : 1000,
  yaxis: {
    zeroline: false
  },
  violingap: 0,
  violingroupgap: 0,
  violinmode: "overlay",
}

Plotly.plot('violin', data, layout);
});
