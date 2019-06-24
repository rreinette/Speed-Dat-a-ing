var ctxf = document.getElementById('myChart-f').getContext('2d');
var ctxm = document.getElementById('myChart-m').getContext('2d');
var data = [];
var i = 0;

d3.csv('data/sdv2.csv')
.row( (d,i) => {
                 return {
                          id: +d.iid,
                          gender: d.gender,
                          self_attractive: +d['s_attr'],
                          self_sincere: +d['s_sinc'],
                          self_intelligent: +d['s_intel'],
                          self_fun: +d['s_fun'],
                          self_ambitious: +d['s_amb'],
                          other_attractive: +d['o_attr'],
                          other_sincere: +d['o_sinc'],
                          other_intelligent: +d['o_intel'],
                          other_fun: +d['o_fun'],
                          other_ambitious: +d['o_amb']

                        };
               })
.get( (error, rows) => {
                         console.log('Loaded ' + rows.length + ' rows');
                         if (rows.length > 0) {
                                                console.log("First row: ", rows[0])
                                                console.log("Last row: ", rows[rows.length -1])
                                            }
                         dataset_f = rows.filter(function(d) {return d.gender == 'F'});
                         dataset_m = rows.filter(function(d) {return d.gender == 'M'});
                         d3.select("#dropdown-f")
      .selectAll('myOptions')
     	.data(dataset_f)
      .enter()
    	.append('option')
      .text(function (d) { return d.id + ' (' + d.gender + ')'; }) // text showed in the menu
      .attr("value", function (d) { return d.id; });
      data = dataset_f.filter(function(d){return d.id = dataset_f[i].id})
      d3.select("#dropdown-m")
      .selectAll('myOptions')
     	.data(dataset_m)
      .enter()
    	.append('option')
      .text(function (d) { return d.id + ' (' + d.gender + ')'; }) // text showed in the menu
      .attr("value", function (d) { return d.id; });
      data = dataset_m.filter(function(d){return d.id = dataset_m[i].id})

      d3.select('#dropdown-f').on("change",function(d){
      var i_1 = d3.select(this).property('value');
      i = i_1 - 1;
      update_chart(chart.F,data[i])
      })
      d3.select('#dropdown-m').on("change",function(d){
      var i_1 = d3.select(this).property('value');
      i = i_1 - 1;
      update_chart(chart.M,data[i])
      })
       var chart = draw_chart(dataset_f[0],dataset_m[0]);
                        });
function draw_chart(dataf,datam){
console.log(data.id)
var chartf = new Chart(ctxf, {
    // The type of chart we want to create
    type: 'radar',

    // The data for our dataset
    data: {
        labels: ['Attractive', 'Sincere', 'Intelligent', 'Fun', 'Ambitious'],
        datasets: [{
            label: 'How they see themself' ,
            backgroundColor: 'rgb(255, 99, 132,0.3)',
            borderColor: 'rgb(255, 99, 132)',
            data: [dataf.self_attractive, dataf.self_sincere, dataf.self_intelligent,dataf.self_fun, dataf.self_ambitious]
        },
        {
            label: 'How other sees them',
            backgroundColor: 'rgb(216,191,216,0.7)',
            borderColor: 'rgb(147,112,219)',
            data: [dataf.other_attractive, dataf.other_sincere, dataf.other_intelligent,dataf.other_fun, dataf.other_ambitious]
        }]
    },
        // Configuration options go here
    options: { scale:{ ticks: {
        min: 0,
        max: 10}}}
});
var chartm = new Chart(ctxm, {
    // The type of chart we want to create
    type: 'radar',

    // The data for our dataset
    data: {
        labels: ['Attractive', 'Sincere', 'Intelligent', 'Fun', 'Ambitious'],
        datasets: [{
            label: 'How they see themself' ,
            backgroundColor: 'rgb(255, 99, 132,0.3)',
            borderColor: 'rgb(255, 99, 132)',
            data: [datam.self_attractive, datam.self_sincere, datam.self_intelligent,datam.self_fun, datam.self_ambitious]
        },
        {
            label: 'How other sees them',
            backgroundColor: 'rgb(216,191,216,0.7)',
            borderColor: 'rgb(147,112,219)',
            data: [datam.other_attractive, datam.other_sincere, datam.other_intelligent,datam.other_fun, datam.other_ambitious]
        }]
    },
        // Configuration options go here
    options: { scale:{ ticks: {
        min: 0,
        max: 10}}}

});
return {'M':chartm,'F':chartf}
}
function update_chart(chart,data){
    chart.data.datasets[0].data = [data.self_attractive, data.self_sincere, data.self_intelligent,data.self_fun, data.self_ambitious];
    chart.data.datasets[1].data = [data.other_attractive, data.other_sincere, data.other_intelligent,data.other_fun, data.other_ambitious];
    chart.update();
}