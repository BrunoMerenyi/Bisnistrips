import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";

// Predefined navigation data
const navBarItems = [
  {
    title: "Trips",
    isDropDown: false,
    dropDownItems: [
      {
        dropDownTitle: "Category 1",
        items: [
          { title: "Item 1", link: "#", icon: "icon1" },
          { title: "Item 2", link: "#", icon: "icon2" },
        ],
      },
      {
        dropDownTitle: "Category 2",
        items: [
          { title: "Item 3", link: "#", icon: "icon3" },
          { title: "Item 4", link: "#", icon: "icon4" },
        ],
      },
    ],
  },
  {
    title: "TripList",
    isDropDown: false,
    dropDownItems: [
      {
        dropDownTitle: "Category 1",
        items: [
          { title: "Item 1", link: "#", icon: "icon1" },
          { title: "Item 2", link: "#", icon: "icon2" },
        ],
      },
      {
        dropDownTitle: "Category 2",
        items: [
          { title: "Item 3", link: "#", icon: "icon3" },
          { title: "Item 4", link: "#", icon: "icon4" },
        ],
      },
    ],
  },
];

// Click outside hook
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

const Header = () => {
  const [isDropdownOpenIndex, setIsDropdownOpenIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [isMobileMenuOpen]);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const mobileDropdownVariants = {
    hidden: { height: 0, opacity: 0, y: -10, transition: { duration: 0.2 } },
    visible: {
      height: "auto",
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
    exit: { height: 0, opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const linkHover = {
    rest: { opacity: 0.7, transition: { duration: 0.2 } },
    hover: { opacity: 1 },
  };

  useClickOutside(dropdownRef, handleClickOutside);

  return (
    <nav
      className={`${
        isDropdownOpenIndex === null ? `bg-white/60 shadow-sm` : `bg-white`
      } sticky top-0 backdrop-blur-3xl z-50 transition-all ease-in-out duration-500`}
    >
      <div className="lg:w-full max-w-[1440px]  px-5 z-50">
        <div className="flex">
          {/* Logo */}
          <a
            className="flex-shrink-0 flex items-center hover:cursor-pointer"
            href="/"
          >
            <img className="h-16 w-auto" src="/images/logo.png" alt="Logo" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center ml-5">
            {navBarItems.map((item, index) => (
              <motion.div
                className={`relative ${
                  isDropdownOpenIndex === index && `h-full`
                } flex items-center justify-between px-5`}
                key={index}
                onHoverEnd={() =>
                  item.isDropDown && isDropdownOpenIndex !== null
                    ? setIsDropdownOpenIndex(null)
                    : null
                }
              >
                {item.isDropDown ? (
                  <>
                    <motion.a
                      onHoverStart={() =>
                        item.isDropDown ? setIsDropdownOpenIndex(index) : null
                      }
                      href="#"
                      className="text-black flex h-full items-center"
                      variants={linkHover}
                      initial="rest"
                      whileHover="hover"
                    >
                      {item.title}
                      {isDropdownOpenIndex === index ? (
                        <ChevronUp className="transition-all duration-200" />
                      ) : (
                        <ChevronDown className="transition-all duration-200" />
                      )}
                    </motion.a>

                    <AnimatePresence mode="wait">
                      {isDropdownOpenIndex === index && (
                        <motion.div
                          initial={{ y: -20, opacity: 0 }}
                          animate={{
                            y: 0,
                            opacity: 1,
                            transition: { duration: 0.3, ease: "easeOut" },
                          }}
                          exit={{
                            y: -20,
                            opacity: 0,
                            transition: { duration: 0.2 },
                          }}
                          className="fixed left-0 right-0 top-full w-full bg-white shadow-sm z-40"
                        >
                          <motion.div
                            className="max-w-[1440px] px-5 py-6"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{
                              y: 0,
                              opacity: 1,
                              transition: {
                                duration: 0.2,
                                delay: 0.15,
                                ease: "easeOut",
                              },
                            }}
                            exit={{
                              y: -10,
                              opacity: 0,
                              transition: { duration: 0.15 },
                            }}
                          >
                            <div className="grid grid-cols-3 gap-8">
                              {item.dropDownItems.map((subItem, subIndex) => (
                                <motion.div
                                  key={subIndex}
                                  className="space-y-4"
                                  initial={{ y: -5, opacity: 0 }}
                                  animate={{
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                      duration: 0.2,
                                      delay: 0.25 + subIndex * 0.05,
                                      ease: "easeOut",
                                    },
                                  }}
                                  exit={{
                                    y: -5,
                                    opacity: 0,
                                    transition: { duration: 0.1 },
                                  }}
                                >
                                  <h3 className="font-semibold text-gray-900 text-lg">
                                    {subItem.dropDownTitle}
                                  </h3>
                                  <div className="space-y-2">
                                    {subItem.items.map(
                                      (subSubItem, subSubIndex) => (
                                        <motion.a
                                          key={subSubIndex}
                                          href={subSubItem.link}
                                          className="flex items-center gap-3 px-4 py-3 text-black rounded-lg hover:bg-gray-50 transition-colors"
                                          variants={linkHover}
                                          initial="rest"
                                          whileHover="hover"
                                        >
                                          {subSubItem.icon && (
                                            <img
                                              src={`public/${subSubItem.icon}.svg`}
                                              alt={subSubItem.title}
                                              className="w-5 h-5 flex-shrink-0"
                                            />
                                          )}
                                          <span>{subSubItem.title}</span>
                                        </motion.a>
                                      )
                                    )}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <motion.a
                    href={`/${item.title}`}
                    className="text-black"
                    variants={linkHover}
                    initial="rest"
                    whileHover="hover"
                  >
                    {item.title}
                  </motion.a>
                )}
              </motion.div>
            ))}
          </div>

          {/* Auth Buttons and Mobile Menu Toggle */}
          <div className="flex items-center justify-end ml-auto">
            <div className="hidden lg:flex space-x-4">
              <button
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-black/70"
                onClick={() => (window.location.href = "/login")}
              >
                Log In
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-500/70 text-white px-4 py-2 rounded-lg"
                onClick={() => (window.location.href = "/signup")}
              >
                Sign Up
              </button>
            </div>
            <button
              className="lg:hidden p-2 z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
              exit={{ opacity: 0, x: 300, transition: { duration: 0.2 } }}
              className="px-4 right-0 top-0 min-h-screen overflow-scroll bg-white z-20 absolute h-full lg:hidden left-16 py-2"
            >
              <div className="mt-16 z-30">
                {navBarItems.map((item, index) => (
                  <div key={index} className="border-b last:border-b-0">
                    {item.isDropDown ? (
                      <>
                        <button
                          className="flex justify-between items-center w-full py-3"
                          onClick={() =>
                            setIsDropdownOpenIndex(
                              isDropdownOpenIndex === index ? null : index
                            )
                          }
                        >
                          {isDropdownOpenIndex === index ? (
                            <div className="flex justify-between items-center w-full">
                              <span className="text-black transform transition-all duration-200">
                                {item.title}
                              </span>
                              <ChevronUp />
                            </div>
                          ) : (
                            <div className="flex justify-between items-center w-full">
                              <span className="text-black/70 transform transition-all duration-200">
                                {item.title}
                              </span>
                              <ChevronDown />
                            </div>
                          )}
                        </button>
                        <AnimatePresence>
                          {isDropdownOpenIndex === index && (
                            <motion.div
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              variants={mobileDropdownVariants}
                              className="pl-4"
                            >
                              {item.dropDownItems.map((subItem, subIndex) => (
                                <div key={subIndex}>
                                  <h3 className="font-semibold mt-2">
                                    {subItem.dropDownTitle}
                                  </h3>
                                  {subItem.items.map(
                                    (subSubItem, subSubIndex) => (
                                      <a
                                        key={subSubIndex}
                                        href={subSubItem.link}
                                        className="block py-3 text-black/70 hover:text-black"
                                      >
                                        <img
                                          src={`public/${subSubItem.icon}.svg`}
                                          alt={subSubItem.title}
                                          className="inline-block w-5 h-5 mr-2"
                                        />
                                        {subSubItem.title}
                                      </a>
                                    )
                                  )}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a
                        href={`/${item.title}`}
                        className="block py-3 text-black/70 hover:text-black"
                      >
                        {item.title}
                      </a>
                    )}
                  </div>
                ))}
                <div className="mt-4 space-y-2 pb-4">
                  <button className="w-full bg-black text-white px-4 py-2 z-50 rounded-lg hover:bg-black/70">
                    Sign In
                  </button>
                  <button className="w-full bg-primary hover:bg-primary/70 z-50 text-white px-4 py-2 rounded-lg">
                    Sign Up
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
export default Header;
