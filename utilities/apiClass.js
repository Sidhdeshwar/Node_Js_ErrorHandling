
class API{
    constructor (data, query){
      this.data = data;
      this.query = query;
    }
  
    filter()
    {
     //* 1) Filtering
     
     let  queryObj = {...this.query};
     let skipArray = ["sort", "limit", "page", "field"];
     skipArray.forEach((ele)=>{ delete queryObj[ele]});
     
     
     //* 2) Advanced Filtering
     //To add ==> $
     let queryStr = JSON.stringify(queryObj);
     queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, match=> {return `$${match}`});
     let q = JSON.parse(queryStr);
     this.data = this.data.find();
     return this;
    }
  
    sort()
    {
      if(this.query.sort)
      {
        let sortBy = this.query.sort.split(',').join(' ');
        console.log("ALA : " , sortBy)
        this.data.find().sort(sortBy).skip(0).limit(2);
      }
      else{
       console.log("ALA")
      this.data = this.data.find()
      this.data =  this.data.skip(1).limit(3);
      }
      return this;
    }
  
    fieldsPresent()
    {
      if(this.query.fields)
      {
        let fields = this.query.fields.split(',').join(' ');
        console.log("FFF ",fields)
        this.data =   this.data.find().select(fields) //* Projecting 
        // -Exclude this return all 
        // only this item ==> name no any other
      }
      return this;
    }
  }

  module.exports = API