import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { NavLink } from "react-router-dom";

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

export default function StokBarang() {
  const [loadingGas, setLoadingGas] = useState(false);
  const [loadingTube, setLoadingTube] = useState(false);
  const [tubes, setTubes] = useState([]);
  const [gases, setGases] = useState([]);

  const getGases = () => {
    setLoadingGas(true);
    axiosClient
      .get(`/gas/stock`)
      .then(({ data }) => {
        setGases(data.data);
        console.log(data);
      })
      .catch(() => {
        console.log("ada error di getGases");
      })
      .finally(() => setLoadingGas(false));
  };

  const getTubes = () => {
    setLoadingTube(true);
    axiosClient
      .get(`/tube/stock`)
      .then(({ data }) => setTubes(data.data))
      .catch(() => console.log("Ada kesalahan di dalam getTubes"))
      .finally(() => setLoadingTube(false));
  };

  useEffect(() => {
    getGases();
    getTubes();
  }, []);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        type: "tween",
        duration: 0.135,
        ease: "easeOut",
      }}
      className="absolute flex flex-col w-full px-1 items-center bg-second h-[200vh] md:h-full font-semibold "
    >
      {/* TITLE START */}
      <div className="flex flex-row w-full justify-center text-center items-center h-fit md:h-[10%]">
        <h1 className="flex justify-center text-center items-center font-bold text-3xl pb-2 md:py-2">
          Stok Barang
        </h1>
      </div>
      {/* TITLE END */}

      {/* CONTENT START */}
      <div className="grid grid-rows-5 md:grid-rows-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-[95%] md:h-[90%]  gap-3">
        {/* GAS CONTENT START */}
        <div className="bg-white flex flex-col row-span-2 lg:col-span-2 order-2 px-5 py-2 items-center text-center rounded-md cursor-default">
          <h2 className="text-xl">Daftar Produk</h2>

          <hr className="bg-main w-full h-[0.13rem] mt-2" />
          <div className="grid grid-cols-12 w-full py-2 gap-x-1">
            <div className="md:col-span-2 lg:col-span-1">No.</div>
            <div className="col-span-8 lg:col-span-9 text-left">
              Nama Produk
            </div>
            <div className="col-span-2 text-right pr-2  ">Stok</div>
          </div>
          <hr className="bg-main w-full h-[0.13rem]" />

          {/* GAS TABLE START */}
          <div className=" w-full flex flex-col items-center text-sm max-h-[70%] overflow-y-auto scrollbar-thin scrollbar-thumb-main/20 scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-track-selected-item/20 overflow-x-hidden  ">
            {loadingGas ? (
              <div className="flex col-span-full text-center justify-center items-center py-4 text-base">
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
            ) : !gases.length ? (
              <div className="flex col-span-full text-center justify-center items-center py-4 gap-x-1">
                Maaf, tidak ada Data
              </div>
            ) : (
              gases?.map((g, index) => (
                <Fragment key={g.id}>
                  <div className="grid grid-cols-12 w-full hover:bg-forth">
                    <div className="md:col-span-2 lg:col-span-1 py-2">
                      {index + 1}.
                    </div>
                    <div className="col-span-8 lg:col-span-9 py-2 text-left">
                      {g.name}
                    </div>
                    <div
                      className={`col-span-2 text-right py-2 pr-3 text-base ${
                        g.tubes_count > 3 ? `text-green-800` : `text-red-400`
                      }`}
                    >
                      {g.tubes_count}
                    </div>
                  </div>
                  <hr className="bg-main w-full h-[0.09rem]" />
                </Fragment>
              ))
            )}
          </div>
          <hr className="bg-main w-full h-[0.13rem]" />
          {/* GAS TABLE END */}

          <div className="flex flex-row w-full justify-end py-2">
            {/* <div> */}
            <NavLink to={`/gudang/stokbarang/gas`}
              className={`border-2 border-main py-1 px-3 rounded-sm text-sm hover:bg-main hover:text-white`}
            >
              Kelola Data Gas
            </NavLink>
            {/* </div> */}
          </div>
        </div>
        {/* GAS CONTENT END */}

        {/* GRAPH START */}
        <div className="bg-fifth row-span-1 order-1 min-h-  md:order-3 p-2 justify-center items-center text-center rounded-md">
          <div className="h-full">sd</div>
        </div>
        {/* GRAPH END */}

        {/* TUBE CONTENT START */}
        <div className="bg-white row-span-2 md:row-span-1  order-4 px-5 py-2 justify-center items-center text-center rounded-md">
          <h2 className="text-xl">Daftar Tabung</h2>

          <hr className="bg-main w-full h-[0.13rem] mt-2" />
          <div className="grid grid-cols-12 w-full py-1 gap-x-1 items-centert">
            <div className="col-span-2">No.</div>
            <div className="col-span-7 text-left">No. tabung</div>
            <div className="col-span-3 pr-3">Isi</div>
          </div>
          <hr className="bg-main w-full h-[0.13rem]" />

          {/* TUBE DATA START */}
          <div className="flex flex-col w-full gap-x-1 items-center text-sm max-h-[48%]  overflow-y-auto scrollbar-thin scrollbar-thumb-main/20 scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-track-selected-item/20 overflow-x-hidden">
            {loadingTube ? (
              <div className="flex text-center justify-center items-center py-4 text-base">
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
            ) : !tubes.length ? (
              <div className="flex col-span-full text-center justify-center items-center py-4 gap-x-1">
                Maaf, tidak ada Data
              </div>
            ) : (
              tubes.map((t, i) => (
                <Fragment key={t.id}>
                  <div className="grid grid-cols-12 w-full hover:bg-forth">
                    <div className="col-span-2 py-1">{i + 1}.</div>
                    <div className="col-span-7 py-1 text-left">{t.id}</div>
                    <div className="col-span-3 py-1">{t.gas_id}</div>
                  </div>

                  <hr className="bg-main w-full h-[0.09rem] " />
                </Fragment>
              ))
            )}
          </div>
          <hr className="bg-main w-full h-[0.13rem] " />
          {/* TUBE DATA END */}
          <div className="flex flex-row justify-end py-2">
            <NavLink to={`/gudang/stokbarang/tabung`}
              className={`border-2 border-main py-1 px-3 rounded-sm text-sm hover:bg-main hover:text-white`}
            >
              Kelola Data Tabung
            </NavLink>
          </div>
        </div>
        {/* TUBE CONTENT END */}
      </div>
      {/* CONTENT END */}
    </motion.div>
  );
}
