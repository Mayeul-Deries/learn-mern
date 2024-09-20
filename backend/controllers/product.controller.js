import mongoose from 'mongoose'

import Product from '../model/product.model.js'

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    console.log('Error in getting products: ', error.message)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

export const createProduct = async (req, res) => {
  const product = req.body // user will send the product in the request body

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: 'Name, price, and image are required' })
  }

  const newProduct = new Product(product)

  try {
    await newProduct.save()
    res.status(201).json({ success: true, data: newProduct })
  } catch (error) {
    console.log('Error in creating products: ', error.message)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params
  const product = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid product id' })
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })
    res.status(200).json({ success: true, data: updatedProduct })
  } catch (error) {
    console.log('Error in updating product: ', error.message)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid product id' })
  }

  try {
    await Product.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: 'Product deleted' })
  } catch (error) {
    console.log('Error in deleting product: ', error.message)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}
