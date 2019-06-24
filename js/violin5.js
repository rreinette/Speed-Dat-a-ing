Plotly.d3.csv("data/fil34.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
  }

var data = [{
  type: 'violin',
  hoverinfo:'none',
  y: unpack(rows.filter(function (d){return d.gender == 'F' && d.variable=='Intelligent' }), 'variable'),
  x: unpack(rows.filter(function (d){return d.gender == 'F' && d.variable=='Intelligent' }), 'value_3'),
  legendgroup: 'Yes',
  scalegroup: 'Yes',
  name: 'Ce que les femmes pensent que les autres femmes cherchent chez un homme',
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
  y: unpack(rows.filter(function (d){return d.gender == 'H' && d.variable =='Intelligent' }), 'variable'),
  x: unpack(rows.filter(function (d){return d.gender == 'H' && d.variable =='Intelligent'}), 'value_3'),
  legendgroup: 'No',
  scalegroup: 'No',
  name: 'Ce que les hommes pensent que les autres hommes cherchent chez une femme',
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
  y: unpack(rows.filter(function (d){return d.gender == 'H' && d.variable=='Intelligent'}), 'variable'),
  x: unpack(rows.filter(function (d){return d.gender == 'H' && d.variable=='Intelligent'}), 'value_4'),
  legendgroup: 'Yes',
  scalegroup: 'Yes',
  name: 'Ce que les femmes cherchent chez les hommes d\'apres les hommes',
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
  y: unpack(rows.filter(function (d){return d.gender == 'F' && d.variable=='Intelligent'}), 'variable'),
  x: unpack(rows.filter(function (d){return d.gender == 'F' && d.variable=='Intelligent'}), 'value_4'),
  legendgroup: 'No',
  scalegroup: 'No',
  name: 'Ce que les hommes cherchent chez une femme d\'après les femmes',
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
  height :450,
  width : 1000,
  yaxis: {
    zeroline: false
  },
  violingap: 0,
  violingroupgap: 0,
  violinmode: "overlay",
  legend:{
    x:0,
    y:-1
  }
}

final = [data[0], data[1], data2[0], data2[1]];

Plotly.plot('violin3', final, layout);
});
