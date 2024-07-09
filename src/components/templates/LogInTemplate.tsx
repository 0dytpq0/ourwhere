import Image from 'next/image';
import LogInForm from '../molecules/LogInForm';
import SignUpForm from '../molecules/SignUpForm';

interface LogInTemplateProps {
  title: string;
  type: string;
  imgURL: string | undefined;
}

function LogInTemplate({ title, type, imgURL }: LogInTemplateProps) {
  return (
    <section className="container mx-auto flex justify-between h-screen w-screen bg-loginpage-color e">
      <div className="flex flex-col justify-center w-2/3 items-center">
        <h1 className="text-2xl font-bold text-font-color mb-10">{title}</h1>
        {type === 'login' ? <LogInForm /> : <SignUpForm />}
      </div>
      <div className="flex flex-col justify-center items-center w-1/3 min-w-[512px] relative aspect-square">
        {imgURL && <Image alt={title} src={imgURL} fill className="object-cover" />}
      </div>
    </section>
  );
}

export default LogInTemplate;
