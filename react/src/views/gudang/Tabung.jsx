import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import {
  AiOutlineArrowLeft,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineLoading3Quarters,
  AiOutlineSearch,
} from "react-icons/ai";
import axiosClient from "../../axios-client";
import TabungForm from "../../components/TabungForm";
import TabungDeleteModal from "../../components/TabungDeleteModal";

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

const rupiahFormat = (value) => new Intl.NumberFormat("id-ID").format(value);

export default function Tabung() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [countPage, setCountPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [tubes, setTubes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [detail, setDetail] = useState({
    id: null,
    name: "",
    gas_id: null,
    size: null,
    status: "",
  });

  const closeModal = () => {
    setModalOpen(false);
    setDetail({
      id: null,
      name: "",
      gas_id: null,
      size: null,
      status: "",
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDetail({
      id: null,
      name: "",
      gas_id: null,
      size: null,
      status: "",
    });
  };

  const handleSearchClick = (ev) => {
    ev.preventDefault();
    setCurrentPage(1);
    getTabung();
  };

  const getTabung = () => {
    setLoading(true);
    axiosClient
      .get(
        `/tube?page=${currentPage}${
          searchKeyword ? "&search=" + searchKeyword : ""
        }`
      )
      .then(({ data }) => {
        setLoading(false);
        // setTubes({
        //   data: data.data,
        //   currentPage: data.meta.current_page,
        //   pageCount: Math.ceil(data.meta.page_count),
        // });
        setCountPage(data.meta.last_page);
        setTubes(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
    // .finally(()=>console.log(tubes));
  };

  const onEditClick = (t) => {
    setDetail(t);
    setModalOpen(true);
  };

  const onDeleteClick = (t) => {
    setDetail(t);
    setDeleteModal(true);
  };

  const handleDeleteClick = (id) => {
    axiosClient
      .delete(`/tube/${id}`)
      .then(() => {
        setNotification("Tabung berhasil dihapus");
        getTabung();
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
    // getTabung();
  };

  useEffect(() => {
    getTabung();
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
      className="absolute flex flex-col w-full items-center bg-second h-full px-2 "
    >
      {/* HEADER */}
      <div className="flex flex-row w-full justify-center md:justify-start">
        <div className="flex items-center text-2xl font-bold md:pt-2">
          <NavLink
            to={"/gudang/stokbarang"}
            className={
              "text-main p-2 mr-2 rounded-lg hover:bg-main hover:text-white"
            }
          >
            <AiOutlineArrowLeft size={23} className="min-w-max" />
          </NavLink>
          Data Tabung
        </div>
      </div>
      {/* HEADER */}

      {/* SEARCH OPTION START*/}
      <form
        onSubmit={handleSearchClick}
        className="flex flex-row w-full bg-white items-center justify-between border-2 border-selected-item  rounded-sm mt-3 mb-6"
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
        className="flex flex-row w-full gap-2 py-1 justify-between cursor-default"
        style={{ scrollbarGutter: "stable" }}
      >
        <div className="w-2/12  flex  justify-center  text-center">
          No. Tabung
        </div>
        <div className="flex w-3/12  justify-start lg:justify-start lg:text-left">
          Isi Tabung
        </div>
        <div className="flex w-3/12  justify-center lg:justify-center lg:text-left">
          Ukuran
        </div>
        <div className="flex w-2/12 justify-center text-right">
          Status
        </div>
        <div className="flex w-24 sm:w-20 lg:w-36  text-center justify-center">
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
        ) : tubes.length ? (
          tubes?.map((t, index) => (
            <div key={t.id}>
              <div
                className="flex flex-row w-full gap-2 py-1 hover:bg-forth items-center cursor-default justify-between text-sm"
                key={t.id}
                style={{ scrollbarGutter: "stable" }}
              >
                <div className="w-2/12 flex  justify-center  text-center truncate">
                  {t.id}
                </div>
                <div className="flex w-3/12 justify-start text-left truncate">{t.name}</div>
                <div className="flex w-3/12 justify-center text-center truncate">{t.size} m³</div>
                <div className="flex w-2/12 text-xs lg:text-sm   text-right justify-center truncate">
                  {t.status}
                </div>
                <div className="flex-initial  whitespace-pre w-fit  text-center items-center justify-center">
                  <button
                    onClick={(ev) => {
                      ev.preventDefault();
                      onEditClick(t);
                    }}
                    className="text-green-700 text-sm"
                  >
                    <span className="flex hover:bg-green-700 border-2 border-green-700 hover:text-second px-2 py-1 rounded-sm items-center ">
                      <span className="whitespace-pre flex items-center">
                        <AiOutlineEdit
                          size={18}
                          className="inline-flex min-w-max "
                        />
                        <span className="hidden lg:flex">Edit</span>
                      </span>
                    </span>
                  </button>
                  &nbsp;
                  <button
                    onClick={(ev) => onDeleteClick(t)}
                    className="text-red-700 text-sm"
                  >
                    <span className="flex hover:bg-red-700 border-2 border-red-700 hover:text-second px-2 py-1 rounded-sm items-center">
                      <span className="whitespace-pre flex items-center">
                        <AiOutlineDelete
                          size={18}
                          className="inline-flex min-w-max"
                        />
                        <span className="hidden lg:flex">Delete</span>
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
            Tambah <span className="hidden sm:inline">Tabung</span>
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
          <TabungForm
            closeModal={closeModal}
            // handleSubmit={onSubmit}
            detail={detail}
            setDetail={setDetail}
            getTabung={getTabung}
          />
        )}

        {deleteModal && (
          <TabungDeleteModal
            closeDeleteModal={closeDeleteModal}
            handleDelete={handleDeleteClick}
            detail={detail}
          />
        )}
      </AnimatePresence>
      {/* MODAL END*/}
    </motion.div>
  );
}
