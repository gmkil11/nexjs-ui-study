interface HeaderProps {
    labelFirst: string,
    labelSecond: string,
}

export const Header = ({labelFirst, labelSecond}:HeaderProps) => {
    return(
        <div className="w-full flex flex-col items-center ml-14">
            <span className="w-full flex gap-y-4 items-center justify-start text-primary text-3xl">
                {labelFirst}
            </span>
            <span className="w-full flex gap-y-4 items-center justify-start text-gray-500 text-xl">
                {labelSecond}
            </span>
        </div>
    );
}