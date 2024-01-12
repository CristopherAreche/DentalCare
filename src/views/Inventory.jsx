import AllProductsTables from "../components/Inventory/AllProductsTables";
import LowStockProducts from "../components/Inventory/LowStockProducts";
import Sidebar from "../components/Sidebar";
import DueDateTable from "../components/Inventory/DueDateTable";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useEffect, useState } from "react";
import { getProducts } from "../components/store/features/inventorySlice";
import SearchBar from "../components/Pacients/SearchBar";
import EditModal from "../components/Inventory/Modals/EditModal";
import PostModal from "../components/Inventory/Modals/PostModal";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  const handleEdit = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const dispatch = useDispatch();
  const inventoryProducts = useSelector((state) => state.inventory.products);

  const totalProductos = inventoryProducts.length;

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const onPostProducts = () => {
    setShowPostModal(true);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = inventoryProducts.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen overflow-auto bg-gradient-to-r from-[#0E264B] to-[#3e66a1] ">
      <div className="lg:w-[20%] m-0 z-50 shadow-lg">
        <Sidebar />
      </div>
      <div className="w-[80%] md:max-w-[85em] my-10 m-0 flex flex-col justify-start items-center gap-8">
        <div className="flex flex-col gap-6">
          <section className="flex h-[55%] lg:max-h-[35em] flex-col justify-start items-start gap-5">
            <div className="flex w-full justify-between">
              <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
              <button
                onClick={onPostProducts}
                className="py-3 px-6 text-xl font-bold transition-all duration-300 ease-in-out text-white rounded-full bg-background-100 hover:scale-105"
              >
                Add Product
              </button>
            </div>
            <AllProductsTables
              handleEdit={handleEdit}
              productos={filteredProducts}
            />
          </section>
          <section className="flex h-[45%] lg:max-h-[35em] gap-5 items-start">
            {inventoryProducts && (
              <article>
                <div className="mb-3">
                  <span className=" text-white text-xl font-bold mb-9 uppercase">
                    Low Stock Products
                  </span>
                </div>

                <LowStockProducts productos={inventoryProducts} />
              </article>
            )}

            <article className="lg:w-full">
              <div className="mb-3">
                <span className=" text-white text-xl font-bold mb-9 uppercase">
                  Products near expiration
                </span>
              </div>

              {inventoryProducts && (
                <DueDateTable productos={inventoryProducts} />
              )}
            </article>
          </section>
        </div>
      </div>
      {showModal && selectedRow && (
        <EditModal setShowModal={setShowModal} selectedRow={selectedRow} />
      )}
      {showPostModal && <PostModal setShowPostModal={setShowPostModal} />}
    </div>
  );
};

export default Inventory;
