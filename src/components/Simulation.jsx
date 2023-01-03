import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3'
import Particle from './Particle';
const SIZE = 5;
const width = 600;
const height = 600;
const COLOR = '#F2E9E4';

class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    subtract(vector){
        var vec = [this.x - vector.x, this.y - vector.y];
        return new Vector(vec[0], vec[1]);
    }
    norm(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}


const Simulation = ({DT, SPEED}) => {

    const canvas = useRef(null);
    //let data = [];


    useEffect(() => {
        // Remove existing SVG canvases cuz for some reason they keep appending
        d3.select("svg").remove();
        // for (var cnt = 0; cnt < info.length; cnt ++){
        //     data.push(new Particle(info[cnt].x, info[cnt].y, info[cnt].vx, info[cnt].vy, info[cnt].mass, SIZE))
        // }
        //console.log(info[0].x);

        showCanvas();
        
     
    });

    const showCanvas = () => {
        
        const svg = d3.select(canvas.current)
            .append('svg')
            .attr('id', 'svgcanvas')
            .attr("width", `${width}`)
            .attr("height", `${height}`)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMinYMin")
            .style('background-color', '#22223B');
        //svg.on('mousedown', drawCircle);
        svg.on('mouseup', moveCircle);
        svg.on('mousedown', drawCircle)
        // ****************************** START OF SIMULATION CODE ***************************************
        const MAX_COORD = 1000000000;
        const MAX_PIXEL = 500;
        ;
        const G = 6.67e-11;
        console.log(DT);
        var xScale = d3.scaleLinear().domain([-MAX_COORD, MAX_COORD]).range([0, MAX_PIXEL]);
        var yScale = d3.scaleLinear().domain([-MAX_COORD, MAX_COORD]).range([0, MAX_PIXEL]);
        //let data = info;
        
       // data = [
        
            //new Particle(500000000, 500000000, 0, 300, 20000000000000,SIZE),
            //new Particle(400000000, 500000000, 0, -300, 20000000000000, SIZE)
        //];

        // data.push(new Particle(400000000, 500000000,  0,0,20000000000000, SIZE));
        // data.push(new Particle(posx, posy, velx, vely, mass, SIZE));
        let data = [new Particle(0, 0, 0,0,0, 5)];
//new Particle(info[0].x, info[0].y, info[0].vx, info[0].vy, info[0].mu, SIZE)

        let n = data.length;


        var circles = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr('fill', COLOR)
        .attr("r", function(d){return d.size;})
        .attr("cx", function(d) { return xScale(d.x); })
        .attr("cy", function(d) { return yScale(d.y); });

        function circleAttr(){
            circles = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr('fill', COLOR)
            .attr("r", function(d){return d.size})
            .attr("cx", function(d) { return xScale(d.x); })
            .attr("cy", function(d) { return yScale(d.y); });   
        }


        function drawCircle(event) {
            //console.log("MASS: ", mass);

            var e = event.target;
            var dim = e.getBoundingClientRect();
            var x = event.clientX - dim.left;
            var y = event.clientY - dim.top;
            console.log("x: "+x+" y:"+y);
            n++;
            data.push(new Particle(xScale.invert(x),yScale.invert(y) ,0,0,20000000000000, SIZE));
            circles.remove();
            circleAttr();
                         
        }

        function moveCircle(event) {
            var e = event.target;
            var dim = e.getBoundingClientRect();
            var x = event.clientX - dim.left;
            var y = event.clientY - dim.top;
            if (data[data.length - 1] === undefined) {
                console.log("NOT WORKGIN")
                return;
            }
            let xs = xScale(data[data.length - 1].x);
            let ys = yScale(data[data.length - 1].y);
            let diff = (new Vector(xs, ys)).subtract(new Vector(x,y)).norm();
            let xd = [], yd = [];
            d3.selectAll('circle').each(function () {
                const thisD3 = d3.select(this);
                xd.push(parseInt(thisD3.attr('cx')));
                yd.push(parseInt(thisD3.attr('cy')));
            });
            let currx = xd[xd.length-1], curry = yd[yd.length-1];
            console.log(x,y);
            console.log(currx, curry);
           // if (Number.isInteger(x*2) && Number.isInteger(y*2)){
                data[data.length - 1].vx = 5 * (xs - x);
                data[data.length - 1].vy = 5 * (ys - y);            
            //}

      
        }


        function propagate(state) {
            let a = [], dstate = [];
            for (var i = 0; i < n; i ++){
                var ax = 0, ay = 0;
                for (var j = 0; j < n; j ++){
                    if (i === j || state[i] === undefined || state[j] === undefined) continue;
                    let rix = state[i].x;
                    let riy = state[i].y;
                    let vec1 = new Vector(rix, riy);
                    let rjx = state[j].x;
                    let rjy = state[j].y;
                    let vec2 = new Vector(rjx, rjy);
                    let x = [], y =[];
                    d3.selectAll('circle').each(function () {
                        const thisD3 = d3.select(this);
                        x.push(parseInt(thisD3.attr('cx')));
                        y.push(parseInt(thisD3.attr('cy')));
                    });
                    let dist = (new Vector(x[i], y[i])).subtract(new Vector(x[j], y[j])).norm();
                    if (dist>= SIZE*2){
                        ax += state[j].mu * (rjx - rix) / (vec2.subtract(vec1).norm()) ** 3;
                        ay += state[j].mu * (rjy - riy) / (vec2.subtract(vec1).norm()) ** 3;
                    } else {
                        // Collision
                        // TODO: Add new element into data array instead of modifying current one
                        var vfx = (data[i].mu*data[i].vx + data[j].mu*data[j].vx)/(data[i].mu + data[j].mu);
                        var vfy = (data[i].mu*data[i].vy + data[j].mu*data[j].vy)/(data[i].mu + data[j].mu);
                        data[i].mu += data[j].mu;
                        data[i].size += SIZE;
                        data[i].vx = vfx;
                        data[i].vy = vfy;
                        //data[i].vx += data[j].vx;
                        //data[i].vy += data[j].vy;
                        data.splice(j,j);
                        n--;
                        circles.remove();
                        circleAttr();
                    }
                }
                a.push({ax : ax, ay : ay});
            }
            for (var i = 0; i < n; i++){
                if (state[i]===undefined) continue;
                dstate.push({vx : state[i].vx, vy : state[i].vy, ax: a[i].ax, ay: a[i].ay, size:state[i].size});   
            }
            let newstate = [];
            for (var i = 0; i < n; i++){
                if (state[i]===undefined) continue;
                newstate.push({x : state[i].x + dstate[i].vx * DT, y : state[i].y + dstate[i].vy * DT, vx : dstate[i].ax * DT + state[i].vx, vy: dstate[i].ay * DT + state[i].vy, mu : state[i].mu,size:state[i].size});
            }
            return newstate;
        
        }
        function move() {
            
            data = propagate(data);
            circles
            .transition()
            .duration(100/SPEED)
            .ease(d3.easeLinear)
            .attr('fill', COLOR)
            .attr("cx", function(d, i) {
                return xScale(data[i].x); 
            })
            .attr("cy", function(d, i) { 
                return yScale(data[i].y);
            })
            .on("end", move);
   

        }
        d3.select(canvas.current).append(() => svg.node());
        move()
    };



    return (
        <div>
        
            <div className = "canvas" ref={canvas} width='700px' height='700px'>

            
            </div>
        </div>
    );
}

export default Simulation;
