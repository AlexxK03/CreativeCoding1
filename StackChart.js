class StackChart{
    constructor({
        _height=300,
        _width=300,
        _posX=50,
        _posY=775,
        _data,
        _title = "National Route Length over all authorities in Kilometers",
        _valueX,
        _valueY,
        _valueT,
        _tickCount=10,
        _showLabels=1
    })
    {
        this.height = _height  
        this.width = _width  
        this.posX = _posX  
        this.posY = _posY  
        this.data = _data 
        this.title = _title
        this.valueX = _valueX
        this.valueY = _valueY 
        this.valueT = _valueT
        this.margin = 20
        this.gap = 10
        this.tickCount = _tickCount
        this.showLabels = _showLabels

        this.bWidth = (this.width - (this.margin*2) - ((this.data.getRowCount() -1)*this.gap))/this.data.getRowCount() 

        this.max = this.maxC();

        // this.stacks = ["Motorway","Single",]

        // this.palette=[]

    }

   

    render(){
        push()
        translate(this.posX, this.posY)
        this.horizontalAxis()
        this.vericalAxis()
        this.bars()
        this.ticks()
        this.labels()
        this.maxC()
        this.hLabel()
        this.legend()
        this.name()
        pop()
    }

    horizontalAxis(){
        noFill()
        stroke(255)
        strokeWeight(3)
        line(0,0,this.width,0)
    }

    vericalAxis(){
        noFill()
        stroke(255)
        strokeWeight(3)
        line(0,0,0,-this.height)
    }
    
    bars(){
        // translate(this.margin,0)
        push()
        //outer loop si looping through the the amount of rows in the table 
        for(let x = 0; x<this.data.getRowCount(); x++){
            push()
            //then for each row in table it then loops through the valueY array which is stated in the constructor. In this case its looping thorugh the "single and motorway" columns in the table
            for(let y=0; y<this.valueY.length;y++){
                //creating an array for the values in the array 
                let current = this.valueY[y]
                let barH = -this.data.rows[x].obj[current]
                // console.log(this.valueY)
                let gap = x * (this.gap + this.bWidth)
                let palette = ["#0FA3B1","#4357AD","#F03A47","#F1C40F","#00CC66"]
                let colorNum = y % palette.length
                fill(color(palette[colorNum]))
                // console.log(this.stacks.length)
                stroke(255)
                strokeWeight(1)
                rect((gap+this.gap),0,this.bWidth,this.scaler(barH))
                //translating after the first loop to draw the bard on top of eachother
                translate(0,this.scaler(barH))
            }
            pop()
        }
        pop()
    }

    ticks(){
        let tickGap = this.height /(this.tickCount)
        for(let x =0; x<this.tickCount; x++){
            stroke(255)
            line(0,-x*tickGap,-10,-x*tickGap)
        }
    }

    maxC(){
        let maxi =0;
        for(let x = 0; x<this.data.getRowCount(); x++){
            if (int(this.data.rows[x].obj[this.valueT])>maxi){
                maxi = int(this.data.rows[x].obj[this.valueT]);
            }
        }
        return(maxi)
    }

    labels(){
        for(let i=0; i<this.tickCount;i++){
            let tickGap = this.height /(this.tickCount) 
            if(this.showLabels == 1){
                let unitSpace = (this.max/this.tickCount).toFixed();
                // console.log(unitSpace)
                noStroke()
                textSize(12)
                fill(255)
                textAlign(RIGHT,CENTER)
                text(i*unitSpace,-15,i * -tickGap)
            }
        }   
    }

    hLabel(){
        for(let x=0; x<this.data.getRowCount(); x++){
            if(this.showLabels == 1){
                let gap = x * (this.gap + this.bWidth)
            let years = this.data.rows[x].obj[this.valueX]
            textSize(12)
            fill(255)
            textAlign(RIGHT,CENTER)
            push()
            translate(gap+this.gap+15,10)
            rotate(-75)
            text(years,0,0)
            pop()
            }
        }
    }

    //Creating a legend to read the stacked chart 
    legend(){
        // creating the legend based on the value array so that it will still work if more values are being added to the chart
        for(let x=0;x<this.valueY.length;x++){
            let palette = ["#0FA3B1","#4357AD","#F03A47","#F1C40F","#00CC66"]
            let colorNum = x % palette.length
            let legend = this.valueY[x]
            fill(color(palette[colorNum]))
            stroke(255)
            strokeWeight(1)
            //each time the loop runs it -30 the height, drawing them at an equal distance from eachother
            translate(0,-30)
            ellipse(this.width,0,15,15)
            // console.log(legend)
            noStroke()
            textAlign(LEFT,CENTER)
            text(legend,this.width+15,0)
        }
    }

    
    name(){
        textSize(12)
        fill(255)
        textAlign(LEFT,CENTER) 
        push() 
        translate(0,this.height/2.5)
        text(this.title,0,0)
        pop()
    }


    scaler(_num){
        return map(_num,0,this.max,0,this.height)
        // let scaleVal = this.max/this.height
        // return _num/scaleVal	
    }
        
}


