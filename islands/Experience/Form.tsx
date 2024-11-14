import { JSX } from "preact";
import { FormProps } from "deco-sites/saudenow/sections/Experience/Form.tsx";
import { Input } from "deco-sites/saudenow/components/ui/Input.tsx";
import { useSignal } from "@preact/signals";
import { invoke } from "deco-sites/saudenow/runtime.ts";

export default function Form({ title, button }: FormProps) {
  const { label, backgroundColor, textColor } = button;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;
      const cellphone =
        (e.currentTarget.elements.namedItem("cellphone") as RadioNodeList)
          ?.value;

      await invoke["deco-sites/saudenow"].actions.experience.form.send({
        name,
        email,
        cellphone,
      });
    } finally {
      loading.value = false;
    }
  };

  return (
    <form
      class="flex flex-col items-center justify-center gap-4 rounded-md border-2 border-primary-linear-gradient p-6 w-full"
      onSubmit={handleSubmit}
    >
      <div dangerouslySetInnerHTML={{ __html: title }} />

      <div class="flex flex-col gap-4 items-center justify-center w-full">
        <Input name="name" type="text" placeholder="Nome:" />
        <Input name="email" type="email" placeholder="E-mail:" />
        <Input name="cellphone" type="text" placeholder="Telefone:" />
      </div>

      <button
        type="submit"
        style={{ color: textColor, backgroundColor }}
        aria-label="Enviar formulário"
        disabled={loading.value}
        class="flex items-center justify-center font-bold text-black rounded-md px-8 py-1 disabled:cursor-not-allowed"
      >
        {loading.value
          ? <span class="loading loading-spinner" />
          : <span>{label}</span>}
      </button>
    </form>
  );
}