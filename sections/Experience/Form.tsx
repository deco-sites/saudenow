import Form from "deco-sites/saudenow/islands/Experience/Form.tsx";

interface ButtonProps {
  label: string;
  /**
   * @format color-input
   * @default #000000
   */
  backgroundColor: string;
  /**
   * @format color-input
   * @default #000000
   */
  textColor: string;
}

export interface FormProps {
  /**
   * @format rich-text
   */
  title: string;
  button: ButtonProps;
}

export interface Props {
  /**
   * @format rich-text
   */
  title: string;
  description: string;

  form: FormProps;
}

function Header({ title, description }: Omit<Props, "form">) {
  return (
    <div class="flex flex-col items-center justify-center gap-4">
      <div dangerouslySetInnerHTML={{ __html: title }} />
      <span>{description}</span>
    </div>
  );
}

export default function FormContent(props: Props) {
  return (
    <div class="flex flex-col items-center justify-center w-full px-4 py-10 text-white bg-black">
      <div class="flex flex-col gap-8 items-center justify-center max-w-5xl mx-auto">
        <Header {...props} />
        <Form {...props.form} />
      </div>
    </div>
  );
}
