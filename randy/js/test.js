Plotly.d3.csv('data/file1.csv', function(err, rows){
  
  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
  }
var data = [{
  type: 'violin',
  x: unpack(rows.filter(function(d){return d.gender == 'F'}), 'variable'),
  y: unpack(rows.filter(function(d){return d.gender == 'F'}), 'value'),
  legendgroup: 'F',
  scalegroup: 'F',
  name: 'F',
  side: 'negative',
  box: {
    visible: true
  },
  line: {
    color: 'blue',
    width: 2
  },
  meanline: {
    visible: true
  }
}, {
  type: 'violin',
  x: unpack(rows.filter(function(d){return d.gender == 'H'}), 'variable'),
  y: unpack(rows.filter(function(d){return d.gender == 'H'}), 'value'),
  legendgroup: 'M',
  scalegroup: 'M',
  name: 'M',
  side: 'positive',
  box: {
    visible: true
  },
  line: {
    color: 'green',
    width: 2
  },
  meanline: {
    visible: true
  }
}]

var layout = {
  height:'50px',
  width:'50px',
  title: "Split Violin Plot",
  yaxis: {
    zeroline: false
  },
  violingap: 0,
  violingroupgap: 0,
  violinmode: "overlay",
}

Plotly.plot('graph', data, layout, {showSendToCloud: true});
});  