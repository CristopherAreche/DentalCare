import OdontogramComponent from "../../Odontograma/OdontogramComponent";

const Odontogram = () => {
  return (
    <div className="bg-white flex flex-col lg:flex-row md:flex-row items-center h-[600px] text-lg text-white font-bold py-4 overflow-y-auto">
      <OdontogramComponent />
    </div>
  );
};
export default Odontogram;
