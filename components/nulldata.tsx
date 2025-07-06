interface NullDataProps {
  title: string;
}

const NullData: React.FC<NullDataProps> = ({ title }) => {
  return (
    <div className="w-full  flex flex-1 items-center justify-center text-xl md:text-2xl">
      <p className="font-medium text-center text-red-600">{title}</p>
    </div>
  );
};

export default NullData;
