import Link from 'next/link';
import { ComponentProps } from 'react';

type ButtonProps =
  | ({
      title: string;
      href?: undefined;
    } & ComponentProps<'button'>)
  | ({ href: string } & ComponentProps<typeof Link>);

function Button({ title, ...props }: ButtonProps) {
  if (props.href) {
    return (
      <Link
        className="flex justify-center items-center bg-header-color text-white p-2 border rounded-3xl w-[429px] [&+&]:mx-8"
        {...props}
      >
        {title}
      </Link>
    );
  } else if (typeof props.href === 'undefined') {
    return (
      <button
        className="flex justify-center items-center bg-header-color text-white p-2 border rounded-3xl w-[429px] [&+&]:mx-8"
        {...props}
      >
        {title}
      </button>
    );
  }
}

export default Button;
