import { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axios-client";
import { AnimatePresence, motion } from "framer-motion";
import ReactPaginate from "react-paginate";

// ICONS
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineLoading3Quarters,
  AiOutlineSearch,
} from "react-icons/ai";
import PelangganForm from "../../components/PelangganForm";
import PelangganDeleteModal from "../../components/PelangganDeleteModal";

const pageTransition = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -100,
    opacity: 0,
  },
};

export default function Pelanggan() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [countPage, setCountPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [cst, setCst] = useState({
    id: null,
    name: "",
    age: null,
    address: "",
  });

  const closeModal = () => {
    setModalOpen(false);
    setCst({
      id: null,
      name: "",
      age: null,
      address: "",
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setCst({
      id: null,
      name: "",
      age: null,
      address: "",
    });
  };

  const handleSearchClick = (ev) => {
    ev.preventDefault();
    setCurrentPage(1);
    getCustomers();
  };

  const getCustomers = () => {
    setLoading(true);
    axiosClient
      .get(
        `/customer?page=${currentPage}${
          searchKeyword ? "&search=" + searchKeyword : ""
        }`
      )
      .then(({ data }) => {
        setLoading(false);
        // setCustomers({
        //   data: data.data,
        //   currentPage: data.meta.current_page,
        //   pageCount: Math.ceil(data.meta.page_count),
        // });
        setCountPage(data.meta.last_page);
        setCustomers(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
    // .finally(()=>console.log(customers));
  };

  const onEditClick = (s) => {
    setCst(s);
    setModalOpen(true);
  };

  // const onSubmit = (s) => {
  //   if (s.id) {
  //     axiosClient
  //       .put(`/customer/${s.id}`, s)
  //       .then(() => {
  //         getCustomers();
  //         setNotification("Pelanggan berhasil diupdate");
  //         setModalOpen(false);
  //         setCst({
  //           id: null,
  //           name: "",
  //           age: null,
  //           address: "",
  //         });
  //       })
  //       .catch((err) => {
  //         const response = err.response;
  //         if (response && response.status === 422) {
  //           //TODO HANDLING ERROR
  //           console.log(response.data.errors);
  //         }
  //       });
  //   } else {
  //     axiosClient
  //       .post("/customer", s)
  //       .then(() => {
  //         getCustomers();
  //         setNotification("Pelanggan berhasil ditambahkan");
  //         setModalOpen(false);
  //       })
  //       .catch((err) => {
  //         const response = err.response;
  //         if (response && response.status === 422) {
  //           // TODO HANDLING ERROR
  //           console.log(response.data.errors);
  //         }
  //       });
  //   }
  // };

  const onDeleteClick = (s) => {
    setCst(s);
    setDeleteModal(true);
  };

  const handleDeleteClick = (id) => {
    axiosClient
      .delete(`/customer/${id}`)
      .then(() => {
        setNotification("Data berhasil dihapus");
        getCustomers();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setDeleteModal(false));
  };

  const handlePaginationClick = (ev) => {
    const halaman = ev.selected + 1;
    console.log(ev.selected);
    setCurrentPage(halaman);
    console.log(currentPage);
    // getCustomers();
  };

  useEffect(() => {
    getCustomers();
  }, [currentPage]);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        type: "tween",
        duration: 0.25,
        ease: "easeOut",
      }}
      className="absolute flex flex-col w-full items-center bg-second h-full px-2 md:px-4 lg:px-6"
    >
      {/* HEADER */}
      <div className="flex flex-row w-full justify-center md:justify-start">
        <div className="flex items-center text-2xl font-bold md:pt-2">
          Data Pelanggan
        </div>
      </div>
      {/* HEADER */}

      {/* SEARCH OPTION START*/}
      <form
        onSubmit={handleSearchClick}
        className="flex flex-row w-full bg-white items-center justify-between border-2 border-selected-item  rounded-sm my-6"
      >
        <button className="flex text-main  py-2 px-3 bg-forth border-collapse hover:bg-third cursor-pointer rounded-sm ">
          <AiOutlineSearch size={23} className="min-w-max mr-1" />
          Search
        </button>
        <div className="flex flex-grow rounded-sm ">
          <input
            value={searchKeyword}
            onChange={(ev) => setSearchKeyword(ev.target.value)}
            className="flex-1  p-2 rounded-sm focus:outline-none border-1 border-forth "
            type="text"
          />
        </div>
      </form>
      {/* SEARCH OPTION END*/}

      {/* TABLE WITH COL LAYOUT START*/}
      <hr className="bg-main w-full h-[0.2rem]" />

      <div
        className="flex flex-row w-full gap-2 py-1 justify-around cursor-default"
        style={{ scrollbarGutter: "stable" }}
      >
        <div className="w-1/12  flex  lg:w-[4%] justify-center  text-center">
          No.
        </div>
        <div className="flex w-6/12 sm:w-6/12 lg:w-3/12  justify-center lg:justify-start lg:text-left">
          Nama
        </div>
        <div className="flex w-1/12 justify-center lg:text-left">Usia</div>
        <div className="hidden lg:flex lg:w-5/12  text-left">Alamat</div>
        <div className="flex w-4/12 sm:w-3/12 lg:w-2/12  text-center justify-center">
          Action
        </div>
      </div>
      <hr className="bg-main w-full h-[0.2rem]" />

      {/* DATA TABEL START*/}
      <div className="flex-col w-full max-h-[80%] overflow-y-auto scrollbar-thin scrollbar-thumb-main/20 scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-track-selected-item/20 overflow-x-hidden  ">
        {loading ? (
          <div className="flex w-full text-center justify-center items-center py-4 whitespace-pre ">
            <svg
              className="animate-spin flex items-center w-5 h-5 mr-2 "
              viewBox="0 0 30 30"
            >
              <AiOutlineLoading3Quarters
                size={30}
                className="fill-main min-w-max "
              />
            </svg>
            Loading...
          </div>
        ) : customers.length ? (
          customers.map((s, index) => (
            <div key={s.id}>
              <div
                className="flex flex-row w-full gap-2 py-1 hover:bg-forth items-center cursor-default justify-around text-sm"
                key={s.id}
                style={{ scrollbarGutter: "stable" }}
              >
                <div className="w-1/12 flex lg:w-[4%] justify-center  text-center truncate">
                  {index + 1 + 20 * (currentPage - 1)}.
                </div>
                <div className="flex w-6/12 sm:w-6/12 lg:w-3/12  text-left truncate">
                  {s.name}
                </div>
                <div className="flex w-1/12   text-center justify-center truncate">
                  {s.age}
                </div>
                <div className="hidden lg:flex w-5/12  text-left truncate">
                  {s.address}
                </div>
                <div className="flex w-4/12 sm:w-3/12 lg:w-2/12  text-center items-center justify-center">
                  <button
                    onClick={(ev) => {
                      ev.preventDefault();
                      onEditClick(s);
                    }}
                    className="text-green-700 text-sm"
                  >
                    <span className="flex hover:bg-green-700 border-2 border-green-700 hover:text-second px-2 py-1 rounded-sm items-center ">
                      <span className="whitespace-pre flex items-center">
                        <AiOutlineEdit
                          size={18}
                          className="hidden sm:inline-flex min-w-max "
                        />
                        Edit
                      </span>
                    </span>
                  </button>
                  &nbsp;
                  <button
                    onClick={(ev) => onDeleteClick(s)}
                    className="text-red-700 text-sm"
                  >
                    <span className="flex hover:bg-red-700 border-2 border-red-700 hover:text-second px-2 py-1 rounded-sm items-center">
                      <span className="whitespace-pre flex items-center">
                        <AiOutlineDelete
                          size={18}
                          className="hidden sm:inline-flex min-w-max"
                        />
                        Delete
                      </span>
                    </span>
                  </button>
                </div>
              </div>
              <hr className="bg-main w-full h-[0.09rem]" />
            </div>
          ))
        ) : (
          <div className="flex w-full text-center justify-center items-center py-4 whitespace-pre ">
            Maaf, Tidak ada Data
          </div>
        )}
      </div>
      {/* DATA TABEL END */}

      <hr className="bg-main w-full h-[0.2rem]" />
      {/* TABLE WITH COL LAYOUT END*/}

      {/* BOTTOM BUTTON START*/}
      <div className="flex flex-row w-full justify-between items-center mt-5 sm:pr-3">
        <div className="flex flex-row justify-between gap-2">
          <div
            className="px-4 py-2 bg-main text-second hover:bg-selected-item cursor-pointer rounded-sm "
            onClick={() => setModalOpen(true)}
          >
            Tambah <span className="hidden sm:inline">Pelanggan</span>{" "}
          </div>
        </div>
        <div className="flex">
          <ReactPaginate
            pageCount={countPage}
            pageRangeDisplayed={2}
            activeLinkClassName="py-1  px-2 rounded-sm border-main bg-main text-second hover:bg-main hover:text-main text-md"
            pageLinkClassName="py-1  px-2 rounded-sm  border-forth bg-forth hover:bg-third text-md"
            breakClassName="py-2"
            nextLabel="Next &#x276F;"
            previousLabel="&#x276E; Previous"
            previousLinkClassName="hover:bg-third mr-2 py-2 px-3 rounded-sm bg-forth hidden md:flex"
            nextLinkClassName="hover:bg-third ml-2 py-2 px-3 rounded-sm bg-forth hidden md:flex"
            containerClassName="flex flex-row gap-1 text-sm items-center"
            onPageChange={handlePaginationClick}
          />
        </div>
      </div>
      {/* BOTTOM BUTTON END*/}

      {/* MODAL START*/}
      <AnimatePresence>
        {modalOpen && (
          <PelangganForm
            closeModal={closeModal}
            // handleSubmit={onSubmit}
            cst={cst}
            setCst={setCst}
            getCustomers={getCustomers}
          />
        )}

        {deleteModal && (
          <PelangganDeleteModal
            closeDeleteModal={closeDeleteModal}
            handleDelete={handleDeleteClick}
            cst={cst}
          />
        )}
      </AnimatePresence>
      {/* MODAL END*/}
    </motion.div>
  );
}
