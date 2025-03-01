function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center w-full py-[200px] typo-title-24-bold-tight">
      {children}
    </div>
  );
}

export default Empty;
