interface DotCircleProps {
    clientX: number;
    clientY: number;
    index: number;
}
const DotCircle = ({ index, clientX, clientY }: DotCircleProps) => {

    return (
        <div
            className={`z-${index} absolute bg-zinc-400 text-xs font-bold flex justify-center items-center w-[20px] h-[20px] rounded-full`}
            style={{ left: `${clientX - 10}px`, top: `${clientY - 10}px` }}
        >
                {index+1}
        </div>

    )
}

export default DotCircle