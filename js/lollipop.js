// set the dimensions and margins of the graph
var width = 450;
var height = 450;
var margin = 40;
var marginleft = 350;
var dataset;
var field='goal';

var field_label_dico = {
    0: 'Other',
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

var goal_label_dico = {
    0: 'Other',
    1:	'Seemed like a fun night out',
    2:	'To meet new people',
    3:	'To get a date',
    4:	'Looking for a serious relationship',
    5:	'To say I did it',
    6:	'Other',
}

var race_label_dico = {
    0: 'Other',
    1: 'Black/African American',
    2: 'European/Caucasian-American',
    3: 'Latino/Hispanic American',
    4: 'Asian/Pacific Islander/Asian-American',
    5: 'Native American',
    6: 'Other'
}

var go_out_label_dico = {
    0: 'Never',
    1: 'Several times a week',
    2: 'Twice a week',
    3: 'Once a week',
    4: 'Twice a month',
    5: 'Once a month',
    6: 'Several times a year',
    7: 'Almost never'
}

var date_label_dico = {
    0: 'Never',
    1: 'Several times a week',
    2: 'Twice a week',
    3: 'Once a week',
    4: 'Twice a month',
    5: 'Once a month',
    6: 'Several times a year',
    7: 'Almost never'
}

var exphappy_label_dico = {
    0:'0',
    1:'1',
    2:'2',
    3:'3',
    4:'4',
    5:'5',
    6:'6',
    7:'7',
    8:'8',
    9:'9',
    10:'10'
}

var career_label_dico = {
    0: 'Other',
    1: 'Lawyer', 
    2: 'Academic/Research', 
    3: 'Psychologist',
    4: 'Doctor/Medicine', 
    5: 'Engineer', 
    6: 'Creative Arts/Entertainment', 
    7: 'Banking/Consulting/Finance/Marketing/Business/CEO/Entrepreneur/Admin',
    8: 'Real Estate',
    9: 'International/Humanitarian Affairs', 
    10: 'Undecided', 
    11: 'Social Work',
    12: 'Speech Pathology',
    13: 'Politics',
    14: 'Pro sports/Athletics',
    15: 'Other',
    16: 'Journalism',
    17: 'Architecture'
}

var age_label_dico = {
    18:'18',
    19:'19',
    20:'20',
    21:'21',
    22:'22',
    23:'23',
    24:'24',
    25:'25',
    26:'26',
    27:'27',
    28:'28',
    29:'29',
    30:'30',
    31:'31',
    32:'32',
    33:'33',
    34:'34',
    35:'35',
    36:'36',
    37:'37',
    38:'38',
    39:'39',
    42:'42',
    55:'55',
    0:'Other'
}

var label_dico = {
    field: field_label_dico,
    goal: goal_label_dico,
    race: race_label_dico,
    go_out: go_out_label_dico,
    date: date_label_dico,
    exphappy: exphappy_label_dico,
    career: career_label_dico,
    age: age_label_dico
}

var field_title_dico = {
    field: 'Field Of Study',
    goal: 'Goal in the Event',
    race: 'Ethnicity',
    go_out: 'Frequency of going out',
    date: 'Frequency of dates',
    exphappy: 'Level of happiness',
    career: 'Chosen Career Path',
    age: 'Age'
}


var svg = d3.select("#lollipop")
    .append("svg")
        .attr("width", width+margin+marginleft)
        .attr("height", height+2*margin)
    .append("g")
        .attr("transform","translate("+marginleft+","+margin+")");

var div = d3.select("#lollipop").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

d3.csv('data/SpeedDating.csv')
    .row((d,i)=>{
        return {
            iid: +d.iid,
            gender: +d.gender,
            field: +d.field_cd,
            goal: +d.goal,
            race: +d.race,
            go_out: +d.go_out,
            date: +d.date,
            exphappy: +d.exphappy,
            career: +d.career_c,
            age: +d.age
        };
    })
    .get((error,rows)=>{
        console.log("Loaded "+rows.length + " rows");
        if (rows.length >0) {   
            dataset=rows;
            update(field);
        }
    });

function getMax(data,field) {
    var max = 0;
    for (var d in data) {
        if (data[d]>max) {
            max = data[d];
        }
    }
    return max;
}

// A function that create / update the plot for a given variable:
function update(field) {

    var mCounts = {};
    var fCounts = {};
    var countLogs = {};
    var allGroup = [];
    var countValues = [];
    var color;
    var allLabels;
    allGroup = d3.map(dataset, function(d){return (d[field])}).keys().sort(function(a,b){return d3.ascending(+a,+b);});
    allLabels = allGroup.map(function(d){return label_dico[field][d]});
    dataset.forEach(function(d) {
        if (!countLogs[d.iid]){
            if (d.gender==1){
                if (!mCounts[d[field]]){
                    mCounts[d[field]]=0;
                }
                if (d[field]!=0){
                    mCounts[d[field]]++;
                }
            } else {
                if (!fCounts[d[field]]){
                    fCounts[d[field]]=0;
                }
                if (d[field]!=0){
                    fCounts[d[field]]++;
                }
            }
            countLogs[d.iid]=1;
        }
    })
    
    
    
    var x = d3.scaleLinear()
        .domain([0,Math.max(getMax(mCounts,field),getMax(fCounts,field))])
        .range([0,width]);

    svg.selectAll("*").remove();
    
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin/2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text(field_title_dico[field]);
    
    svg.append("g")
        .attr("transform", "translate(0,"+height+")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("transform","translate(-10,0)rotate(-45)")
            .style("text-anchor","end");
    var y = d3.scaleBand()
        .range([0,height])
        .domain(allLabels)
        .padding(1);

    svg.append("g")
        .call(d3.axisLeft(y))

    svg.selectAll("myline")
        .data(d3.entries(mCounts))
        .enter()
        .append("line")
        .attr("y1",function(d){return y(label_dico[field][d.key]);})
        .attr("y2",function(d){return y(label_dico[field][d.key]);})
        .transition()
        .duration(500)
        .attr("x1",function(d){return x(d.value);})
        .attr("x2",function(d){return x(0);})
        .style("stroke","black");
    
    svg.selectAll("mycircle")
        .data(d3.entries(mCounts))
        .enter()
        .append("circle")
        .attr("cy",function(d){return y(label_dico[field][d.key]);})
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html(d.value + " men" )	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px")
                .style("background-color","#7EB5D6");
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);
            })
        .transition()
        .duration(500)
        .attr("cx",function(d){return x(d.value);})
        .attr("r",function(d) {var res=4; if (x(d.value)==0){res=0;} return res;})
        .style("fill","#7EB5D6")
        .style("stroke","black")

    svg.selectAll("myline")
        .data(d3.entries(fCounts))
        .enter()
        .append("line")
        .attr("y1",function(d){return y(label_dico[field][d.key]);})
        .attr("y2",function(d){return y(label_dico[field][d.key]);})
        .transition()
        .duration(500)
        .attr("x1",function(d){return x(d.value);})
        .attr("x2",function(d){return x(0);})
        .style("stroke","black");
    
    svg.selectAll("mycircle")
        .data(d3.entries(fCounts))
        .enter()
        .append("circle")
        .attr("cy",function(d){return y(label_dico[field][d.key]);})
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html(d.value + " women" )	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px")
                .style("background-color","#D67ECB");
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);
            })
        .transition()
        .duration(500)
        .attr("cx",function(d){return x(d.value);})
        .attr("r",function(d) {var res=4; if (x(d.value)==0){res=0;} return res;})
        .style("fill","#D67ECB")
        .style("stroke","black")

}
