$(()=> {
	console.log("Loading dependencies");
	let assetPath = "./sound/";
	let sounds = [
		{src:"talk1.wav", id:"talk1"}
	//	{src:"snd_txtpap.wav", id:"talk2"}
	];
	let soundIDs = sounds.map(c => c.id);
	
	let loaded = 0;
 
	createjs.Sound.on("fileload", handleLoad); // call handleLoad when each sound loads
	createjs.Sound.registerSounds(sounds, assetPath);
	
	if (sounds.length <= 0){
		init();	
	}	
	
	function handleLoad(evt){
		//console.log(evt);
		loaded++;
		console.log("Loaded "+loaded+" files out of "+sounds.length);
		
		if (loaded >= sounds.length){
			console.log("Loading complete");
			init();	
		}	
	}	

	function init(){
		$("#loading").remove(); //remove loading div
		
		let testText = "Click to Start";
		
		let tR = new Response(testText);
		let tM = new Message("Hi there!! I'm Reu. What's skinning your cat on this fine day?");
		tR.next = tM;
		let tR1 = new Response("Yo Howzit?");
		let tR2 = new Response("I feel sick looking at your javascript.");
		tM.next = tR1;
		tM.next = tR2;
			
	
		//let t = new TextFeed($(".textBox .output"),testText,soundIDs);
		
		//$("#start").on("click",()=>t.start());
		
		let cc = new ConvoController($(".textBox"),tR,soundIDs);
		
		let st = new Stage("mainCan");
		
		/*let tF = new Floater();
		st.addChild(tF);
		tF.x = st.width*0.5;
		tF.y = st.height*0.5;
		tF.initialiseAnims();
		
		let tF1 = new Floater(0.15);
		st.addChild(tF1);
		tF1.x = st.width*0.7;
		tF1.y = st.height*0.8;
		tF1.initialiseAnims();*/
		
		putFloaters(5,st);
		
		let me = new createjs.Bitmap($("#_reu_body").get(0));
		me.regX = 600;
		me.x = st.width*0.5;
		me.y = st.height*0.15;
		me.scaleX=me.scaleY = 0.5;
		
		let colm = new createjs.Bitmap($("#_column").get(0));
		st.addChild(colm);
		colm.regX = 250;
		colm.x = me.x;
		colm.y = me.y+st.height*0.46;
		colm.scaleX = colm.scaleY = 0.8;
		
		st.addChild(me);
		
	}		
	
});

function putFloaters(n,st){
	for (let i=0; i<n; i++){
		let r = Math.random()+0.5; //random from 0.5 to 1.5
		let tmp = new Floater(0.15*r);
		st.addChild(tmp);
		tmp.x = st.width*Math.random();
		tmp.y = st.height*Math.random();
		tmp.initialiseAnims();
	
	}
	
}

