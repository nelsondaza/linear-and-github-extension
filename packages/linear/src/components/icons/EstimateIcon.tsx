import { cn } from '@repo/utils'

export const EstimateIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('inline-block', className)}
    fill="currentColor"
    height="1em"
    viewBox="0 0 16 16"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7.39947 4.1511C8.00569 3.81649 8.758 4.05623 9.0798 4.68658L12.3549 11.1019C12.4502 11.2885 12.5 11.4966 12.5 11.7078C12.5 12.4215 11.9436 13 11.2573 13H4.74297C4.54172 13 4.34349 12.9492 4.1653 12.8519C3.55763 12.5202 3.32364 11.739 3.64268 11.1071L6.88186 4.69178C6.99813 4.46149 7.17853 4.27305 7.39947 4.1511ZM7.97623 4.96939C7.92894 4.97029 7.88112 4.98247 7.83648 5.00711C7.78125 5.0376 7.73614 5.08471 7.70708 5.14228L4.4679 11.5576C4.38814 11.7156 4.44663 11.9109 4.59855 11.9938C4.6431 12.0182 4.69266 12.0309 4.74297 12.0309L7.97564 12.0303L7.97623 4.96939Z" />
  </svg>
)
