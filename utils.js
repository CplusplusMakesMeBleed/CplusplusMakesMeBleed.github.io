function enforceArray(r){ //makes damn sure whatever comes out of here is an array
	
	if (r == null){
		return [];
	}	
	
	
	if (!Array.isArray(r)){
			//put single arg in an array
			r = [r];
	}

	return r;	
	
}	