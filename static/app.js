// define json path
var url = `../../data/samples.json`;

//// horizontal bar and bubble graph functions////

//pull data
function build_charts(sample){
    d3.json(url).then((data)=>{
        for (var x = 0; x < data.samples.length; x++){
            if (data.samples[x].id == sample){
                var sample_data = data.samples[x]}
            
            }
        });

        //pull values from sample data
        var sample_values = sample_data.sample_values;
        var otu_ids = sample_data.otu_ids;
        var otu_labels = sample_data.otu_labels;
        console.log(otu_labels);
        
        //slice for bar graph to get top 10 OTU's

        var x_data = sample_values.slice(0,10).reverse();
        console.log(x_data);
        var y_data = otu_ids.slice(0,10).reverse().map(object => `OTU ${object}`);
        var hover_text = otu_labels.slice(0,10).reverse();

        // bar graph

        var bar_graph = [{
            x: x_data,
            y: y_data,
            text: hover_text,
            type: 'bar',
            orientation: 'h'
        }];
        var bar_format = {
            title: `Top 10 OTU's in Sample ${sample}`
        }

        Plotly.newPlot('bar', bar_graph, bar_format, {responsive: True});

        // bubble chart

        var bubble_graph = [{
            x: otu_ids,
            y:sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size:sample_values,
                color:otu_ids
            }
        }];

        var bubble_format = {
            title: `All Bacteria in Sample ${sample} &  their Frequency`,
            xaxis: { title: 'OTU ID'},
            yaxis: {title: 'Frequency'}
        };
        Plotly.newPlot('bubble', bubble_graph, bubble_format, {responsive: True});
    }
    // metadata panel

    function build_metadata(sample){
        d3.json(url).then (function(data){
            for(var x = 0; x < data.metadata.length; x++){
                if (data.metadata[x].id == sample){
                    var sample_data = data.metadata[x]
                }
            };
            var metadata_box = d3.select('tbody');
            var tb = document.querySelector('tbody');
            while(tb.childNodes.length){
                tb.removeChild(tb.childNodes[0]);
            }
        Object.defineProperties(sample_data).forEach(([key, value])=>{
            var row = metadata_box.append('tr');
            var cell = row.append ('td');
            cell.text(`${key}: ${value}`)
        });
        
        
        });
    }
