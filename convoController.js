class ConvoController {
	
	constructor(targetDiv, startNode, sounds){	//start node is the single response node clicked to start the convo
		this._tD = targetDiv;	//jquery element
		this._cur = startNode;
		this._sounds = sounds;
		
		this.printResponse(this._cur);
	}

	printResponse(r){ //can be array or single item
		
		r = enforceArray(r);
		
		let out = r.map((c,i)=>$("<div></div>",{class: "response col"}).data("num",i).append($("<p></p>",{html: c.print()})));
		
		this._tD.find(".responseBox").append(out);
		
		let self = this;
		$(".response").on("click",evt=>{
			//let chosen = r[$(evt.currentTarget).data("num")].next;
			let chosen = r[$(evt.currentTarget).data("num")].next[0];
			console.log(chosen);	
			self.printMessage(chosen);
		});

	}

	printMessage(m){	//receives single Message Object
		//first clear all active responses
		//console.log(m.print());
		this._tD.find(".response").remove();
		this._tD.find(".message").remove();
		
		let mes = $("<div></div>",{class: "message col"}).append($("<p></p>"));
		this._tD.find(".messageBox").append(mes);
		
		let self = this;
		console.log(this._sounds);
		let feed = new TextFeed(mes.find("p"),m.print(),this._sounds,()=>{
			console.log("Done speaking");
			self.printResponse(m.next);
		});
		feed.start();
		
	}
	
}	


