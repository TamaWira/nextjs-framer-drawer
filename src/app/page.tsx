"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

const content =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure obcaecati minus animi ea ad pariatur vero saepe! Nesciunt, voluptatum! Ducimus ea quia ut quam illo voluptatum non unde totam tempore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure obcaecati minus animi ea ad pariatur vero saepe! Nesciunt, voluptatum! Ducimus ea quia ut quam illo voluptatum non unde totam tempore.";

export default function Home() {
  const [on, setIsOn] = useState(false); // Track the box open/close state

  // Event handlers
  const handleOpenBox = () => setIsOn(true);
  const handleCloseBox = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation(); // Prevent clicking the close button from triggering the box click
    setIsOn(false);
  };

  // Animation vars for the box
  const animateBox = {
    height: on ? 140 : 80, // Animate height based on the state
    width: on ? "100%" : 160,
  };

  const boxTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1,
  };

  // Transition for the content
  const contentTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1,
  };

  return (
    <div className="h-screen p-5 max-w-sm border mx-auto relative flex flex-col justify-between">
      <div className="relative">
        <header className="flex justify-between items-center">
          <h1 className="font-bold text-3xl">Uglek Uglek App</h1>
          <RxHamburgerMenu className="text-xl" />
        </header>
        <AnimatePresence></AnimatePresence>
      </div>

      <div id="box" className="flex flex-col items-center justify-center">
        <motion.div
          id="box"
          onClick={handleOpenBox}
          whileTap={{ scale: 0.9 }}
          initial={false}
          animate={animateBox}
          transition={boxTransition}
          className={`cursor-pointer bg-white rounded-md flex items-center justify-center text-black ${
            on && "rounded-b-none"
          }`}
        >
          {on ? "I'm big now!" : "Tap on me!"}
          <AnimatePresence>
            {on && (
              <motion.div
                onClick={handleCloseBox}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-5 right-5 text-black text-3xl"
              >
                <IoIosClose />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {on && (
            <motion.div
              className="bg-gray-400 w-full p-5 overflow-hidden rounded-b-md"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 450, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={contentTransition}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
