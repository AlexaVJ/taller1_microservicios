import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios, { AxiosResponse } from 'axios';
import Navbar from '../../components/Navbar';
import Tabla from '../../components/Tabla';
import Alert from '../../components/Alert';
import Card from '../../components/Card';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Product, fieldProducto } from '../../utilities/Data';
import { useFetchDeleteProduct, useFetchGetProducts, useFetchPostProduct, useFetchPutProduct } from '../../hooks/productFetch';

interface HomeProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loggedIn: boolean;
}

const columns = [
  {
    name: 'Product',
    selector: (row: Product) => row.name,
  },
  {
    name: 'Price',
    selector: (row: Product) => `$${row.price.toFixed(2)}`,
  },
  {
    name: 'Stock',
    selector: (row: Product) => row.stock.toString(),
  },
];

const HomeAdmin: React.FC<HomeProps> = ({ setLoggedIn, loggedIn }) => {
  const [type, setType] = useState(1);
  const [item, setItem] = useState<Product>({} as Product);
  const [showModal, setShowModal] = useState(false);
  const username = localStorage.getItem('username');

  const { products, error, loading, refetch } = useFetchGetProducts(loggedIn);
  const { putProduct } = useFetchPutProduct();
  const { postProduct } = useFetchPostProduct();
  const { deleteProduct } = useFetchDeleteProduct();

  if (!loggedIn) {
    return null;
  }

  const handdleEdit = async (id: number) => {
    const selectedItem = products.find(item => item.id === id);
    if (selectedItem) {
      setShowModal(true);
      setItem(selectedItem);
      setType(0);
    }
  };

  const handdleAdd = async (new_product: Product) => {
    const createdProduct = await postProduct(new_product);
    if (createdProduct) {
      await refetch();
      setType(1);
      setShowModal(false);
    }
  };

  const handleClose = () => {
    setType(1);
    setShowModal(false);
  }

  const onEdit = async (new_product: Product) => {
    const editedProduct = await putProduct(new_product);
    if (editedProduct) {
      await refetch();
      setType(1);
      setShowModal(false);
    }
  };


  const onDelete = async (id: number) => {
    const product = products.find(item => item.id === id);
    if (product) {
      const delProduct = await deleteProduct(product);
      if (delProduct) {
        await refetch();
      }
    }
  };


  return (
    <div className='w-screen h-screen flex flex-col lg:flex-row mx-10'>
      <Navbar setLoggedIn={setLoggedIn} />

      {/* Sección de contenido principal */}
      <div className='pt-16 px-10 flex-grow items-center place-content-center bg-gray-100 bg-opacity-80 backdrop-blur-lg overflow-y-auto'>
        <div className='pt-10 px-8'>
          <h1 className='font-bold'>Bienvenido! {username}</h1>

          {/* Mostrar mensaje y botón en pantallas pequeñas */}
          <div className='pt-5 flex flex-row items-center'>
            <p className='mr-5'>Agregue un producto aquí</p>
            <button
              onClick={() => setShowModal(true)}
              className="rounded-full bg-blue-800 p-2 text-gray-200 hover:text-gray-700 bg-blue-800 hover:bg-blue-100"
            >
              <PlusIcon className='w-6 h-6 text-white' />
            </button>
          </div>
          {/* Mostrar la tabla de productos */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-950"></div>
            </div>
          ) : error ? (
            <Alert message={error} color='red' />
          ) : products.length === 0 ? (
            <Alert message='No hay usuarios disponibles' color='red' />
          ) : (
            <Tabla<Product, number>
              columns={columns}
              data={products}
              onDelete={onDelete}
              onEdit={handdleEdit}
              getRowId={(row) => row.id}
            />
          )}
        </div>
      </div>

      {/* Modal que muestra el Card cuando se presiona el botón en pantallas pequeñas */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-indigo-950 bg-opacity-90 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-black bg-transparent rounded-full p-2"
            >
              <XMarkIcon className='w-8 h-8 text-white' />
            </button>
            <Card<Product>
              fields={fieldProducto}
              {...(type === 1 ? {} : { data: item })}
              onSubmit={type ? handdleAdd : onEdit}
              empty={type ? true : false}
              title={type ? "Agregar Producto" : "Editar Producto"}
              background={false}
              alert={""}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeAdmin;
