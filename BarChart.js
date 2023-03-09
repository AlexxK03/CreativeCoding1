 // class constructor and parameter being passed through as an object to allow for default parameters.
class BarChart{
    constructor({
        _height=300,
        _width=300,
        _posX=50,
        _posY=375,
        _data,
        _valueX,
        _valueY,
        _title = "National Route Length over all authorities in Kilometers",
        _tickCount=10,
        _showLabels=1
    })
    {
        this.height = _height  
        this.width = _width  
        this.posX = _posX  
        this.posY = _posY  
        this.data = _data  
        this.valueX = _valueX
        this.valueY = _valueY
        this.title = _title
        this.margin = 20
        this.gap = 10
        this.tickCount = _tickCount
        this.showLabels = _showLabels

        //calcultion of the bar width taking the width of the chart taking a margin on both sides (margin*2).counting the rows in the table taking away 1 and multiplying it by the gap and dividing it all by the amount of rows in the table

        this.bWidth = (this.width - (this.margin*2) - ((this.data.getRowCount() -1)*this.gap))/this.data.getRowCount() 

        this.max = this.maxC();
        

    }

   
    //METHODS

    //render method gets called to the draw function in the sketch which displays it on the canvas

    //everything called in the rendder are seperate methods that create to each different aspect of the chart 
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
    
    //basic bars are being draw as a loop from the table.   
    bars(){
        for(let x = 0; x<this.data.getRowCount(); x++){
            noStroke()
            let gap = x * (this.gap + this.bWidth)
            let palette = ["#0FA3B1","#4357AD","#F03A47","#F1C40F","#00CC66"]
            let colorNum = x % palette.length
            fill(color(palette[colorNum]))
            //the bar height is being calculated by looping through the rows of a table as an object and with in that object retrieving the values from the column stated in the constructor (in this case this.valueY) and turning those strings into an integer 

            let barH = int(-this.data.rows[x].obj[this.valueY])

            //gap+this.gap is drawing the bars beside eachother with a gap between them in which calculates based on the amount of rows in the table. the bar height is then being passed through the scaler so that it all displays on the page rather than drawing at their actual height 

            rect(gap+this.gap,0,this.bWidth,this.scaler(barH))
        }
    }

    ticks(){
        let tickGap = this.height /(this.tickCount)
        for(let x =0; x<this.tickCount; x++){
            stroke(255)
            line(0,-x*tickGap,-10,-x*tickGap)
        }
    }

    //calculating the max number by looping thorugh the the tables rows and using an if statement getting the the numbers from the column stated in the construtor and if that number was bigger than "maxi" than setting this as the max number. 
    maxC(){
        let maxi =0;
        for(let x = 0; x<this.data.getRowCount(); x++){
            if (int(this.data.rows[x].obj[this.valueY])>maxi){
                maxi = int(this.data.rows[x].obj[this.valueY]);
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

    name(){
        textSize(12)
        fill(255)
        textAlign(LEFT,CENTER) 
        push() 
        translate(0,this.height/4)
        text(this.title,0,0)
        pop()
    }

    //scaler takes the number passed through it as the value and setting the stop points as the max number calculated above and the height of the chart 
    scaler(_num){
        return map(_num,0,this.max,0,this.height)
        // let scaleVal = this.max/this.height
        // return _num/scaleVal	
    }
        
}


