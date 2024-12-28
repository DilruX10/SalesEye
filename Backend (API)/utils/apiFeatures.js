//provides methods to modify and filter the Mongoose query object based on the query string.
class APIFeatures {
    constructor(query, queryStr) {//initializes the class properties
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
     //search filter to the query object based on the keyword parameter in the queryStr string.        
        const keyword = this.queryStr.id ? {
            name: {//creates expression to match the name field of the Mongoose model with the given keyword
                $regex: this.queryStr.id,//specify a regular expression pattern that matches keyword
                $options: 'i'//make case-insensitive(capital or simple)
            }
        } : {}//If queryStr.keyword does not exist, the keyword constant is set to an empty object.

        this.query = this.query.find({ ...keyword });//find() method ---> used to filter the results of the query
        return this;
    }

    filter() {

        const queryCopy = { ...this.queryStr };//create a shallow copy of the queryStr--->containing URL query parameters. 

        // Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);//el-->element
        //remove the corresponding property from the queryCopy object.

        // Advance filter for price, ratings etc
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        //b->boundary--->match range of prices /  gt > /  gte >= / lt < /  lte <=


        this.query = this.query.find(JSON.parse(queryStr));
        return this;//returns the current instance of the this object
    }//allow to chained with other methods-->like sort()

    pagination(resPerPage) {//number of results to be displayed per page.

        //If the page property is not present, the currentPage variable is set to 1
        const currentPage = Number(this.queryStr.page) || 1;//Number()-->convert the value of this.queryStr.page to a number
        
        //number of results that should be skipped based on the current page number and the number of results per page.
        const skip = resPerPage * (currentPage - 1);

        //limit()--->specify the maximum number of results to return,
        //skip()--->skip the specified number of results.
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures