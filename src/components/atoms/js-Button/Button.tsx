import Link from 'next/link';
import { ComponentProps } from 'react';

type ButtonProps = { title: string } & (
  | ({
      href?: undefined;
    } & ComponentProps<'button'>)
  | ({ href: string } & ComponentProps<typeof Link>)
);

const buttonStyle =
  'flex justify-center items-center bg-header-color text-3xl text-white p-2 border rounded-3xl w-full max-w-[150px] shadow-xl';

function Button({ title, ...props }: ButtonProps) {
  if (props.href) {
    return (
      <Link className={buttonStyle} {...props}>
        {title}
      </Link>
    );
  } else if (typeof props.href === 'undefined') {
    return (
      <button className={buttonStyle} {...props}>
        {title}
      </button>
    );
  }
}

export default Button;
