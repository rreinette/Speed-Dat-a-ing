// set the dimensions and margins of the graph
var width = 450
    height = 450
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

var dataset = [];
var counts = {};
var allGroup = [];
var countValues = [];
var color;

var field_label_dico = {
    1: 'Law',
    2: 'Math',
    3: 'Social Science, Psychologist',
    4: 'Medical Science, Pharmaceuticals, and Bio Tech',
    5: 'Engineering',
    6: 'English/Creative Writing/ Journalism',
    7: 'History/Religion/Philosophy',
    8: 'Business/Econ/Finance',
    9: 'Education, Academia',
    10: 'Biological Sciences/Chemistry/Physics',
    11: 'Social Work',
    12: 'Undergrad/undecided',
    13: 'Political Science/International Affairs',
    14: 'Film',
    15: 'Fine Arts/Arts Administration',
    16: 'Languages',
    17: 'Architecture',
    18: 'Other',
}

var label_dico = {
    'field':field_label_dico
}

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#pie_chart")
    .append("svg")
    .attr("width", width+2*margin)
    .attr("height", height+2*margin)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// create 2 data_set

d3.csv('data/SpeedDating.csv')
    .row((d,i)=>{
        return {
            field: +d.field_cd
            
        };
    })
    .get((error,rows)=>{
        console.log("Loaded "+rows.length + " rows");
        if (rows.length >0) {
            allGroup = d3.map(rows, function(d){return(d.wave)}).keys();
            rows.forEach(function(d) {
                if (!counts[d.field]){
                    counts[d.field]=0;
                }
                counts[d.field]++;
            })
            countValues = Object.keys(counts).map(function(key){
                 return counts[key];
            })
            color = d3.scaleOrdinal()
                .domain(allGroup)
                .range(["#3c9131",
"#875ede",
"#5fc14c",
"#d16ce7",
"#b1bb3a",
"#4c6be0",
"#d4a73b",
"#9945ba",
"#79c070",
"#ae39a1",
"#7a9935",
"#8362c7",
"#df8c31",
"#5590e0",
"#e26633",
"#59bfec",
"#c33628",
"#46c6c4",
"#e6437d",
"#5cc493",
"#df48a3",
"#509459",
"#ea78cd",
"#2f7038",
"#c27bd9",
"#567127",
"#9086e0",
"#94862c",
"#75499a",
"#a6b16c",
"#b44084",
"#389b82",
"#e54e59",
"#277257",
"#b72d4a",
"#4892c2",
"#a04e27",
"#5161a5",
"#a47032",
"#a19cdc",
"#73662b",
"#da96cf",
"#cea86e",
"#af6fa8",
"#e5906d",
"#914d7b",
"#b95f5b",
"#b84269",
"#e68396",
"#944557"]);
            update(counts);
        }
    });
            
// A function that create / update the plot for a given variable:
function update(data) {

  // Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function(d) {return d.value; })
    //.sort(function(a, b) {return d3.ascending(a.key, b.key);} ); // This make sure that group order remains the same in the pie chart
    
    var data_ready = pie(d3.entries(data))
    console.log(data_ready); 
    var u = svg.selectAll("path")
    .data(data_ready)
 
    var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius*2)
    
    u
        .enter()
        .append('path')
        .merge(u)
        .transition()
        .duration(1000)
        .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
        )
        .attr('fill', function(d){return(color(d.data.key)) })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 1)
  
    u
        .enter()
    .append('text')
    .text(function(d){return field_label_dico[d.data.key]})
    .attr("transform", function(d) {return "translate(" + arcGenerator.centroid(d) + ")";})
    .style("text-anchor", "middle")
    .style("font-size", 17)
    
    u
        .exit()
        .remove()

}

// Initialize the plot with the first dataset
