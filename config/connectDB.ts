import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.CONNECTING_STRING as string);
		console.log('Database established: ', connect.connection.host, connect.connection.name);
	}
	catch (err) {
		console.log(err);
	}
}

export default connectDB;