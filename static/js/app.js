// define json file path

var url = `/static/js/samples.json`;

//// horizontal bar and bubble graph functions////

// create function to populate graphs with selected sample

function build_charts(sample) {
  d3.json(url).then((data) => {
    for (var x = 0; x < data.samples.length; x++) {
      console.log(data.samples);
      if (data.samples[x].id == sample) {
        console.log(sample);
        var sample_data = data.samples[x];
      }
    }
    
    //pull arrays and reassign variable names

    var sample_values = sample_data.sample_values;
    var otu_ids = sample_data.otu_ids;
    var otu_labels = sample_data.otu_labels;
    console.log(otu_labels);

    //slice for bar graph to get top 10 OTU's

    var x_data = sample_values.slice(0, 10).reverse();
    console.log(x_data);
    var y_data = otu_ids
      .slice(0, 10)
      .reverse()
      .map((object) => `OTU ${object}`);
    var hover_text = otu_labels.slice(0, 10).reverse();

    // bar graph //

    var bar_graph = [
      {
        x: x_data,
        y: y_data,
        text: hover_text,
        type: "bar",
        orientation: "h",
      },
    ];

    // format bar graph //

    var bar_format = {
      title: `Top 10 OTU's in Sample ${sample}`,
    };

    // plot bar graph //

    Plotly.newPlot("bar", bar_graph, bar_format, { responsive: true });

    // bubble chart//

    var bubble_graph = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
        },
      },
    ];

    //format bubble chart //

    var bubble_format = {
      title: `All Bacteria in Sample ${sample} &  their Frequency`,
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Frequency" },
    };
    Plotly.newPlot("bubble", bubble_graph, bubble_format, { responsive: true });
  });
}

//// build metadata panel ////

//get metadata sample 

function build_metadata(sample) {
  d3.json(url).then(function (data) {
    for (var x = 0; x < data.metadata.length; x++) {
      if (data.metadata[x].id == sample) {
        var sample_data = data.metadata[x];
      }
    };
    var metadata_box = d3.select('tbody');
    var tb = document.querySelector('tbody');
    while (tb.childNodes.length) {
      tb.removeChild(tb.childNodes[0]);
    }
    Object.defineProperties(sample_data).forEach(([key, value]) => {
      var row = metadata_box.append('tr');
      var cell = row.append('td');
      cell.text(`${key}: ${value}`);
    });
  });
}

//init page function

function init() {
  // select and build dropdown menu
  var dropdown = d3.select('#selDataset');
  d3.json(url).then((data) => {
    data.names.forEach((name) => {
      dropdown.append("option").text(name).property("value");
    });
  });

  build_charts("940");
  build_metadata("940");
}

//populate new inputs

function optionChanged(id) {
  build_charts(id);
  build_metadata(id);
}

//initialize 

init();
