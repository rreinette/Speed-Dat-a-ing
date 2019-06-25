Plotly.d3.csv("data/fil34.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
  }

var data = [{
  type: 'violin',
  hoverinfo:'none',
  y: unpack(rows.filter(function (d){return d.gender == 'F'}), 'variable'),
  x: unpack(rows.filter(function (d){return d.gender == 'F'}), 'value_3'),
  legendgroup: 'Yes',
  scalegroup: 'Yes',
  name: 'What women think other women look for in a man',
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
  },
  orientation: "h",
  opacity: 1
}, {
  type: 'violin',
  hoverinfo:'none',
  y: unpack(rows.filter(function (d){return d.gender == 'H'}), 'variable'),
  x: unpack(rows.filter(function (d){return d.gender == 'H'}), 'value_3'),
  legendgroup: 'No',
  scalegroup: 'No',
  name: 'What men think other men look for in a woman',
  side: 'positive',
  box: {
    visible: false
  },
  line: {
    color: 'blue',
    width: 1
  },
  meanline: {
    visible: true
  },
  orientation: "h"
}]

var data2 = [{
  type: 'violin',
  hoverinfo:'none',
  y: unpack(rows.filter(function (d){return d.gender == 'H'}), 'variable'),
  x: unpack(rows.filter(function (d){return d.gender == 'H'}), 'value_4'),
  legendgroup: 'Yes',
  scalegroup: 'Yes',
  name: 'What women look for in men according to men',
  side: 'negative',
  box: {
    visible: false
  },
  line: {
    color: 'pink',
    width: 0.3
  },
  meanline: {
    visible: true
  },
  orientation: "h",
  opacity: 1
}, {
  type: 'violin',
  hoverinfo:'none',
  y: unpack(rows.filter(function (d){return d.gender == 'F'}), 'variable'),
  x: unpack(rows.filter(function (d){return d.gender == 'F'}), 'value_4'),
  legendgroup: 'No',
  scalegroup: 'No',
  name: 'What men look for in a woman according to women',
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
  },
  orientation: "h"
}]

var layout = {
  title: "Machomètre",
  height :500,
  width : 1300,
  yaxis: {
    zeroline: false
  },
  violingap: 0,
  violingroupgap: 0,
  violinmode: "overlay",
  legend:{
    x:4,
    y:1
  },
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  y: 1,
  yanchor: 'top',
  buttons: [{
    method: 'restyle',
    args: ['visible', [true, false, false, false]],
    label: 'Data set 0'
  }, {
    method: 'restyle',
    args: ['visible', [false, true, false, false]],
    label: 'Data set 1'
  }, {
    method: 'restyle',
    args: ['visible', [false, false, true, false]],
    label: 'Data set 2'
  }, {
    method: 'restyle',
    args: ['visible', [false, false, false, true]],
    label: 'Data set 3'
  }]
}

console.log(data[0]);
final = [data[0], data[1], data2[0], data2[1]];
Plotly.plot('violin3', final, layout);
});
