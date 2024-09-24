import { create } from 'zustand'

interface Product {
  name: string
  price: string
  description: string
  image: string
}

interface ProductStore {
  products: Product[]
  setProducts: (products: Product[]) => void
  createProduct: (newProduct: Product) => Promise<{ success: boolean; message: string }>
}

export const useProductStore = create<ProductStore>(set => ({
  products: [],
  setProducts: (products: Product[]) => set({ products }),
  createProduct: async (newProduct: Product) => {
    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.image) {
      return { success: false, message: 'All fields are required' }
    }
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
    const data = await response.json()
    set(state => ({ products: [...state.products, data.data] }))
    return { success: true, message: 'Product created successfully' }
  },
}))
