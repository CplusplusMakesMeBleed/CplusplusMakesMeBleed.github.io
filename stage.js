class Stage extends createjs.Stage {
	constructor(canvas){		//canvas element id, convert stage to full width
		super(canvas);
		
		this.enableMouseOver(10);
		console.log("Tick on stage update set to "+this.stage.tickOnUpdate); //allows stage to send ticks to children. I think.
		
		if (!Stage.tickerInitialised){
			Stage.initTicker();
		}	
	  
		createjs.Ticker.addEventListener("tick",this); //Turns on the ticker. use event.delta to get time in seconds. Use in tick() func of any child
		console.log(this.height+", "+this.width);
	}		
	
	static tickerInitialised = false;
	static initTicker(){
		createjs.Ticker.timingMode = createjs.Ticker.RAF;	//framerate scales with avilable resources	
		Stage.tickerInitialised = true;
		console.log("Ticker initialised: "+Stage.tickerInitialised);
	}	
	
	handleEvent(evt){
		//console.log(evt);	
		super.handleEvent(evt);
		
	}	
	
	addChild(c){
		super.addChild(c);
		c.parent = this;
	}	
	
	get height(){
		return this.canvas.height;	
	}	
	
	get width(){
		return this.canvas.width;	
	}	
	
}	

/*const CANVAS = {
	width : 300,
	height : 350
	};

	
const ASSETS = ["img/burger/patty.json"];	
	
	
class PattySlider {
	//game is set out for canvas size 600 wide 900 tall
	constructor(canvas, slide, days, kg){
		this.stage = new createjs.Stage(canvas);
		//set stage resolution in html and actual display size in css
		this.stage.enableMouseOver(10); // 10 updates per second
		//stage.tickOnUpdate = false;
		console.log("Tick on stage update set to "+this.stage.tickOnUpdate); //allows stage to send ticks to children. I think.
		createjs.Ticker.timingMode = createjs.Ticker.RAF;	//framerate scales with avilable resources
	  
		createjs.Ticker.addEventListener("tick",this.stage); //Turns on the ticker. use event.delta to get time in seconds. Use in tick() func of any child
		
		//initialise everything that should be on stage
		//use new createjs.sprite(sps)
		//let sps = new createjs.SpriteSheet(testSprite); testSprite is a json object
		//spritesheets are imported using load deps
		//use x.goToAndPlay("frame name") to start animation
		this.assets = ASSETS;
		this.spritesheets = {};
		
		this.maxKg = 96;
		
		this.kg = $('#'+kg);
		this.days = $('#'+days);
		this.slid = $('#'+slide);
		
		this.loadDeps();
		
		this.targetDays = null;
		this.targetKg = null;
	}
	
	loadDeps(){	//loads dependencies
		if (this.assets.length > 0){
			let preload = new createjs.LoadQueue();
			preload.addEventListener("fileload",handleFileLoad);
			preload.addEventListener("complete",handleFileComplete);
			preload.loadManifest(this.assets);
		}
		
		let self = this;
		
		function handleFileLoad(event){
			if(event.item.type == "javascript"){
				document.body.appendChild(event.result);	//adds script to document
			}	
			else if(event.item.type == "json"){
				self.spritesheets[event.result.name] = event.result;
			}	
			else {
				console.log("dont know what to do with this asset")
			}	
			console.log(event.item.type + " " + event.item.src+" loaded");
			//console.log(self.spritesheets);
		}	

		function handleFileComplete(event){
			console.log("All dependancies loaded");
			console.log(self.spritesheets);
			//self.loadSound();
			self.init();
		}	

	}

	loadSound(){
			let self = this;
			let soundsLoaded = 0;	
			createjs.Sound.on("fileload", function(evt){
				console.log("Sound "+evt.id+" loaded");
				soundsLoaded += 1;
				if (soundsLoaded >= SOUNDS.length){
					console.log("All sounds loaded!");	
					self.init();
				}	
			});
			createjs.Sound.alternateExtensions = ["mp3"];
			createjs.Sound.registerSounds(SOUNDS);
			 
	}		
	
	refresh(num){	//num is from 1 to 365
		let pos = num/365 * this.pattystack.length;
		
		if (parseInt(this.days.text()) != num){
			this.targetDays = num;
			//this.days.animate({fontSize: "+=4pt"});
			this.slid.attr('disabled', true);
		}
		
		let tkg = num/365 * this.maxKg;
		tkg = tkg.toFixed(1);
		if (this.kg.text() != tkg){
			this.targetKg = parseFloat(tkg);
			//this.days.animate({fontSize: "+=4pt"});
		}
		
		let increment = 100; //100 ms
		let interval = 0;
		
		pos = Math.round(pos);
		if (pos < 1) pos = 1;
		
		let i = 0;
		for (i=0; i<pos; i++){
			if (this.pattystack[i].setVisible(true, interval) != false){
				interval += increment;
				increment *= 0.95;
			}
		}	
		for (i = this.pattystack.length - 1; i>= pos; i--){
			if (this.pattystack[i].setVisible(false, interval) != false){
				interval += increment;
			}
		}	
		
		let self = this;
		setTimeout(function(){
			self.slid.attr('disabled', false);	
		},interval);
	}	
	
	init(){
		
		let sprtsht = new createjs.SpriteSheet(this.spritesheets["patty"]);
		this.pattystack = [];
		
		let self = this;
		this.slid.change(function(evt){
			console.log("Slider value: "+evt.target.value);	
			self.refresh(evt.target.value);
		});
		
		let i = 0;
		let y = 0;
		let numPats = 12;
		let sX = [75,-15,155];
		let sY = [CANVAS.height - 130, CANVAS.height - 100, CANVAS.height-100];
		let vX = 10; //variance in x position for each patty in stack
		let dY = -20; //height of each patty above lower one in stack
		for (y=0; y<3; y++){
			for (i=0; i<numPats; i++){
				let tmp = new Patty(sprtsht);
				tmp.x = sX[y] + (Math.random()-0.5)*vX;
				tmp.y = sY[y];
				tmp.scaleX = tmp.scaleY = 0.3;
				sY[y] += dY;
				tmp.visible = false;
				
				this.stage.addChild(tmp);
				this.pattystack.push(tmp);
				
			}	
		}
		this.refresh(this.slid.val());
		
		//this.days.animate({fontSize: "+=16pt"},function(){self.days.animate({fontSize: "-=16pt"})});
		
		createjs.Ticker.addEventListener("tick", this);
		
		console.log("Minigame loaded!");
		
	}

	handleEvent(evt){
		
		if (this.targetDays != null){
		
			let tmp = this.days.text();
			tmp = parseInt(tmp);
			if (tmp < this.targetDays){
				if (this.targetDays - tmp > 10){
					tmp += 10;
				}
				else
				tmp++;	
			}
			else if (tmp - this.targetDays > 10){
				tmp -= 10;	
			}	
			else
				tmp--;	
			this.days.text(tmp);
			
			if (this.targetDays == tmp){
				this.targetDays = null;
				//this.days.animate({fontSize: "-=4pt"});
			}	
		}
		
		if (this.targetKg != null){
		
			let t = this.kg.text();
			t = parseFloat(t);
			if (t < this.targetKg){
				if (this.targetKg - t > 1){
					t += 1;
				}
				else
				t += 0.1;	
			}
			else if (t - this.targetKg > 1){
				t -= 1;	
			}	
			else
				t -= 0.1;	
			
			//round t for safety
			t = parseFloat(t.toFixed(1));
			
			this.kg.text(t);
			
			if (this.targetKg == t){
				this.targetKg = null;
				//this.Kg.animate({fontSize: "-=4pt"});
			}	
		}
		
	}

	
}

class Patty extends createjs.Sprite{
	constructor(sprt){
		super(sprt);
	}	
	
	setVisible(val, tOut){
		if (val == this.visible){
			return false; //do nothing
		}
		
		let self = this;
		
		if (val == true){
			setTimeout(function(){
				self.comeIn();	
			}, tOut);
		}
		else {
			setTimeout(function(){
				self.goOut();	
			}, tOut);
		}	
	}
	
	goOut(){
		let self = this;
		let ty = this.y;
		
		createjs.Tween.get(this).to({alpha:0, y:this.y-100}, 100).call(function(){
			self.y = ty;
			self.visible = false;
			
		});
	}

	comeIn(){
		let self = this;
		let ty = this.y;
		this.y = this.y - 100;
		this.visible = true;
		
		createjs.Tween.get(this).to({alpha:1, y:ty}, 100);
	}	
}	

*/