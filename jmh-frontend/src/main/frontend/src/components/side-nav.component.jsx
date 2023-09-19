import { Fragment, useState } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import logo from "../assets/logo.svg";
import {
  ArrowsClockwise,
  Star,
  ChartLine,
  Bell,
  Gear,
  X,
  List,
  House,
  SignOut,
  CaretDown,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import user from "../assets/images/user.jpg";

const navigation = [
  {
    name: "Regular Updates",
    href: "/regular-updates",
    icon: ArrowsClockwise,
    current: true,
  },
  { name: "Favorites", href: "favorites", icon: Star, current: false },
  { name: "Analystics", href: "analystics", icon: ChartLine, current: false },
  { name: "Alerts", href: "allerts", icon: Bell, current: false },
];

const menuNavigation = [
  { name: "Menu Item 1", href: "#" },
  { name: "Menu Item 2", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SideNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {/* MobileOffCanvasSideBar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 xl:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-950/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-navy pb-4">
                  <div className="flex h-20 shrink-0 items-center justify-between px-6 relative">
                    <Link to="/">
                      <img src={logo} className="h-10" alt="Logo" />
                    </Link>

                    <button
                      type="button"
                      className="-m-2.5 p-2.5 text-white hover:text-red-600 transition-colors ease-in-out duration-150"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <X className="h-6 w-6 shrink-0" aria-hidden="true" />
                    </button>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul className="">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-primary-purple text-white"
                                    : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                                  "sidebar-nav-link"
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.current
                                      ? "text-white"
                                      : "text-indigo-200 group-hover:text-white",
                                    "h-6 w-6 shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                                <span className="sidebar-badge">12</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>

                      <li className="mt-auto ">
                        <Link
                          to="#"
                          className="sidebar-nav-link hover:bg-indigo-700"
                        >
                          <span className="flex items-center gap-3">
                            <Gear className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" />
                            Settings
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* DesktopSideNavbar */}
      <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-navy px-8 pb-4">
          <div className="flex h-20 shrink-0 items-center justify-start">
            <Link to="/">
              <img src={logo} className="h-10" alt="Logo" />
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-8">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-primary-purple text-white"
                            : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                          "sidebar-nav-link"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-white"
                              : "text-indigo-200 group-hover:text-white",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                        <span className="sidebar-badge">12</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="mt-auto -mx-8">
                <Link to="#" className="sidebar-nav-link hover:bg-indigo-700">
                  <span className="flex items-center gap-3">
                    <Gear className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" />
                    Settings
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* TopNavbar */}
      <div className="xl:pl-72">
        <div className="sticky top-0 z-40 px-4 sm:px-6 xl:px-7 py-5 w-full">
          <div className="flex items-center h-14 bg-white rounded-lg shadow-lg sm:gap-x-6 gap-x-4 px-5">
            <div className="xl:hidden flex items-center  xl:gap-x-6 gap-x-5">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-500 hover:text-primary-navy transition-colors ease-in-out duration-150"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <List className="h-6 w-6 fill-current" aria-hidden="true" />
              </button>
              <div
                className="w-0.5 h-4 bg-primary-navy/10 lg:block hidden"
                aria-hidden="true"
              ></div>
            </div>
            <div className="flex flex-1 gap-x-4 self-stretch justify-end xl:gap-x-6">
              <div className="flex-1 lg:flex hidden items-center gap-5">
                <div className="h-full ">
                  <Link
                    to="/"
                    className="xl:w-12 w-10 h-full flex items-center justify-center lg:text-primary-navy border-b-2 border-highlight-blue"
                  >
                    <House className="w-5 h-5 -mb-1" weight="bold" />
                  </Link>
                </div>
                <div className="w-0.5 h-4 bg-primary-navy/10 lg:block hidden"></div>

                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="hidden lg:flex lg:items-center text-primary-navy transition-colors ease-in-out duration-150">
                      <span className="text-sm leading-6 " aria-hidden="true">
                        Menu Button
                      </span>
                      <CaretDown
                        className="ml-2 h-3 w-3 "
                        weight="fill"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute left-0 z-10 mt-3 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {menuNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-4 py-2 text-sm leading-6 text-gray-900"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
                <div className="w-0.5 h-4 bg-primary-navy/10 lg:block hidden"></div>
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="hidden lg:flex lg:items-center text-primary-navy transition-colors ease-in-out duration-150">
                      <span className="text-sm leading-6 " aria-hidden="true">
                        Menu Button
                      </span>
                      <CaretDown
                        className="ml-2 h-3 w-3 "
                        weight="fill"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute left-0 z-10 mt-3 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {menuNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-4 py-2 text-sm leading-6 text-gray-900"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
                <div className="w-0.5 h-4 bg-primary-navy/10 lg:block hidden"></div>
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="hidden lg:flex lg:items-center text-primary-navy transition-colors ease-in-out duration-150">
                      <span className="text-sm leading-6 " aria-hidden="true">
                        Menu Button
                      </span>
                      <CaretDown
                        className="ml-2 h-3 w-3 "
                        weight="fill"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute left-0 z-10 mt-3 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {menuNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-4 py-2 text-sm leading-6 text-gray-900"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              <div className=" flex items-center justify-end gap-5">
                <Link className="flex items-center gap-3">
                  <div className="w-8 h-8 shrink-0 border-2 border-highlight-blue rounded-full overflow-hidden">
                    <img src={user} alt="User" className="w-full h-full" />
                  </div>
                  <p className="text-primary-navy text-sm">Margo Doe</p>
                </Link>

                <div
                  className="w-0.5 h-4 bg-primary-navy/10"
                  aria-hidden="true"
                ></div>
                <button className="text-primary-navy hover:text-red-600 transition-colors ease-in-out duration-150">
                  <span className="sr-only">Sign out</span>
                  <SignOut className="w-5 h-5" weight="bold" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;