Array.prototype.contains = function(value){
  for(var i =0; i < this.length;i++){
      if(this[i] === value){
          return true;
      }
  }
  return false;
};