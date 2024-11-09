const CardShimmer = () => {
  return (
    <div className="relative w-[80%] h-[75%] sm:w-[45%] lg:w-[35%] xl:w-[22%]">
      <div className="absolute inset-0 min-w-full bg-text-light animate-pulse"></div>
      <div className="w-[100%] h-[100%] border-2 border-text relative translate-x-2 -translate-y-2">
        <div className="h-[80%] relative">
          <div className="absolute z-0 h-[100%] w-[100%] object-cover bg-brand-shimmer animate-pulse opacity-100"></div>
          <div className="flex justify-center items-center h-[75%] w-[100%]"></div>
          <div className="absolute h-[25%] w-[100%] bg-gradient-to-t from-text animate-pulse"></div>
          <div className="h-[25%] w-[100%] flex flex-col items-start justify-end gap-2 pb-4 pl-4 relative text-brand-white"></div>
        </div>
        <div className="bg-brand h-[20%] w-[100%] flex items-center justify-center p-4">
          <div className="w-[100%] relative flex flex-wrap justify-between">
            <div className="relative left-0">
              <div className="absolute inset-0 min-w-full bg-text"></div>
              <button
                className="font-semibold relative text-lg md:text-xl min-w-full border-2 border-text p-2 bg-brand-reject translate-x-2 -translate-y-2"
                type="button"
              >
                Ignore
              </button>
            </div>
            <div className="relative left-0">
              <div className="absolute inset-0 min-w-full bg-text"></div>
              <button
                className="font-semibold relative text-lg md:text-xl min-w-full border-2 border-text p-2 bg-brand-accept translate-x-2 -translate-y-2"
                type="button"
              >
                Interested
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardShimmer;
