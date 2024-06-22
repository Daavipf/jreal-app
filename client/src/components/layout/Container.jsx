import Profile from "./Profile"

function Container({ children }) {
  return (
    <main className="">
      <div className="md:h-[12vh] md:min-h-24 md:w-screen relative bg-JReal-200">
        <div className="md:absolute md:end-4 md:mt-[3.5%]">
          <Profile />
        </div>

      </div>
      <div className="md:ml-80 md:mr-8 md:my-16 mb-10 md:mb-2 p-6 md:px-0">
        {children}
      </div>

    </main>
  )
}

export default Container