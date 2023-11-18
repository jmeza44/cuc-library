const Home: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-6">
      <div className="z-10 w-3/4 rounded-md border border-gray-200 bg-gray-50 px-32 py-20 shadow-lg transition-shadow delay-150 ease-out hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-2 text-5xl font-bold">Welcome to CUC Library</h1>
        <h2 className="mb-4 text-3xl font-semibold">
          Your Gateway to Knowledge and Exploration
        </h2>
        <p className="text-lg">Discover, Borrow, Learn</p>
      </div>

      <div className="flex w-3/4 flex-wrap items-center justify-between gap-4"></div>
    </div>
  );
};

export default Home;
