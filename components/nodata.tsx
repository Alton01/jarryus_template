interface NoDataProps {
  title: string;
}

const NoData: React.FC<NoDataProps> = ({ title }) => {
  return (
    <div className="w-full flex flex-1 items-center justify-center text-xl md:text-2xl">
      <p className="font-medium text-center text-slate-500">{title}</p>
    </div>
  );
};

export default NoData;
