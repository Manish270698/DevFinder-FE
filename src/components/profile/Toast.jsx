import { InformationCircleIcon } from "@heroicons/react/24/outline";

const Toast = () => {
  return (
    <div  className="fixed z-10 top-6 py-2 px-4 bg-brand-accept lg:text-lg">
      <div className="alert alert-success">
        <InformationCircleIcon className="size-4 inline-block mr-4 ani" />
        <span>Profile Updated successfully!</span>
      </div>
    </div>
  
  );
};

export default Toast;
