// define json path
var url = `../../data/samples.json`;

//// horizontal bar and bubble graph functions////

//pull data
function chart_builder(sample){
    d3.json(url).then((data)=>{
        console.log(data);
        for (var x = 0; x < data.samples.length; x++){
            if (data.samples[x].id == sample){
                var sample_data = data.samples[x]}
            
            }
        });

        //pull values from sample data
        var sample_values = sample_data.sample_values;
        var otu_ids = sample_data.otu_ids;
        var otu_labels = sample_data.otu_labels;
        
        //slice

        var x_data = sample_values.slice(0,10).reverse();
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
}
