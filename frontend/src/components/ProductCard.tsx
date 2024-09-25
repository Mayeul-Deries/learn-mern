/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  VStack,
  ModalBody,
  Input,
  ModalFooter,
  Button,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useProductStore } from '../store/product'

const ProductCard = ({ product }: { product: any }) => {
  const textColor = useColorModeValue('gray.600', 'gray.200')
  const bg = useColorModeValue('white', 'gray.800')

  const [updatedProduct, setUpdatedProduct] = useState(product)
  const { updateProduct, deleteProduct } = useProductStore()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleUpdateProduct = async (pid: string, updatedProduct: any) => {
    const {success, message } = await updateProduct(pid, updatedProduct)
    onClose()
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleDeleteProduct = async (pid: string) => {
    const { success, message } = await deleteProduct(pid)
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }
  return (
    <Box
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all 0.3s'}
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'xl',
      }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />

      <Box p={4}>
        <Heading as={'h3'} size={'md'} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={2}>
          ${product.price}
        </Text>

        <Text fontSize='md' color={textColor} mb={4}>
          {product.description}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' aria-label={'edit'} />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product?._id)}
            colorScheme='red'
            aria-label={'delete'}
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder='Product Name'
                name='name'
                value={updatedProduct.name}
                onChange={e => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder='Price'
                name='price'
                type='number'
                value={updatedProduct.price}
                onChange={e => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
              <Input
                placeholder='Description'
                name='description'
                value={updatedProduct.description}
                onChange={e => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
              />
              <Input
                placeholder='Image URL'
                name='image'
                value={updatedProduct.image}
                onChange={e => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product?._id, updatedProduct)}>
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ProductCard
