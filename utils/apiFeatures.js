
class APIFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}


	filter() {
		const queryObj = { ...this.queryString }; // ... = destruturing query object
		const excludedFields = ['page', 'sort', 'limit', 'fields'];
		excludedFields.forEach(field => delete queryObj[field]);

		// Prepare query
		let queryStr = JSON.stringify(queryObj);
		// Replace gte gt lte lt with the same word but with a $ in front
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);


		this.query = this.query.find(JSON.parse(queryStr));

		return this;
	}



	sort() {
		if (this.queryString.sort) {
			// Sort results by multiple fields (add ',' in request)
			const sortBy = this.queryString.sort.split(',').join(' ');
			this.query = this.query.sort(sortBy);
		}

		return this;
	}


	limitFields() {
		// Limit fields
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(',').join(' ');
			this.query = this.query.select(fields);
		} else {
			this.query = this.query.select('-__v');  // - to remove the variable
		}

		return this;
	}



	paginate() {
		// Pagination
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 100;
		const skip = (page - 1) * limit;

		this.query = this.query.skip(skip).limit(limit);

		return this;
	}
}


module.exports = APIFeatures;