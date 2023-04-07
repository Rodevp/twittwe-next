import Sidebar from "./Sidebar"

function Layout({ children }) {
    return (
        <main
            className="h-screen bg-black"
        >
            <section
                className="container h-full mx-auto xl:px-30 max-x-6xl"
            >
                <div
                    className="grid grid-cols-4 h-full"
                >
                    <Sidebar />
                    <div
                        className="
                        col-span-3
                        lg:col-span-2
                        border-x-[1px]
                      border-neutral-800
                    "
                    >
                        {children}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Layout