class ConvoNode {
	constructor(txt,next=[]){	//next is array of convo nodes or single node
		this.contents = txt;
		this._next = enforceArray(next);
		//console.log("Node array created: ");
		//console.log(this._next);
	}
	
	print(){
		//display message 
		//console.log(txt);
		
		return this.contents;
	}
	
	get next(){
		//console.log("Return next");
		return this._next;	
	}	
	
	set next(n){
		console.log("Setting next");
		this._next.push(n);	
		
		console.log(this._next);
	}	
	
}

class Message extends ConvoNode {
	constructor(txt,next=null){ //next is array of pointers to responses
		super(txt,next);
	}


}	

class Response extends ConvoNode{
	constructor(txt,next=null){ //next is single pointer to convoNode
		super(txt,next);
	}	
	
	
	set next(n){
		console.log("current next: ");
		console.log(super.next);
		
		if (super.next.length > 0){
			console.log("Reponse already has next");
			return;
		}
				
		super.next = n;
	}	
	
	get next(){
		return super.next;	
	}	
}	

class ConvoTree {
	constructor(root){//initial node
		this.root = root;
		this.cur = root;
	}

	display(){
		this.cur.print();
		this.cur.next.forEach(function(r){
			r.print();	
		});
	}

	choose(i){
		if (i >= this.cur.next.length){
			console.log("Cannot select that option");	
			return;
		}	
		this.cur = this.cur.next[i].next;
		this.display();
	}	
		
}	