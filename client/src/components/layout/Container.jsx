import Profile from "./Profile"

function Container({ children }) {
  return (
    <main className="">
      <div className="h-[12vh] min-h-24 w-screen relative bg-JReal-200">
        <div className="absolute end-4 mt-[3.5%]">
          <Profile />
        </div>

      </div>
      <div className="ml-80 mr-8 my-16">
        {children}
      </div>

    </main>
  )
}

export default Container