function SidebarIconItem({ path, label, Icon, onClick,  }) {

  return (
    <section
        className="
            flex flex-row items-center
        "
    >
        <div
            className="
                 relative rounded-full h-14 w-14 flex
                  justify-center item-center p-4 hover:bg-slate-300
                  cursor-pointer hover:bg-opacity-10
                  lg:hidden
            "
        >
            <Icon size={20} color="white" />
        </div>
        <div
            className="
            relative rounded-full lg:flex hidden
            item-center p-4 gap-4 hover:bg-slate-300
            cursor-pointer hover:bg-opacity-10
            "
        >
            <Icon size={24} color="white" />
            <p className="hidden lg:block text-white text-xl"  >{label}</p>
        </div>
    </section>
  )
}

export default SidebarIconItem