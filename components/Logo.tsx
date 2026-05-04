const Logo = ({ animation }: { animation: string }) => {
    return (
        <div
            className={`logo w-full h-60 ${animation} bg-linear-to-b from-rose-400 to-violet-400`}
        ></div>
    )
}

export default Logo;