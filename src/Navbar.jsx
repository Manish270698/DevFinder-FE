const Navbar = () => {
  return (
    <div className="text-text bg-brand">
      <div className="p-4 flex text-xl items-center justify-between px-6 border-b-2 border-black">
        <div className="cursor-pointer font-bold">
          <a className="">DevFinder</a>
        </div>
        <div className="flex items-center gap-10 text-base font-semibold">
          <div className="cursor-pointer">
            <a>Connections</a>
          </div>
          <div className="cursor-pointer">
            <a>Requests</a>
          </div>
          <div className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </div>
          <div className="cursor-pointer">
            <img
              className="rounded-full border-2 border-black w-10  h-10 object-cover"
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRLtXMA-xdlwapKJYWwk-nPxd6SgznCPjD0q8xHDxAzoa8qqTHX"
              alt="Profile pic"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
