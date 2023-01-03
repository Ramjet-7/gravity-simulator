const G = 0.01;
export default class Particle{
    constructor(x,y,vx,vy,mass,size){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.mu = mass * G;
        this.size = size;
    }
}