import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import products from '../data/items.json'
import Tabla from '../components/Tabla';
import Alert from '../components/Alert';
import Card from '../components/Card';
import { Data, estructure } from '../utilities/Data';

interface HomeProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loggedIn: boolean;
  email: string;
}

const Home: React.FC<HomeProps> = ({ setLoggedIn, loggedIn, email }) => {
  const navigate = useNavigate();
  const [type, setType] = useState(1);
  const [item, setItem] = useState<Data>(estructure);
  const username = localStorage.getItem('username');
  console.log(email)
  //fetch de los pedir los datos.

  const [items, setItems] = useState(products);
  const columns = Object.keys(products[0]);

  useEffect(() => {
    if (!loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  if (!loggedIn) {
    return null;
  }

  const onDelete = async (id: number) => {
    //fetch de eliminar el item
    const updatedItem = items.filter(item => item.id !== id);
    setItems(updatedItem);

  }

  const handdleEdit = async (id: number) => {
    const selectedItem = items.find(item => item.id === id);
    console.log(selectedItem);
    if (selectedItem) {
      setItem(selectedItem);
      setType(0);
    }
  }

  const onAdd = async (data: Data) => {
    console.log(data);
    // fecth de agregar
    const newItem = {
      id: data.id,
      product: data.product as string,
      price: data.price as number,
      stock: data.stock as number
    };

    setItems(prevItems => [...prevItems, newItem]);
    setType(1);
  }

  const onEdit = async (data: Data) => {
    // fecth de editar
    console.log(data);
    setType(1);
  }



  return (
    <>
      <Navbar setLoggedIn={setLoggedIn} />
      <div className='my-5 mx-8 items-center place-content-center'>
        <h1 className='my-2'>Bienvenido! {username}</h1>

        {
          type == 1 ? (
            <Card fields={columns} data={item} onSubmit={onAdd} title="Agregar Producto" empty={true} />

          ) : (
            <>
              <Card fields={columns} data={item} onSubmit={onEdit} title="Editar Producto" empty={false} />
              <button
                className="mt-4 bg-teal-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={() => setType(1)}
              >
                Agregar Producto
              </button>
            </>
          )
        }
        {
          items.length === 0 ? (
            <Alert message='No hay productos disponibles' color='red' />
          )
            : (
              <Tabla columns={columns} data={items} onDelete={onDelete} onEdit={handdleEdit} />
            )
        }
      </div>
    </>
  );
};

export default Home;
