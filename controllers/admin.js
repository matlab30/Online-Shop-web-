const Product = require('../models/product')



exports.getAddProduct = (req, res, next) => {
    console.log(req.originalUrl);
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(title, imgUrl, description, price, null, req.user._id);
    product
        .save()
        .then(result => {
            console.log('created product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });

}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId
    Product.findById(prodId).then(product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
        .catch(err => {
            console.log(err);
        });

}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImgUrl = req.body.imgUrl;
    const updatedDesc = req.body.description;

    const product = new Product(updatedTitle, updatedImgUrl, updatedDesc, updatedPrice, prodId);
    product.save()
        .then(result => {
            console.log('Updated Product!');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
            });
        });
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
        .then(() => {
            console.log('Destroyed Product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
}