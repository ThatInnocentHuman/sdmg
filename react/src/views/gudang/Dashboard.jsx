import { motion } from "framer-motion";

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

export default function Dashboard() {
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
      className="absolute flex flex-col w-full items-center bg-second h-full lg:px-2 font-semibold"
    >
      <h1 className="mt-10">DashBoard</h1>
    </motion.div>
  );
}
