import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { useEffect, useRef, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineLoading3Quarters,
  AiOutlineSearch,
} from "react-icons/ai";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import { IoIosArrowDown } from "react-icons/io";

const animation = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.1,
      damping: 100,
      stiffness: 1000,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
  },
};

export default function TabungForm({
  closeModal,
  detail,
  setDetail,
  getTubes,
}) {
  const nameRef = useRef();
  const capitalPriceRef = useRef();
  const sellingPriceRef = useRef();
  const [title, setTitle] = useState(detail.name);
  const [gases, setGases] = useState([]);
  const [gasSelected, setGasSelected] = useState({});
  const [gasInputValue, setGasInputValue] = useState("");
  const [openGas, setOpenGas] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { setNotification } = useStateContext();
  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     handleSubmit(detail);
  //     // console.log(`loading : ${loading}`)
  //   };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    if (detail.id) {
      axiosClient
        .put(`/tube/${detail.id}`, detail)
        .then(() => {
          getTubes();
          setNotification("Tabung berhasil diupdate");
          closeModal();
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            if (response.data.errors) {
              setMessage(response.data.errors);
            } else {
              setMessage({
                error: [response.data.message],
              });
            }
            //TODO HANDLING ERROR
            console.log(response.data.errors);
          }
        })
        .finally(() => setLoading(false));
    } else {
      axiosClient
        .post("/tube", detail)
        .then(() => {
          getTubes();
          setNotification("Tabung berhasil ditambahkan");
          closeModal();
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            if (response.data.errors) {
              setMessage(response.data.errors);
            } else {
              setMessage({
                error: [response.data.message],
              });
            }
            //TODO HANDLING ERROR
            console.log(response.data.errors);
          }
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    axiosClient
      .get("/gas")
      .then(({ data }) => {
        setGases(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => console.log(gases), gases);

  return (
    <Backdrop onClick={(ev) => closeModal()}>
      <motion.div
        variants={animation}
        initial="hidden"
        animate="show"
        exit="exit"
        className="flex flex-col m-auto w-[90%] md:max-w-2xl bg-white justify-center rounded-md p-2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* CLOSE BUTTON */}
        <div className="relative flex flex-row w-full justify-center items-center text-sm sm:text-lg py-2 px-8">
          <div>{detail.id ? `Edit Data : ${title}` : "Tambah Tabung"}</div>
          <div
            onClick={(ev) => closeModal()}
            className="absolute flex items-center justify-center top-0 right-0 sm:right-1 sm:top-1 cursor-pointer rounded-full p-2 hover:bg-main text-main hover:text-second "
          >
            <AiOutlineClose size={23} className="min-w-max " />
          </div>
        </div>
        {/* CLOSE BUTTON */}
        <div className="flex items-center justify-center sm:px-5 py-2 ">
          <hr className="w-full bg-main h-[0.1rem]" />
        </div>
        {/* FORM */}
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center gap-1 text-xs md:text-sm sm:px-5"
        >
          <label htmlFor="">Nama</label>
          <input
            ref={nameRef}
            type="text"
            placeholder="Enter Name"
            className="px-2 py-1 border-2 border-main rounded-sm outline-none"
            value={detail.name}
            // value={detail && detail.name}
            onChange={(ev) => {
              setDetail({ ...detail, name: ev.target.value });
            }}
          />
          <div className="flex flex-col">
            <div className="flex flex-row gap-x-2">
              <div className="w-4/12">Ukuran</div>
              <div className="w-8/12">Jenis Gas</div>
            </div>
            <div className="flex flex-row gap-x-2">
              <div className="relative w-4/12 overflow-y-visible">
                <div
                  onClick={() => setOpenGas(!openGas)}
                  className="w-full bg-forth p-2 flex justify-between rounded-md"
                >
                  {gasSelected.name
                    ? gasSelected.name?.length > 25
                      ? gasSelected.name?.substring(0, 25) + "..."
                      : gasSelected.name
                    : "Select Gas"}
                  <IoIosArrowDown
                    size={20}
                    className={`${openGas && `rotate-180`} transition`}
                  />
                </div>
                <ul
                  className={`bg-forth mt-1 scrollbar-thin absolute rounded-md z-[90] w-full ${
                    openGas ? `max-h-60` : `max-h-0`
                  } overflow-y-auto`}
                >
                  <div className="sticky flex w-full items-center p-2 top-0  bg-forth ">
                    <AiOutlineSearch size={20} className="min-w-max" />
                    <input
                      type="text"
                      value={gasInputValue}
                      onChange={(e) =>
                        setGasInputValue(e.target.value.toLowerCase())
                      }
                      placeholder="Enter gas name"
                      className="w-full bg-forth pl-2 outline-none"
                    />
                  </div>
                  {gases.map((g) => (
                    <li
                      key={g.id}
                      className={`w-full hover:bg-black/20  p-2
                ${
                  g.name.toLowerCase() === gasSelected?.name?.toLowerCase() &&
                  `bg-black/20`
                }
                ${
                  g.name.toLowerCase().startsWith(gasInputValue.toLowerCase())
                    ? `block`
                    : `hidden`
                }`}
                      onClick={() => {
                        if (
                          g.name.toLowerCase() !==
                          gasSelected?.name?.toLowerCase()
                        ) {
                          setGasSelected(g);
                          setOpenGas(false);
                          setGasInputValue("");
                        }
                      }}
                    >
                      {g.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative w-8/12 overflow-y-visible">
                <div
                  onClick={() => setOpenGas(!openGas)}
                  className="w-full bg-forth p-2 flex justify-between rounded-md"
                >
                  {gasSelected.name
                    ? gasSelected.name?.length > 25
                      ? gasSelected.name?.substring(0, 25) + "..."
                      : gasSelected.name
                    : "Select Gas"}
                  <IoIosArrowDown
                    size={20}
                    className={`${openGas && `rotate-180`} transition`}
                  />
                </div>
                <ul
                  className={`bg-forth mt-1 scrollbar-thin absolute rounded-md z-[90] w-full ${
                    openGas ? `max-h-60` : `max-h-0`
                  } overflow-y-auto`}
                >
                  <div className="sticky flex w-full items-center p-2 top-0  bg-forth ">
                    <AiOutlineSearch size={20} className="min-w-max" />
                    <input
                      type="text"
                      value={gasInputValue}
                      onChange={(e) =>
                        setGasInputValue(e.target.value.toLowerCase())
                      }
                      placeholder="Enter gas name"
                      className="w-full bg-forth pl-2 outline-none"
                    />
                  </div>
                  {gases.map((g) => (
                    <li
                      key={g.id}
                      className={`w-full hover:bg-black/20  p-2
                ${
                  g.name.toLowerCase() === gasSelected?.name?.toLowerCase() &&
                  `bg-black/20`
                }
                ${
                  g.name.toLowerCase().startsWith(gasInputValue.toLowerCase())
                    ? `block`
                    : `hidden`
                }`}
                      onClick={() => {
                        if (
                          g.name.toLowerCase() !==
                          gasSelected?.name?.toLowerCase()
                        ) {
                          setGasSelected(g);
                          setOpenGas(false);
                          setGasInputValue("");
                        }
                      }}
                    >
                      {g.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <label htmlFor="">Harga Modal</label>
          <input
            ref={capitalPriceRef}
            type="text"
            placeholder="Enter capital price"
            className="px-2 py-1 border-2 border-main rounded-sm outline-none"
            value={detail.capital_price}
            // value={detail && detail.name}
            onChange={(ev) => {
              setDetail({ ...detail, capital_price: ev.target.value });
            }}
          />

          <label htmlFor="">Harga Jual</label>
          <input
            ref={sellingPriceRef}
            type="text"
            placeholder="Enter selling price"
            className="px-2 py-1 border-2 border-main rounded-sm outline-none"
            value={detail.selling_price}
            // value={detail && detail.name}
            onChange={(ev) => {
              setDetail({ ...detail, selling_price: ev.target.value });
            }}
          />

          {message && (
            <div className="text-red-600">
              {Object.keys(message).map((key) => (
                <p key={key} className="leading-tight tracking-tight">
                  {message[key][0]}
                </p>
              ))}
            </div>
          )}

          <button className="flex itemns-center justify-center py-2 px-5 bg-blue-400 w-fit mx-auto mt-2 mb-3 rounded-sm text-white hover:bg-blue-500">
            {loading && (
              <svg
                className="animate-spin flex items-center w-5 h-5 mr-2 "
                viewBox="0 0 30 30"
              >
                <AiOutlineLoading3Quarters
                  size={30}
                  className="fill-second min-w-max "
                />
              </svg>
            )}
            Submit
          </button>
        </form>
        {/* FORM */}
      </motion.div>
    </Backdrop>
  );
}
