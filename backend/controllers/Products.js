import Product from "../models/ProductModel.js";
import path from "path";
import fs from "fs";

export const getProducts = async (req, res) => {
    try {
        const response = await Product.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProductById = async (req, res) => {
    try {
        const response = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}
export const saveProduct = async (req, res) => {
    if (!req.files) return res.status(400).json({ msg: "No File Uploaded" });

    const { name, price, category, variant, briefDescription, fullDescription, size } = req.body;
    const allowedType = ['.png', '.jpg', '.jpeg', '.svg'];
    const maxSize = 5000000;
    const files = [
        req.files.file,
        req.files.file2,
        req.files.file3,
        req.files.file4,
        req.files.cardFile,
        req.files.cardFile2,
        req.files.cardFile3
    ];

    // Validate files
    for (const file of files) {
        if (!file) return res.status(400).json({ msg: "Missing some files" });

        const ext = path.extname(file.name).toLowerCase();
        if (!allowedType.includes(ext)) {
            return res.status(422).json({ msg: "Invalid Images" });
        }

        if (file.data.length > maxSize) {
            return res.status(422).json({ msg: "Image must be less than 5 MB" });
        }
    }

    const uploadPath = './public/images/';
    const urls = [];

    try {
        // Move files and generate URLs
        await Promise.all(files.map(async (file) => {
            const ext = path.extname(file.name);
            const fileName = file.md5 + ext;
            const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
            urls.push({ fileName, url });
            await file.mv(uploadPath + fileName);
        }));

        // Create product in the database
        const productData = {
            name,
            price,
            category,
            variant,
            briefDescription,
            fullDescription,
            size,
            productImage: urls[0].fileName,
            producturl: urls[0].url,
            productImage2: urls[1].fileName,
            producturl2: urls[1].url,
            productImage3: urls[2].fileName,
            producturl3: urls[2].url,
            productImage4: urls[3].fileName,
            producturl4: urls[3].url,
            cardImage: urls[4].fileName,
            cardurl: urls[4].url,
            cardImage2: urls[5].fileName,
            cardurl2: urls[5].url,
            cardImage3: urls[6].fileName,
            cardurl3: urls[6].url
        };

        await Product.create(productData);

        res.status(201).json({ msg: "Product Created Successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findOne({
            where: {
                id: productId
            }
        });

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        // Check if any files are uploaded
        if (!req.files) {
            return res.status(400).json({ msg: "No File Uploaded" });
        }

        const { name, price, category, variant, briefDescription, fullDescription, size } = req.body;
        const allowedType = ['.png', '.jpg', '.jpeg', '.svg'];
        const maxSize = 5000000;
        const files = [
            req.files.file,
            req.files.file2,
            req.files.file3,
            req.files.file4,
            req.files.cardFile,
            req.files.cardFile2,
            req.files.cardFile3
        ];

        // Validate files
        for (const file of files) {
            if (file) {
                const ext = path.extname(file.name).toLowerCase();
                if (!allowedType.includes(ext)) {
                    return res.status(422).json({ msg: "Invalid Images" });
                }

                if (file.data.length > maxSize) {
                    return res.status(422).json({ msg: "Image must be less than 5 MB" });
                }
            }
        }

        const uploadPath = './public/images/';
        const urls = [];

        // Move files and generate URLs
        await Promise.all(files.map(async (file) => {
            if (file) {
                const ext = path.extname(file.name);
                const fileName = file.md5 + ext;
                const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
                urls.push({ fileName, url });
                await file.mv(uploadPath + fileName);
            }
        }));

        // Update product data
        const updatedProductData = {
            name: name || product.name,
            price: price || product.price,
            category: category || product.category,
            variant: variant || product.variant,
            briefDescription: briefDescription || product.briefDescription,
            fullDescription: fullDescription || product.fullDescription,
            size: size || product.size,
            productImage: urls[0] ? urls[0].fileName : product.productImage,
            producturl: urls[0] ? urls[0].url : product.producturl,
            productImage2: urls[1] ? urls[1].fileName : product.productImage2,
            producturl2: urls[1] ? urls[1].url : product.producturl2,
            productImage3: urls[2] ? urls[2].fileName : product.productImage3,
            producturl3: urls[2] ? urls[2].url : product.producturl3,
            productImage4: urls[3] ? urls[3].fileName : product.productImage4,
            producturl4: urls[3] ? urls[3].url : product.producturl4,
            cardImage: urls[4] ? urls[4].fileName : product.cardImage,
            cardurl: urls[4] ? urls[4].url : product.cardurl,
            cardImage2: urls[5] ? urls[5].fileName : product.cardImage2,
            cardurl2: urls[5] ? urls[5].url : product.cardurl2,
            cardImage3: urls[6] ? urls[6].fileName : product.cardImage3,
            cardurl3: urls[6] ? urls[6].url : product.cardurl3
        };

        await Product.update(updatedProductData, {
            where: {
                id: productId
            }
        });

        res.status(200).json({ msg: "Product Updated Successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });

    try {
        const filepath = `./public/images/${product.productImage}`;
        fs.unlinkSync(filepath);
        await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Product Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
    }
}
