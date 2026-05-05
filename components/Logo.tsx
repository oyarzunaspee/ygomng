const Logo = ({ classes }: { classes: string }) => {
    return (
        <div
            className={`logo w-full ${classes} bg-linear-to-b from-rose-400 to-violet-400`}
        ></div>
    )
}

export default Logo;