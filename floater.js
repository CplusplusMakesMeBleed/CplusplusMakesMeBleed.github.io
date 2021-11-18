class Floater extends createjs.Container {
	constructor(size=0.3,speed=200){
		if (Floater.initted == false){
			Floater.initImages();
		}	
			
		super();
		
		this._tail = Floater.BaseTail.clone(false); 
		this.addChild(this._tail);
		
		this._wing_r = Floater.BaseWing.clone(false); 
		this.addChild(this._wing_r);
		
		this._wing_l = Floater.BaseWing.clone(false); 
		this._wing_l.scaleX *= -1;
		this.addChild(this._wing_l);
		
		this._innard = Floater.BaseInnard.clone(false); 
		this.addChild(this._innard);
		
		this._body = Floater.BaseBody.clone(false); 
		this.addChild(this._body);
		
		this._parent = null;
		this._speed = speed;
		
		this.scaleX=this.scaleY=size;
		
	}
	
	static initted = false;
	static get leeWay() { return 200; }
	static BaseBody = new createjs.Bitmap($("#_floater_body").get(0));
	static BaseInnard = new createjs.Bitmap($("#_floater_innard").get(0));
	static BaseTail = new createjs.Bitmap($("#_floater_tail").get(0));
	static BaseWing = new createjs.Bitmap($("#_floater_wing").get(0));
	
	static initImages(){
		Floater.BaseBody.regX = 200;
		Floater.BaseBody.regY = 400;	
		
		Floater.BaseInnard.regX = 150;
		Floater.BaseInnard.regY = 280;	
		
		Floater.BaseTail.y = 50;
		Floater.BaseTail.regX = 50;
		Floater.BaseTail.regY = -120;	
		
		Floater.BaseWing.regX = -150;
		Floater.BaseWing.regY = 50;	
		
		Floater.initted = true;
		console.log("Floater images initialised");
	}
	
	set parent(p){
		//if (this._parent == null) this.initialiseAnims();
		this._parent = p;
	}	
	
	initialiseAnims(){
		console.log("Initialising animations");
		createjs.Ticker.addEventListener("tick",this);
		
		let tScale = 0.3/this.scaleX;
		console.log("Anim timescale :"+tScale);
		this.rotation = -8;
		
		createjs.Tween.get(this,{loop:-1,bounce:true,timeScale:tScale}).to({rotation:8},2000,createjs.Ease.quadInOut);
		
		this._tail. rotation = 20;
		createjs.Tween.get(this._tail,{loop:-1,bounce:true,timeScale:tScale}).to({rotation:-20},2000,createjs.Ease.cubicInOut);
		
		this._wing_r. rotation = 20;
		createjs.Tween.get(this._wing_r,{loop:-1,bounce:true,timeScale:tScale}).to({rotation:-20},1000,createjs.Ease.circIn);
		
		this._wing_l. rotation = -20;
		createjs.Tween.get(this._wing_l,{loop:-1,bounce:true,timeScale:tScale}).to({rotation:20},1000,createjs.Ease.circIn);
	}	
	
	get speed(){
		return this._speed*this.scaleX*(this._wing_r.rotation+30)/40;	
	}	

	handleEvent(evt){
		if (evt.type == "tick") this.handleTick(evt);
		
	}	
	
	handleTick(evt){
		this.y -= this.speed*evt.delta/1000;
		
		if (this.y < -Floater.leeWay && this._parent != null){
			this.y = this._parent.height + Floater.leeWay;
		}	
		
	}
}	