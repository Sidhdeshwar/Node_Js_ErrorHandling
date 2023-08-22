const mongoose = require('mongoose');
const slugify = require('slugify');
// import validato from 'validator';
const validato = require('validator');

const productsSchema = new mongoose.Schema({
    name: {
     type: String,
     minLength : [5, " Length Should above 5 Chars"],
     maxLength : [10, "Length should below 10 chars"],
     validate : [validato.isAlpha , "{VALUE} must have chars only."] // imported validato  [isAlpha, isAlphanumeric] etc.
    },
    slug: String,
    model:{
        type : String,
        enum: {  // enum is only for string
            values : ['Mechanical', 'TATA', 'Cricket', 'Computer MCA'],
            message : "Incorrect Model Entry"
        }
    },
    price:{
        type:Number,
        required:true,
        min:[10, "{VALUE} price should above 10"],
        max : [5000, "{VALUE} price should below 5000"],
        validate: {  
          validator : (val)=>{ return val>100 }, //* Custom validators ---> always returns (true/false)
          message : "({VALUE} is <100)"
        },
        select : true
    }
},
{
    toJSON : { virtuals : true},   //* to add any virtuals
    toObject : { virtuals : true}
}
);
 //* to add any virtuals property like --> newPrice
 productsSchema.virtual('newPrice').get(function (){  
    console.log(this.price)
    return this.price+10.50;
});

// ! ------------------------ pre & post ----------------------------------- Save() || Create() Middleware -----------------------------------------------
// ^ Mongoose Middleware/ Hooks --> before 1
productsSchema.pre('save', function(next){   // works for save() & create() functions
    console.log("MonGoose  Before: ==> ", this);
    next();
});

// ^ Slugify Package ---> before 2
productsSchema.pre('save', function(next){
     this.slug = slugify(this.name , { lower: true});
     console.log("PRE : ", this)
     next();
});

// ^  ---> after 
productsSchema.post('save', function(docs){ 
    this.slug = slugify(this.name , { lower: true});
    console.log("POST : ", "AAA : " +  docs);
});
// ! --------------------------------------------------------------------------------------------------

// ? ======================================Mongoose query middleware -- pre & post ==========================================
                  // All queries starts with "Find"
productsSchema.pre(/^find/, function(next){
    console.log("PRE : ", "FIND By id called") ;
    next();
});
// ? ==================================================================================================


// ^ ====================================== Mongoose aggregation middleware -- pre & post ==========================================
                  // All queries starts with "Find"
                  productsSchema.pre( 'aggregate', function(next){
                    console.log("PRE : ", "Aggegation Called ") ;
                    next();
                });
// ^ ==================================================================================================
const productsModel = mongoose.model('product1', productsSchema);

module.exports = productsModel;