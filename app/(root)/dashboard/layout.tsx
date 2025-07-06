import { TopNavbar } from "./_components/top-navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col flex-1 h-full w-full">
      <div className="flex w-full">
        <TopNavbar />
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
