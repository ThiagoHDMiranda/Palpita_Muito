export default function DotSVG({ color }: { color: string }) {
  return (
    <svg
      width={"16px"}
      height={"16px"}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          strokeWidth="1"
          stroke="var(--color-gray-500)"
          fill={color}
          d="M8 3a5 5 0 100 10A5 5 0 008 3z"
        ></path>
      </g>
    </svg>
  );
}
