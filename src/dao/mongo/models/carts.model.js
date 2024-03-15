import mongoose from 'mongoose';

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }
});

cartsSchema.pre('find', function(next) {
    this.populate('products.product');
    next();
});

cartsSchema.pre('findById', function(next) {
    this.populate('products.product');
    next();
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;