var ctx = document.getElementById('myChart').getContext('2d');
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
                         dataset = rows;
                         d3.select("#my-dropdown")
      .selectAll('myOptions')
     	.data(dataset)
      .enter()
    	.append('option')
      .text(function (d) { return d.id + ' (' + d.gender + ')'; }) // text showed in the menu
      .attr("value", function (d) { return d.id; });
      data = dataset.filter(function(d){return d.id = dataset[i].id})

      d3.select('#my-dropdown').on("change",function(d){
      var i_1 = d3.select(this).property('value');
      i = i_1 - 1;
      draw_chart(dataset[i])
            console.log(i)
      })

                         draw_chart(dataset[i])
                        });
function draw_chart(data){
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'radar',

    // The data for our dataset
    data: {
        labels: ['Attractive', 'Sincere', 'Intelligent', 'Fun', 'Ambitious'],
        datasets: [{
            label: 'How they see themself' ,
            backgroundColor: 'rgb(255, 99, 132,0.3)',
            borderColor: 'rgb(255, 99, 132)',
            data: [data.self_attractive, data.self_sincere, data.self_intelligent,data.self_fun, data.self_ambitious]
        },
        {
            label: 'How other sees them',
            backgroundColor: 'rgb(216,191,216,0.7)',
            borderColor: 'rgb(147,112,219)',
            data: [data.other_attractive, data.other_sincere, data.other_intelligent,data.other_fun, data.other_ambitious]
        }]
    },
        // Configuration options go here
    options: { scale:{ ticks: {
        min: 0,
        max: 10}}}
});
}