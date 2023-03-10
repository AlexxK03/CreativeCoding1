let table
let data = []
let charts = []
let palette = ["#D86D3C","#E8773D","#F0B941","#4DC0A7","#68F1F1"]

function preload(){
    table = loadTable('data/MasterData.csv', 'csv', 'header');
    irish = loadTable('data/irishLanguage.csv','csv','header')
    disability = loadTable('data/disabilities.csv','csv','header')
}

function tidy(){
    for (let x=0; x<table.getRowCount();x++){
        data.push(table.rows[x].obj.total)
    }
}



function setup(){
    createCanvas(900, 1700)
    background(0)
    angleMode(DEGREES)
    tidy()

    charts.push(new BarChart({
        _height:300,
        _width:300,
        _posX:50,
        _posY:375,
        _data:table,
        _valueX:"Year",
        _valueY:"total",
        _tickCount:10,
        _showLabels:1}))   
         
    charts.push(new HorizontalChart({
        _height:300,
        _width:300,
        _posX:475,
        _posY:350,
        _data:table,
        _valueX:"Year",
        _valueY:"total",
        _tickCount:10,
        _showLabels:1}))    

    charts.push(new StackChart({
        _height:300,
        _width:300,
        _posX:50,
        _posY:775,
        _title:"population over 15 in 2011 & 2016 sorted by disability",    
        _data:disability,
        _valueX:"Disability Type",
        _valueY:["2011","2016"],  
        _valueT:"total",
        _tickCount:10,
        _showLabels:1,}))    

    charts.push(new HStackChart({
        _height:300,
        _width:300,
        _posX:475,
        _posY:775,
        _data:table,
        _valueX:"Year",
        _valueY:["Motorway","Single"],
        _valueT:"total",
        _tickCount:10,
        _showLabels:1}))    

    charts.push(new StackChartWLine({
        _posX:475,
        _data:disability,
        _title:"population over 15 in 2011 & 2016 sorted by disability",
        _valueX:"Disability Type",
        _valueY:["2011","2016"],
        _valueT:"total",
        _valueM:"mean"})) 
    
}

function draw(){
    background(0)
    noLoop()
    
    for(let x=0; x<charts.length; x++){
     charts[x].render()
    }

    // textSize(15)
    // fill(255)
    // textAlign(RIGHT,CENTER)
    // text("National Route Length over all authorities in Kilometers",400,30)
}