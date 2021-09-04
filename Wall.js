class Wall{
constructor(posX){
    this.rx=posX;
    this.ry=height-random([550,350]);
    this.spt=createSprite(this.rx,this.ry);
    this.spt.shapeColor="green";
    this.spt.addAnimation("ground",wallAnimation)
        this.spt.scale=0.10;
}
}