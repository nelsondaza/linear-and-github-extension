export const StatusDone = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    height="1em"
    viewBox="0 0 16 16"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="7"
      cy="7"
      fill="none"
      r="6"
      stroke="lch(48% 59.31 288.43)"
      strokeDasharray="3.14 0"
      strokeDashoffset="-0.7"
      strokeWidth="2"
    />
    <circle
      className="progress"
      cx="7"
      cy="7"
      fill="none"
      r="3"
      stroke="lch(48% 59.31 288.43)"
      strokeDasharray="18.84955592153876 100"
      strokeDashoffset="0"
      strokeWidth="6"
      transform="rotate(-90 7 7)"
    />
    <path
      className="icon"
      d="M10.951 4.24896C11.283 4.58091 11.283 5.11909 10.951 5.45104L5.95104 10.451C5.61909 10.783 5.0809 10.783 4.74896 10.451L2.74896 8.45104C2.41701 8.11909 2.41701 7.5809 2.74896 7.24896C3.0809 6.91701 3.61909 6.91701 3.95104 7.24896L5.35 8.64792L9.74896 4.24896C10.0809 3.91701 10.6191 3.91701 10.951 4.24896Z"
      fill="white"
      stroke="none"
    />
  </svg>
)
