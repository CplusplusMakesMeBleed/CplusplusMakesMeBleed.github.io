const TEXTSPEED = 70;

class TextFeed{
	constructor(el, txt, sound, callback){	
		this._element = el; //jquery object
		this._text = txt;
		this._num = 0;
		this._timer = null;
		this._sound = sound;
		this._callback = callback;
		
		
		this._SILENT = [" ",".",",","!","'",'"',"?"];
	}
	
	start(){
		if (this._timer != null) return;
		this._timer = setInterval(()=>{this.increment()},TEXTSPEED);
		
		
	}

	increment(){
		if (this._num >= this._text.length){
			clearInterval(this._timer);	
			this._callback();
			return;
		}	
		this.playSound(this._text[this._num]);
		this._element.append(this._text[this._num]);
		
		this._num++;
	}		
	
	playSound(c){
		if (this._SILENT.indexOf(c) > -1){	//check is char is silent
			let i = Math.floor(Math.random() * this._sound.length);
			
			//createjs.Sound.play(this._sound[i],{interrupt: createjs.Sound.INTERRUPT_ANY});
			createjs.Sound.play(this._sound[i]);
		}	
	}	
	
}	


